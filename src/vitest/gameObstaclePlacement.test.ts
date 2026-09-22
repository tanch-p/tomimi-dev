import * as THREE from 'three';
import { afterEach, expect, test, vi } from 'vitest';
import { Game } from '$lib/components/StageSimulator/objects/Game';
import { GameWorld } from '$lib/components/StageSimulator/objects/GameWorld';
import { SimulationSession } from '$lib/components/StageSimulator/objects/SimulationSession';
import { GameConfig } from '$lib/components/StageSimulator/objects/GameConfig.svelte.js';
import { GameManager } from '$lib/components/StageSimulator/objects/GameManager';
import { Trap } from '$lib/components/StageSimulator/objects/Trap';
import { obstacleEventStore } from '$lib/components/StageSimulator/stores/obstacleEvents';
import { OfflineStageRuntime } from '$lib/components/StageSimulator/objects/StageRuntime';
import { ObstacleController } from '$lib/components/StageSimulator/controllers/ObstacleController';
import { GameInputController } from '$lib/components/StageSimulator/controllers/GameInputController';
import type { Position } from '$lib/types';

function createRuntime() {
	return new OfflineStageRuntime({
		mode: 'wave_normal',
		currentWaveIndex: 0,
		stagePhaseIndex: 0,
		eliteMode: false,
		specialMods: {},
		steeringEnabled: true
	});
}

function createRenderingWorld(hidden = false) {
	const canvas = new EventTarget() as HTMLCanvasElement;
	Object.assign(canvas, {
		getBoundingClientRect: () => ({ left: 0, top: 0, width: 100, height: 100 })
	});
	const windowTarget = Object.assign(new EventTarget(), {
		devicePixelRatio: 1,
		innerWidth: 1280,
		innerHeight: 900,
		matchMedia: () => ({ matches: false })
	}) as unknown as Window;
	const documentTarget = Object.assign(new EventTarget(), { hidden }) as unknown as Document;
	const renderer = {
		setClearColor: vi.fn(),
		setPixelRatio: vi.fn(),
		setSize: vi.fn(),
		setAnimationLoop: vi.fn(),
		render: vi.fn(),
		renderLists: { dispose: vi.fn() },
		dispose: vi.fn(),
		forceContextLoss: vi.fn()
	};
	const timer = {
		reset: vi.fn(),
		update: vi.fn(),
		getDelta: vi.fn(() => 0.25),
		dispose: vi.fn()
	};
	const world = new GameWorld(canvas, createRuntime(), {
		renderer: renderer as any,
		timer: timer as any,
		windowTarget,
		documentTarget
	});
	return { world, renderer, timer, documentTarget };
}

function createInputController({
	runtime = createRuntime(),
	gameManager = { rollOverMeshes: new Map() },
	obstacleController = {},
	objects = [],
	placementPlane = null,
	raycaster
}: {
	runtime?: OfflineStageRuntime;
	gameManager?: any;
	obstacleController?: any;
	objects?: THREE.Object3D[];
	placementPlane?: THREE.Object3D | null;
	raycaster?: any;
} = {}) {
	const canvas = new EventTarget() as HTMLCanvasElement;
	Object.assign(canvas, {
		getBoundingClientRect: () => ({ left: 0, top: 0, width: 100, height: 100 })
	});
	const controller = new GameInputController({
		canvas,
		camera: new THREE.OrthographicCamera(),
		gameManager,
		runtime,
		obstacleController,
		getObjects: () => objects,
		getPlacementPlane: () => placementPlane,
		isActive: () => true,
		startSimulation: () => {
			runtime.state = 'running';
			runtime.isPaused = false;
		},
		documentTarget: new EventTarget() as Document,
		raycaster
	});
	return { controller, runtime, canvas };
}

afterEach(() => {
	vi.restoreAllMocks();
	vi.unstubAllGlobals();
	GameConfig.tokenCard = null;
	GameConfig.tokensDisabled = false;
	GameConfig.totalDeductedCost = 0;
	GameConfig.tokenCooldownDuration = 0;
	GameConfig.tokenCooldownRemaining = 0;
	GameConfig.state = 'loading';
	obstacleEventStore.reset();
});

