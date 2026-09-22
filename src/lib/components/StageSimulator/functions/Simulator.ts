import type { MapConfig, Enemy as EnemyType, Position, Wave } from '$lib/types';
import { GameConfig } from '../objects/GameConfig';
import { GameMap } from '../objects/GameMap';
import { SpawnManager } from '../objects/SpawnManager';
import * as THREE from 'three';
import { Trap } from '../objects/Trap';
import { SPFA } from '../objects/SPFA';
import { generateMaze } from '$lib/functions/mazeHelpers';
import { Enemy } from '../objects/Enemy';
import { AssetManager } from '../objects/AssetManager';
import { clearObjects } from '$lib/functions/threejsHelpers';
import { getEnemySkills } from '$lib/functions/skillHelpers';
import type { ObstacleEvent, ObstacleEventSnapshot } from '../stores/obstacleEvents';
import {
	OfflineStageRuntime,
	type OfflineStageRuntimeOptions,
	type StageRuntime
} from '../objects/StageRuntime';
import { shouldSkipOfflineSimulation } from '../config/stageBehaviors';

type SimulationOptions = Partial<OfflineStageRuntimeOptions> & {
	obstacleEvents?: ObstacleEventSnapshot;
	shouldCancel?: () => boolean;
	yieldBudgetMs?: number;
};

const now = () => (typeof performance === 'undefined' ? Date.now() : performance.now());

function yieldToMainThread() {
	return new Promise<void>((resolve) => {
		if (typeof requestAnimationFrame === 'function') {
			requestAnimationFrame(() => resolve());
		} else {
			setTimeout(resolve, 0);
		}
	});
}

export async function getSimulatedData(
	config: MapConfig,
	waveData: Wave[],
	enemies: EnemyType[],
	options: SimulationOptions = {}
) {
	const runtime = new OfflineStageRuntime({
		mode: options.mode ?? GameConfig.mode,
		currentWaveIndex: options.currentWaveIndex ?? 0,
		stagePhaseIndex: options.stagePhaseIndex ?? GameConfig.stagePhaseIndex,
		eliteMode: options.eliteMode ?? GameConfig.eliteMode,
		specialMods: options.specialMods ?? GameConfig.specialMods,
		steeringEnabled: options.steeringEnabled ?? GameConfig.steeringEnabled,
		seed: options.seed
	});
	if (shouldSkipOfflineSimulation(config.levelId, runtime.stagePhaseIndex)) {
		return;
	}
	const assetManager = AssetManager.getInstance();
	if (!assetManager.texturesLoaded) {
		return;
	}
	const gameSimManager = new GameSimManager(config, enemies, runtime);
	const map = new GameMap(gameSimManager as any);
	const spawnManager = new SpawnManager(waveData, map, gameSimManager as any);
	let isEnded = false;
	let i = 1;
	let count = 0;
	const data = {};
	const events =
		options.obstacleEvents?.levelId === config.levelId
			? structuredClone(options.obstacleEvents.events).sort((a, b) => a.time - b.time)
			: [];
	let eventIndex = 0;
	while (events[eventIndex]?.time <= 0) {
		gameSimManager.applyObstacleEvent(events[eventIndex]);
		eventIndex++;
	}
	setData(count, data, spawnManager, gameSimManager, runtime);
	const enemiesToHighlight = spawnManager.enemiesToHighlight;
	let lastYieldTime = now();
	const yieldBudgetMs = options.yieldBudgetMs ?? 8;

	try {
		// Simulate at 60fps, 1x speed, yielding often enough for the live game to keep rendering.
		while (!isEnded) {
			if (options.shouldCancel?.()) return;
			const frameEnd = runtime.scaledElapsedTime + 1 / 60;
			while (events[eventIndex] && events[eventIndex].time <= frameEnd) {
				const eventTime = Math.max(runtime.scaledElapsedTime, events[eventIndex].time);
				const segmentDelta = eventTime - runtime.scaledElapsedTime;
				if (segmentDelta > 0) {
					spawnManager.update(segmentDelta);
					gameSimManager.update(segmentDelta);
				}
				gameSimManager.applyObstacleEvent(events[eventIndex]);
				eventIndex++;
			}
			const remainingDelta = frameEnd - runtime.scaledElapsedTime;
			if (remainingDelta > 0) {
				spawnManager.update(remainingDelta);
				gameSimManager.update(remainingDelta);
			}

			if (i === 60) {
				i = 1;
				count++;
				setData(count, data, spawnManager, gameSimManager, runtime);
				if (count > 1800) break;
			} else {
				i++;
			}
			if (spawnManager.isFinished && gameSimManager.noEnemyAlive) {
				isEnded = true;
			}

			if (now() - lastYieldTime >= yieldBudgetMs) {
				await yieldToMainThread();
				lastYieldTime = now();
			}
		}

		return { enemiesToHighlight: enemiesToHighlight, t: data };
	} finally {
		cleanup(gameSimManager);
	}
}

