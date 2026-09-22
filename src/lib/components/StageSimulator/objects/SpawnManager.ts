import { BranchManager } from './BranchManager';
import { Enemy } from './Enemy';
import type { Branch, Wave, WaveAction, WaveFragment } from '$lib/types';
import { GameManager } from './GameManager';
import { GameMap } from './GameMap';
import { getStageRuntime } from './StageRuntime';
import { getStagePhaseBehavior } from '../config/stageBehaviors';

const ENEMIES_TO_HIGHLIGHT = [
	'enemy_2001_duckmi',
	'enemy_2002_bearmi',
	'enemy_2034_sythef',
	'enemy_2059_smbox',
	'enemy_2085_skzjxd',
	'enemy_2069_skzbox',
	'enemy_2091_skzgds',
	'enemy_2067_skzcy'
];

type SpawnManagerSnapshot = {
	waveElapsedTime: number;
	currentWaveIndex: number;
	currentFragmentIndex: number;
	activeActions: Map<number, SpawnActionState>;
	completedActions: Set<number>;
	fragmentsTimeTracker: Map<string, number>;
	isProcessingFragment: boolean;
	nextWaveTimer: number;
	nextWaveType: 'TIME' | 'NO_ENEMIES';
	enterNextWaveFlag: boolean;
	preDelayTimer: number;
	fragmentPreDelayTimer: number;
	postDelayTimer: number;
};

type SpawnActionState = {
	action: WaveAction;
	spawnCount: number;
	lastSpawnTime: number;
	isComplete: boolean;
};
export class SpawnManager {
	map: GameMap;
	routes: unknown[];
	waves: Wave[];
	currentWaveIndex: number;
	currentFragmentIndex: number;
	activeActions = new Map<number, SpawnActionState>();
	completedActions = new Set<number>();
	fragmentsTimeTracker = new Map<string, number>();
	branchIndex = 0;
	branches = new Map<number, BranchManager>();
	isProcessingFragment = false;
	nextWaveTimer = 0;
	nextWaveType: 'TIME' | 'NO_ENEMIES';
	enterNextWaveFlag = false;
	gameManager: GameManager;
	isFinished = false;
	preDelayTimer = 0;
	fragmentPreDelayTimer = 0;
	postDelayTimer = 0;
	waveElapsedTime = 0; //for use in simulation only
	enemiesToHighlight: Array<{ t: number; key: string }> = []; //for use in simulation only
	spawnIdx = 0;

	get runtime() {
		return getStageRuntime(this.gameManager);
	}

	constructor(waves: Wave[], map: GameMap, gameManager: GameManager) {
		this.map = map;
		this.waves = waves;
		this.gameManager = gameManager;
		gameManager.spawnManager = this;
		this.routes = gameManager.config.routes ?? [];
		this.currentWaveIndex = this.runtime.currentWaveIndex;
		this.waveElapsedTime = this.runtime.waveElapsedTime;
		this.currentFragmentIndex = 0;
		this.nextWaveType = waves[0].maxTimeWaitingForNextWave < 0 ? 'NO_ENEMIES' : 'TIME';
		for (const branchKey of getStagePhaseBehavior(
			this.gameManager.config.levelId,
			this.runtime.stagePhaseIndex
		).autoBranches ?? []) {
			this.addBranch(branchKey);
		}
	}

