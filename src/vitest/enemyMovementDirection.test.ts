import * as THREE from 'three';
import { describe, expect, test } from 'vitest';
import { Enemy } from '$lib/components/StageSimulator/objects/Enemy';
import { GameConfig } from '$lib/components/StageSimulator/objects/GameConfig.svelte.js';
import { GameManager } from '$lib/components/StageSimulator/objects/GameManager';
import { SPFA } from '$lib/components/StageSimulator/objects/SPFA';
import { generateMaze } from '$lib/functions/mazeHelpers';
import stageData from '../lib/data/stages/ro_stage_data/level_rogue6_5-1.json' with { type: 'json' };

const route = {
	motionMode: 'WALK',
	startPosition: { row: 6, col: 9 },
	endPosition: { row: 1, col: 10 },
	spawnRandomRange: { x: 0, y: 0 },
	spawnOffset: { x: 0, y: 0 },
	checkpoints: [
		{ type: 'MOVE', time: 0, position: { row: 6, col: 8 } },
		{ type: 'WAIT_FOR_SECONDS', time: 5, position: { row: 7, col: 0 } },
		{ type: 'MOVE', time: 0, position: { row: 6, col: 2 } },
		{ type: 'MOVE', time: 0, position: { row: 5, col: 2 } },
		{ type: 'MOVE', time: 0, position: { row: 5, col: 1 } },
		{ type: 'MOVE', time: 0, position: { row: 2, col: 1 } },
		{ type: 'MOVE', time: 0, position: { row: 2, col: 3 } },
		{ type: 'MOVE', time: 0, position: { row: 4, col: 3 } },
		{ type: 'MOVE', time: 0, position: { row: 4, col: 5 } },
		{ type: 'MOVE', time: 0, position: { row: 2, col: 5 } },
		{ type: 'MOVE', time: 0, position: { row: 2, col: 7 } },
		{ type: 'MOVE', time: 0, position: { row: 4, col: 7 } },
		{ type: 'MOVE', time: 0, position: { row: 4, col: 9 } },
		{ type: 'MOVE', time: 0, position: { row: 1, col: 9 } }
	].map((checkpoint) => ({
		...checkpoint,
		reachOffset: { x: 0, y: 0 },
		reachDistance: 0
	})),
	allowDiagonalMove: true,
	visitEveryTileCenter: false,
	visitEveryNodeCenter: false,
	visitEveryCheckPoint: false
};

const endRoute = {
	...route,
	endPosition: { row: 5, col: 0 },
	checkpoints: route.checkpoints.slice(0, 4)
};

const windingRoute = {
	motionMode: 'WALK',
	startPosition: { row: 1, col: 7 },
	endPosition: { row: 5, col: 0 },
	spawnRandomRange: { x: 0, y: 0 },
	spawnOffset: { x: 0, y: 0 },
	checkpoints: [
		{
			type: 'MOVE',
			time: 0,
			position: { row: 5, col: 1 },
			reachOffset: { x: 0, y: 0 },
			reachDistance: 0
		}
	],
	allowDiagonalMove: true,
	visitEveryTileCenter: false,
	visitEveryNodeCenter: false,
	visitEveryCheckPoint: false
};

const noCheckpointWindingRoute = {
	...windingRoute,
	checkpoints: []
};

const noFutureCheckpointRoute = {
	...windingRoute,
	startPosition: { row: 0, col: 2 },
	endPosition: { row: 2, col: 2 },
	checkpoints: [
		{
			type: 'MOVE',
			time: 0,
			position: { row: 0, col: 1 },
			reachOffset: { x: 0, y: 0 },
			reachDistance: 0
		}
	],
	allowDiagonalMove: false
};

const noFutureCheckpointMaze = [
	[Number.POSITIVE_INFINITY, 0, 0],
	[Number.POSITIVE_INFINITY, 0, Number.POSITIVE_INFINITY],
	[Number.POSITIVE_INFINITY, 0, 0]
];

