import { afterEach, expect, test } from 'vitest';
import { GameConfig } from '$lib/components/StageSimulator/objects/GameConfig.svelte.js';
import {
	liveStageRuntime,
	OfflineStageRuntime
} from '$lib/components/StageSimulator/objects/StageRuntime';
import { SpawnManager } from '$lib/components/StageSimulator/objects/SpawnManager';

function createRuntime(seed = 123) {
	return new OfflineStageRuntime({
		mode: 'wave_normal',
		currentWaveIndex: 0,
		stagePhaseIndex: 0,
		eliteMode: false,
		specialMods: {},
		steeringEnabled: true,
		seed
	});
}

afterEach(() => {
	GameConfig.scaledElapsedTime = 0;
	GameConfig.waveElapsedTime = 0;
	GameConfig.tokenCooldownRemaining = 0;
	GameConfig.totalDeductedCost = 0;
	GameConfig.speedFactor = 4;
	GameConfig.specialMods = {};
});

test('offline runtime updates do not mutate live GameConfig state', () => {
	GameConfig.scaledElapsedTime = 42;
	GameConfig.waveElapsedTime = 12;
	const runtime = createRuntime();

	runtime.scaledElapsedTime = 90;
	runtime.waveElapsedTime = 50;
	runtime.currentWaveIndex = 3;

	expect(runtime.scaledElapsedTime).toBe(90);
	expect(runtime.waveElapsedTime).toBe(50);
	expect(runtime.currentWaveIndex).toBe(3);
	expect(GameConfig.scaledElapsedTime).toBe(42);
	expect(GameConfig.waveElapsedTime).toBe(12);
});

test('offline runtime correlated state remains independent from live state', () => {
	GameConfig.tokenCooldownRemaining = 9;
	const runtime = createRuntime();

	runtime.tokenCooldownRemaining = 3;
	runtime.totalDeductedCost = 10;

	expect(runtime.tokenCooldownRemaining).toBe(3);
	expect(runtime.totalDeductedCost).toBe(10);
	expect(GameConfig.tokenCooldownRemaining).toBe(9);
	expect(GameConfig.totalDeductedCost).toBe(0);
});

test('live runtime reads and writes the rune-backed GameConfig', () => {
	GameConfig.speedFactor = 4;
	liveStageRuntime.speedFactor = 2;
	liveStageRuntime.scaledElapsedTime = 6;

	expect(GameConfig.speedFactor).toBe(2);
	expect(GameConfig.scaledElapsedTime).toBe(6);

	GameConfig.waveElapsedTime = 12;
	expect(liveStageRuntime.waveElapsedTime).toBe(12);
});

test('offline runtime copies nested live rune state into plain simulation state', () => {
	GameConfig.specialMods = { enemy_test: { skill: { value: 2 } } } as any;
	const runtime = new OfflineStageRuntime({
		mode: 'wave_normal',
		currentWaveIndex: 0,
		stagePhaseIndex: 0,
		eliteMode: false,
		specialMods: GameConfig.specialMods,
		steeringEnabled: true
	});

	expect(runtime.specialMods).toEqual(GameConfig.specialMods);
	expect(runtime.specialMods).not.toBe(GameConfig.specialMods);
	expect((runtime.specialMods as any).enemy_test).not.toBe(
		(GameConfig.specialMods as any).enemy_test
	);
});

test('offline runtimes replay random decisions deterministically', () => {
	const first = createRuntime(9876);
	const second = createRuntime(9876);

	expect([first.random(), first.random(), first.random()]).toStrictEqual([
		second.random(),
		second.random(),
		second.random()
	]);
});

test('spawn manager reset clears local and runtime timing state', () => {
	const runtime = createRuntime();
	runtime.currentWaveIndex = 3;
	runtime.waveElapsedTime = 12;
	const manager = Object.create(SpawnManager.prototype) as any;
	Object.assign(manager, {
		gameManager: { runtime },
		waves: [{ maxTimeWaitingForNextWave: 10 }],
		branches: new Map([[0, {}]]),
		branchIndex: 4,
		currentWaveIndex: 3,
		currentFragmentIndex: 2,
		activeActions: new Map([[0, {}]]),
		completedActions: new Set([0]),
		fragmentsTimeTracker: new Map([['w3f2', 8]]),
		isProcessingFragment: true,
		nextWaveTimer: 5,
		nextWaveType: 'NO_ENEMIES',
		enterNextWaveFlag: true,
		isFinished: true,
		preDelayTimer: 2,
		fragmentPreDelayTimer: 3,
		postDelayTimer: 4,
		waveElapsedTime: 12,
		enemiesToHighlight: [{ t: 1, key: 'enemy' }],
		spawnIdx: 7
	});

	manager.reset();

	expect(manager.waveElapsedTime).toBe(0);
	expect(runtime.waveElapsedTime).toBe(0);
	expect(manager.currentWaveIndex).toBe(0);
	expect(runtime.currentWaveIndex).toBe(0);
	expect(manager.fragmentsTimeTracker.size).toBe(0);
	expect(manager.fragmentPreDelayTimer).toBe(0);
	expect(manager.nextWaveTimer).toBe(0);
	expect(manager.enterNextWaveFlag).toBe(false);
	expect(manager.isFinished).toBe(false);
});