	// Main update function to be called in animation loop
	update(delta: number) {
		if (this.runtime.isPaused && !this.gameManager.isSimulation) return;

		// handle branches
		this.branches.forEach((branch) => {
			branch.update(delta);
		});
		if (this.runtime.mode !== 'wave_normal') {
			this.addWaveElapsedTime(delta);
			return;
		}

		this.fragmentsTimeTracker.forEach((value, key) => {
			this.fragmentsTimeTracker.set(key, value + delta);
		});

		this.isFinished = this.currentWaveIndex >= this.waves.length && this.isBranchesComplete();
		if (this.currentWaveIndex >= this.waves.length) {
			if (!this.gameManager.noEnemyAlive) {
				this.addWaveElapsedTime(delta);
			}
			return;
		}
		const currentWave = this.waves[this.currentWaveIndex];

		// Handle wave pre-delay
		if (this.preDelayTimer < currentWave.preDelay) {
			this.preDelayTimer += delta;
			return;
		}
		this.addWaveElapsedTime(delta);
		// Process fragments
		if (this.currentFragmentIndex < currentWave.fragments.length) {
			this.processFragment(currentWave.fragments[this.currentFragmentIndex], delta);
		} else if (this.postDelayTimer < currentWave.postDelay) {
			// Handle wave post-delay
			this.postDelayTimer += delta;
		} else if (this.checkNextWaveFlag(delta)) {
			// Move to next wave
			this.currentWaveIndex++;
			this.runtime.currentWaveIndex = this.currentWaveIndex;
			this.currentFragmentIndex = 0;
			this.waveElapsedTime = 0;
			this.runtime.waveElapsedTime = 0;
			this.preDelayTimer = 0;
			this.postDelayTimer = 0;
			this.nextWaveTimer = 0;
			this.nextWaveType =
				this.waves[this.currentWaveIndex]?.maxTimeWaitingForNextWave < 0 ? 'NO_ENEMIES' : 'TIME';
		}
	}

	private addWaveElapsedTime(delta: number) {
		this.waveElapsedTime += delta;
		this.runtime.waveElapsedTime = this.waveElapsedTime;
	}

	checkNextWaveFlag(delta: number) {
		if (this.enterNextWaveFlag) {
			return true;
		}
		if (this.nextWaveType === 'NO_ENEMIES') {
			return this.gameManager.noWaveBlockingSpawns;
		}
		if (this.nextWaveTimer < this.waves[this.currentWaveIndex].maxTimeWaitingForNextWave) {
			this.nextWaveTimer += delta;
		}
		return (
			this.nextWaveTimer >= this.waves[this.currentWaveIndex].maxTimeWaitingForNextWave ||
			this.gameManager.noWaveBlockingSpawns
		);
	}

	processFragment(fragment: WaveFragment, delta: number) {
		// Start fragment if not already processing
		if (!this.isProcessingFragment) {
			this.startFragment(fragment);
			this.fragmentPreDelayTimer = 0;
			return;
		}
		// Handle fragment pre-delay
		if (this.fragmentPreDelayTimer < fragment.preDelay) {
			this.fragmentPreDelayTimer += delta;
			return;
		}
		const key = `w${this.currentWaveIndex}f${this.currentFragmentIndex}`;
		if (!this.fragmentsTimeTracker.has(key)) {
			this.fragmentsTimeTracker.set(key, 0);
		}
		// Update all active actions
		this.updateActiveActions();

		// Check if fragment is complete
		if (this.isFragmentComplete()) {
			this.completeFragment();
		}
	}

	startFragment(fragment: WaveFragment) {
		this.isProcessingFragment = true;
		this.activeActions.clear();
		this.completedActions.clear();

		// Initialize all actions in the fragment
		fragment.actions.forEach((action, index) => {
			const actionState = {
				action,
				spawnCount: 0,
				lastSpawnTime: 0,
				isComplete: false
			};
			this.activeActions.set(index, actionState);
		});
	}

	updateActiveActions() {
		const key = `w${this.currentWaveIndex}f${this.currentFragmentIndex}`;
		this.activeActions.forEach((state, index) => {
			if (state.isComplete) return;

			// Handle pre-delay
			if (state.action.preDelay > (this.fragmentsTimeTracker.get(key) ?? 0)) {
				return;
			}

			// Handle spawning
			const timeSinceLastSpawn = this.runtime.scaledElapsedTime - state.lastSpawnTime;
			if (state.spawnCount === 0 || timeSinceLastSpawn >= state.action.interval) {
				this.spawnEntity(state.action);
				state.spawnCount++;
				state.lastSpawnTime = this.runtime.scaledElapsedTime;

				// Check if action is complete
				if (state.spawnCount >= state.action.count) {
					state.isComplete = true;
					this.completedActions.add(index);
				}
			}
		});
	}
	isBranchesComplete() {
		for (const branch of this.branches.values()) {
			for (const action of branch.activeActions.values()) {
				if (!action.isComplete) return false;
			}
		}
		return true;
	}

	isFragmentComplete() {
		return this.completedActions.size === this.activeActions.size;
	}

	completeFragment() {
		this.isProcessingFragment = false;
		this.currentFragmentIndex++;
	}

