import { expect, test, vi } from 'vitest';
import { GameManager } from '$lib/components/StageSimulator/objects/GameManager';
import { SPFA } from '$lib/components/StageSimulator/objects/SPFA';

function createGameManager() {
	const mazeLayout = [
		[0, 0, 0],
		[0, 7, 0],
		[0, 0, 0]
	];
	const rerouteForMapChange = vi.fn();
	const manager = Object.create(GameManager.prototype) as any;
	Object.assign(manager, {
		baseMazeLayout: structuredClone(mazeLayout),
		config: {
			routes: [{ endPosition: { row: 0, col: 2 } }],
			extra_routes: []
		},
		enemiesOnMap: [{ route: null, rerouteForMapChange }],
		mazeLayout,
		pathFinder: new SPFA(mazeLayout),
		roadblockReachabilityCache: new Map(),
		traps: new Map(),
		tiles: new Map(
			Array.from({ length: 3 }, (_, row) =>
				Array.from({ length: 3 }, (_, col) => [
					`${col},${row}`,
					{ buildableType: 1, heightType: 0 }
				])
			).flat()
		)
	});
	return { manager, rerouteForMapChange };
}

test('GameManager rejects blocked route ends and reroutes after other map changes', () => {
	const { manager, rerouteForMapChange } = createGameManager();
	const pathFinder = manager.pathFinder;

	expect(manager.updateMazeLayout({ row: 2, col: 2 }, Infinity)).toBe(false);
	expect(pathFinder.revision).toBe(0);
	expect(manager.pathFinder).toBe(pathFinder);

	expect(manager.updateMazeLayout({ row: 1, col: 1 }, Infinity)).toBe(true);
	expect(manager.pathFinder).toBe(pathFinder);
	expect(pathFinder.revision).toBe(1);
	expect(rerouteForMapChange).toHaveBeenCalledOnce();
});

test('GameManager validates user roadblock placement against the live map', () => {
	const { manager } = createGameManager();

	expect(manager.canPlaceRoadblock({ row: 1, col: 1 })).toBe(true);
	expect(manager.canPlaceRoadblock({ row: 2, col: 2 })).toBe(false);

	manager.tiles.get('0,0').buildableType = 0;
	expect(manager.canPlaceRoadblock({ row: 0, col: 0 })).toBe(false);

	manager.tiles.get('1,0').heightType = 1;
	expect(manager.canPlaceRoadblock({ row: 0, col: 1 })).toBe(false);

	manager.traps.set('0,1', {});
	expect(manager.canPlaceRoadblock({ row: 1, col: 0 })).toBe(false);
});

test('GameManager rejects a roadblock on a tile occupied by an enemy', () => {
	const { manager } = createGameManager();
	manager.enemiesOnMap[0].gridPos = '1,1';

	expect(manager.canPlaceRoadblock({ row: 1, col: 1 })).toBe(false);
});

test('GameManager rejects a roadblock that disconnects a WALK route', () => {
	const { manager } = createGameManager();
	manager.config.routes = [
		{
			motionMode: 'WALK',
			startPosition: { row: 1, col: 0 },
			endPosition: { row: 1, col: 2 },
			checkpoints: [],
			allowDiagonalMove: true
		}
	];
	expect(manager.canPlaceRoadblock({ row: 1, col: 1 })).toBe(true);

	manager.mazeLayout = [
		[Infinity, Infinity, Infinity],
		[0, 0, 0],
		[Infinity, Infinity, Infinity]
	];
	manager.pathFinder = new SPFA(manager.mazeLayout);
	manager.roadblockReachabilityCache.clear();

	expect(manager.canPlaceRoadblock({ row: 1, col: 1 })).toBe(false);
	expect(manager.mazeLayout[1][1]).toBe(0);
	expect(manager.pathFinder.revision).toBe(0);
});

test('GameManager checks every MOVE checkpoint before accepting a roadblock', () => {
	const { manager } = createGameManager();
	manager.config.routes = [
		{
			motionMode: 'WALK',
			startPosition: { row: 1, col: 0 },
			endPosition: { row: 1, col: 2 },
			checkpoints: [
				{
					type: 'MOVE',
					position: { row: 0, col: 1 }
				}
			],
			allowDiagonalMove: false
		}
	];
	manager.mazeLayout = [
		[0, 0, 0],
		[0, 0, 0],
		[0, 0, 0]
	];
	manager.pathFinder = new SPFA(manager.mazeLayout);
	manager.roadblockReachabilityCache.clear();

	// The configured checkpoint is world position { row: 2, col: 1 }.
	expect(manager.canPlaceRoadblock({ row: 2, col: 1 })).toBe(false);
});

