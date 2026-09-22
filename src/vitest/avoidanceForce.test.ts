import * as THREE from 'three';
import { expect, test, vi } from 'vitest';
import { GameManager } from '$lib/components/StageSimulator/objects/GameManager';
import { GameConfig } from '$lib/components/StageSimulator/objects/GameConfig.svelte.js';
import { Enemy } from '$lib/components/StageSimulator/objects/Enemy';

function createGameManager(mazeLayout: number[][]) {
	const manager = Object.create(GameManager.prototype) as any;
	Object.assign(manager, {
		mazeLayout,
		traps: new Map(),
		getGridPosition: (vector: THREE.Vector3) => [
			Math.floor(
				(vector.x + (mazeLayout[0].length * GameConfig.gridSize) / 2) / GameConfig.gridSize
			),
			Math.floor(((mazeLayout.length * GameConfig.gridSize) / 2 - vector.y) / GameConfig.gridSize)
		],
		getVectorCoordinates: ({ row, col }) => ({
			x: (col - mazeLayout[0].length / 2) * GameConfig.gridSize + GameConfig.gridSize / 2,
			y: -((row - mazeLayout.length / 2) * GameConfig.gridSize + GameConfig.gridSize / 2)
		})
	});
	return manager;
}

test('avoidance pushes away from a nearby blocked edge tile', () => {
	const manager = createGameManager([
		[0, 0, 0],
		[0, 0, Infinity],
		[0, 0, 0]
	]);

	const force = manager.calculateAvoidanceForce(
		new THREE.Vector3(0, 0, 0),
		new THREE.Vector3(40, 0, 0),
		new THREE.Vector3(0, 1, 0)
	);

	expect(force.toArray()).toStrictEqual([-1, 0, 0]);
});

test('avoidance uses world-space Y when pushing away from a blocked tile above', () => {
	const manager = createGameManager([
		[0, Infinity, 0],
		[0, 0, 0],
		[0, 0, 0]
	]);

	const force = manager.calculateAvoidanceForce(
		new THREE.Vector3(0, 0, 0),
		new THREE.Vector3(0, 40, 0),
		new THREE.Vector3(1, 0, 0)
	);

	expect(force.toArray()).toStrictEqual([0, -1, 0]);
});

test('avoidance removes the component parallel to the supplied direction', () => {
	const manager = createGameManager([
		[0, 0, 0],
		[0, 0, Infinity],
		[0, 0, 0]
	]);

	const force = manager.calculateAvoidanceForce(
		new THREE.Vector3(0, 0, 0),
		new THREE.Vector3(40, 0, 0),
		new THREE.Vector3(1, 0, 0)
	);

	expect(force.lengthSq()).toBeCloseTo(0);
});

test('an enemy inside a blocked tile is directed to the nearest passable tile', () => {
	const manager = createGameManager([
		[Infinity, 0, Infinity],
		[Infinity, Infinity, 0],
		[Infinity, Infinity, Infinity]
	]);

	const force = manager.calculateAvoidanceForce(
		new THREE.Vector3(0, 0, 0),
		new THREE.Vector3(0, 0, 0),
		new THREE.Vector3(1, 0, 0)
	);

	// Up and right are equally near; clockwise priority chooses up.
	expect(force.toArray()).toStrictEqual([0, 1, 0]);
});

test('roadblock traps are treated as obstacles even before inspecting the maze weight', () => {
	const manager = createGameManager([
		[0, 0, 0],
		[0, 0, 0],
		[0, 0, 0]
	]);
	manager.traps.set('2,1', { isRoadblock: true });

	const force = manager.calculateAvoidanceForce(
		new THREE.Vector3(0, 0, 0),
		new THREE.Vector3(40, 0, 0),
		new THREE.Vector3(0, 1, 0)
	);

	expect(force.toArray()).toStrictEqual([-1, 0, 0]);
});

test('a weighted roadblock remains walkable when a route enters its tile', () => {
	const manager = createGameManager([
		[0, 0, 0],
		[0, 0, 1000],
		[0, 0, 0]
	]);
	manager.traps.set('2,1', { isRoadblock: true });

	const force = manager.calculateAvoidanceForce(
		new THREE.Vector3(0, 0, 0),
		new THREE.Vector3(40, 0, 0),
		new THREE.Vector3(0, 1, 0)
	);
	const corrected = manager.correctMovementForObstacle(
		new THREE.Vector3(40, 0, 0),
		new THREE.Vector3(20, 0, 0)
	);

	expect(force.lengthSq()).toBe(0);
	expect(corrected.toArray()).toStrictEqual([20, 0, 0]);
});

