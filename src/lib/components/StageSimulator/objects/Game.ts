import * as THREE from 'three';
import type { Enemy as EnemyType, MapConfig, Position } from '$lib/types';
import { GameMap } from './GameMap';
import { SpawnManager } from './SpawnManager';
import { GameConfig } from './GameConfig';
import { GameManager } from './GameManager';
import { writable } from 'svelte/store';
import { clearObjects } from '$lib/functions/threejsHelpers';
import {
	obstacleEventStore,
	type ObstacleEvent,
	type ObstacleEventSnapshot
} from '../stores/obstacleEvents';
import trapLookup from '$lib/data/trap/traps.json';

export class Game {
	canvas: HTMLCanvasElement;
	scene: THREE.Scene;
	camera: THREE.OrthographicCamera;
	pointer: THREE.Vector2;
	objects;
	raycaster: THREE.Raycaster;
	clock: THREE.Clock;
	renderer: THREE.WebGLRenderer;
	map: GameMap;
	spawnManager: SpawnManager;
	config;
	waveData;
	enemies: any[];
	state = writable('load');
	gameManager: GameManager;
	isDragging = false;
	previousMousePosition = { x: 0, y: 0 };
	unsubscribeTokenCard: () => void = () => undefined;
	unsubscribeObstacleEvents: () => void = () => undefined;
	obstacleEvents: ObstacleEvent[] = [];
	obstacleReplayIndex = 0;
	renderLoopRequested = false;
	private cleanedUp = false;
	placementPlane: THREE.Object3D | null = null;
	private pendingTokenPointer: { clientX: number; clientY: number; overCanvas: boolean } | null =
		null;
	private lastHoveredGridKey: string | null = null;

	constructor(canvasElement: HTMLCanvasElement, config: MapConfig, waveData, enemies: EnemyType[]) {
		this.canvas = canvasElement;
		this.config = config;
		this.waveData = waveData;
		this.enemies = enemies;
		this.objects = [];
		GameConfig.setValue('levelId', config.levelId);
		obstacleEventStore.reset(config.levelId);
		GameConfig.setValue('steeringEnabled', config.steeringEnabled ?? true);
		GameConfig.setValue('tokensDisabled', false);
		GameConfig.setValue('totalDeductedCost', 0);
		GameConfig.setValue('tokenCooldownDuration', 0);
		GameConfig.setValue('tokenCooldownRemaining', 0);
		GameConfig.setValue('isPaused', false);
		GameConfig.setValue('tokenCard', null);
		if (config.token_cards?.length > 0) {
			const card = config.token_cards.find((ele) => ele.key === 'trap_001_crate');
			card && GameConfig.setValue('tokenCard', { ...card, selected: true });
		}
		this.onWindowResize = this.onWindowResize.bind(this);
		this.onPointerMove = this.onPointerMove.bind(this);
		this.onPointerDown = this.onPointerDown.bind(this);
		this.onPointerUp = this.onPointerUp.bind(this);
		this.onVisibilityChange = this.onVisibilityChange.bind(this);
		// threejs
		const frustumSize = GameConfig.FrustumSize;
		const rect = this.canvas.getBoundingClientRect();
		const aspect = rect.width / rect.height;
		this.camera = new THREE.OrthographicCamera(
			(frustumSize * aspect) / -2, // left
			(frustumSize * aspect) / 2, // right
			frustumSize / 2, // top
			frustumSize / -2, // bottom
			1, // near
			1500 // far
		);
		this.scene = new THREE.Scene();
		// this.scene.background = new THREE.Color(0xf0f0f0);
		this.camera.position.set(0, -300, 800);
		this.camera.lookAt(0, 0, 0);
		this.camera.rotation.x = 0.4; // Tilt up slightly

		this.raycaster = new THREE.Raycaster();
		this.pointer = new THREE.Vector2();

		this.initLights();
		this.initCamera();
		this.clock = new THREE.Clock();
		this.renderer = new THREE.WebGLRenderer({
			canvas: this.canvas,
			antialias: true
		});
		this.renderer.setClearColor(0x000000, 0);
		this.renderer.setPixelRatio(window.devicePixelRatio);
		this.renderer.setSize(rect.width, rect.height);
		window.addEventListener('resize', this.onWindowResize);
		document.addEventListener('pointermove', this.onPointerMove);
		document.addEventListener('pointerup', this.onPointerUp);
		document.addEventListener('visibilitychange', this.onVisibilityChange);
		canvasElement.addEventListener('pointerdown', this.onPointerDown);
		this.gameManager = new GameManager(config, this, enemies);
		this.map = new GameMap(this.gameManager);
		this.spawnManager = new SpawnManager(waveData, this.map, this.gameManager);
		this.unsubscribeTokenCard = GameConfig.subscribe(
			'tokenCard',
			(card: { selected?: boolean } | null) => {
				if (!card?.selected) this.hideRollOverMesh();
			}
		);
		this.unsubscribeObstacleEvents = obstacleEventStore.subscribe((snapshot) => {
			this.setObstacleEvents(snapshot);
		});

		this.startRenderLoop();
	}
	private isDocumentHidden() {
		return typeof document !== 'undefined' && document.hidden;
	}
	private startRenderLoop() {
		this.renderLoopRequested = true;
		if (this.isDocumentHidden()) return;
		this.clock.getDelta();
		this.renderer?.setAnimationLoop(() => this.render());
	}
	private onVisibilityChange() {
		if (this.isDocumentHidden()) {
			this.renderer?.setAnimationLoop(null);
			return;
		}
		if (!this.renderLoopRequested) return;
		this.clock.getDelta();
		this.renderer?.setAnimationLoop(() => this.render());
	}
	initLights() {
		if (!this.scene) return;
		// lights
		const ambientLight = new THREE.AmbientLight(0xcccccc, 3);
		this.scene.add(ambientLight);

		const directionalLight = new THREE.DirectionalLight(0xffffff, 3);
		directionalLight.position.set(-1, 1, 1).normalize();
		this.scene.add(directionalLight);
	}
	stop() {
		GameConfig.state = 'stop';
		GameConfig.setValue('isPaused', true);
		this.renderLoopRequested = false;
		this.renderer?.setAnimationLoop(null);
	}

