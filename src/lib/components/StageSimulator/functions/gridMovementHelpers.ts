import * as THREE from 'three';
import type { Position } from '$lib/types';
import { GameConfig } from '../objects/GameConfig.svelte.js';

export type MovementGridContext = {
	mazeLayout: number[][];
	traps: Map<string, { isRoadblock?: boolean }>;
	getVectorCoordinates: (
		position: Position,
		reachOffset: { x: number; y: number } | null
	) => { x: number; y: number };
};

export function getGridPosition(vector: THREE.Vector3, mazeLayout: number[][]): [number, number] {
	const gridWorldWidth = mazeLayout[0].length * GameConfig.gridSize;
	const gridWorldHeight = mazeLayout.length * GameConfig.gridSize;
	return [
		Math.floor((vector.x + gridWorldWidth / 2) / GameConfig.gridSize),
		Math.floor((gridWorldHeight / 2 - vector.y) / GameConfig.gridSize)
	];
}

export function getBoundedGridPositionKey(vector: THREE.Vector3, mazeLayout: number[][]) {
	const [col, row] = getGridPosition(vector, mazeLayout);
	const boundedCol = Math.max(0, Math.min(col, mazeLayout[0].length - 1));
	const boundedRow = Math.max(0, Math.min(row, mazeLayout.length - 1));
	return `${boundedCol},${boundedRow}`;
}

function isGridPositionInBounds(context: MovementGridContext, col: number, row: number) {
	return (
		row >= 0 && col >= 0 && row < context.mazeLayout.length && col < context.mazeLayout[0].length
	);
}

function isAvoidanceObstacle(context: MovementGridContext, col: number, row: number) {
	if (!isGridPositionInBounds(context, col, row)) return false;
	const weight = context.mazeLayout[row][col];
	if (weight === Number.POSITIVE_INFINITY) return true;
	if (weight === 1000) return false;
	return Boolean(context.traps.get(`${col},${row}`)?.isRoadblock);
}

function getGridCenter(context: MovementGridContext, col: number, row: number) {
	const { x, y } = context.getVectorCoordinates({ col, row }, null);
	return new THREE.Vector3(x, y, GameConfig.baseZIndex);
}

function findNearestPassableTileVector(
	context: MovementGridContext,
	centerCol: number,
	centerRow: number
) {
	const directions = [
		[0, -1],
		[1, -1],
		[1, 0],
		[1, 1],
		[0, 1],
		[-1, 1],
		[-1, 0],
		[-1, -1]
	].sort((a, b) => Math.hypot(a[0], a[1]) - Math.hypot(b[0], b[1]));

	for (const [colOffset, rowOffset] of directions) {
		const col = centerCol + colOffset;
		const row = centerRow + rowOffset;
		if (!isGridPositionInBounds(context, col, row)) continue;
		if (isAvoidanceObstacle(context, col, row)) continue;
		return new THREE.Vector3(colOffset, -rowOffset, 0);
	}
	return new THREE.Vector3();
}

export function calculateAvoidanceForce(
	context: MovementGridContext,
	raycastPos: THREE.Vector3,
	footpoint: THREE.Vector3,
	direction: THREE.Vector3,
	halfBodyWidth = 0.2
) {
	const [centerCol, centerRow] = getGridPosition(raycastPos, context.mazeLayout);
	if (!isGridPositionInBounds(context, centerCol, centerRow)) return new THREE.Vector3();

	const center = getGridCenter(context, centerCol, centerRow);
	let avoidanceIntermediate: THREE.Vector3;
	if (isAvoidanceObstacle(context, centerCol, centerRow)) {
		avoidanceIntermediate = findNearestPassableTileVector(context, centerCol, centerRow);
	} else {
		avoidanceIntermediate = new THREE.Vector3();
		for (let rowOffset = -1; rowOffset <= 1; rowOffset++) {
			for (let colOffset = -1; colOffset <= 1; colOffset++) {
				if (colOffset === 0 && rowOffset === 0) continue;
				const col = centerCol + colOffset;
				const row = centerRow + rowOffset;
				if (!isGridPositionInBounds(context, col, row)) continue;
				if (!isAvoidanceObstacle(context, col, row)) continue;

				// Grid rows increase downward while world-space Y increases upward.
				const relativeX = colOffset;
				const relativeY = -rowOffset;
				const nearestPointX = footpoint.x + relativeX * halfBodyWidth * GameConfig.gridSize;
				const nearestPointY = footpoint.y;
				const positiveOffsetX = Math.max(
					((nearestPointX - center.x) / GameConfig.gridSize) * relativeX,
					0
				);
				const positiveOffsetY = Math.max(
					((nearestPointY - center.y) / GameConfig.gridSize) * relativeY,
					0
				);
				const effectiveOffsetX = (positiveOffsetX - 0.25) * Math.abs(relativeX);
				const effectiveOffsetY = (positiveOffsetY - 0.25) * Math.abs(relativeY);

				const isEdgeNeighbor = relativeX === 0 || relativeY === 0;
				if (isEdgeNeighbor && (effectiveOffsetX > 0 || effectiveOffsetY > 0)) {
					avoidanceIntermediate.x -= effectiveOffsetX * relativeX;
					avoidanceIntermediate.y -= effectiveOffsetY * relativeY;
				} else if (!isEdgeNeighbor && effectiveOffsetX > 0 && effectiveOffsetY > 0) {
					const averageOffset = (effectiveOffsetX + effectiveOffsetY) / 2;
					avoidanceIntermediate.x -= averageOffset * relativeX;
					avoidanceIntermediate.y -= averageOffset * relativeY;
				}
			}
		}
		if (avoidanceIntermediate.lengthSq() > 0) avoidanceIntermediate.normalize();
	}

	const normalizedDirection = direction.clone().setZ(0);
	if (normalizedDirection.lengthSq() === 0) return avoidanceIntermediate;
	normalizedDirection.normalize();
	const projection = normalizedDirection.multiplyScalar(
		avoidanceIntermediate.dot(normalizedDirection)
	);
	return avoidanceIntermediate.sub(projection).setZ(0);
}

export function correctMovementForObstacle(
	context: MovementGridContext,
	entityPosition: THREE.Vector3,
	displacement: THREE.Vector3
) {
	const [currentCol, currentRow] = getGridPosition(entityPosition, context.mazeLayout);
	const nextPosition = entityPosition.clone().add(displacement);
	const [nextCol, nextRow] = getGridPosition(nextPosition, context.mazeLayout);
	if (currentCol === nextCol && currentRow === nextRow) return displacement.clone();
	if (!isAvoidanceObstacle(context, nextCol, nextRow)) return displacement.clone();

	const obstacleDirection = getGridCenter(context, nextCol, nextRow).sub(entityPosition).setZ(0);
	if (obstacleDirection.lengthSq() === 0) return displacement.clone();
	obstacleDirection.normalize();
	const projection = obstacleDirection.multiplyScalar(displacement.dot(obstacleDirection));
	return displacement.clone().sub(projection.multiplyScalar(2)).setZ(0);
}
