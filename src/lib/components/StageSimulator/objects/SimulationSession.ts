import type { Enemy as EnemyType, MapConfig, StatMods, Wave } from '$lib/types';
import { EMPTY_STAT_MODS } from '$lib/functions/statHelpers';
import { getStageBehavior, getStagePhaseBehavior } from '../config/stageBehaviors';
import { ObstacleController } from '../controllers/ObstacleController';
import type { GameLifecycleState } from './GameConfig.svelte.js';
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
	persistentStatMods?: StatMods;
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

export type SimulationRestartOptions = {
	resetWaveIndex?: boolean;
	resetStagePhase?: boolean;
};

/** Owns mutable simulation state independently of the rendered world lifecycle. */
export class SimulationSession {
	config: MapConfig;
	waveData: Wave[];
	enemies: EnemyType[];
	persistentStatMods: StatMods;
	spawnManager: SpawnManager;
	readonly obstacleController: ObstacleController;
	private scenarioRevision: string;
	private disposed = false;
	private readonly createSpawnManager: NonNullable<SimulationSessionOptions['createSpawnManager']>;

	constructor(
		{
			config,
			waveData,
			enemies,
			persistentStatMods = EMPTY_STAT_MODS,
			revision
		}: SimulationScenario,
		readonly runtime: StageRuntime,
		readonly world: GameWorld,
		options: SimulationSessionOptions = {}
	) {
		this.config = config;
		this.waveData = waveData;
		this.enemies = enemies;
		this.persistentStatMods = persistentStatMods;
		this.scenarioRevision = revision;
		this.createSpawnManager =
			options.createSpawnManager ??
			((nextWaveData, map, gameManager) => new SpawnManager(nextWaveData, map, gameManager));
		this.initializeStageState();
		this.resetRuntimeState();
		const { gameManager, map } = world.build(config, enemies, persistentStatMods);
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

	replaceScenario({
		config,
		waveData,
		enemies,
		persistentStatMods = EMPTY_STAT_MODS,
		revision
	}: SimulationScenario) {
		if (
			this.scenarioRevision === revision &&
			this.config === config &&
			this.enemies === enemies &&
			(this.persistentStatMods ?? EMPTY_STAT_MODS) === persistentStatMods
		) {
			return false;
		}
		this.config = config;
		this.waveData = waveData;
		this.enemies = enemies;
		this.persistentStatMods = persistentStatMods;
		this.scenarioRevision = revision;
		this.obstacleController.setConfig(config);
		return true;
	}

	shouldStopBeforeRestart() {
		return !getStagePhaseBehavior(this.config.levelId, this.runtime.stagePhaseIndex)
			.advanceWhileReady;
	}

	restart({ resetWaveIndex = true, resetStagePhase }: SimulationRestartOptions = {}) {
		if (this.disposed) return;
		const stageBehavior = getStageBehavior(this.config.levelId);
		if (this.config.levelId !== this.runtime.levelId) {
			this.runtime.levelId = this.config.levelId;
			this.runtime.stagePhaseIndex = 0;
		}
		if (resetWaveIndex) {
			const shouldResetStagePhase = resetStagePhase ?? stageBehavior.resetToFirstPhase !== false;
			if (shouldResetStagePhase) {
				this.runtime.stagePhaseIndex = 0;
			}
			this.runtime.currentWaveIndex = getStagePhaseBehavior(
				this.config.levelId,
				this.runtime.stagePhaseIndex
			).waveIndex;
		}

		this.resetRuntimeState();
		this.obstacleController.reset(this.config.levelId);
		this.spawnManager.dispose();
		const { gameManager, map } = this.world.build(
			this.config,
			this.enemies,
			this.persistentStatMods
		);
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
		this.runtime.scaledElapsedTime = 0;
		this.runtime.waveElapsedTime = 0;
		this.runtime.tokensDisabled = false;
		this.runtime.totalDeductedCost = 0;
		this.runtime.tokenCooldownDuration = 0;
		this.runtime.tokenCooldownRemaining = 0;
		this.runtime.tokenCard = null;
		this.obstacleController.reset();
	}

	private initializeStageState() {
		const levelChanged = this.runtime.levelId !== this.config.levelId;
		this.runtime.levelId = this.config.levelId;
		if (levelChanged) {
			this.runtime.stagePhaseIndex = 0;
			this.runtime.currentWaveIndex = getStagePhaseBehavior(this.config.levelId, 0).waveIndex;
		}
	}

	private resetRuntimeState() {
		this.runtime.scaledElapsedTime = 0;
		this.runtime.waveElapsedTime = 0;
		this.runtime.steeringEnabled = this.config.steeringEnabled ?? true;
		this.runtime.tokensDisabled = false;
		this.runtime.totalDeductedCost = 0;
		this.runtime.tokenCooldownDuration = 0;
		this.runtime.tokenCooldownRemaining = 0;
		this.setPaused(false);
		this.runtime.tokenCard = null;
		const card = this.config.token_cards?.find((item) => item.key === 'trap_001_crate');
		if (card) {
			this.runtime.tokenCard = {
				...card,
				cost: this.config.levelId === 'level_rogue6_c-2' ? 10 : card.cost,
				selected: true
			};
		}
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
		this.runtime.state = state;
	}

	private setPaused(isPaused: boolean) {
		this.runtime.isPaused = isPaused;
	}
}
