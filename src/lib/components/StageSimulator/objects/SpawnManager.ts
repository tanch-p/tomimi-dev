import { BranchManager } from './BranchManager';
import { Enemy } from './Enemy';
import { GameConfig } from './GameConfig';
import { GameManager } from './GameManager';
import { GameMap } from './GameMap';

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
export class SpawnManager {
	map: GameMap;
	routes;
	waves;
	currentWaveIndex: number;
	currentFragmentIndex: number;
	activeActions = new Map(); // Tracks currently running actions
	completedActions = new Set(); // Tracks completed actions in current fragment
	fragmentsTimeTracker = new Map();
	branchIndex = 0;
	branches = new Map();
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
	enemiesToHighlight = []; //for use in simulation only
	spawnIdx = 0;

	constructor(waves, map, gameManager: GameManager) {
		this.map = map;
		this.waves = waves;
		this.gameManager = gameManager;
		gameManager.spawnManager = this;
		this.routes = gameManager.config.routes;
		this.currentWaveIndex = GameConfig.currentWaveIndex;
		this.currentFragmentIndex = 0;
		this.nextWaveType = waves[0].maxTimeWaitingForNextWave < 0 ? 'NO_ENEMIES' : 'TIME';
		switch (this.gameManager.config.levelId) {
			case 'level_rogue4_d-1':
				if (GameConfig.stagePhaseIndex === 1) {
					this.addBranch('Walk');
				}
				break;
			case 'level_rogue4_d-2':
			case 'level_rogue4_d-3':
			case 'level_rogue4_d-b':
				if (GameConfig.stagePhaseIndex === 1) {
					this.addBranch('Walk_1');
					this.addBranch('Walk_2');
				}
				break;
			case 'level_rogue4_b-7':
				if (GameConfig.stagePhaseIndex === 1) {
					this.addBranch('skzjkl_stage_2');
				}
				break;
			case 'level_rogue4_b-8':
				switch (GameConfig.stagePhaseIndex) {
					case 1:
						this.addBranch('amiy_blink_1');
						break;
					case 2:
						this.addBranch('amiy_blink_2');
						break;
				}
				break;
		}
	}

	// Main update function to be called in animation loop
	update(delta) {
		if (GameConfig.isPaused && !this.gameManager.isSimulation) return;

		// handle branches
		this.branches.forEach((branch) => {
			branch.update(delta);
		});
		if (GameConfig.mode !== 'wave_normal') {
			GameConfig.setValue('waveElapsedTime', GameConfig.waveElapsedTime + delta);
			return;
		}

		this.fragmentsTimeTracker.forEach((value, key) => {
			this.fragmentsTimeTracker.set(key, value + delta);
		});

		this.isFinished = this.currentWaveIndex >= this.waves.length && this.isBranchesComplete();
		if (this.currentWaveIndex >= this.waves.length) {
			if (!this.gameManager.noEnemyAlive) {
				GameConfig.setValue('waveElapsedTime', GameConfig.waveElapsedTime + delta);
			}
			return;
		}
		const currentWave = this.waves[this.currentWaveIndex];

		// Handle wave pre-delay
		if (this.preDelayTimer < currentWave.preDelay) {
			this.preDelayTimer += delta;
			return;
		}
		if (this.gameManager.isSimulation) {
			this.waveElapsedTime += delta;
		} else {
			GameConfig.setValue('waveElapsedTime', GameConfig.waveElapsedTime + delta);
		}
		// Process fragments
		if (this.currentFragmentIndex < currentWave.fragments.length) {
			this.processFragment(currentWave.fragments[this.currentFragmentIndex], delta);
		} else if (this.postDelayTimer < currentWave.postDelay) {
			// Handle wave post-delay
			this.postDelayTimer += delta;
		} else if (!this.checkNextWaveFlag(delta)) {
		} else {
			// Move to next wave
			this.currentWaveIndex++;
			GameConfig.setValue('currentWaveIndex', this.currentWaveIndex);
			this.currentFragmentIndex = 0;
			if (this.gameManager.isSimulation) {
				this.waveElapsedTime = 0;
			} else {
				GameConfig.setValue('waveElapsedTime', 0);
			}
			this.preDelayTimer = 0;
			this.postDelayTimer = 0;
			this.nextWaveTimer = 0;
			this.nextWaveType =
				this.waves[this.currentWaveIndex]?.maxTimeWaitingForNextWave < 0 ? 'NO_ENEMIES' : 'TIME';
		}
	}

	checkNextWaveFlag(delta) {
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

	processFragment(fragment, delta) {
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
		this.updateActiveActions(delta);

		// Check if fragment is complete
		if (this.isFragmentComplete()) {
			this.completeFragment();
		}
	}

	startFragment(fragment) {
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
			if (state.action.preDelay > this.fragmentsTimeTracker.get(key)) {
				return;
			}

			// Handle spawning
			const timeSinceLastSpawn = GameConfig.scaledElapsedTime - state.lastSpawnTime;
			if (state.spawnCount === 0 || timeSinceLastSpawn >= state.action.interval) {
				this.spawnEntity(state.action, index);
				state.spawnCount++;
				state.lastSpawnTime = GameConfig.scaledElapsedTime;

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

	spawnEntity(action, index) {
		if (action.key === '') {
			return;
		}
		switch (action.actionType) {
			case 'SPAWN':
				this.spawnEnemy(action, index);
				break;
			case 'ACTIVATE_PREDEFINED':
				this.activatePredefined(action);
				break;
			default:
				break;
		}
	}

	spawnEnemy(action, index) {
		const originalRoute = this.routes[action['routeIndex']];
		const route = this.gameManager.convertMovementConfig(structuredClone(originalRoute));
		let enemyKey = action.key;
		const enemyReplace = GameConfig.eliteMode
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
		const enemy = new Enemy(enemyData, action, route, this.gameManager, key, spawnUID);
		if (ENEMIES_TO_HIGHLIGHT.includes(enemyData.key) || enemyData.type.includes('BOSS')) {
			if (['enemy_2093_skzams'].includes(enemyData.key)) return;
			if (GameConfig.scaledElapsedTime < 1) return;
			this.enemiesToHighlight.push({ t: GameConfig.scaledElapsedTime, key: enemyData.key });
		}
	}

	activatePredefined(action) {
		this.gameManager.addTrap(null, action.key);
	}

	addBranch(branchKey: string, branch, index = -1) {
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

	set(data) {
		GameConfig.setValue('waveElapsedTime', data.waveElapsedTime);
		this.currentWaveIndex = data.currentWaveIndex;
		GameConfig.setValue('currentWaveIndex', data.currentWaveIndex);
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
		this.currentWaveIndex = 0;
		this.currentFragmentIndex = 0;
		this.activeActions.clear();
		this.completedActions.clear();
		this.isProcessingFragment = false;
		this.preDelayTimer = 0;
		this.postDelayTimer = 0;
	}
}