function setData(
	count,
	data,
	spawnManager: SpawnManager,
	gameSimManager: GameSimManager,
	runtime: StageRuntime
) {
	data[count] = {
		waveElapsedTime: spawnManager.waveElapsedTime,
		currentWaveIndex: spawnManager.currentWaveIndex,
		currentFragmentIndex: spawnManager.currentFragmentIndex,
		activeActions: structuredClone(spawnManager.activeActions),
		completedActions: structuredClone(spawnManager.completedActions),
		fragmentsTimeTracker: structuredClone(spawnManager.fragmentsTimeTracker),
		isProcessingFragment: spawnManager.isProcessingFragment,
		nextWaveTimer: spawnManager.nextWaveTimer,
		nextWaveType: spawnManager.nextWaveType,
		enterNextWaveFlag: spawnManager.enterNextWaveFlag,
		preDelayTimer: spawnManager.preDelayTimer,
		fragmentPreDelayTimer: spawnManager.fragmentPreDelayTimer,
		postDelayTimer: spawnManager.postDelayTimer,
		roadblocks: [...gameSimManager.traps.values()]
			.filter((trap) => trap.isRoadblock)
			.map((trap) => ({
				key: trap.key,
				position: { ...trap.position },
				placementId: trap.userPlacementId
			})),
		enemiesOnMap: gameSimManager.enemiesOnMap.map((enemy) => {
			const spineStateSkill = enemy.skills.find((skill) => skill.spineState !== undefined);
			const spineAnimIndex = spineStateSkill?.spineState ?? enemy.spineAnimIndex;
			const formIndex =
				spineStateSkill && enemy.data.forms.length > 1 ? spineAnimIndex : enemy.formIndex;
			const specials =
				formIndex !== enemy.formIndex
					? getEnemySkills(
							enemy.data,
							enemy.data.forms[formIndex].special,
							formIndex,
							runtime.specialMods,
							'special'
						)
					: enemy.specials;
			return {
				meshPos: structuredClone(enemy.meshGroup.position),
				raycastPos: structuredClone(enemy.raycastPos),
				targetPos: structuredClone(enemy.targetPos),
				gridPos: enemy.gridPos,
				data: enemy.data,
				key: enemy.key,
				disguiseKey: enemy.disguiseKey,
				spawnUID: enemy.spawnUID,
				actions: enemy.actions,
				hp: enemy.hp,
				baseSpeed: enemy.baseSpeed,
				moddedSpeed: enemy.moddedSpeed,
				route: structuredClone(enemy.route),
				currentActionIndex: enemy.currentActionIndex,
				state: enemy.state,
				animState: enemy.animState,
				meshVisible: enemy.meshGroup.visible,
				direction: structuredClone(enemy.direction),
				motionMode: enemy.motionMode,
				isMoving: enemy.isMoving,
				avoidanceForce: structuredClone(enemy.avoidanceForce),
				avoidanceFrameCounter: enemy.avoidanceFrameCounter,
				halfBodyWidth: enemy.halfBodyWidth,
				inertia: structuredClone(enemy.inertia),
				movementFrameAccumulator: enemy.movementFrameAccumulator,
				blinkState: enemy.blinkState,
				blinkElapsedTime: enemy.blinkElapsedTime,
				skillBlinkState: enemy.skillBlinkState,
				skillBlinkElapsedTime: enemy.skillBlinkElapsedTime,
				skillBlinkSkillKey: enemy.skillBlinkSkillKey,
				waitElapsedTime: enemy.waitElapsedTime,
				exit: enemy.exit,
				exitElapsedTime: enemy.exitElapsedTime,
				traits: enemy.traits,
				specials,
				skillData: enemy.skillManager.getData(),
				formIndex,
				spineAnimIndex,
				timeToWait: enemy.timeToWait,
				standbyTime: enemy.standbyTime,
				pathFinder: enemy.pathFinder,
				fragmentKey: enemy.fragmentKey,
				reviveTimer: enemy.reviveTimer,
				reviveDuration: enemy.reviveDuration,
				timeoutElapsedTime: enemy.timeoutElapsedTime,
				startElapsedTime: enemy.startElapsedTime,
				startDuration: enemy.startDuration
			};
		})
	};
}