	reset(config, waveData, enemies) {
		this.config = config;
		this.waveData = waveData;
		this.enemies = enemies;
		this.softReset();
	}
	softReset(resetWaveIndex = true) {
		if (this.cleanedUp) return;
		if (this.config.levelId !== GameConfig.levelId) {
			GameConfig.setValue('levelId', this.config.levelId);
			GameConfig.setValue('stagePhaseIndex', 0);
			GameConfig.setValue('currentWaveIndex', 0);
		}
		if (!(this.config.levelId.includes('_d-') && GameConfig.stagePhaseIndex === 0)) {
			this.stop();
		}
		switch (this.config.levelId) {
			case 'level_rogue4_b-7':
				resetWaveIndex &&
					GameConfig.setValue('currentWaveIndex', GameConfig.stagePhaseIndex === 0 ? 0 : 2);
				break;
			case 'level_rogue4_b-8':
				resetWaveIndex &&
					GameConfig.setValue(
						'currentWaveIndex',
						GameConfig.stagePhaseIndex === 0 ? 1 : GameConfig.stagePhaseIndex === 1 ? 3 : 5
					);
				break;
			default:
				if (resetWaveIndex) {
					GameConfig.setValue('stagePhaseIndex', 0);
					GameConfig.setValue('currentWaveIndex', 0);
				}
		}

		GameConfig.setValue('scaledElapsedTime', 0);
		GameConfig.setValue('waveElapsedTime', 0);
		obstacleEventStore.reset(this.config.levelId);
		GameConfig.setValue('steeringEnabled', this.config.steeringEnabled ?? true);
		GameConfig.setValue('tokensDisabled', false);
		GameConfig.setValue('totalDeductedCost', 0);
		GameConfig.setValue('tokenCooldownDuration', 0);
		GameConfig.setValue('tokenCooldownRemaining', 0);
		GameConfig.setValue('isPaused', false);
		GameConfig.setValue('tokenCard', null);
		if (this.config.token_cards?.length > 0) {
			const card = this.config.token_cards.find((ele) => ele.key === 'trap_001_crate');
			card && GameConfig.setValue('tokenCard', { ...card, selected: true });
		}
		this.gameManager.clearSceneObjects();
		this.objects = [];
		this.placementPlane = null;
		this.pendingTokenPointer = null;
		this.lastHoveredGridKey = null;
		clearObjects(this.scene);
		this.gameManager.reset(this.config, this.enemies);
		this.map = new GameMap(this.gameManager);
		this.spawnManager = new SpawnManager(this.waveData, this.map, this.gameManager);
		this.initLights();
		this.initCamera();
		GameConfig.state = 'ready';
		this.startRenderLoop();
	}
	initCamera() {
		if (!this.camera) return;
		let x = 0;
		switch (this.config.levelId) {
			case 'level_rogue4_d-1':
			case 'level_rogue4_d-2':
			case 'level_rogue4_d-3':
			case 'level_rogue4_d-b':
			case 'level_rogue5_d-1':
			case 'level_rogue5_d-2':
			case 'level_rogue5_d-3':
			case 'level_rogue5_d-4':
			case 'level_rogue6_d-1':
			case 'level_rogue6_d-2':
				switch (GameConfig.stagePhaseIndex) {
					case 0:
						x = -450;
						break;
					case 1:
						x = 450;
				}
				break;
			case 'level_rogue4_b-7':
				switch (GameConfig.stagePhaseIndex) {
					case 0:
						x = -600;
						break;
					case 1:
						x = 800;
				}
				break;
			case 'level_rogue4_b-8':
				switch (GameConfig.stagePhaseIndex) {
					case 0:
						x = -1300;
						break;
					case 1:
						x = 0;
						break;
					case 2:
						x = 1250;
						break;
				}
				break;
			default:
				break;
		}
		this.camera.position.x = x;
		const target = new THREE.Vector3(x, 38, 0);
		this.camera.lookAt(target);
	}
	onWindowResize() {
		const mql = window.matchMedia('(max-width:768px)');
		let width, height;
		if (mql.matches) {
			width = window.innerWidth - 24;
			height = window.innerHeight * 0.5;
		} else {
			width = Math.min(1200, window.innerWidth) - 48;
			height = (window.innerHeight * 2) / 3;
		}
		const aspect = width / height;
		const frustumSize = GameConfig.FrustumSize;
		this.camera.left = (frustumSize * aspect) / -2;
		this.camera.right = (frustumSize * aspect) / 2;
		this.camera.top = frustumSize / 2;
		this.camera.bottom = frustumSize / -2;
		this.camera.updateProjectionMatrix();
		this.renderer.setSize(width, height);
		this.render();
	}
	hideRollOverMesh() {
		this.lastHoveredGridKey = null;
		const key = GameConfig.tokenCard?.key;
		const mesh = key ? this.gameManager.rollOverMeshes.get(key)?.getMesh() : null;
		if (mesh) mesh.visible = false;
	}

