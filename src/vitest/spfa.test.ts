import { expect, test } from 'vitest';
import { SPFA } from '$lib/components/StageSimulator/objects/SPFA';
import { generateMaze } from '$lib/functions/mazeHelpers';

const cases = [
	[
		'rogue1_1-2',
		5,
		[
			[8, 1],
			[2, 3],
			[1, 4],
			[0, 4]
		]
	],
	[
		'rogue3_6-2',
		11,
		[
			[1, 4],
			[2, 4],
			[3, 4],
			[3, 3],
			[5, 1],
			[6, 1],
			[7, 1],
			[7, 2],
			[8, 2],
			[9, 3],
			[9, 4],
			[9, 5],
			[8, 6],
			[7, 6],
			[7, 7],
			[6, 7],
			[5, 7],
			[4, 6],
			[4, 5],
			[3, 5],
			[3, 4],
			[3, 3],
			[5, 1],
			[6, 1],
			[7, 1],
			[7, 2],
			[8, 2],
			[9, 3],
			[9, 4],
			[11, 4]
		]
	],
	[
		'rogue3_b-1',
		4,
		[
			[1, 6],
			[2, 4],
			[2, 0]
		]
	],
	[
		'rogue3_b-5',
		6,
		[
			[2, 5],
			[4, 5],
			[5, 1],
			[7, 1],
			[8, 5],
			[10, 5],
			[10, 1],
			[11, 1]
		]
	],
	[
		'rogue4_2-2',
		3,
		[
			[4, 5],
			[4, 1],
			[7, 1],
			[7, 3],
			[6, 3]
		]
	]
];

test.each(cases)('SPFA: %s routeIndex %i', async (levelId, routeIndex, expected) => {
	const mapConfig = await import(`../lib/data/stages/ro_stage_data/level_${levelId}.json`);
	const mazeLayout = generateMaze(mapConfig?.mapData.map, mapConfig?.mapData.tiles);
	const pathFinder = new SPFA(mazeLayout);
	const route = convertMovementConfig(mapConfig?.routes[routeIndex], mazeLayout);
	const actions = [
		...route.checkpoints.map((cp) => {
			return { ...cp, pathType: 'cp' };
		}),
		{
			type: 'MOVE',
			time: 0.0,
			position: route.endPosition,
			reachOffset: {
				x: 0.0,
				y: 0.0
			},
			randomizeReachOffset: false,
			reachDistance: 0.0,
			pathType: 'end'
		}
	];
	let currentPosition = route.startPosition;
	const movementRoute = actions.reduce((acc, action) => {
		const { type, position } = action;
		switch (type) {
			case 'MOVE':
				{
					const paths = pathFinder.findPath(currentPosition, position);
					const relevantPaths = paths?.slice(1);
					if (relevantPaths) {
						relevantPaths.forEach(([col, row]) => {
							acc.push([col, row]);
						});
					}
				}
				currentPosition = position;
				break;
			case 'APPEAR_AT_POS':
				currentPosition = position;
				break;
			default:
				break;
		}

		return acc;
	}, []);
	expect(movementRoute).toStrictEqual(expected);
});

test('SPFA prevents diagonal corner cutting', () => {
	const pathFinder = new SPFA([
		[0, Infinity],
		[0, 0]
	]);
	const weightedPathFinder = new SPFA([
		[0, 1000],
		[0, 0]
	]);

	expect(pathFinder.canStep(0, 0, 1, 1)).toBe(false);
	expect(pathFinder.canStep(0, 0, 0, 0)).toBe(false);
	expect(weightedPathFinder.canStep(0, 0, 1, 0)).toBe(true);
	expect(weightedPathFinder.canStep(0, 0, 1, 1)).toBe(false);
	expect(pathFinder.findPath({ row: 0, col: 0 }, { row: 1, col: 1 }, false)).toStrictEqual([
		[0, 0],
		[0, 1],
		[1, 1]
	]);
});

test('SPFA checks the full 2x2 advancing corridor', () => {
	const clearPathFinder = new SPFA([
		[0, 0],
		[0, 0],
		[0, 0]
	]);
	const blockedPathFinder = new SPFA([
		[0, 0],
		[0, 0],
		[Infinity, 0]
	]);
	const allowedWeightedPathFinder = new SPFA([
		[0, 0],
		[0, 0],
		[100, 0]
	]);
	const rejectedWeightedPathFinder = new SPFA([
		[0, 0],
		[0, 0],
		[101, 0]
	]);

	expect(clearPathFinder.hasClearCorridor([0, 0], [1, 2])).toBe(true);
	expect(blockedPathFinder.hasClearCorridor([0, 0], [1, 2])).toBe(false);
	expect(allowedWeightedPathFinder.hasClearCorridor([0, 0], [1, 2])).toBe(true);
	expect(rejectedWeightedPathFinder.hasClearCorridor([0, 0], [1, 2])).toBe(false);
});

test('SPFA corridor cost includes the weight of every tile occupied by the corridor', () => {
	const pathFinder = new SPFA([[0, 100, 0]]);
	const rejectedWeightedPathFinder = new SPFA([[0, 1000, 0]]);
	const blockedPathFinder = new SPFA([[0, Infinity, 0]]);
	const smoothingPathFinder = new SPFA([
		[0, 1000, 0],
		[0, 0, 0]
	]);

	// Match SPFA's step model: one step enters the weighted center tile and one
	// step enters the normal endpoint tile: 100 + 1.
	expect(pathFinder.getClearCorridorCost([0, 0], [2, 0])).toBe(101);
	expect(rejectedWeightedPathFinder.getClearCorridorCost([0, 0], [2, 0])).toBe(Infinity);
	expect(blockedPathFinder.getClearCorridorCost([0, 0], [2, 0])).toBe(Infinity);
	expect(smoothingPathFinder.findPath({ row: 0, col: 0 }, { row: 0, col: 2 })).toStrictEqual([
		[0, 0],
		[0, 1],
		[2, 1],
		[2, 0]
	]);
});