	spawnEntity(action: WaveAction) {
		if (action.key === '') {
			return;
		}
		switch (action.actionType) {
			case 'SPAWN':
				this.spawnEnemy(action);
				break;
			case 'ACTIVATE_PREDEFINED':
				this.activatePredefined(action);
				break;
			default:
				break;
		}
	}

	spawnEnemy(action: WaveAction) {
		const originalRoute = this.routes[action['routeIndex']];
		const route = this.gameManager.convertMovementConfig(structuredClone(originalRoute));
		let enemyKey = action.key;
		const enemyReplace = this.runtime.eliteMode
			? this.gameManager.config.elite_runes?.enemy_replace || {}
			: {};
		if (enemyReplace[action.key]) {
			enemyKey = enemyReplace[action.key];
		}
		const enemyData = this.gameManager.enemies.find((ele) => ele.stageId === enemyKey);
		if (!enemyData) {
			return;
		}
		const key = `w${this.currentWaveIndex}f${this.currentFragmentIndex}`;
		const spawnUID = `s-${action.key}-s${this.spawnIdx}`;
		this.spawnIdx++;
		new Enemy(enemyData, action, route, this.gameManager, key, spawnUID);
		if (ENEMIES_TO_HIGHLIGHT.includes(enemyData.key) || enemyData.type.includes('BOSS')) {
			if (['enemy_2093_skzams'].includes(enemyData.key)) return;
			if (this.runtime.scaledElapsedTime < 1) return;
			this.enemiesToHighlight.push({ t: this.runtime.scaledElapsedTime, key: enemyData.key });
		}
	}

	activatePredefined(action: WaveAction) {
		this.gameManager.addTrap(null, action.key);
	}

	addBranch(branchKey: string, branch?: Branch, index = -1) {
		if (!branch) {
			branch = structuredClone(this.gameManager.config.branches[branchKey]);
		}
		if (index !== -1) {
			branch.phases = [branch.phases[index]];
		}
		this.branches.set(
			this.branchIndex,
			new BranchManager(branchKey, branch, this.gameManager, this)
		);
		this.branchIndex++;
	}

	set(data: SpawnManagerSnapshot) {
		this.waveElapsedTime = data.waveElapsedTime;
		this.runtime.waveElapsedTime = this.waveElapsedTime;
		this.currentWaveIndex = data.currentWaveIndex;
		this.runtime.currentWaveIndex = data.currentWaveIndex;
		this.currentFragmentIndex = data.currentFragmentIndex;
		this.activeActions = structuredClone(data.activeActions);
		this.completedActions = structuredClone(data.completedActions);
		this.fragmentsTimeTracker = structuredClone(data.fragmentsTimeTracker);
		this.isProcessingFragment = data.isProcessingFragment;
		this.nextWaveTimer = data.nextWaveTimer;
		this.nextWaveType = data.nextWaveType;
		this.enterNextWaveFlag = data.enterNextWaveFlag;
		this.preDelayTimer = data.preDelayTimer;
		this.fragmentPreDelayTimer = data.fragmentPreDelayTimer;
		this.postDelayTimer = data.postDelayTimer;
		this.isFinished = false;
	}

	// Helper method to reset the manager
	reset() {
		this.branches.clear();
		this.branchIndex = 0;
		this.currentWaveIndex = 0;
		this.runtime.currentWaveIndex = 0;
		this.currentFragmentIndex = 0;
		this.activeActions.clear();
		this.completedActions.clear();
		this.fragmentsTimeTracker.clear();
		this.isProcessingFragment = false;
		this.nextWaveTimer = 0;
		this.nextWaveType = this.waves[0]?.maxTimeWaitingForNextWave < 0 ? 'NO_ENEMIES' : 'TIME';
		this.enterNextWaveFlag = false;
		this.isFinished = false;
		this.preDelayTimer = 0;
		this.fragmentPreDelayTimer = 0;
		this.postDelayTimer = 0;
		this.waveElapsedTime = 0;
		this.runtime.waveElapsedTime = 0;
		this.enemiesToHighlight = [];
		this.spawnIdx = 0;
	}

	dispose() {
		this.branches.clear();
		this.activeActions.clear();
		this.completedActions.clear();
		this.fragmentsTimeTracker.clear();
		this.enemiesToHighlight = [];
		this.routes = [];
		this.waves = [];
	}
}