	setRollOverPlacementValidity(mesh: THREE.Object3D, canPlace: boolean) {
		mesh.visible = true;
		if (mesh.userData.rollOverCanPlace === canPlace) return;
		mesh.userData.rollOverCanPlace = canPlace;
		mesh.traverse((object) => {
			const renderable = object as THREE.Mesh;
			if (!renderable.material) return;

			if (!object.userData.rollOverMaterialsCloned) {
				renderable.material = Array.isArray(renderable.material)
					? renderable.material.map((material) => material.clone())
					: renderable.material.clone();
				object.userData.rollOverMaterialsCloned = true;
			}

			const materials = Array.isArray(renderable.material)
				? renderable.material
				: [renderable.material];
			for (const material of materials) {
				if (material.userData.rollOverOriginalOpacity === undefined) {
					material.userData.rollOverOriginalOpacity = material.opacity;
					material.userData.rollOverOriginalTransparent = material.transparent;
					material.userData.rollOverOriginalDepthWrite = material.depthWrite;
				}
				material.opacity = canPlace
					? material.userData.rollOverOriginalOpacity
					: material.userData.rollOverOriginalOpacity * 0.45;
				material.transparent = canPlace ? material.userData.rollOverOriginalTransparent : true;
				material.depthWrite = canPlace ? material.userData.rollOverOriginalDepthWrite : false;
			}
		});
	}