function cleanup(gameSimManager: GameSimManager) {
	for (const enemy of gameSimManager.enemiesOnMap) {
		enemy.skillManager?.activeSkills.forEach((skill) => skill.dispose());
		clearObjects(enemy.meshGroup);
	}
	for (const trap of gameSimManager.traps.values()) {
		clearObjects(trap.getMesh());
	}
	gameSimManager.objects.forEach((obj: THREE.Group) => {
		clearObjects(obj);
	});
}

class GameSimManager {
	objects = [];
	config;
	mazeLayout: number[][];
	baseMazeLayout: number[][];
	enemies: EnemyType[];
	enemiesOnMap: Enemy[] = [];
	spawnManager: SpawnManager;
	traps = new Map();
	pathFinder: SPFA;
	noEnemyAlive = false;
	noWaveBlockingSpawns = false;
	killedCount = 0;
	tiles = new Map();
	isSimulation = true;
	runtime: StageRuntime;
	game = { objects: [], hideRollOverMesh: () => undefined };

	constructor(config: MapConfig, enemies: EnemyType[], runtime: StageRuntime) {
		this.enemies = enemies;
		this.config = config;
		this.runtime = runtime;
		const mazeLayout = generateMaze(config.mapData.map, config.mapData.tiles);
		this.mazeLayout = mazeLayout;
		this.baseMazeLayout = structuredClone(mazeLayout);
		this.pathFinder = new SPFA(mazeLayout);
	}

	getVectorCoordinates = (pos, reachOffset) => {
		let offSetX = 0,
			offSetY = 0;
		if (reachOffset) {
			offSetX = reachOffset.x;
			offSetY = reachOffset.y;
		}
		const { row, col } = pos;
		const x = this.getCoordinate(parseInt(col) + offSetX, 'x');
		const y = -this.getCoordinate(parseInt(row) - offSetY, 'y');
		return { x, y };
	};

	getCoordinate = (coordinate, type = 'x') => {
		const center = type === 'x' ? this.mazeLayout[0].length / 2 : this.mazeLayout.length / 2;
		return (coordinate - center) * GameConfig.gridSize + GameConfig.gridSize / 2;
	};

	getGridPosFromVectors(pos: THREE.Vector3) {
		const gridCols = this.mazeLayout[0].length;
		const gridRows = this.mazeLayout.length;
		const gridWorldWidth = gridCols * GameConfig.gridSize;
		const gridWorldHeight = gridRows * GameConfig.gridSize;

		const originX = -gridWorldWidth / 2;
		const originY = gridWorldHeight / 2;

		const col = Math.floor((pos.x - originX) / GameConfig.gridSize);
		const row = Math.floor((originY - pos.y) / GameConfig.gridSize);

		const boundedCol = Math.max(0, Math.min(col, gridCols - 1));
		const boundedRow = Math.max(0, Math.min(row, gridRows - 1));

		return `${boundedCol},${boundedRow}`;
	}

	getGridPosition = (vector: THREE.Vector3) => {
		// Get the column (x coordinate)
		const col = Math.floor(
			(vector.x - GameConfig.gridSize / 2) / GameConfig.gridSize + this.mazeLayout[0].length / 2
		);

		// Get the row (y coordinate)
		// Note the negative sign because y is inverted in your original function
		const row = Math.floor(
			(-vector.y - GameConfig.gridSize / 2) / GameConfig.gridSize + this.mazeLayout.length / 2
		);

		return [col, row];
	};

