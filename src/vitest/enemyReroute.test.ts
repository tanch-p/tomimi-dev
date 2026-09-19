import * as THREE from 'three';
import { expect, test } from 'vitest';
import { Enemy } from '$lib/components/StageSimulator/objects/Enemy';
import { SPFA } from '$lib/components/StageSimulator/objects/SPFA';

function createEnemy(pathFinder: SPFA, actions: any[]) {
	const enemy = Object.create(Enemy.prototype) as any;
	Object.assign(enemy, {
		actions,
		avoidanceForce: new THREE.Vector3(),
		currentActionIndex: 0,
		gameManager: {
			pathFinder,
			isSimulation: true
		},
		gridPos: '0,1',
		isMoving: true,
		motionMode: 'WALK',
		pathFinder,
		pathRevision: 0,
		route: {
			allowDiagonalMove: true,
			startPosition: { row: 1, col: 0 },
			endPosition: { row: 2, col: 2 }
		},
		targetPos: {}
	});
	return enemy;
}

test('a WALK enemy rebuilds only its remaining route after a map revision', () => {
	const pathFinder = new SPFA([
		[0, 0, 0],
		[0, 0, 0],
		[0, 0, 0]
	]);
	const waitAction = { type: 'WAIT_FOR_SECONDS', time: 1 };
	const enemy = createEnemy(pathFinder, [
		{ type: 'MOVE', position: { row: 1, col: 1 }, pathType: 'intermediate' },
		{
			type: 'MOVE',
			position: { row: 1, col: 2 },
			pathType: 'cp',
			reachOffset: { x: 0, y: 0 }
		},
		waitAction,
		{
			type: 'MOVE',
			position: { row: 2, col: 2 },
			pathType: 'end',
			reachOffset: { x: 0, y: 0 }
		}
	]);

	pathFinder.updateTile({ row: 1, col: 1 }, Infinity);
	enemy.rerouteForMapChange();

	expect(enemy.actions).not.toContainEqual(
		expect.objectContaining({ type: 'MOVE', position: { row: 1, col: 1 } })
	);
	expect(enemy.actions).toContain(waitAction);
	expect(enemy.actions).toContainEqual(
		expect.objectContaining({ type: 'MOVE', pathType: 'cp', position: { row: 1, col: 2 } })
	);
	expect(enemy.actions.at(-1)).toEqual(
		expect.objectContaining({ type: 'MOVE', pathType: 'end', position: { row: 2, col: 2 } })
	);
	expect(enemy.isMoving).toBe(false);
	expect(enemy.pathRevision).toBe(pathFinder.revision);
});

test('an unreachable checkpoint remains as a blocked movement action', () => {
	const pathFinder = new SPFA([
		[0, 0, 0],
		[0, 0, 0],
		[0, 0, 0]
	]);
	const enemy = createEnemy(pathFinder, [
		{
			type: 'MOVE',
			position: { row: 1, col: 2 },
			pathType: 'end',
			reachOffset: { x: 0, y: 0 }
		}
	]);
	pathFinder.updateTiles([0, 1, 2].map((row) => ({ position: { row, col: 1 }, value: Infinity })));

	enemy.rerouteForMapChange();

	expect(enemy.actions).toStrictEqual([
		expect.objectContaining({
			type: 'MOVE',
			pathType: 'end',
			pathBlocked: true,
			position: { row: 1, col: 2 }
		})
	]);
});

test('non-WALK enemies keep their existing actions on a map revision', () => {
	const pathFinder = new SPFA([[0, 0]]);
	const actions = [{ type: 'MOVE', position: { row: 0, col: 1 }, pathType: 'end' }];
	const enemy = createEnemy(pathFinder, actions);
	enemy.motionMode = 'FLY';
	pathFinder.updateTile({ row: 0, col: 0 }, Infinity);

	enemy.rerouteForMapChange();

	expect(enemy.actions).toBe(actions);
	expect(enemy.pathRevision).toBe(pathFinder.revision);
});