test('a stopped game ignores late render callbacks', () => {
	const nextFrame = vi.fn();
	const update = vi.fn();
	const draw = vi.fn();
	const game = Object.create(Game.prototype) as any;
	Object.assign(game, {
		cleanedUp: false,
		world: { isRenderActive: false, nextFrame, draw },
		session: { update, runtime: createRuntime() },
		inputController: { processPendingPointerMove: vi.fn() }
	});

	game.render();

	expect(nextFrame).not.toHaveBeenCalled();
	expect(update).not.toHaveBeenCalled();
	expect(draw).not.toHaveBeenCalled();
});

test('the game facade advances the session before input processing and drawing', () => {
	const callOrder: string[] = [];
	const game = Object.create(Game.prototype) as any;
	Object.assign(game, {
		cleanedUp: false,
		world: {
			isRenderActive: true,
			nextFrame: vi.fn(() => 0.25),
			draw: vi.fn(() => callOrder.push('draw'))
		},
		session: {
			runtime: { speedFactor: 4 },
			update: vi.fn(() => callOrder.push('update'))
		},
		inputController: {
			processPendingPointerMove: vi.fn(() => callOrder.push('input'))
		}
	});

	game.render(100);

	expect(game.world.nextFrame).toHaveBeenCalledWith(100);
	expect(game.session.update).toHaveBeenCalledWith(1, 0.25);
	expect(callOrder).toEqual(['update', 'input', 'draw']);
});

test('resizing redraws the scene without advancing simulation time', () => {
	const { world, renderer, timer } = createRenderingWorld();
	vi.clearAllMocks();

	world.onWindowResize();

	expect(timer.update).not.toHaveBeenCalled();
	expect(renderer.render).toHaveBeenCalledOnce();
});

test('session lifecycle methods update runtime state directly', () => {
	const runtime = createRuntime();
	const session = Object.create(SimulationSession.prototype) as SimulationSession;
	Object.defineProperty(session, 'runtime', { value: runtime });

	session.setReady();
	expect(runtime.state).toBe('ready');
	session.setReady();
	session.start();

	expect(runtime.state).toBe('running');
	expect(runtime.isPaused).toBe(false);
});

test('equivalent scenarios do not restart the game', () => {
	const config = { levelId: 'level_test' };
	const enemies: unknown[] = [];
	const session = Object.create(SimulationSession.prototype) as any;
	Object.assign(session, {
		config,
		enemies,
		waveData: [],
		scenarioRevision: 'level_test:one',
		obstacleController: { setConfig: vi.fn() }
	});

	expect(
		session.replaceScenario({
			config,
			enemies,
			waveData: [{ differentAllocation: true }],
			revision: 'level_test:one'
		})
	).toBe(false);
	expect(session.obstacleController.setConfig).not.toHaveBeenCalled();

	expect(
		session.replaceScenario({
			config,
			enemies,
			waveData: [],
			revision: 'level_test:two'
		})
	).toBe(true);
	expect(session.obstacleController.setConfig).toHaveBeenCalledOnce();
});

test('obstacle preview uses numeric grid coordinates and snaps to the tile center', () => {
	const mesh = new THREE.Group();
	const canPlaceRoadblock = vi.fn(() => true);
	const gameManager = {
		canPlaceRoadblock,
		getGridPosFromVectors: () => '3,2',
		getVectorCoordinates: () => ({ x: 150, y: -50 }),
		rollOverMeshes: new Map([['trap_001_crate', { key: 'trap_001_crate', getMesh: () => mesh }]])
	};
	const { controller, runtime } = createInputController({ gameManager });
	runtime.tokenCard = {
		key: 'trap_001_crate',
		count: 2,
		selected: true
	};

	const placement = controller.getObstaclePlacement({
		point: new THREE.Vector3(149, -49, 0)
	} as THREE.Intersection);

	expect(placement?.position).toStrictEqual({ row: 2, col: 3 });
	expect(canPlaceRoadblock).toHaveBeenCalledWith({ row: 2, col: 3 });
	expect(mesh.position.toArray()).toStrictEqual([150, -50, 0.01]);
	expect(placement?.canPlace).toBe(true);
});

