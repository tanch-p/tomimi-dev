import { shuffleArray } from '$lib/functions/waveHelpers';
import { Enemy } from './Enemy';
import { GameManager } from './GameManager';
import { SpawnManager } from './SpawnManager';
import branchInfo from '$lib/data/stages/branch_info.json';
import { getStageRuntime } from './StageRuntime';

export class BranchManager {
	routes;
	phases;
	branch;
	currentPhaseIndex = 0;
	activeActions = new Map(); // Tracks currently running actions
	completedActions = new Set(); // Tracks completed actions in current fragment
	isProcessingPhase = false;
	gameManager: GameManager;
	spawnManager: SpawnManager;
	isFinished = false;
	phasePreDelayTimer = 0;
	phaseTimer = 0;
	get runtime() {
		return getStageRuntime(this.gameManager);
	}
	constructor(branchKey, branch, gameManager: GameManager, spawnManager: SpawnManager) {
		this.branchKey = branchKey;
		this.branch = branch;
		this.spawnManager = spawnManager;
		this.gameManager = gameManager;
		this.routes = gameManager.config.extra_routes;
		const indexes = Array.from({ length: branch.phases.length }, (_, i) => i);
		const shuffledIndexes = shuffleArray(indexes, () => this.runtime.random());
		this.phases = branch.phases.map((phase, i) => {
			return { preDelay: phase.preDelay, actions: branch.phases[shuffledIndexes[i]].actions };
		});
	}

	update(delta) {
		if (this.isFinished) {
			return;
		}
		if (this.currentPhaseIndex >= this.phases.length) {
			this.isFinished = true;
			return; // All phases completed
		}
		this.processPhase(this.phases[this.currentPhaseIndex], delta);
	}

	processPhase(phase, delta) {
		// Start phase if not already processing
		if (!this.isProcessingPhase) {
			this.startPhase(phase);
			this.phasePreDelayTimer = 0;
			return;
		}
		// Handle phase pre-delay
		if (this.phasePreDelayTimer < phase.preDelay) {
			this.phasePreDelayTimer += delta;
			return;
		}
		this.phaseTimer += delta;
		// Update all active actions
		this.updateActiveActions(delta);

		// Check if phase is complete
		if (this.isPhaseComplete()) {
			this.completePhase();
		}
	}

	startPhase(phase) {
		this.isProcessingPhase = true;
		this.activeActions.clear();
		this.completedActions.clear();
		// Initialize all actions in the phase
		phase.actions.forEach((action, index) => {
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
		this.activeActions.forEach((state, index) => {
			if (state.isComplete) return;

			// Handle pre-delay
			if (state.action.preDelay > this.phaseTimer) {
				return;
			}

			// Handle spawning
			const timeSinceLastSpawn = this.runtime.scaledElapsedTime - state.lastSpawnTime;
			if (state.spawnCount === 0 || timeSinceLastSpawn >= state.action.interval) {
				this.spawnEntity(state.action, index);
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

	isPhaseComplete() {
		return this.completedActions.size === this.activeActions.size;
	}

	completePhase() {
		this.isProcessingPhase = false;
		this.currentPhaseIndex++;
		this.phaseTimer = 0;
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
				console.warn(`Unknown action type: ${action.actionType}`);
		}
	}

	spawnEnemy(action, index) {
		const originalRoute = this.routes[action['routeIndex']];
		const route = this.gameManager.convertMovementConfig(structuredClone(originalRoute));
		const enemyData = this.gameManager.enemies.find((ele) => ele.stageId === action.key);
		if (!enemyData) {
			return;
		}
		action.dontBlockWave = true;
		const spawnUID = `b-${action.key}-b${this.spawnManager.spawnIdx}`;
		this.spawnManager.spawnIdx++;
		const formIndex =
			branchInfo?.[this.gameManager.config.levelId]?.[this.branchKey]?.formIndex || 0;
		const enemy = new Enemy(enemyData, action, route, this.gameManager, null, spawnUID, formIndex);
	}

	activatePredefined(action) {
		this.gameManager.addTrap(null, action.key);
	}
}
