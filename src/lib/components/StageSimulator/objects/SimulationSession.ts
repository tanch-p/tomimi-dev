import type { Enemy as EnemyType, MapConfig, Wave } from '$lib/types';
import { getStageBehavior, getStagePhaseBehavior } from '../config/stageBehaviors';
import { ObstacleController } from '../controllers/ObstacleController';
import type { GameLifecycleState } from './GameConfig';
import type { GameWorld } from './GameWorld';
import type { GameManager } from './GameManager';
import type { GameMap } from './GameMap';
import { SpawnManager } from './SpawnManager';
import type { StageRuntime } from './StageRuntime';

const READY_WARMUP_SECONDS = 0.4;

export type SimulationScenario = {
	config: MapConfig;
	waveData: Wave[];
	enemies: EnemyType[];
	revision: string;
};

export type SimulationSessionOptions = {
	createSpawnManager?: (waveData: Wave[], map: GameMap, gameManager: GameManager) => SpawnManager;
	createObstacleController?: (
		gameManager: GameManager,
		config: MapConfig,
		runtime: StageRuntime
	) => ObstacleController;
};

/** Owns mutable simulation state independently of the rendered world lifecycle. */
export class SimulationSession {
	config: MapConfig;
	waveData: Wave[];
	enemies: EnemyType[];
	spawnManager: SpawnManager;
	readonly obstacleController: ObstacleController;
	private scenarioRevision: string;
	private disposed = false;
	private readonly createSpawnManager: NonNullable<SimulationSessionOptions['createSpawnManager']>;

	constructor(
		{ config, waveData, enemies, revision }: SimulationScenario,
		readonly runtime: StageRuntime,
		readonly world: GameWorld,
		options: SimulationSessionOptions = {}
	) {
		this.config = config;
		this.waveData = waveData;
		this.enemies = enemies;
		this.scenarioRevision = revision;
		this.createSpawnManager =
			options.createSpawnManager ??
			((nextWaveData, map, gameManager) => new SpawnManager(nextWaveData, map, gameManager));
		this.initializeStageState();
		this.resetRuntimeState();
		const { gameManager, map } = world.build(config, enemies);
		this.spawnManager = this.createSpawnManager(waveData, map, gameManager);
		this.obstacleController = options.createObstacleController
			? options.createObstacleController(gameManager, config, runtime)
			: new ObstacleController(gameManager, config, runtime);
		this.obstacleController.reset(config.levelId);
	}

	get gameManager() {
		return this.world.gameManager;
	}

	get map() {
		return this.world.map;
	}

	replaceScenario({ config, waveData, enemies, revision }: SimulationScenario) {
		if (this.scenarioRevision === revision && this.config === config && this.enemies === enemies) {
			return false;
		}
		this.config = config;
		this.waveData = waveData;
		this.enemies = enemies;
		this.scenarioRevision = revision;
		this.obstacleController.setConfig(config);
		return true;
	}

	shouldStopBeforeRestart() {
		return !getStagePhaseBehavior(this.config.levelId, this.runtime.stagePhaseIndex)
			.advanceWhileReady;
	}

	restart(resetWaveIndex = true) {
		if (this.disposed) return;
		const stageBehavior = getStageBehavior(this.config.levelId);
		this.runtime.batch(() => {
			if (this.config.levelId !== this.runtime.levelId) {
				this.runtime.setValue('levelId', this.config.levelId);
				this.runtime.setValue('stagePhaseIndex', 0);
			}
			if (resetWaveIndex) {
				if (stageBehavior.resetToFirstPhase !== false) {
					this.runtime.setValue('stagePhaseIndex', 0);
				}
				this.runtime.setValue(
					'currentWaveIndex',
					getStagePhaseBehavior(this.config.levelId, this.runtime.stagePhaseIndex).waveIndex
				);
			}
		});

		this.resetRuntimeState();
		this.obstacleController.reset(this.config.levelId);
		this.spawnManager.dispose();
		const { gameManager, map } = this.world.build(this.config, this.enemies);
		this.spawnManager = this.createSpawnManager(this.waveData, map, gameManager);
	}

	start() {
		this.setLifecycleState('running');
		this.setPaused(false);
	}

	stop() {
		this.setLifecycleState('stop');
		this.setPaused(true);
	}

	setReady() {
		this.setLifecycleState('ready');
	}

	update(deltaTime: number, frameDelta: number) {
		if (this.shouldAdvanceSimulation()) {
			this.spawnManager.update(deltaTime);
			this.gameManager.update(deltaTime);
		} else {
			this.setPaused(true);
		}
		this.obstacleController.replayThrough(this.runtime.scaledElapsedTime);
		this.gameManager.enemiesOnMap.forEach((enemy) => enemy.updatePathVisualisation(frameDelta));
		if (this.spawnManager.isFinished && this.gameManager.noEnemyAlive) {
			this.setLifecycleState('end');
		}
	}

	setObstacleReplayTime(time: number) {
		this.obstacleController.setReplayTime(time);
	}

	dispose() {
		if (this.disposed) return;
		this.disposed = true;
		this.obstacleController.dispose();
		this.spawnManager.dispose();
		this.runtime.batch(() => {
			this.runtime.setValue('scaledElapsedTime', 0);
			this.runtime.setValue('waveElapsedTime', 0);
			this.runtime.setValue('tokensDisabled', false);
			this.runtime.setValue('totalDeductedCost', 0);
			this.runtime.setValue('tokenCooldownDuration', 0);
			this.runtime.setValue('tokenCooldownRemaining', 0);
			this.runtime.setValue('tokenCard', null);
		});
		this.obstacleController.reset();
	}

	private initializeStageState() {
		const levelChanged = this.runtime.levelId !== this.config.levelId;
		this.runtime.batch(() => {
			this.runtime.setValue('levelId', this.config.levelId);
			if (levelChanged) {
				this.runtime.setValue('stagePhaseIndex', 0);
				this.runtime.setValue(
					'currentWaveIndex',
					getStagePhaseBehavior(this.config.levelId, 0).waveIndex
				);
			}
		});
	}

	private resetRuntimeState() {
		this.runtime.batch(() => {
			this.runtime.setValue('scaledElapsedTime', 0);
			this.runtime.setValue('waveElapsedTime', 0);
			this.runtime.setValue('steeringEnabled', this.config.steeringEnabled ?? true);
			this.runtime.setValue('tokensDisabled', false);
			this.runtime.setValue('totalDeductedCost', 0);
			this.runtime.setValue('tokenCooldownDuration', 0);
			this.runtime.setValue('tokenCooldownRemaining', 0);
			this.setPaused(false);
			this.runtime.setValue('tokenCard', null);
			const card = this.config.token_cards?.find((item) => item.key === 'trap_001_crate');
			if (card) this.runtime.setValue('tokenCard', { ...card, selected: true });
		});
	}

	private shouldAdvanceSimulation() {
		if (
			getStagePhaseBehavior(this.config.levelId, this.runtime.stagePhaseIndex).advanceWhileReady &&
			!this.runtime.isPaused
		) {
			return true;
		}
		return (
			(this.runtime.state === 'running' && !this.runtime.isPaused) ||
			this.runtime.scaledElapsedTime < READY_WARMUP_SECONDS
		);
	}

	private setLifecycleState(state: GameLifecycleState) {
		this.runtime.setValue('state', state);
	}

	private setPaused(isPaused: boolean) {
		this.runtime.setValue('isPaused', isPaused);
	}
}
