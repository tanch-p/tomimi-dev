import { expect, test, vi } from 'vitest';
import { SimulationSession } from '$lib/components/StageSimulator/objects/SimulationSession';
import { OfflineStageRuntime } from '$lib/components/StageSimulator/objects/StageRuntime';

function createRuntime(levelId = '') {
	return new OfflineStageRuntime({
		levelId,
		mode: 'wave_normal',
		currentWaveIndex: 0,
		stagePhaseIndex: 0,
		eliteMode: false,
		specialMods: {},
		steeringEnabled: true
	});
}

function createSession(levelId: string, runtime = createRuntime()) {
	const gameManager = {
		update: vi.fn(),
		enemiesOnMap: [],
		noEnemyAlive: false
	};
	const map = {};
	const world = {
		gameManager,
		map,
		build: vi.fn(() => ({ gameManager, map })),
		dispose: vi.fn()
	};
	const spawnManagers: Array<{
		update: ReturnType<typeof vi.fn>;
		dispose: ReturnType<typeof vi.fn>;
		isFinished: boolean;
	}> = [];
	const createSpawnManager = vi.fn(() => {
		const manager = { update: vi.fn(), dispose: vi.fn(), isFinished: false };
		spawnManagers.push(manager);
		return manager as any;
	});
	const obstacleController = {
		setConfig: vi.fn(),
		reset: vi.fn(),
		replayThrough: vi.fn(),
		setReplayTime: vi.fn(),
		dispose: vi.fn()
	};
	const scenario = {
		config: { levelId } as any,
		waveData: [],
		enemies: [],
		revision: `${levelId}:one`
	};
	const session = new SimulationSession(scenario, runtime, world as any, {
		createSpawnManager,
		createObstacleController: () => obstacleController as any
	});
	return {
		session,
		runtime,
		world,
		gameManager,
		spawnManagers,
		createSpawnManager,
		obstacleController
	};
}

test('session initialization establishes stage state before constructing the world', () => {
	const runtime = createRuntime('previous-level');
	const { world } = createSession('level_rogue4_b-8', runtime);

	expect(runtime.levelId).toBe('level_rogue4_b-8');
	expect(runtime.stagePhaseIndex).toBe(0);
	expect(runtime.currentWaveIndex).toBe(1);
	expect(world.build).toHaveBeenCalledOnce();
});

test('multi-phase restarts preserve the selected phase while replacing the spawn session', () => {
	const { session, runtime, world, spawnManagers, createSpawnManager, obstacleController } =
		createSession('level_rogue4_b-8');
	runtime.stagePhaseIndex = 1;
	runtime.currentWaveIndex = 3;

	session.restart();

	expect(runtime.stagePhaseIndex).toBe(1);
	expect(runtime.currentWaveIndex).toBe(3);
	expect(spawnManagers[0].dispose).toHaveBeenCalledOnce();
	expect(createSpawnManager).toHaveBeenCalledTimes(2);
	expect(world.build).toHaveBeenCalledTimes(2);
	expect(obstacleController.reset).toHaveBeenLastCalledWith('level_rogue4_b-8');
});

test('current-phase reset preserves a duel phase and returns to its starting wave', () => {
	const { session, runtime } = createSession('level_rogue4_d-2');
	runtime.stagePhaseIndex = 1;
	runtime.currentWaveIndex = 9;

	session.restart({ resetStagePhase: false });

	expect(runtime.stagePhaseIndex).toBe(1);
	expect(runtime.currentWaveIndex).toBe(4);
});

test('ordinary stage restarts reset phase and wave state', () => {
	const { session, runtime } = createSession('level_test');
	runtime.stagePhaseIndex = 4;
	runtime.currentWaveIndex = 9;

	session.restart();

	expect(runtime.stagePhaseIndex).toBe(0);
	expect(runtime.currentWaveIndex).toBe(0);
});

test('session updates simulation and visual state without drawing the world', () => {
	const { session, runtime, gameManager, spawnManagers, obstacleController, world } =
		createSession('level_test');
	const updatePathVisualisation = vi.fn();
	gameManager.enemiesOnMap.push({ updatePathVisualisation } as never);
	runtime.state = 'running';
	runtime.isPaused = false;

	session.update(0.5, 0.125);

	expect(spawnManagers[0].update).toHaveBeenCalledWith(0.5);
	expect(gameManager.update).toHaveBeenCalledWith(0.5);
	expect(updatePathVisualisation).toHaveBeenCalledWith(0.125);
	expect(obstacleController.replayThrough).toHaveBeenCalledWith(runtime.scaledElapsedTime);
	expect(world.dispose).not.toHaveBeenCalled();
});

test('disposing a session releases simulation resources but not the rendered world', () => {
	const { session, world, spawnManagers, obstacleController } = createSession('level_test');

	session.dispose();

	expect(spawnManagers[0].dispose).toHaveBeenCalledOnce();
	expect(obstacleController.dispose).toHaveBeenCalledOnce();
	expect(world.dispose).not.toHaveBeenCalled();
});