test('obstacle preview is unavailable when the card is deselected or depleted', () => {
	const { controller, runtime } = createInputController();
	const plane = { point: new THREE.Vector3() } as THREE.Intersection;

	runtime.tokenCard = {
		key: 'trap_001_crate',
		count: 2,
		selected: false
	};
	expect(controller.getObstaclePlacement(plane)).toBeNull();

	runtime.tokenCard = {
		key: 'trap_001_crate',
		count: 0,
		selected: true
	};
	expect(controller.getObstaclePlacement(plane)).toBeNull();
});

test('obstacle preview is unavailable while trap selection disables tokens', () => {
	const { controller, runtime } = createInputController();
	runtime.tokenCard = {
		key: 'trap_001_crate',
		count: 2,
		selected: true
	};
	runtime.tokensDisabled = true;

	expect(
		controller.getObstaclePlacement({ point: new THREE.Vector3() } as THREE.Intersection)
	).toBeNull();
});

test('obstacle preview is unavailable while the token is cooling down', () => {
	const { controller, runtime } = createInputController();
	runtime.tokenCard = {
		key: 'trap_001_crate',
		count: 2,
		selected: true
	};
	runtime.tokenCooldownRemaining = 4.5;

	expect(
		controller.getObstaclePlacement({ point: new THREE.Vector3() } as THREE.Intersection)
	).toBeNull();
});

test('placing a token adds its cost to the total deducted cost', () => {
	const preview = new THREE.Group();
	preview.visible = true;
	const placedTrap = {
		data: { stats: [{ cost: 5, respawnTime: 5 }] },
		key: 'trap_001_crate',
		position: { row: 2, col: 3 },
		userPlacementId: null
	};
	const plane = {
		object: { userData: { name: 'plane' } },
		point: new THREE.Vector3()
	};
	const gameManager = { addTrap: vi.fn(() => placedTrap), rollOverMeshes: new Map() };
	const { controller, runtime } = createInputController({
		gameManager,
		obstacleController: { recordPlacement: vi.fn(() => 'obstacle-1') },
		raycaster: {
			setFromCamera: vi.fn(),
			intersectObjects: () => [plane]
		}
	});
	runtime.state = 'running';
	runtime.tokenCard = {
		key: 'trap_001_crate',
		count: 2,
		selected: true
	};
	vi.spyOn(controller, 'getObstaclePlacement').mockReturnValue({
		canPlace: true,
		mesh: preview,
		position: placedTrap.position,
		trap: { key: placedTrap.key }
	} as any);

	(controller as any).onPointerDown({ clientX: 50, clientY: 50 });

	expect(runtime.totalDeductedCost).toBe(5);
	expect(runtime.tokenCooldownDuration).toBe(5);
	expect(runtime.tokenCooldownRemaining).toBe(5);
	expect(runtime.tokenCard?.count).toBe(1);
	expect(preview.visible).toBe(false);

	(controller as any).onPointerDown({ clientX: 50, clientY: 50 });
	expect(gameManager.addTrap).toHaveBeenCalledOnce();
	expect(runtime.totalDeductedCost).toBe(5);
	expect(runtime.tokenCard?.count).toBe(1);
});

test('token cooldown decreases with scaled game time and stops at zero', () => {
	const gameManager = Object.create(GameManager.prototype) as any;
	Object.assign(gameManager, {
		countdownManager: { update: vi.fn() },
		traps: new Map(),
		enemiesOnMap: [],
		runtime: createRuntime()
	});
	gameManager.runtime.tokenCooldownDuration = 5;
	gameManager.runtime.tokenCooldownRemaining = 5;

	gameManager.update(1.25);
	expect(gameManager.runtime.tokenCooldownRemaining).toBe(3.75);

	gameManager.update(10);
	expect(gameManager.runtime.tokenCooldownRemaining).toBe(0);
});

test('game render loop suspends while hidden and resumes without a hidden-tab delta', () => {
	const { world, renderer, timer, documentTarget } = createRenderingWorld();
	const renderFrame = vi.fn();
	world.start(renderFrame);
	vi.clearAllMocks();

	Object.defineProperty(documentTarget, 'hidden', { value: true, configurable: true });
	world.onVisibilityChange();
	expect(renderer.setAnimationLoop).toHaveBeenLastCalledWith(null);

	Object.defineProperty(documentTarget, 'hidden', { value: false, configurable: true });
	world.onVisibilityChange();
	expect(timer.reset).toHaveBeenCalledOnce();
	expect(renderer.setAnimationLoop).toHaveBeenLastCalledWith(renderFrame);
});

