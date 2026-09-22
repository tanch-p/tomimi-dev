import * as THREE from 'three';
import { expect, test } from 'vitest';
import { GameConfig } from '$lib/components/StageSimulator/objects/GameConfig.svelte.js';
import { GameManager } from '$lib/components/StageSimulator/objects/GameManager';
import { GameSimManager } from '$lib/components/StageSimulator/functions/Simulator';
import type { Position } from '$lib/types';

function createManager<T extends object>(prototype: T, mazeLayout: number[][]) {
	const manager = Object.create(prototype) as any;
	Object.assign(manager, {
		mazeLayout,
		traps: new Map(),
		getVectorCoordinates: ({ row, col }: Position) => ({
			x: (col - mazeLayout[0].length / 2) * GameConfig.gridSize + GameConfig.gridSize / 2,
			y: -((row - mazeLayout.length / 2) * GameConfig.gridSize + GameConfig.gridSize / 2)
		})
	});
	return manager;
}

test('rendered and offline managers use identical world-to-grid boundaries', () => {
	const mazeLayout = Array.from({ length: 8 }, () => Array(11).fill(0));
	const rendered = createManager(GameManager.prototype, mazeLayout);
	const offline = createManager(GameSimManager.prototype, mazeLayout);
	const row5CenterY = -150;

	for (const [x, expected] of [
		[149.999, [6, 5]],
		[150, [7, 5]],
		[249.999, [7, 5]],
		[250, [8, 5]]
	] as const) {
		const position = new THREE.Vector3(x, row5CenterY, 0);
		expect(rendered.getGridPosition(position)).toEqual(expected);
		expect(offline.getGridPosition(position)).toEqual(expected);
		expect(rendered.getGridPosFromVectors(position)).toBe(expected.join(','));
		expect(offline.getGridPosFromVectors(position)).toBe(expected.join(','));
	}
});

test('rendered and offline managers apply identical obstacle avoidance', () => {
	const mazeLayout = [
		[0, 0, 0],
		[0, 0, Infinity],
		[0, 0, 0]
	];
	const rendered = createManager(GameManager.prototype, mazeLayout);
	const offline = createManager(GameSimManager.prototype, mazeLayout);
	const raycastPosition = new THREE.Vector3(0, 0, 0);
	const footpoint = new THREE.Vector3(40, 0, 0);
	const direction = new THREE.Vector3(0, 1, 0);
	const displacement = new THREE.Vector3(20, 20, 0);

	expect(offline.calculateAvoidanceForce(raycastPosition, footpoint, direction).toArray()).toEqual(
		rendered.calculateAvoidanceForce(raycastPosition, footpoint, direction).toArray()
	);
	expect(offline.correctMovementForObstacle(footpoint, displacement).toArray()).toEqual(
		rendered.correctMovementForObstacle(footpoint, displacement).toArray()
	);
});