	getObstaclePlacement(plane: THREE.Intersection, gridKey?: string) {
		const card = GameConfig.tokenCard;
		if (
			GameConfig.tokensDisabled ||
			GameConfig.tokenCooldownRemaining > 0 ||
			!card?.selected ||
			card.count <= 0
		) {
			return null;
		}

		const trap = this.gameManager.rollOverMeshes.get(card.key);
		const mesh = trap?.getMesh();
		if (!trap || !mesh) return null;

		const placementGridKey = gridKey ?? this.gameManager.getGridPosFromVectors(plane.point);
		const [col, row] = placementGridKey.split(',').map(Number);
		const position: Position = { row, col };
		const { x, y } = this.gameManager.getVectorCoordinates(position, null);
		mesh.position.set(x, y, 0.01);

		return {
			canPlace: this.gameManager.canPlaceRoadblock(position),
			mesh,
			position,
			trap
		};
	}

	private processTokenPointerMove() {
		const pointer = this.pendingTokenPointer;
		this.pendingTokenPointer = null;
		if (!pointer) return;

		if (!pointer.overCanvas || GameConfig.tokensDisabled || !GameConfig.tokenCard?.selected) {
			this.hideRollOverMesh();
			return;
		}

		const rect = this.renderer.domElement.getBoundingClientRect();
		this.pointer.set(
			((pointer.clientX - rect.left) / rect.width) * 2 - 1,
			-((pointer.clientY - rect.top) / rect.height) * 2 + 1
		);
		this.raycaster.setFromCamera(this.pointer, this.camera);

		const plane = this.placementPlane;
		if (!plane) {
			this.hideRollOverMesh();
			return;
		}
		const intersection = this.raycaster.intersectObject(plane, false)[0];
		if (!intersection) {
			this.hideRollOverMesh();
			return;
		}

		const gridKey = this.gameManager.getGridPosFromVectors(intersection.point);
		const placement = this.getObstaclePlacement(intersection, gridKey);
		if (!placement) {
			this.hideRollOverMesh();
			return;
		}
		const placementUnchanged =
			gridKey === this.lastHoveredGridKey &&
			placement.mesh.userData.rollOverCanPlace === placement.canPlace;
		this.lastHoveredGridKey = gridKey;
		if (placementUnchanged) return;
		this.setRollOverPlacementValidity(placement.mesh, placement.canPlace);
	}

	onPointerMove(event) {
		if (!this.renderLoopRequested || this.cleanedUp) return;
		if (!GameConfig.cameraLock) {
			this.hideRollOverMesh();
			if (!this.isDragging) return;
			const deltaMove = {
				x: event.clientX - this.previousMousePosition.x,
				y: event.clientY - this.previousMousePosition.y
			};

			// Convert mouse movement to world space (adjust sensitivity as needed)
			const sensitivity = 1;
			this.camera.position.x -= deltaMove.x * sensitivity;
			// Update the camera target (lookAt point) to maintain orientation
			const target = new THREE.Vector3(
				this.camera.position.x,
				38, // Adjust based on your original lookAt
				0
			);
			this.camera.lookAt(target);

			this.previousMousePosition = {
				x: event.clientX,
				y: event.clientY
			};
			return;
		}

		this.pendingTokenPointer = {
			clientX: event.clientX,
			clientY: event.clientY,
			overCanvas: event.target === this.canvas
		};
	}
	onPointerDown(event) {
		if (!this.renderLoopRequested || this.cleanedUp) return;
		if (!GameConfig.cameraLock) {
			this.isDragging = true;
			this.previousMousePosition = {
				x: event.clientX,
				y: event.clientY
			};
		}
		const rect = this.renderer.domElement.getBoundingClientRect(); // Get canvas size and position
		this.pointer.set(
			((event.clientX - rect.left) / rect.width) * 2 - 1,
			-((event.clientY - rect.top) / rect.height) * 2 + 1
		);
		if (['reset', 'loading', 'stop'].includes(GameConfig.state)) {
			return;
		}
		if (GameConfig.state === 'ready') {
			return (GameConfig.state = 'running');
		}

		this.raycaster.setFromCamera(this.pointer, this.camera);
		const intersects = this.raycaster.intersectObjects(this.objects, false);

		if (intersects.length > 0) {
			if (this.handleRoadblockInteraction(intersects)) return;
			const intersect = intersects[0];
			const plane = intersects.find((ele) => ele?.object?.userData?.name === 'plane');

			if (plane && !GameConfig.tokensDisabled && GameConfig.tokenCard?.selected) {
				const placement = this.getObstaclePlacement(plane);
				if (!placement?.canPlace) {
					if (placement) {
						this.setRollOverPlacementValidity(placement.mesh, false);
					} else {
						this.hideRollOverMesh();
					}
					return;
				}
				if (GameConfig.tokenCooldownRemaining > 0) return;

				const card = GameConfig.tokenCard;
				const placedTrap = this.gameManager.addTrap(
					{
						key: placement.trap.key,
						direction: 'UP',
						pos: placement.position
					},
					null,
					'world'
				);
				if (!placedTrap) {
					this.setRollOverPlacementValidity(placement.mesh, false);
					return;
				}
				placedTrap.userPlacementId = obstacleEventStore.recordPlacement(
					GameConfig.scaledElapsedTime,
					placement.position,
					placedTrap.key
				);
				placement.mesh.visible = false;
				const tokenStats = placedTrap.data?.stats?.[0] ?? placement.trap.data?.stats?.[0];
				const tokenCost = Number(card.cost ?? tokenStats?.cost ?? 5);
				const cooldownDuration = Math.max(0, Number(tokenStats?.respawnTime ?? 0));
				GameConfig.setValue('totalDeductedCost', GameConfig.totalDeductedCost + tokenCost);
				GameConfig.setValue('tokenCooldownDuration', cooldownDuration);
				GameConfig.setValue('tokenCooldownRemaining', cooldownDuration);

				const remainingCount = Math.max(0, card.count - 1);
				GameConfig.setValue(
					'tokenCard',
					remainingCount > 0 ? { ...card, count: remainingCount } : null
				);
				return;
			}
			if (intersect?.object?.userData?.enemy) {
				const enemy = intersect?.object?.userData?.enemy;
				if (enemy.selected) {
					if (enemy.pathVisualisationStage === 'static') {
						enemy.startAnimatedPathVisualisation();
					} else {
						enemy.onDeselect();
					}
				} else {
					enemy.onSelect();
				}
			}
			if (intersect?.object?.userData?.trap) {
				const trap = intersect.object.userData.trap;
				if (trap.selected) {
					trap.activateBranch();
				} else {
					trap.onSelect();
				}
			}

			const selectableObjects = this.objects.filter(
				(ele) => ele.userData.enemy || ele.userData.trap
			);
			selectableObjects.forEach((ele) => {
				if (ele.uuid !== intersect.object.uuid) {
					(ele.userData.enemy || ele.userData.trap).onDeselect();
				}
			});
		}
	}