test('a WALK enemy calculates avoidance once every three movement frames', () => {
	const calculateAvoidanceForce = vi.fn(() => new THREE.Vector3(0, 1, 0));
	const enemy = Object.create(Enemy.prototype) as any;
	Object.assign(enemy, {
		avoidanceForce: new THREE.Vector3(),
		avoidanceFrameCounter: 0,
		gameManager: { calculateAvoidanceForce },
		halfBodyWidth: 0.2,
		meshGroup: { position: new THREE.Vector3() },
		motionMode: 'WALK',
		raycastPos: new THREE.Vector3()
	});

	for (let frame = 0; frame < 4; frame++) {
		enemy.getAvoidanceForce(new THREE.Vector3(1, 0, 0));
	}

	expect(calculateAvoidanceForce).toHaveBeenCalledTimes(2);
});

test('movement correction reflects displacement that enters a blocked tile', () => {
	const manager = createGameManager([
		[0, 0, 0],
		[0, 0, Infinity],
		[0, 0, 0]
	]);

	const corrected = manager.correctMovementForObstacle(
		new THREE.Vector3(40, 0, 0),
		new THREE.Vector3(20, 0, 0)
	);

	expect(corrected.toArray()).toStrictEqual([-20, 0, 0]);
});

test('movement correction preserves the tangential part of a diagonal displacement', () => {
	const manager = createGameManager([
		[0, 0, 0],
		[0, 0, Infinity],
		[0, 0, 0]
	]);

	const corrected = manager.correctMovementForObstacle(
		new THREE.Vector3(40, 0, 0),
		new THREE.Vector3(20, 20, 0)
	);

	expect(corrected.toArray()).toStrictEqual([-20, 20, 0]);
});

test('ground movement applies steering acceleration and stores the result as inertia', () => {
	const enemy = Object.create(Enemy.prototype) as any;
	Object.assign(enemy, {
		inertia: new THREE.Vector3(),
		motionMode: 'WALK',
		getAvoidanceForce: () => new THREE.Vector3()
	});
	GameConfig.steeringEnabled = true;

	const velocity = enemy.calculateMovementVelocity(new THREE.Vector3(1, 0, 0), 1);

	expect(velocity.x).toBeCloseTo(8 / 30);
	expect(enemy.inertia.toArray()).toEqual(velocity.toArray());
});

test('steering retains momentum when a temporary speed buff expires', () => {
	const enemy = Object.create(Enemy.prototype) as any;
	Object.assign(enemy, {
		inertia: new THREE.Vector3(3, 0, 0),
		motionMode: 'WALK',
		getAvoidanceForce: () => new THREE.Vector3()
	});
	GameConfig.steeringEnabled = true;

	const velocity = enemy.calculateMovementVelocity(new THREE.Vector3(1, 0, 0), 1);

	expect(velocity.toArray()).toEqual([3, 0, 0]);
	expect(enemy.inertia.toArray()).toEqual(velocity.toArray());
});

test('avoidance is scaled to at least half strength before steering acceleration', () => {
	const enemy = Object.create(Enemy.prototype) as any;
	Object.assign(enemy, {
		inertia: new THREE.Vector3(0.25, 0, 0),
		motionMode: 'WALK',
		getAvoidanceForce: () => new THREE.Vector3(0, 1, 0)
	});
	GameConfig.steeringEnabled = true;

	const velocity = enemy.calculateMovementVelocity(new THREE.Vector3(1, 0, 0), 1);

	expect(velocity.x).toBeCloseTo(0.45);
	expect(velocity.y).toBeCloseTo(1 / 60);
});

test('flying movement uses its stronger steering acceleration', () => {
	const enemy = Object.create(Enemy.prototype) as any;
	Object.assign(enemy, {
		inertia: new THREE.Vector3(),
		motionMode: 'FLY',
		getAvoidanceForce: () => new THREE.Vector3()
	});
	GameConfig.steeringEnabled = true;

	const velocity = enemy.calculateMovementVelocity(new THREE.Vector3(1, 0, 0), 1);

	expect(velocity.x).toBeCloseTo(2 / 3);
});

test('a stage without steering reaches theoretical speed in one movement frame', () => {
	const enemy = Object.create(Enemy.prototype) as any;
	Object.assign(enemy, {
		inertia: new THREE.Vector3(),
		motionMode: 'WALK',
		getAvoidanceForce: () => new THREE.Vector3()
	});
	GameConfig.steeringEnabled = false;

	const velocity = enemy.calculateMovementVelocity(new THREE.Vector3(1, 0, 0), 1);

	expect(velocity.toArray()).toStrictEqual([1, 0, 0]);
	GameConfig.steeringEnabled = true;
});
