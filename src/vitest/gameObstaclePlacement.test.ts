import * as THREE from 'three';
import { afterEach, expect, test, vi } from 'vitest';
import { Game } from '$lib/components/StageSimulator/objects/Game';
import { GameConfig } from '$lib/components/StageSimulator/objects/GameConfig';
import { GameManager } from '$lib/components/StageSimulator/objects/GameManager';
import { Trap } from '$lib/components/StageSimulator/objects/Trap';
import { obstacleEventStore } from '$lib/components/StageSimulator/stores/obstacleEvents';

afterEach(() => {
	vi.restoreAllMocks();
	GameConfig.setValue('tokenCard', null);
	GameConfig.setValue('tokensDisabled', false);
	GameConfig.setValue('totalDeductedCost', 0);
	GameConfig.setValue('tokenCooldownDuration', 0);
	GameConfig.setValue('tokenCooldownRemaining', 0);
	GameConfig.state = 'loading';
	obstacleEventStore.reset();
});

test('a stopped game ignores late render callbacks', () => {
	const getDelta = vi.fn();
	const render = vi.fn();
	const game = Object.create(Game.prototype) as any;
	Object.assign(game, {
		cleanedUp: false,
		clock: { getDelta },
		isDocumentHidden: () => false,
		renderer: { render },
		renderLoopRequested: false
	});

	game.render();

	expect(getDelta).not.toHaveBeenCalled();
	expect(render).not.toHaveBeenCalled();
});

test('obstacle preview uses numeric grid coordinates and snaps to the tile center', () => {
	const mesh = new THREE.Group();
	const canPlaceRoadblock = vi.fn(() => true);
	const game = Object.create(Game.prototype) as any;
	game.gameManager = {
		canPlaceRoadblock,
		getGridPosFromVectors: () => '3,2',
		getVectorCoordinates: () => ({ x: 150, y: -50 }),
		rollOverMeshes: new Map([['trap_001_crate', { key: 'trap_001_crate', getMesh: () => mesh }]])
	};
	GameConfig.setValue('tokenCard', {
		key: 'trap_001_crate',
		count: 2,
		selected: true
	});

	const placement = game.getObstaclePlacement({ point: new THREE.Vector3(149, -49, 0) });

	expect(placement.position).toStrictEqual({ row: 2, col: 3 });
	expect(canPlaceRoadblock).toHaveBeenCalledWith({ row: 2, col: 3 });
	expect(mesh.position.toArray()).toStrictEqual([150, -50, 0.01]);
	expect(placement.canPlace).toBe(true);
});

test('obstacle preview is unavailable when the card is deselected or depleted', () => {
	const game = Object.create(Game.prototype) as any;
	game.gameManager = { rollOverMeshes: new Map() };
	const plane = { point: new THREE.Vector3() };

	GameConfig.setValue('tokenCard', {
		key: 'trap_001_crate',
		count: 2,
		selected: false
	});
	expect(game.getObstaclePlacement(plane)).toBeNull();

	GameConfig.setValue('tokenCard', {
		key: 'trap_001_crate',
		count: 0,
		selected: true
	});
	expect(game.getObstaclePlacement(plane)).toBeNull();
});

test('obstacle preview is unavailable while trap selection disables tokens', () => {
	const game = Object.create(Game.prototype) as any;
	game.gameManager = { rollOverMeshes: new Map() };
	GameConfig.setValue('tokenCard', {
		key: 'trap_001_crate',
		count: 2,
		selected: true
	});
	GameConfig.setValue('tokensDisabled', true);

	expect(game.getObstaclePlacement({ point: new THREE.Vector3() })).toBeNull();
});

test('obstacle preview is unavailable while the token is cooling down', () => {
	const game = Object.create(Game.prototype) as any;
	game.gameManager = { rollOverMeshes: new Map() };
	GameConfig.setValue('tokenCard', {
		key: 'trap_001_crate',
		count: 2,
		selected: true
	});
	GameConfig.setValue('tokenCooldownRemaining', 4.5);

	expect(game.getObstaclePlacement({ point: new THREE.Vector3() })).toBeNull();
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
	const game = Object.create(Game.prototype) as any;
	Object.assign(game, {
		camera: {},
		cleanedUp: false,
		pointer: new THREE.Vector2(),
		objects: [],
		renderLoopRequested: true,
		renderer: {
			domElement: {
				getBoundingClientRect: () => ({ left: 0, top: 0, width: 100, height: 100 })
			}
		},
		raycaster: {
			setFromCamera: vi.fn(),
			intersectObjects: () => [plane]
		},
		gameManager: {
			addTrap: vi.fn(() => placedTrap)
		},
		handleRoadblockInteraction: () => false,
		getObstaclePlacement: () => ({
			canPlace: true,
			mesh: preview,
			position: placedTrap.position,
			trap: { key: placedTrap.key }
		})
	});
	GameConfig.cameraLock = true;
	GameConfig.state = 'running';
	GameConfig.setValue('tokenCard', {
		key: 'trap_001_crate',
		count: 2,
		selected: true
	});

	game.onPointerDown({ clientX: 50, clientY: 50 });

	expect(GameConfig.totalDeductedCost).toBe(5);
	expect(GameConfig.tokenCooldownDuration).toBe(5);
	expect(GameConfig.tokenCooldownRemaining).toBe(5);
	expect(GameConfig.tokenCard.count).toBe(1);
	expect(preview.visible).toBe(false);

	game.onPointerDown({ clientX: 50, clientY: 50 });
	expect(game.gameManager.addTrap).toHaveBeenCalledOnce();
	expect(GameConfig.totalDeductedCost).toBe(5);
	expect(GameConfig.tokenCard.count).toBe(1);
});

