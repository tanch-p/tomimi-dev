import { expect, test } from 'vitest';
import { SPFA } from '$lib/components/StageSimulator/objects/SPFA';
import { generateMaze } from '$lib/functions/mazeHelpers';

const cases = [
	[
		'rogue1_1-2',
		5,
		[
			[8, 1],
			[7, 3],
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
			[4, 2],
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
			[4, 2],
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