const disappearingWindingRoute = {
	motionMode: 'WALK',
	startPosition: { row: 6, col: 9 },
	endPosition: { row: 5, col: 0 },
	spawnRandomRange: { x: 0, y: 0 },
	spawnOffset: { x: 0, y: 0 },
	checkpoints: [
		{ type: 'MOVE', time: 0, position: { row: 6, col: 10 } },
		{ type: 'WAIT_FOR_SECONDS', time: 5, position: { row: 7, col: 0 } },
		{ type: 'MOVE', time: 0, position: { row: 5, col: 10 } },
		{ type: 'DISAPPEAR', time: 0, position: { row: 7, col: 0 } },
		{ type: 'WAIT_FOR_SECONDS', time: 5, position: { row: 7, col: 0 } },
		{ type: 'APPEAR_AT_POS', time: 0, position: { row: 0, col: 7 } },
		{ type: 'MOVE', time: 0, position: { row: 2, col: 7 } },
		{ type: 'MOVE', time: 0, position: { row: 2, col: 5 } },
		{ type: 'MOVE', time: 0, position: { row: 4, col: 5 } },
		{ type: 'MOVE', time: 0, position: { row: 4, col: 3 } },
		{ type: 'MOVE', time: 0, position: { row: 2, col: 3 } },
		{ type: 'MOVE', time: 0, position: { row: 2, col: 1 } },
		{ type: 'MOVE', time: 0, position: { row: 5, col: 1 } }
	].map((checkpoint) => ({
		...checkpoint,
		reachOffset: { x: 0, y: 0 },
		reachDistance: 0
	})),
	allowDiagonalMove: true,
	visitEveryTileCenter: false,
	visitEveryNodeCenter: false,
	visitEveryCheckPoint: false
};

const windingMaze = generateMaze(stageData.data[0].mapData.map, stageData.data[0].mapData.tiles);

function createGameManager(mazeLayout = Array.from({ length: 8 }, () => Array(11).fill(0))) {
	const manager = Object.create(GameManager.prototype) as any;
	const getCoordinate = (coordinate, type = 'x') => {
		const center = type === 'x' ? mazeLayout[0].length / 2 : mazeLayout.length / 2;
		return (coordinate - center) * GameConfig.gridSize + GameConfig.gridSize / 2;
	};
	Object.assign(manager, {
		config: { levelId: 'movement_direction_test' },
		isSimulation: true,
		mazeLayout,
		pathFinder: new SPFA(mazeLayout),
		traps: new Map(),
		runtime: {
			stagePhaseIndex: 0,
			steeringEnabled: true,
			waveElapsedTime: 0
		},
		getVectorCoordinates: (position, reachOffset) => {
			const offsetX = reachOffset?.x ?? 0;
			const offsetY = reachOffset?.y ?? 0;
			return {
				x: getCoordinate(Number(position.col) + offsetX, 'x'),
				y: -getCoordinate(Number(position.row) - offsetY, 'y')
			};
		},
		getGridPosition: (position) => [
			Math.floor(
				(position.x + (mazeLayout[0].length * GameConfig.gridSize) / 2) / GameConfig.gridSize
			),
			Math.floor(((mazeLayout.length * GameConfig.gridSize) / 2 - position.y) / GameConfig.gridSize)
		],
		getGridPosFromVectors: (position) => manager.getGridPosition(position).join(','),
		tiles: new Map()
	});
	return manager;
}

function createEnemyForActualMovement(movementRoute, mazeLayout?) {
	const gameManager = createGameManager(mazeLayout);
	const enemy = Object.create(Enemy.prototype) as any;
	const start = gameManager.getVectorCoordinates(movementRoute.startPosition, null);
	const startPosition = new THREE.Vector3(start.x, start.y, GameConfig.baseZIndex);
	Object.assign(enemy, {
		actions: [],
		animState: 'Idle',
		arrivalThreshold: GameConfig.gridSize * 0.45,
		avoidanceForce: new THREE.Vector3(),
		avoidanceFrameCounter: 0,
		baseSpeed: 1,
		cachedFacingActionIndex: -1,
		cachedFacingActions: null,
		cachedFacingTarget: null,
		cachedFacingPreservesFacing: false,
		countdownId: -1,
		currentActionIndex: 0,
		direction: new THREE.Vector3(),
		disguiseSkel: { scale: { x: 1 } },
		exit: false,
		facingDirectionScratch: new THREE.Vector3(),
		gameManager,
		gridPos: `${movementRoute.startPosition.col},${movementRoute.startPosition.row}`,
		halfBodyWidth: 0.2,
		handleAnimUpdate: () => undefined,
		inertia: new THREE.Vector3(),
		isMoving: false,
		key: 'movement_direction_test',
		meshGroup: new THREE.Group(),
		moddedSpeed: 1,
		motionMode: 'WALK',
		movementDirectionScratch: new THREE.Vector3(),
		movementFrameAccumulator: 0,
		pathFinder: gameManager.pathFinder,
		pathRevision: gameManager.pathFinder.revision,
		raycastPos: startPosition.clone(),
		route: movementRoute,
		skel: { scale: { x: 1 } },
		skillManager: {
			isHoldingForSummons: false,
			isUsingSkill: false,
			update: () => undefined
		},
		specials: [],
		standbyTime: 0,
		startDuration: 0,
		startElapsedTime: 0,
		state: 'idle',
		timeToWait: 0,
		timeoutDuration: null,
		traits: [],
		waitElapsedTime: 0
	});
	enemy.meshGroup.position.copy(startPosition);
	enemy.actions = enemy.getActions(movementRoute);
	return enemy;
}

