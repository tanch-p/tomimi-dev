import * as THREE from 'three';
import type { Enemy as EnemyType, MapConfig, StatMods } from '$lib/types';
import { EMPTY_STAT_MODS } from '$lib/functions/statHelpers';
import { clearObjects } from '$lib/functions/threejsHelpers';
import { getStagePhaseBehavior } from '../config/stageBehaviors';
import { GameManager } from './GameManager';
import { GameMap } from './GameMap';
import type { StageRuntime } from './StageRuntime';

export type GameWorldOptions = {
	renderer?: THREE.WebGLRenderer;
	timer?: THREE.Timer;
	windowTarget?: Window;
	documentTarget?: Document;
};

/** Owns the rendered world and all browser/Three.js lifecycle concerns. */
export class GameWorld {
	readonly canvas: HTMLCanvasElement;
	readonly scene: THREE.Scene;
	readonly camera: THREE.OrthographicCamera;
	readonly renderer: THREE.WebGLRenderer;
	readonly timer: THREE.Timer;
	objects: THREE.Object3D[] = [];
	placementPlane: THREE.Object3D | null = null;
	gameManager!: GameManager;
	map!: GameMap;

	private readonly windowTarget: Window;
	private readonly documentTarget: Document;
	private renderFrame: ((timestamp?: number) => void) | null = null;
	private hideRollOverMeshHandler: () => void = () => undefined;
	private renderLoopRequested = false;
	private disposed = false;

	constructor(
		canvas: HTMLCanvasElement,
		private readonly runtime: StageRuntime,
		options: GameWorldOptions = {}
	) {
		this.canvas = canvas;
		this.windowTarget = options.windowTarget ?? window;
		this.documentTarget = options.documentTarget ?? document;

		const rect = canvas.getBoundingClientRect();
		const aspect = rect.width / rect.height;
		const frustumSize = runtime.frustumSize;
		this.camera = new THREE.OrthographicCamera(
			(frustumSize * aspect) / -2,
			(frustumSize * aspect) / 2,
			frustumSize / 2,
			frustumSize / -2,
			1,
			1500
		);
		this.camera.position.set(0, -300, 800);
		this.camera.lookAt(0, 0, 0);
		this.camera.rotation.x = 0.4;
		this.scene = new THREE.Scene();
		this.timer = options.timer ?? new THREE.Timer();
		this.renderer =
			options.renderer ??
			new THREE.WebGLRenderer({
				canvas,
				antialias: true
			});
		this.renderer.setClearColor(0x000000, 0);
		this.renderer.setPixelRatio(Math.min(this.windowTarget.devicePixelRatio, 2));
		this.renderer.setSize(rect.width, rect.height);

		this.onWindowResize = this.onWindowResize.bind(this);
		this.onVisibilityChange = this.onVisibilityChange.bind(this);
		this.windowTarget.addEventListener('resize', this.onWindowResize);
		this.documentTarget.addEventListener('visibilitychange', this.onVisibilityChange);
	}

	build(config: MapConfig, enemies: EnemyType[], persistentStatMods: StatMods = EMPTY_STAT_MODS) {
		if (this.gameManager) {
			this.gameManager.clearSceneObjects();
			this.map.enemies = [];
			this.map.objects = [];
		}
		this.resetScene(config.levelId);
		if (this.gameManager) this.gameManager.reset(config, enemies, persistentStatMods);
		else
			this.gameManager = new GameManager(config, this, enemies, this.runtime, persistentStatMods);
		this.map = new GameMap(this.gameManager);
		return { gameManager: this.gameManager, map: this.map };
	}

	setHideRollOverMeshHandler(handler: () => void) {
		this.hideRollOverMeshHandler = handler;
	}

	hideRollOverMesh() {
		this.hideRollOverMeshHandler();
	}

	start(renderFrame: (timestamp?: number) => void) {
		if (this.disposed) return;
		this.renderFrame = renderFrame;
		this.renderLoopRequested = true;
		if (this.isDocumentHidden()) return;
		this.timer.reset();
		this.renderer.setAnimationLoop(renderFrame);
	}

	stop() {
		this.renderLoopRequested = false;
		this.renderer.setAnimationLoop(null);
	}

	get isRenderActive() {
		return this.renderLoopRequested && !this.disposed && !this.isDocumentHidden();
	}

	nextFrame(timestamp?: number) {
		this.timer.update(timestamp);
		return this.timer.getDelta();
	}

	draw() {
		this.renderer.render(this.scene, this.camera);
	}

	configureCamera(levelId: string, phaseIndex = this.runtime.stagePhaseIndex) {
		const { cameraX } = getStagePhaseBehavior(levelId, phaseIndex);
		this.camera.position.x = cameraX;
		this.camera.lookAt(new THREE.Vector3(cameraX, 38, 0));
	}

	onWindowResize() {
		const isMobile = this.windowTarget.matchMedia('(max-width:768px)').matches;
		const width = isMobile
			? this.windowTarget.innerWidth - 24
			: Math.min(1200, this.windowTarget.innerWidth) - 48;
		const height = isMobile
			? this.windowTarget.innerHeight * 0.5
			: (this.windowTarget.innerHeight * 2) / 3;
		const aspect = width / height;
		const frustumSize = this.runtime.frustumSize;
		this.camera.left = (frustumSize * aspect) / -2;
		this.camera.right = (frustumSize * aspect) / 2;
		this.camera.top = frustumSize / 2;
		this.camera.bottom = frustumSize / -2;
		this.camera.updateProjectionMatrix();
		this.renderer.setSize(width, height);
		this.draw();
	}

	onVisibilityChange() {
		if (this.isDocumentHidden()) {
			this.renderer.setAnimationLoop(null);
			return;
		}
		if (!this.renderLoopRequested || !this.renderFrame) return;
		this.timer.reset();
		this.renderer.setAnimationLoop(this.renderFrame);
	}

	dispose() {
		if (this.disposed) return;
		this.disposed = true;
		this.stop();
		this.windowTarget.removeEventListener('resize', this.onWindowResize);
		this.documentTarget.removeEventListener('visibilitychange', this.onVisibilityChange);
		if (this.gameManager) {
			this.gameManager.clearSceneObjects();
			this.gameManager.countdownManager.releaseAssets();
		}
		if (this.map) {
			this.map.enemies = [];
			this.map.objects = [];
		}
		this.objects = [];
		this.placementPlane = null;
		clearObjects(this.scene);
		this.renderer.renderLists.dispose();
		this.renderer.dispose();
		this.renderer.forceContextLoss();
		this.timer.dispose();
		this.renderFrame = null;
		this.hideRollOverMeshHandler = () => undefined;
	}

	private resetScene(levelId: string) {
		this.objects = [];
		this.placementPlane = null;
		clearObjects(this.scene);
		this.addLights();
		this.configureCamera(levelId);
	}

	private addLights() {
		const ambientLight = new THREE.AmbientLight(0xcccccc, 3);
		this.scene.add(ambientLight);
		const directionalLight = new THREE.DirectionalLight(0xffffff, 3);
		directionalLight.position.set(-1, 1, 1).normalize();
		this.scene.add(directionalLight);
	}

	private isDocumentHidden() {
		return this.documentTarget.hidden;
	}
}