	private handleRoadblockInteraction(intersects: THREE.Intersection[]) {
		const removeIntersection = intersects.find(
			(intersection) => intersection.object.userData.roadblockRemove
		);
		if (removeIntersection) {
			const roadblock = removeIntersection.object.userData.roadblockRemove;
			obstacleEventStore.recordRemoval(
				GameConfig.scaledElapsedTime,
				roadblock.position,
				roadblock.key,
				roadblock.userPlacementId
			);
			roadblock.remove();
			return true;
		}

		const roadblockIntersection = intersects.find(
			(intersection) => intersection.object.userData.trap?.isRoadblock
		);
		if (!roadblockIntersection) return false;
		const roadblock = roadblockIntersection.object.userData.trap;
		roadblock.onSelect();
		for (const object of this.objects) {
			const selectable = object.userData.enemy || object.userData.trap;
			if (selectable && selectable !== roadblock) selectable.onDeselect();
		}
		return true;
	}

	private setObstacleEvents(snapshot: ObstacleEventSnapshot) {
		this.obstacleEvents = snapshot.events.map((event) => ({
			...event,
			position: { ...event.position }
		}));
		this.updateObstacleReplayIndex(GameConfig.scaledElapsedTime);
	}

	setObstacleReplayTime(time: number) {
		this.updateObstacleReplayIndex(time);
		this.syncTokenStateAt(time);
	}

	private updateObstacleReplayIndex(time: number) {
		this.obstacleReplayIndex = this.obstacleEvents.findIndex((event) => event.time > time);
		if (this.obstacleReplayIndex === -1) this.obstacleReplayIndex = this.obstacleEvents.length;
	}