test('token cooldown decreases with scaled game time and stops at zero', () => {
	const gameManager = Object.create(GameManager.prototype) as any;
	Object.assign(gameManager, {
		countdownManager: { update: vi.fn() },
		traps: new Map(),
		enemiesOnMap: []
	});
	GameConfig.setValue('tokenCooldownDuration', 5);
	GameConfig.setValue('tokenCooldownRemaining', 5);

	gameManager.update(1.25);
	expect(GameConfig.tokenCooldownRemaining).toBe(3.75);

	gameManager.update(10);
	expect(GameConfig.tokenCooldownRemaining).toBe(0);
});

test('game render loop suspends while hidden and resumes without a hidden-tab delta', () => {
	const setAnimationLoop = vi.fn();
	const getDelta = vi.fn();
	const game = Object.create(Game.prototype) as any;
	Object.assign(game, {
		renderer: { setAnimationLoop },
		clock: { getDelta },
		renderLoopRequested: true,
		isDocumentHidden: () => true
	});

	game.onVisibilityChange();
	expect(setAnimationLoop).toHaveBeenLastCalledWith(null);

	game.isDocumentHidden = () => false;
	game.onVisibilityChange();
	expect(getDelta).toHaveBeenCalledOnce();
	expect(setAnimationLoop).toHaveBeenLastCalledWith(expect.any(Function));
});

test('a stopped game stays stopped when its tab becomes visible', () => {
	const setAnimationLoop = vi.fn();
	const game = Object.create(Game.prototype) as any;
	Object.assign(game, {
		renderer: { setAnimationLoop },
		clock: { getDelta: vi.fn() },
		renderLoopRequested: false,
		isDocumentHidden: () => false
	});

	game.onVisibilityChange();
	expect(setAnimationLoop).not.toHaveBeenCalled();
});

test('future obstacle events replay after seeking behind them', () => {
	const game = Object.create(Game.prototype) as any;
	const applyObstacleEvent = vi.fn();
	Object.assign(game, {
		config: { token_cards: [{ key: 'trap_001_crate', count: 2 }] },
		gameManager: { applyObstacleEvent },
		obstacleEvents: [
			{
				action: 'place',
				time: 300,
				position: { row: 4, col: 11 },
				trapKey: 'trap_001_crate',
				placementId: 'obstacle-1'
			}
		],
		obstacleReplayIndex: 0
	});
	GameConfig.setValue('tokenCard', {
		key: 'trap_001_crate',
		count: 2,
		selected: true
	});

	game.setObstacleReplayTime(200);
	game.replayObstacleEventsThrough(299.9);
	expect(applyObstacleEvent).not.toHaveBeenCalled();

	game.replayObstacleEventsThrough(300);
	expect(applyObstacleEvent).toHaveBeenCalledOnce();
	expect(applyObstacleEvent).toHaveBeenCalledWith(game.obstacleEvents[0]);
	expect(GameConfig.totalDeductedCost).toBe(5);
	expect(GameConfig.tokenCard.count).toBe(1);
	expect(GameConfig.tokenCooldownRemaining).toBe(5);
});

test('an invalid obstacle preview remains visible and semi-transparent', () => {
	const game = Object.create(Game.prototype) as any;
	const sharedMaterial = new THREE.MeshBasicMaterial({ opacity: 0.8 });
	const previewMaterialOwner = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), sharedMaterial);
	const preview = new THREE.Group();
	preview.visible = false;
	preview.add(previewMaterialOwner);

	game.setRollOverPlacementValidity(preview, false);

	const previewMaterial = previewMaterialOwner.material as THREE.MeshBasicMaterial;
	expect(preview.visible).toBe(true);
	expect(previewMaterial).not.toBe(sharedMaterial);
	expect(previewMaterial.opacity).toBeCloseTo(0.36);
	expect(previewMaterial.transparent).toBe(true);
	expect(previewMaterial.depthWrite).toBe(false);
	expect(sharedMaterial.opacity).toBe(0.8);
	expect(sharedMaterial.transparent).toBe(false);

	game.setRollOverPlacementValidity(preview, true);
	expect(previewMaterial.opacity).toBe(0.8);
	expect(previewMaterial.transparent).toBe(false);
	expect(previewMaterial.depthWrite).toBe(true);
});

test('selecting a roadblock shows an unskewed selection frame and escape button', () => {
	vi.spyOn(THREE.TextureLoader.prototype, 'load').mockImplementation(() => new THREE.Texture());
	const scene = new THREE.Scene();
	const objects: THREE.Object3D[] = [];
	const trap = Object.create(Trap.prototype) as any;
	Object.assign(trap, {
		gameManager: {
			game: { objects, hideRollOverMesh: vi.fn() },
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
	expect(trap.gameManager.game.hideRollOverMesh).toHaveBeenCalledOnce();

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
			game: { objects, hideRollOverMesh: vi.fn() },
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
	GameConfig.scaledElapsedTime = 3.5;
	const game = Object.create(Game.prototype) as any;
	game.objects = [];

	const handled = game.handleRoadblockInteraction([
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
	]);

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
	const game = Object.create(Game.prototype) as any;
	game.objects = [{ userData: { trap: roadblock } }, { userData: { enemy: otherEnemy } }];

	const handled = game.handleRoadblockInteraction([{ object: { userData: { trap: roadblock } } }]);

	expect(handled).toBe(true);
	expect(roadblock.onSelect).toHaveBeenCalledOnce();
	expect(roadblock.onDeselect).not.toHaveBeenCalled();
	expect(otherEnemy.onDeselect).toHaveBeenCalledOnce();
});