test('a stopped game stays stopped when its tab becomes visible', () => {
	const { world, renderer, timer } = createRenderingWorld();
	world.start(vi.fn());
	world.stop();
	vi.clearAllMocks();

	world.onVisibilityChange();
	expect(renderer.setAnimationLoop).not.toHaveBeenCalled();
	expect(timer.reset).not.toHaveBeenCalled();
});

test('future obstacle events replay after seeking behind them', () => {
	const applyObstacleEvent = vi.fn();
	const syncUserRoadblocks = vi.fn();
	const runtime = createRuntime();
	const controller = new ObstacleController(
		{ applyObstacleEvent, syncUserRoadblocks } as any,
		{ token_cards: [{ key: 'trap_001_crate', count: 2 }] } as any,
		runtime
	);
	runtime.tokenCard = {
		key: 'trap_001_crate',
		count: 2,
		selected: true
	};
	runtime.scaledElapsedTime = 300;
	controller.recordPlacement({ row: 4, col: 11 }, 'trap_001_crate');

	controller.setReplayTime(200);
	controller.replayThrough(299.9);
	expect(applyObstacleEvent).not.toHaveBeenCalled();

	controller.replayThrough(300);
	expect(applyObstacleEvent).toHaveBeenCalledOnce();
	expect(applyObstacleEvent).toHaveBeenCalledWith(obstacleEventStore.getSnapshot().events[0]);
	expect(runtime.totalDeductedCost).toBe(5);
	expect(runtime.tokenCard?.count).toBe(1);
	expect(runtime.tokenCooldownRemaining).toBe(5);
	controller.dispose();
});

test('seeking backward reconstructs user roadblocks without removing stage traps', () => {
	const syncUserRoadblocks = vi.fn();
	const runtime = createRuntime();
	const controller = new ObstacleController(
		{ applyObstacleEvent: vi.fn(), syncUserRoadblocks } as any,
		{ token_cards: [{ key: 'trap_001_crate', count: 2 }] } as any,
		runtime
	);
	runtime.scaledElapsedTime = 100;
	const placementId = controller.recordPlacement({ row: 2, col: 3 }, 'trap_001_crate');
	runtime.scaledElapsedTime = 200;
	controller.recordRemoval({ row: 2, col: 3 }, 'trap_001_crate', placementId);

	controller.setReplayTime(150);
	expect(syncUserRoadblocks).toHaveBeenLastCalledWith([
		{
			key: 'trap_001_crate',
			position: { row: 2, col: 3 },
			placementId
		}
	]);

	controller.setReplayTime(50);
	expect(syncUserRoadblocks).toHaveBeenLastCalledWith([]);
	controller.setReplayTime(250);
	expect(syncUserRoadblocks).toHaveBeenLastCalledWith([]);
	controller.dispose();
});

test('an invalid obstacle preview remains visible and semi-transparent', () => {
	const { controller } = createInputController();
	const sharedMaterial = new THREE.MeshBasicMaterial({ opacity: 0.8 });
	const previewMaterialOwner = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), sharedMaterial);
	const preview = new THREE.Group();
	preview.visible = false;
	preview.add(previewMaterialOwner);

	controller.setRollOverPlacementValidity(preview, false);

	const previewMaterial = previewMaterialOwner.material as THREE.MeshBasicMaterial;
	expect(preview.visible).toBe(true);
	expect(previewMaterial).not.toBe(sharedMaterial);
	expect(previewMaterial.opacity).toBeCloseTo(0.36);
	expect(previewMaterial.transparent).toBe(true);
	expect(previewMaterial.depthWrite).toBe(false);
	expect(sharedMaterial.opacity).toBe(0.8);
	expect(sharedMaterial.transparent).toBe(false);

	controller.setRollOverPlacementValidity(preview, true);
	expect(previewMaterial.opacity).toBe(0.8);
	expect(previewMaterial.transparent).toBe(false);
	expect(previewMaterial.depthWrite).toBe(true);
});

