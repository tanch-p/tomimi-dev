import type { SimulationScenario } from './SimulationSession';
import { GameInputController } from '../controllers/GameInputController';
import { GameWorld } from './GameWorld';
import { SimulationSession } from './SimulationSession';
import { liveStageRuntime, type StageRuntime } from './StageRuntime';

type RestartOptions = {
	resetWaveIndex?: boolean;
};

export type GameScenario = SimulationScenario;

/** Coordinates browser input, the rendered world, and the mutable simulation session. */
export class Game {
	readonly world: GameWorld;
	readonly session: SimulationSession;
	readonly inputController: GameInputController;
	private cleanedUp = false;

	constructor(
		canvasElement: HTMLCanvasElement,
		scenario: GameScenario,
		runtime: StageRuntime = liveStageRuntime
	) {
		this.world = new GameWorld(canvasElement, runtime);
		this.session = new SimulationSession(scenario, runtime, this.world);
		this.inputController = new GameInputController({
			canvas: canvasElement,
			camera: this.world.camera,
			gameManager: this.session.gameManager,
			runtime,
			obstacleController: this.session.obstacleController,
			getObjects: () => this.world.objects,
			getPlacementPlane: () => this.world.placementPlane,
			isActive: () => this.world.isRenderActive && !this.cleanedUp,
			startSimulation: () => this.session.start()
		});
		this.world.setHideRollOverMeshHandler(() => this.inputController.hideRollOverMesh());
		this.inputController.attach();
		this.startRenderLoop();
	}

	get canvas() {
		return this.world.canvas;
	}

	get scene() {
		return this.world.scene;
	}

	get camera() {
		return this.world.camera;
	}

	get renderer() {
		return this.world.renderer;
	}

	get timer() {
		return this.world.timer;
	}

	get objects() {
		return this.world.objects;
	}

	get placementPlane() {
		return this.world.placementPlane;
	}

	get map() {
		return this.session.map;
	}

	get spawnManager() {
		return this.session.spawnManager;
	}

	get gameManager() {
		return this.session.gameManager;
	}

	get config() {
		return this.session.config;
	}

	get waveData() {
		return this.session.waveData;
	}

	get enemies() {
		return this.session.enemies;
	}

	get runtime() {
		return this.session.runtime;
	}

	get renderLoopRequested() {
		return this.world.isRenderActive;
	}

	stop() {
		this.session.stop();
		this.world.stop();
	}

	replaceScenario(scenario: GameScenario) {
		if (!this.session.replaceScenario(scenario)) return false;
		this.restart();
		return true;
	}

	restart({ resetWaveIndex = true }: RestartOptions = {}) {
		if (this.cleanedUp) return;
		if (this.session.shouldStopBeforeRestart()) this.stop();
		this.inputController.reset();
		this.session.restart(resetWaveIndex);
		this.session.setReady();
		this.startRenderLoop();
	}

	onWindowResize() {
		this.world.onWindowResize();
	}

	hideRollOverMesh() {
		this.inputController.hideRollOverMesh();
	}

	setObstacleReplayTime(time: number) {
		this.session.setObstacleReplayTime(time);
	}

	render(timestamp?: number) {
		if (this.cleanedUp || !this.world.isRenderActive) return;
		const frameDelta = this.world.nextFrame(timestamp);
		this.session.update(frameDelta * this.runtime.speedFactor, frameDelta);
		this.inputController.processPendingPointerMove();
		this.world.draw();
	}

	cleanup() {
		if (this.cleanedUp) return;
		this.cleanedUp = true;
		this.stop();
		this.inputController.detach();
		this.session.dispose();
		this.world.dispose();
	}

	private startRenderLoop() {
		this.world.start((timestamp) => this.render(timestamp));
	}
}
