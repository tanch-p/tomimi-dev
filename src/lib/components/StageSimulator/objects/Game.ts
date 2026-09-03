import * as THREE from 'three';
import type { Enemy as EnemyType, MapConfig } from '$lib/types';
import { GameMap } from './GameMap';
import { SpawnManager } from './SpawnManager';
import { GameConfig } from './GameConfig';
import { GameManager } from './GameManager';
import { writable } from 'svelte/store';
import { clearObjects } from '$lib/functions/threejsHelpers';

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

	constructor(canvasElement: HTMLCanvasElement, config: MapConfig, waveData, enemies: EnemyType[]) {
		this.canvas = canvasElement;
		this.config = config;
		this.waveData = waveData;
		this.enemies = enemies;
		this.objects = [];
		GameConfig.setValue('levelId', config.levelId);
		GameConfig.setValue('tokenCard', null);
		if (config.token_cards?.length > 0) {
			const card = config.token_cards.find((ele) => ele.key === 'trap_001_crate');
			card && GameConfig.setValue('tokenCard', { ...card, selected: true });
		}
		this.onWindowResize = this.onWindowResize.bind(this);
		this.onPointerMove = this.onPointerMove.bind(this);
		this.onPointerDown = this.onPointerDown.bind(this);
		this.onPointerUp = this.onPointerUp.bind(this);
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
		canvasElement.addEventListener('pointerdown', this.onPointerDown);
		this.gameManager = new GameManager(config, this, enemies);
		this.map = new GameMap(this.gameManager);
		this.spawnManager = new SpawnManager(waveData, this.map, this.gameManager);

		this.renderer.setAnimationLoop(() => this.render());
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
		this.renderer?.setAnimationLoop(null);
	}

	reset(config, waveData, enemies) {
		this.config = config;
		this.waveData = waveData;
		this.enemies = enemies;
		this.softReset();
	}
	softReset(resetWaveIndex = true) {
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
		GameConfig.setValue('tokenCard', null);
		if (this.config.token_cards?.length > 0) {
			const card = this.config.token_cards.find((ele) => ele.key === 'trap_001_crate');
			card && GameConfig.setValue('tokenCard', card);
		}
		this.objects = [];
		clearObjects(this.scene);
		this.gameManager.reset(this.config, this.enemies);
		this.map = new GameMap(this.gameManager);
		this.spawnManager = new SpawnManager(this.waveData, this.map, this.gameManager);
		this.initLights();
		this.initCamera();
		GameConfig.state = 'ready';
		this.clock.getDelta(); //throwaway last frame due to large timing taken to reset
		this.renderer?.setAnimationLoop(() => this.render());
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
	onPointerMove(event) {
		if (!GameConfig.cameraLock) {
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

		if (!event.target.isSameNode(this.canvas)) {
			return;
		}
		if (!GameConfig.tokenCard || !GameConfig.tokenCard.selected) {
			return;
		}
		const rect = this.renderer.domElement.getBoundingClientRect(); // Get canvas size and position
		this.pointer.set(
			((event.clientX - rect.left) / rect.width) * 2 - 1,
			-((event.clientY - rect.top) / rect.height) * 2 + 1
		);
		this.raycaster.setFromCamera(this.pointer, this.camera);

		const intersects = this.raycaster.intersectObjects(this.objects, false);
		// if (intersects.length > 0) {
		// 	const plane = intersects.find((ele) => ele?.object?.userData?.name === 'plane');
		// 	if (!plane) {
		// 		return;
		// 	}
		// 	const mesh = this.gameManager.rollOverMeshes.get(GameConfig.tokenCard.key)?.getMesh();
		// 	mesh.position.copy(plane.point).add(plane.face.normal);
		// 	const gridPos = this.gameManager.getGridPosFromVectors(mesh.position);
		// 	const tile = this.gameManager.tiles.get(gridPos);
		// 	const trap = this.gameManager.traps.get(gridPos);
		// 	if (tile?.buildableType == 0 || tile?.heightType == 1 || trap) {
		// 		mesh.visible = false;
		// 		return;
		// 	}

		// 	mesh.visible = true;
		// 	this.render();
		// }
	}
	onPointerDown(event) {
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
			const intersect = intersects[0];
			const plane = intersects.find((ele) => ele?.object?.userData?.name === 'plane');

			// if (plane && GameConfig.tokenCard?.selected) {
			// 	const trap = this.gameManager.rollOverMeshes.get(GameConfig.tokenCard.key);
			// 	const mesh = trap.getMesh();
			// 	mesh.position.copy(plane.point).add(plane.face.normal);
			// 	mesh.position
			// 		.divideScalar(GameConfig.gridSize)
			// 		.floor()
			// 		.multiplyScalar(GameConfig.gridSize)
			// 		.addScalar(50);
			// 	mesh.position.z = 0.01;
			// 	const { x, y } = mesh.position;
			// 	const tile = this.gameManager.tiles.get(gridPos);
			// 	const placedTrap = this.gameManager.traps.get(gridPos);
			// 	const [col, row] = gridPos.split(',');
			// 	if (tile?.buildableType == 0 || tile.heightType == 1 || placedTrap) {
			// 		mesh.visible = false;
			// 	} else {
			// 		this.gameManager.addTrap(
			// 			{
			// 				key: trap.key,
			// 				direction: 'UP',
			// 				pos: { row, col }
			// 			},
			// 			null,
			// 			'world'
			// 		);
			// 		GameConfig.setValue('tokenCard', {
			// 			...GameConfig.tokenCard,
			// 			count: GameConfig.tokenCard.count - 1
			// 		});
			// 		if (GameConfig.tokenCard.count === 0) {
			// 			GameConfig.setValue('tokenCard', null);
			// 		}
			// 		return;
			// 	}
			// }
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
	onPointerUp() {
		this.isDragging = false;
	}
	render() {
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
		this.gameManager.enemiesOnMap.forEach((enemy) => enemy.updatePathVisualisation(frameDelta));

		if (this.spawnManager.isFinished && this.gameManager.noEnemyAlive) {
			GameConfig.state = 'end';
		}
		this.renderer.render(this.scene, this.camera);
	}

	cleanup() {
		if (this.renderer) {
			this.renderer.setAnimationLoop(null);
		}
		this.renderer?.dispose();

		if (this.scene) {
			clearObjects(this.scene);
		}
		GameConfig.setValue('scaledElapsedTime', 0);
		GameConfig.setValue('waveElapsedTime', 0);

		this.scene = null;
		this.camera = null;
		this.renderer = null;

		window.removeEventListener('resize', this.onWindowResize);
		this.canvas.removeEventListener('pointerdown', this.onPointerDown);
		document.removeEventListener('pointermove', this.onPointerMove);
		document.removeEventListener('pointerup', this.onPointerUp);
	}
}