test('SPFA smoothing avoids the weighted corner when moving to the first checkpoint', () => {
	const pathFinder = new SPFA([
		[
			Infinity,
			0,
			Infinity,
			Infinity,
			Infinity,
			Infinity,
			Infinity,
			0,
			Infinity,
			Infinity,
			Infinity,
			Infinity
		],
		[0, 0, 0, 0, 0, Infinity, Infinity, 0, 0, 0, Infinity, Infinity],
		[Infinity, 0, Infinity, 0, 0, 1000, Infinity, Infinity, Infinity, 0, 0, Infinity],
		[Infinity, 0, Infinity, Infinity, 0, 1000, Infinity, Infinity, 0, 0, 0, 0],
		[Infinity, 0, 0, 0, 0, 1000, 0, 0, 0, 0, Infinity, Infinity],
		[Infinity, Infinity, Infinity, 0, Infinity, 1000, 0, 0, 0, Infinity, Infinity, Infinity],
		[0, 0, 0, 0, 0, 0, 0, Infinity, Infinity, Infinity, Infinity, Infinity],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, Infinity, Infinity, Infinity],
		[
			Infinity,
			Infinity,
			Infinity,
			Infinity,
			Infinity,
			Infinity,
			Infinity,
			Infinity,
			Infinity,
			Infinity,
			Infinity,
			Infinity
		]
	]);

	expect(pathFinder.getClearCorridorCost([5, 6], [6, 5])).toBe(Infinity);
	expect(pathFinder.findPath({ row: 7, col: 0 }, { row: 5, col: 6 })).toStrictEqual([
		[0, 7],
		[6, 6],
		[6, 5]
	]);
});

test('SPFA smoothing may create a waypoint outside the raw path', () => {
	const pathFinder = new SPFA([
		[
			Infinity,
			Infinity,
			Infinity,
			Infinity,
			0,
			Infinity,
			Infinity,
			Infinity,
			Infinity,
			Infinity,
			0,
			Infinity
		],
		[Infinity, Infinity, 0, 0, 0, Infinity, Infinity, 0, 0, 0, 0, 0],
		[Infinity, 0, 0, Infinity, Infinity, Infinity, 0, 0, Infinity, Infinity, Infinity, Infinity],
		[Infinity, Infinity, 0, 0, 0, Infinity, 0, 0, 0, 0, Infinity, Infinity],
		[Infinity, 0, 0, Infinity, 0, Infinity, Infinity, 0, Infinity, 0, 0, Infinity],
		[Infinity, 0, 0, 0, 0, Infinity, Infinity, 0, 0, 0, 0, Infinity],
		[Infinity, 0, Infinity, Infinity, 0, 0, 0, 0, Infinity, 0, 0, Infinity],
		[
			Infinity,
			Infinity,
			Infinity,
			Infinity,
			Infinity,
			Infinity,
			Infinity,
			Infinity,
			Infinity,
			Infinity,
			Infinity,
			Infinity
		]
	]);

	const path = pathFinder.findPath({ row: 6, col: 10 }, { row: 1, col: 11 });
	const rawPath = pathFinder.buildPath(10, 6);
	const pathFromRowFive = pathFinder.findPath({ row: 5, col: 10 }, { row: 1, col: 11 });

	expect(path[1]).toStrictEqual([9, 4]);
	expect(rawPath.some(([x, y]) => x === 9 && y === 4)).toBe(false);
	expect(path[path.length - 1]).toStrictEqual([11, 1]);
	expect(pathFromRowFive[1]).toStrictEqual([9, 4]);
	expect(pathFinder.getClearCorridorCost([10, 5], [9, 4])).toBeCloseTo(Math.SQRT2);
	expect(pathFinder.getClearCorridorCost([10, 5], [7, 5])).toBe(3);
	expect(
		path.slice(1).every((coordinate, index) => pathFinder.hasClearCorridor(path[index], coordinate))
	).toBe(true);
});

test('SPFA caches orthogonal and diagonal path graphs separately', () => {
	const pathFinder = new SPFA([
		[0, 0, 0, 0],
		[0, 0, 0, 0],
		[0, 0, 0, 0],
		[0, 0, 0, 0]
	]);
	const start = { row: 0, col: 0 };
	const end = { row: 3, col: 3 };

	const orthogonalPath = pathFinder.findPath(start, end, false);
	const smoothedPath = pathFinder.findPath(start, end, true);

	expect(orthogonalPath).toHaveLength(7);
	expect(
		orthogonalPath.slice(1).every(([x, y], index) => {
			const [previousX, previousY] = orthogonalPath[index];
			return Math.abs(x - previousX) + Math.abs(y - previousY) === 1;
		})
	).toBe(true);
	expect(smoothedPath).toStrictEqual([
		[0, 0],
		[3, 3]
	]);
});

const convertMovementConfig = (route, mazeLayout) => {
	const height = mazeLayout.length;
	const start = {
		row: height - 1 - route.startPosition.row,
		col: route.startPosition.col
	};
	const end = {
		row: height - 1 - route.endPosition.row,
		col: route.endPosition.col
	};
	const checkpoints = [...route.checkpoints];
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
