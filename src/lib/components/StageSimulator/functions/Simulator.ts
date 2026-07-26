import type { MapConfig, Enemy as EnemyType, Position } from '$lib/types';
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

export function getSimulatedData(config: MapConfig, waveData, enemies: EnemyType[]) {
	if (
		[
			'level_rogue4_b-8',
			'level_rogue2_b-7',
			'level_rogue1_b-7',
			'level_rogue4_d-1',
			'level_rogue4_d-2',
			'level_rogue4_d-3',
			'level_rogue4_d-b'
		].includes(config.levelId)
	) {
		return;
	}
	if (['level_rogue4_b-7'].includes(config.levelId) && GameConfig.stagePhaseIndex == 1) {
		return;
	}
	const assetManager = AssetManager.getInstance();
	if (!assetManager.texturesLoaded) {
		return;
	}
	GameConfig.setValue('isPaused', true);
	const gameSimManager = new GameSimManager(config, enemies);
	const map = new GameMap(gameSimManager);
	const spawnManager = new SpawnManager(waveData, map, gameSimManager);
	let isEnded = false;
	let i = 1;
	let count = 0;
	let data = {};
	let enemiesToHighlight = [];
	setData(count, data, spawnManager, gameSimManager);
	enemiesToHighlight = spawnManager.enemiesToHighlight;

	// Simulate at 60fps, 1x speed
	while (!isEnded) {
		const deltaTime = 1 / 60;
		spawnManager.update(deltaTime);
		gameSimManager.update(deltaTime);

		if (i === 60) {
			i = 1;
			count++;
			setData(count, data, spawnManager, gameSimManager);
			if (Object.keys(data).length > 1800) {
				break;
			}
		} else {
			i++;
		}
		if (spawnManager.isFinished && gameSimManager.noEnemyAlive) {
			isEnded = true;
		}
	}
	GameConfig.setValue('scaledElapsedTime', 0);
	GameConfig.setValue('waveElapsedTime', 0);
	GameConfig.setValue('currentWaveIndex', 0);
	cleanup(gameSimManager);

	return { enemiesToHighlight: enemiesToHighlight, t: data };
}

function setData(count, data, spawnManager: SpawnManager, gameSimManager: GameSimManager) {
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
		enemiesOnMap: gameSimManager.enemiesOnMap.map((enemy) => {
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
				blinkState: enemy.blinkState,
				blinkElapsedTime: enemy.blinkElapsedTime,
				skillBlinkState: enemy.skillBlinkState,
				skillBlinkElapsedTime: enemy.skillBlinkElapsedTime,
				skillBlinkSkillKey: enemy.skillBlinkSkillKey,
				waitElapsedTime: enemy.waitElapsedTime,
				exit: enemy.exit,
				exitElapsedTime: enemy.exitElapsedTime,
				traits: enemy.traits,
				specials: enemy.specials,
				skillData: enemy.skillManager.getData(),
				formIndex: enemy.formIndex,
				spineAnimIndex: enemy.spineAnimIndex,
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
	gameSimManager.objects.forEach((obj: THREE.Group) => {
		clearObjects(obj);
	});
}

class GameSimManager {
	objects = [];
	config;
	mazeLayout: number[][];
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

	constructor(config: MapConfig, enemies: EnemyType[]) {
		this.enemies = enemies;
		this.config = config;
		const mazeLayout = generateMaze(config.mapData.map, config.mapData.tiles);
		this.mazeLayout = mazeLayout;
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
		const { row, col } = pos;
		this.mazeLayout[row][col] = value;
		this.pathFinder = new SPFA(this.mazeLayout);
	}

	initTraps(traps) {
		const predefineChanges = GameConfig.eliteMode && this.config.elite_runes?.predefine_changes;
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

	addTrap(data, actionKey, posType = 'game') {
		if (!data) {
			data = this.config.traps.find((ele) => ele.alias === actionKey || ele.key === actionKey);
		}
		// console.log(data, actionKey);
		if (!data) {
			return;
		}
		const pos = posType === 'game' ? this.gameToWorldPos(data.pos) : data.pos;
		const trap = new Trap(data, pos, this.isSimulation);
		if (trap.isRoadblock) {
			this.updateMazeLayout(pos, 1000);
		}
	}

	update(delta: number) {
		GameConfig.setValue('scaledElapsedTime', GameConfig.scaledElapsedTime + delta);
		this.noWaveBlockingSpawns =
			this.enemiesOnMap.filter((enemy) => !enemy.dontBlockWave).length === 0;
		this.noEnemyAlive = this.enemiesOnMap.filter((enemy) => !enemy.notCountInTotal).length === 0;
		for (const enemy of this.enemiesOnMap) {
			enemy.update(delta);
		}
		this.enemiesOnMap = this.enemiesOnMap.filter((ele) => ele.alive);
	}
}