	private syncTokenStateAt(time: number) {
		const initialCard = (this.config as any).token_cards?.find(
			(card: { key: string; count: number; cost?: number }) => card.key === 'trap_001_crate'
		);
		if (!initialCard) return;
		const placements = this.obstacleEvents.filter(
			(event) => event.action === 'place' && event.time <= time
		);
		const trapData = (trapLookup as Record<string, any>)[initialCard.key];
		const stats = trapData?.stats?.[0];
		const cost = Number(initialCard.cost ?? stats?.cost ?? 5);
		const cooldownDuration = Math.max(0, Number(stats?.respawnTime ?? 0));
		const latestPlacement = placements[placements.length - 1];
		const cooldownRemaining = latestPlacement
			? Math.max(0, cooldownDuration - (time - latestPlacement.time))
			: 0;
		const currentCard = GameConfig.tokenCard as { selected?: boolean } | null;
		const count = Math.max(0, initialCard.count - placements.length);

		GameConfig.setValue('totalDeductedCost', placements.length * cost);
		GameConfig.setValue('tokenCooldownDuration', cooldownDuration);
		GameConfig.setValue('tokenCooldownRemaining', cooldownRemaining);
		GameConfig.setValue(
			'tokenCard',
			count > 0 ? { ...initialCard, count, selected: currentCard?.selected ?? true } : null
		);
	}

	private replayObstacleEventsThrough(time: number) {
		let replayed = false;
		while (
			this.obstacleReplayIndex < this.obstacleEvents.length &&
			this.obstacleEvents[this.obstacleReplayIndex].time <= time
		) {
			const event = this.obstacleEvents[this.obstacleReplayIndex];
			this.gameManager.applyObstacleEvent(event);
			this.obstacleReplayIndex++;
			replayed = true;
		}
		if (replayed) this.syncTokenStateAt(time);
	}
	onPointerUp() {
		this.isDragging = false;
	}
	render() {
		if (!this.renderLoopRequested || this.cleanedUp || this.isDocumentHidden()) return;
		const frameDelta = this.clock.getDelta();
		const deltaTime = frameDelta * GameConfig.speedFactor;
		if (
			this.config.levelId.includes('_d-') &&
			GameConfig.stagePhaseIndex === 0 &&
			!GameConfig.isPaused
		) {
			this.spawnManager.update(deltaTime);
			this.gameManager.update(deltaTime);
		} else {
			if (
				(GameConfig.state === 'running' && !GameConfig.isPaused) ||
				GameConfig.scaledElapsedTime < 0.4
			) {
				this.spawnManager.update(deltaTime);
				this.gameManager.update(deltaTime);
			} else {
				GameConfig.setValue('isPaused', true);
			}
		}
		this.replayObstacleEventsThrough(GameConfig.scaledElapsedTime);
		this.gameManager.enemiesOnMap.forEach((enemy) => enemy.updatePathVisualisation(frameDelta));
		this.processTokenPointerMove();

		if (this.spawnManager.isFinished && this.gameManager.noEnemyAlive) {
			GameConfig.state = 'end';
		}
		this.renderer.render(this.scene, this.camera);
	}

	cleanup() {
		if (this.cleanedUp) return;
		this.cleanedUp = true;
		this.stop();
		this.unsubscribeTokenCard();
		this.unsubscribeObstacleEvents();
		window.removeEventListener('resize', this.onWindowResize);
		this.canvas.removeEventListener('pointerdown', this.onPointerDown);
		document.removeEventListener('pointermove', this.onPointerMove);
		document.removeEventListener('pointerup', this.onPointerUp);
		document.removeEventListener('visibilitychange', this.onVisibilityChange);

		this.spawnManager?.dispose();
		this.map.enemies = [];
		this.map.objects = [];
		this.gameManager?.clearSceneObjects();
		this.gameManager?.countdownManager.releaseAssets();
		this.objects = [];
		this.placementPlane = null;
		this.pendingTokenPointer = null;
		this.lastHoveredGridKey = null;
		this.obstacleEvents = [];
		if (this.scene) {
			clearObjects(this.scene);
		}
		if (this.renderer) {
			this.renderer.renderLists.dispose();
			this.renderer.dispose();
			this.renderer.forceContextLoss();
		}
		GameConfig.setValue('scaledElapsedTime', 0);
		GameConfig.setValue('waveElapsedTime', 0);
		GameConfig.setValue('tokensDisabled', false);
		GameConfig.setValue('totalDeductedCost', 0);
		GameConfig.setValue('tokenCooldownDuration', 0);
		GameConfig.setValue('tokenCooldownRemaining', 0);
		GameConfig.setValue('tokenCard', null);
		obstacleEventStore.reset();

		this.scene = null;
		this.camera = null;
		this.renderer = null;
	}
}