test('obstacle preview revalidates when placement validity changes on the same tile', () => {
	const preview = new THREE.Group();
	const intersection = { point: new THREE.Vector3() };
	const placementPlane = new THREE.Object3D();
	const { controller, runtime } = createInputController({
		placementPlane,
		gameManager: {
			rollOverMeshes: new Map(),
			getGridPosFromVectors: () => '3,2'
		},
		raycaster: {
			setFromCamera: vi.fn(),
			intersectObject: () => [intersection]
		}
	});
	const getObstaclePlacement = vi
		.spyOn(controller, 'getObstaclePlacement')
		.mockReturnValueOnce({ mesh: preview, canPlace: true } as any)
		.mockReturnValueOnce({ mesh: preview, canPlace: false } as any)
		.mockReturnValueOnce({ mesh: preview, canPlace: false } as any);
	const setValidity = vi.spyOn(controller, 'setRollOverPlacementValidity');
	runtime.tokenCard = {
		key: 'trap_001_crate',
		count: 2,
		selected: true
	};

	(controller as any).pendingTokenPointer = { clientX: 50, clientY: 50, overCanvas: true };
	controller.processPendingPointerMove();
	(controller as any).pendingTokenPointer = { clientX: 51, clientY: 51, overCanvas: true };
	controller.processPendingPointerMove();
	(controller as any).pendingTokenPointer = { clientX: 52, clientY: 52, overCanvas: true };
	controller.processPendingPointerMove();

	expect(getObstaclePlacement).toHaveBeenCalledTimes(3);
	expect(setValidity).toHaveBeenCalledTimes(2);
	expect(setValidity).toHaveBeenNthCalledWith(1, preview, true);
	expect(setValidity).toHaveBeenNthCalledWith(2, preview, false);
});

test('selecting a roadblock shows an unskewed selection frame and escape button', () => {
	vi.spyOn(THREE.TextureLoader.prototype, 'load').mockImplementation(() => new THREE.Texture());
	const scene = new THREE.Scene();
	const objects: THREE.Object3D[] = [];
	const trap = Object.create(Trap.prototype) as any;
	Object.assign(trap, {
		gameManager: {
			world: { objects, hideRollOverMesh: vi.fn() },
			traps: new Map(),
			scene,
			removeTrap: vi.fn()
		},
		branchKey: null,
		isRoadblock: 1,
		isSimulation: false,
		meshGroup: new THREE.Group(),
		pathGroup: null,
		showUI: null,
		selected: false,
		sprite: null,
		uiInteractiveObjects: []
	});
	trap.meshGroup.rotation.z = Math.PI / 2;
	trap.meshGroup.position.set(150, -50, 40);
	trap.initSelectionUI();

	const frame = trap.showUI.getObjectByName('selection-frame');
	const escapeButton = trap.showUI.getObjectByName('escape-button');
	expect(frame).toBeInstanceOf(THREE.Sprite);
	expect(frame.scale.toArray()).toStrictEqual([
		GameConfig.gridSize * 6.1,
		GameConfig.gridSize * 6.1,
		1
	]);
	expect(escapeButton).toBeInstanceOf(THREE.Sprite);
	expect(trap.showUI.position.toArray()).toStrictEqual([150, -50, 40]);
	expect(trap.showUI.parent).toBe(scene);
	expect(trap.showUI.parent).not.toBe(trap.meshGroup);
	expect(trap.showUI.visible).toBe(false);
	expect(objects).toContain(trap.sprite);
	expect(objects).not.toContain(escapeButton);
	expect(objects).not.toContain(frame);

	trap.onSelect();
	expect(trap.selected).toBe(true);
	expect(trap.showUI.visible).toBe(true);
	expect(objects).toContain(escapeButton);
	expect(GameConfig.tokensDisabled).toBe(true);
	expect(trap.gameManager.world.hideRollOverMesh).toHaveBeenCalledOnce();

	trap.onDeselect();
	expect(trap.selected).toBe(false);
	expect(trap.showUI.visible).toBe(false);
	expect(objects).not.toContain(escapeButton);
	expect(GameConfig.tokensDisabled).toBe(false);
	const selectionUI = trap.showUI;
	trap.remove();
	expect(scene.children).not.toContain(selectionUI);
});