function runActualMovement(movementRoute, lastActionIndex, mazeLayout?) {
	const enemy = createEnemyForActualMovement(movementRoute, mazeLayout);
	const samples = new Map();
	for (let frame = 0; frame < 20_000 && enemy.currentActionIndex <= lastActionIndex; frame++) {
		const actionIndex = enemy.currentActionIndex;
		enemy.update(1 / 30);
		if (enemy.actions[actionIndex]?.type !== 'MOVE' || !enemy.direction) continue;
		const actionSamples = samples.get(actionIndex) ?? [];
		actionSamples.push({
			directionX: enemy.direction.x,
			skelScaleX: enemy.skel.scale.x,
			disguiseSkelScaleX: enemy.disguiseSkel.scale.x
		});
		samples.set(actionIndex, actionSamples);
	}
	expect(enemy.currentActionIndex).toBeGreaterThan(lastActionIndex);
	return samples;
}

function expectFacingThroughoutMovement(samples, expectedDirection) {
	expect(samples?.length).toBeGreaterThan(0);
	for (const sample of samples) {
		expect(Math.sign(sample.directionX)).toBe(expectedDirection);
		expect(sample.skelScaleX).toBe(expectedDirection);
		expect(sample.skelScaleX).toBe(Math.sign(sample.directionX));
		expect(sample.disguiseSkelScaleX).toBe(expectedDirection);
	}
}

describe('enemy movement direction', () => {
	test('uses direct direction throughout horizontal movement', () => {
		const samples = runActualMovement(route, 2);

		expectFacingThroughoutMovement(samples.get(2), -1);
	});

	test('faces right throughout movement from checkpoint 6 to 7', () => {
		const samples = runActualMovement(route, 7);

		expectFacingThroughoutMovement(samples.get(7), 1);
	});

	test('faces left throughout movement from checkpoint 2 to 3', () => {
		const samples = runActualMovement(route, 3);

		expectFacingThroughoutMovement(samples.get(3), -1);
	});

	test('keeps a negative x direction when the next horizontal movement checkpoint is in the negative x direction', () => {
		const samples = runActualMovement(endRoute, 3);

		expectFacingThroughoutMovement(samples.get(3), -1);
	});

	test('faces left through both vertical sections of the winding route', () => {
		const samples = runActualMovement(windingRoute, 4, windingMaze);

		expectFacingThroughoutMovement(samples.get(2), -1);
		expectFacingThroughoutMovement(samples.get(4), -1);
	});

	test('keeps its current facing through vertical movement when the route has no checkpoints', () => {
		const samples = runActualMovement(noCheckpointWindingRoute, 2, windingMaze);

		expectFacingThroughoutMovement(samples.get(0), 1);
		expectFacingThroughoutMovement(samples.get(1), -1);
		expectFacingThroughoutMovement(samples.get(2), -1);
	});

	test('keeps its current facing through vertical movement when no checkpoints remain', () => {
		const samples = runActualMovement(noFutureCheckpointRoute, 3, noFutureCheckpointMaze);

		expectFacingThroughoutMovement(samples.get(0), -1);
		expectFacingThroughoutMovement(samples.get(1), -1);
		expectFacingThroughoutMovement(samples.get(2), -1);
		expectFacingThroughoutMovement(samples.get(3), 1);
	});

	test('faces left from checkpoint 5 to 6 and checkpoint 7 to 8 after reappearing', () => {
		const samples = runActualMovement(disappearingWindingRoute, 8, windingMaze);

		expectFacingThroughoutMovement(samples.get(6), -1);
		expectFacingThroughoutMovement(samples.get(8), -1);
	});
});
