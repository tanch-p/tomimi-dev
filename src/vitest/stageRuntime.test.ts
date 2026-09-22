import { afterEach, expect, test } from 'vitest';
import { GameConfig } from '$lib/components/StageSimulator/objects/GameConfig';
import { OfflineStageRuntime } from '$lib/components/StageSimulator/objects/StageRuntime';
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
	GameConfig.setValue('scaledElapsedTime', 0);
	GameConfig.setValue('waveElapsedTime', 0);
});

test('offline runtime clock updates do not mutate live GameConfig state', () => {
	GameConfig.setValue('scaledElapsedTime', 42);
	GameConfig.setValue('waveElapsedTime', 12);
	const runtime = createRuntime();

	runtime.setValue('scaledElapsedTime', 90);
	runtime.setValue('waveElapsedTime', 50);
	runtime.setValue('currentWaveIndex', 3);

	expect(runtime.scaledElapsedTime).toBe(90);
	expect(runtime.waveElapsedTime).toBe(50);
	expect(runtime.currentWaveIndex).toBe(3);
	expect(GameConfig.scaledElapsedTime).toBe(42);
	expect(GameConfig.waveElapsedTime).toBe(12);
});

test('offline runtime batches correlated state without touching the live store', () => {
	GameConfig.setValue('tokenCooldownRemaining', 9);
	const runtime = createRuntime();
	const snapshots: Array<{ remaining: number; deducted: number }> = [];
	const unsubscribe = runtime.subscribe('tokenCooldownRemaining', (remaining) => {
		snapshots.push({ remaining, deducted: runtime.totalDeductedCost });
	});

	runtime.batch(() => {
		runtime.setValue('tokenCooldownRemaining', 4);
		runtime.setValue('tokenCooldownRemaining', 3);
		runtime.setValue('totalDeductedCost', 10);
	});
	unsubscribe();

	expect(snapshots).toStrictEqual([{ remaining: 3, deducted: 10 }]);
	expect(GameConfig.tokenCooldownRemaining).toBe(9);
});

test('live config does not publish unchanged values', () => {
	GameConfig.setValue('speedFactor', 4);
	const published: number[] = [];
	const unsubscribe = GameConfig.subscribe('speedFactor', (value) => published.push(value));

	GameConfig.setValue('speedFactor', 4);
	GameConfig.setValue('speedFactor', 2);
	GameConfig.setValue('speedFactor', 2);
	unsubscribe();
	GameConfig.setValue('speedFactor', 4);

	expect(published).toStrictEqual([2]);
});

test('live config batches reset notifications after all values are coherent', () => {
	GameConfig.setValue('scaledElapsedTime', 0);
	GameConfig.setValue('waveElapsedTime', 0);
	const snapshots: Array<{ scaled: number; wave: number }> = [];
	const unsubscribe = GameConfig.subscribe('scaledElapsedTime', (scaled) => {
		snapshots.push({ scaled, wave: GameConfig.waveElapsedTime });
	});

	GameConfig.batch(() => {
		GameConfig.setValue('scaledElapsedTime', 5);
		GameConfig.setValue('scaledElapsedTime', 6);
		GameConfig.setValue('waveElapsedTime', 12);
	});
	unsubscribe();

	expect(snapshots).toStrictEqual([{ scaled: 6, wave: 12 }]);
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
	runtime.setValue('currentWaveIndex', 3);
	runtime.setValue('waveElapsedTime', 12);
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