test('GameManager rejects a roadblock when the only remaining route crosses a hole', () => {
	const { manager } = createGameManager();
	manager.config.routes = [
		{
			motionMode: 'WALK',
			startPosition: { row: 1, col: 0 },
			endPosition: { row: 1, col: 2 },
			checkpoints: [],
			allowDiagonalMove: false
		}
	];
	manager.mazeLayout = [
		[0, 1000, 0],
		[0, 0, 0],
		[Infinity, Infinity, Infinity]
	];
	manager.pathFinder = new SPFA(manager.mazeLayout);
	manager.roadblockReachabilityCache.clear();

	// Blocking the center leaves a technically passable SPFA route, but it must
	// enter the hole at { row: 0, col: 1 }.
	expect(manager.canPlaceRoadblock({ row: 1, col: 1 })).toBe(false);
});

test('GameManager allows a roadblock when a hole-free alternative route remains', () => {
	const { manager } = createGameManager();
	manager.config.routes = [
		{
			motionMode: 'WALK',
			startPosition: { row: 1, col: 0 },
			endPosition: { row: 1, col: 2 },
			checkpoints: [],
			allowDiagonalMove: false
		}
	];
	manager.mazeLayout = [
		[0, 1000, 0],
		[0, 0, 0],
		[0, 0, 0]
	];
	manager.pathFinder = new SPFA(manager.mazeLayout);
	manager.roadblockReachabilityCache.clear();

	expect(manager.canPlaceRoadblock({ row: 1, col: 1 })).toBe(true);
});

test('removing a roadblock restores the value underneath it', () => {
	const { manager, rerouteForMapChange } = createGameManager();
	const trap = {
		isRoadblock: 1,
		position: { row: 1, col: 1 },
		roadblockApplied: true,
		roadblockPreviousValue: 7
	};
	manager.traps.set('1,1', trap);
	manager.updateMazeLayout(trap.position, Infinity);

	manager.removeTrap(trap);

	expect(manager.mazeLayout[1][1]).toBe(7);
	expect(manager.traps.has('1,1')).toBe(false);
	expect(trap.roadblockApplied).toBe(false);
	expect(rerouteForMapChange).toHaveBeenCalledTimes(2);
});

test('GameManager clears every retained scene-object collection', () => {
	const manager = Object.create(GameManager.prototype) as any;
	const removeEnemy = vi.fn();
	const removeTrap = vi.fn();
	const removeRollOver = vi.fn();
	const removeAllCountdowns = vi.fn();
	Object.assign(manager, {
		countdownManager: { removeAllCountdowns },
		enemiesOnMap: [{ remove: removeEnemy }],
		roadblockReachabilityCache: new Map([['old', true]]),
		rollOverMeshes: new Map([['token', { remove: removeRollOver }]]),
		tiles: new Map([['old', {}]]),
		traps: new Map([['0,0', { remove: removeTrap }]])
	});

	manager.clearSceneObjects();

	expect(removeEnemy).toHaveBeenCalledOnce();
	expect(removeTrap).toHaveBeenCalledOnce();
	expect(removeRollOver).toHaveBeenCalledOnce();
	expect(removeAllCountdowns).toHaveBeenCalledOnce();
	expect(manager.enemiesOnMap).toEqual([]);
	expect(manager.traps.size).toBe(0);
	expect(manager.rollOverMeshes.size).toBe(0);
	expect(manager.tiles.size).toBe(0);
	expect(manager.roadblockReachabilityCache.size).toBe(0);
});

test('GameManager reset clears stale wave-completion state', () => {
	const manager = Object.create(GameManager.prototype) as any;
	Object.assign(manager, {
		clearSceneObjects: vi.fn(),
		initPlane: vi.fn(),
		initRollOverMeshes: vi.fn(),
		killedCount: 9,
		noEnemyAlive: true,
		noWaveBlockingSpawns: true,
		roadblockReachabilityCache: new Map([['old', true]]),
		tiles: new Map([['old', {}]])
	});

	manager.reset(
		{
			levelId: 'level_test',
			mapData: {
				map: [[0]],
				tiles: [['tile_floor']]
			}
		},
		[]
	);

	expect(manager.killedCount).toBe(0);
	expect(manager.noEnemyAlive).toBe(false);
	expect(manager.noWaveBlockingSpawns).toBe(false);
	expect(manager.roadblockReachabilityCache.size).toBe(0);
	expect(manager.tiles.size).toBe(0);
});