	gameToWorldPos(pos: Position) {
		const height = this.mazeLayout.length;
		return { row: height - 1 - pos.row, col: pos.col };
	}

	convertMovementConfig = (route) => {
		const height = this.mazeLayout.length;
		const start = {
			row: height - 1 - route.startPosition.row,
			col: route.startPosition.col
		};
		const end = {
			row: height - 1 - route.endPosition.row,
			col: route.endPosition.col
		};
		const checkpoints = route.checkpoints ? [...route.checkpoints] : [];
		for (const checkpoint of checkpoints) {
			checkpoint.position.row = height - 1 - checkpoint.position.row;
		}
		return {
			...route,
			endPosition: end,
			startPosition: start,
			checkpoints: checkpoints
		};
	};

	updateMazeLayout(pos: Position, value: number) {
		this.pathFinder.updateTile(pos, value);
	}

	initTraps(traps) {
		const predefineChanges = this.runtime.eliteMode && this.config.elite_runes?.predefine_changes;
		const trapList = structuredClone(traps);
		if (predefineChanges) {
			for (const [key, value] of predefineChanges) {
				const trap = trapList.find((ele) => ele.alias === key);
				if (trap) {
					trap.hidden = Boolean(!value);
				}
			}
		}
		const trapsToInit = trapList.filter((ele) => !ele.hidden);
		for (const trapData of trapsToInit) {
			this.addTrap(trapData);
		}
	}

	addTrap(data, actionKey = null, posType = 'game') {
		if (!data) {
			data = this.config.traps.find((ele) => ele.alias === actionKey || ele.key === actionKey);
		}
		// console.log(data, actionKey);
		if (!data) {
			return;
		}
		const pos = posType === 'game' ? this.gameToWorldPos(data.pos) : data.pos;
		const positionKey = `${pos.col},${pos.row}`;
		const existing = this.traps.get(positionKey);
		if (existing) existing.remove();
		const trap = new Trap(data, pos, this.isSimulation, null, this as any);
		this.traps.set(positionKey, trap);
		if (trap.isRoadblock) {
			trap.roadblockPreviousValue = this.mazeLayout[pos.row][pos.col];
			trap.roadblockApplied = true;
			this.updateMazeLayout(pos, 1000);
		}
		return trap;
	}

	removeTrap(trap: Trap) {
		const positionKey = `${trap.position.col},${trap.position.row}`;
		if (this.traps.get(positionKey) === trap) this.traps.delete(positionKey);
		if (!trap.isRoadblock || !trap.roadblockApplied) return;
		trap.roadblockApplied = false;
		this.updateMazeLayout(
			trap.position,
			trap.roadblockPreviousValue ?? this.baseMazeLayout[trap.position.row][trap.position.col]
		);
	}

	applyObstacleEvent(event: ObstacleEvent) {
		const positionKey = `${event.position.col},${event.position.row}`;
		if (event.action === 'place') {
			const trap = this.addTrap(
				{ key: event.trapKey, direction: 'UP', pos: event.position },
				null,
				'world'
			);
			if (trap) trap.userPlacementId = event.placementId;
			return;
		}

		const trap = event.placementId
			? [...this.traps.values()].find(
					(candidate) => candidate.userPlacementId === event.placementId
				)
			: this.traps.get(positionKey);
		if (trap?.isRoadblock && trap.key === event.trapKey) trap.remove();
	}

	update(delta: number) {
		this.runtime.setValue('scaledElapsedTime', this.runtime.scaledElapsedTime + delta);
		this.noWaveBlockingSpawns =
			this.enemiesOnMap.filter((enemy) => !enemy.dontBlockWave).length === 0;
		this.noEnemyAlive = this.enemiesOnMap.filter((enemy) => !enemy.notCountInTotal).length === 0;
		for (const enemy of this.enemiesOnMap) {
			enemy.update(delta);
		}
		this.enemiesOnMap = this.enemiesOnMap.filter((ele) => ele.alive);
	}
}