test('a selectable non-roadblock trap shows the frame without an escape button', () => {
	vi.spyOn(THREE.TextureLoader.prototype, 'load').mockImplementation(() => new THREE.Texture());
	const scene = new THREE.Scene();
	const objects: THREE.Object3D[] = [];
	const trap = Object.create(Trap.prototype) as any;
	Object.assign(trap, {
		gameManager: {
			world: { objects, hideRollOverMesh: vi.fn() },
			traps: new Map(),
			scene,
			removeTrap: vi.fn()
		},
		branchKey: 'branch_1',
		isRoadblock: 0,
		isSimulation: false,
		meshGroup: new THREE.Group(),
		pathGroup: null,
		showUI: null,
		selected: false,
		sprite: null,
		uiInteractiveObjects: []
	});

	trap.initSelectionUI();

	expect(trap.showUI.getObjectByName('selection-frame')).toBeInstanceOf(THREE.Sprite);
	expect(trap.showUI.getObjectByName('escape-button')).toBeUndefined();
	expect(objects).toStrictEqual([trap.sprite]);
	trap.onSelect();
	expect(GameConfig.tokensDisabled).toBe(true);
	trap.remove();
	expect(GameConfig.tokensDisabled).toBe(false);
});

test('the roadblock escape button removes its trap before obstacle placement is handled', () => {
	const remove = vi.fn();
	const runtime = createRuntime();
	runtime.scaledElapsedTime = 3.5;
	const obstacleController = {
		recordRemoval: (position: Position, trapKey: string, placementId: string | null) =>
			obstacleEventStore.recordRemoval(runtime.scaledElapsedTime, position, trapKey, placementId)
	};
	const { controller } = createInputController({ runtime, obstacleController });

	const handled = controller.handleRoadblockInteraction([
		{
			object: {
				userData: {
					roadblockRemove: {
						key: 'trap_001_crate',
						position: { row: 2, col: 3 },
						userPlacementId: 'obstacle-1',
						remove
					}
				}
			}
		}
	] as unknown as THREE.Intersection[]);

	expect(handled).toBe(true);
	expect(remove).toHaveBeenCalledOnce();
	expect(obstacleEventStore.getSnapshot().events).toStrictEqual([
		{
			action: 'remove',
			time: 3.5,
			position: { row: 2, col: 3 },
			trapKey: 'trap_001_crate',
			placementId: 'obstacle-1'
		}
	]);
});

test('clicking a roadblock selects it and deselects other objects', () => {
	const roadblock = { isRoadblock: 1, onSelect: vi.fn(), onDeselect: vi.fn() };
	const otherEnemy = { onDeselect: vi.fn() };
	const objects = [
		{ userData: { trap: roadblock } },
		{ userData: { enemy: otherEnemy } }
	] as unknown as THREE.Object3D[];
	const { controller } = createInputController({ objects });

	const handled = controller.handleRoadblockInteraction([
		{ object: { userData: { trap: roadblock } } }
	] as unknown as THREE.Intersection[]);

	expect(handled).toBe(true);
	expect(roadblock.onSelect).toHaveBeenCalledOnce();
	expect(roadblock.onDeselect).not.toHaveBeenCalled();
	expect(otherEnemy.onDeselect).toHaveBeenCalledOnce();
});

test('reconstructing user roadblocks preserves stage-owned roadblocks', () => {
	const removeStageTrap = vi.fn();
	const removeUserTrap = vi.fn();
	const manager = Object.create(GameManager.prototype) as any;
	manager.traps = new Map([
		['1,1', { isRoadblock: 1, userPlacementId: null, remove: removeStageTrap }],
		[
			'2,2',
			{
				isRoadblock: 1,
				userPlacementId: 'obstacle-1',
				key: 'trap_001_crate',
				position: { row: 2, col: 2 },
				remove: removeUserTrap
			}
		]
	]);
	manager.addTrap = vi.fn();

	manager.syncUserRoadblocks([]);

	expect(removeUserTrap).toHaveBeenCalledOnce();
	expect(removeStageTrap).not.toHaveBeenCalled();
});
