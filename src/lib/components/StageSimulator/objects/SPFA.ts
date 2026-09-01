import type { Position } from '../../../types';

type GridCoordinate = [number, number];

const COST_EPSILON = 1e-9;
const MAX_CLEAR_CORRIDOR_WEIGHT = 100;

class Node {
	distance: number;
	nextNode: GridCoordinate | null;
	inQueue: boolean;

	constructor() {
		this.distance = Infinity;
		this.nextNode = null; // Will store [x, y]
		this.inQueue = false;
	}
}

class PathGrid {
	nodes: Map<string, Node>;
	width: number;
	height: number;
	grid: number[][];

	constructor(mazeLayout: number[][]) {
		this.width = mazeLayout[0].length;
		this.height = mazeLayout.length;
		this.grid = mazeLayout;

		// Initialize nodes map
		this.nodes = new Map();

		for (let y = 0; y < this.height; y++) {
			for (let x = 0; x < this.width; x++) {
				this.nodes.set(`${x},${y}`, new Node());
			}
		}
	}

	isValid(x: number, y: number): boolean {
		if (x < 0 || y < 0 || x >= this.width || y >= this.height) return false;
		if (this.grid[y][x] === Number.POSITIVE_INFINITY) return false;
		return true;
	}

	getNode(x: number, y: number): Node | undefined {
		return this.nodes.get(`${x},${y}`);
	}

	setNode(x: number, y: number, node: Node): void {
		this.nodes.set(`${x},${y}`, node);
	}
}

export class PathCache {
	private cache = new Map<string, PathGrid>();

	getCacheKey(targetX: number, targetY: number, allowDiagonal: boolean): string {
		return `${targetX},${targetY},${allowDiagonal}`;
	}

	get(targetX: number, targetY: number, allowDiagonal: boolean): PathGrid | undefined {
		const key = this.getCacheKey(targetX, targetY, allowDiagonal);
		return this.cache.get(key);
	}

	set(targetX: number, targetY: number, allowDiagonal: boolean, grid: PathGrid): void {
		const key = this.getCacheKey(targetX, targetY, allowDiagonal);
		this.cache.set(key, this.cloneGrid(grid));
	}

	clear(): void {
		this.cache.clear();
	}

	cloneGrid(grid: PathGrid): PathGrid {
		const newGrid = new PathGrid(grid.grid);

		for (let y = 0; y < grid.height; y++) {
			for (let x = 0; x < grid.width; x++) {
				const originalNode = grid.getNode(x, y);
				const newNode = newGrid.getNode(x, y);
				if (!originalNode || !newNode) continue;

				newNode.distance = originalNode.distance;
				newNode.nextNode = originalNode.nextNode ? [...originalNode.nextNode] : null;
				newNode.inQueue = originalNode.inQueue;
			}
		}

		return newGrid;
	}
}

export class SPFA {
	grid: PathGrid;
	directions: GridCoordinate[] = [
		[0, 1], // up
		[1, 0], // right
		[0, -1], // down
		[-1, 0], // left
		[1, 1],
		[1, -1],
		[-1, 1],
		[-1, -1]
	];
	constructor(mazeLayout: number[][]) {
		this.grid = new PathGrid(mazeLayout);
	}
	debug = false;
	pathCache = new PathCache();

	findPath(start: Position, end: Position, allowDiagonal = true): GridCoordinate[] {
		const startX = start.col;
		const startY = start.row;
		const targetX = end.col;
		const targetY = end.row;

		if (!this.grid.isValid(startX, startY)) {
			return [];
		}

		if (!this.grid.isValid(targetX, targetY)) {
			return [];
		}
		this.debug = targetX === 3 && targetY === 4;
		// Try to get cached path grid
		const cachedGrid = this.pathCache.get(targetX, targetY, allowDiagonal);
		if (cachedGrid) {
			// Clone the cached grid to avoid modifications affecting the cache
			this.grid = this.pathCache.cloneGrid(cachedGrid);
			const path = this.buildPath(startX, startY);
			return allowDiagonal ? this.smoothPath(path) : path;
		}

		// If no cache exists, calculate new path
		// Reset all nodes
		for (let y = 0; y < this.grid.height; y++) {
			for (let x = 0; x < this.grid.width; x++) {
				const node = this.grid.getNode(x, y);
				if (!node) continue;

				node.distance = Infinity;
				node.nextNode = null;
				node.inQueue = false;
			}
		}

		// Initialize target node
		const targetNode = this.grid.getNode(targetX, targetY);
		if (!targetNode) return [];

		targetNode.distance = 0;
		targetNode.inQueue = true;

		const queue: GridCoordinate[] = [[targetX, targetY]];
		const directions = allowDiagonal ? this.directions : this.directions.slice(0, 4);

		// SPFA algorithm implementation
		while (queue.length > 0) {
			const current = queue.shift();
			if (!current) continue;

			const [currentX, currentY] = current;
			const currentNode = this.grid.getNode(currentX, currentY);
			if (!currentNode) continue;

			currentNode.inQueue = false;

			for (const [dx, dy] of directions) {
				const nextX = currentX + dx;
				const nextY = currentY + dy;

				if (!this.canStep(currentX, currentY, nextX, nextY)) continue;

				const stepDistance = dx === 0 || dy === 0 ? 1 : Math.SQRT2;
				const penalty =
					dx === 0 || dy === 0
						? this.getCorridorTileWeight(nextX, nextY)
						: this.getCorridorWindowWeight(currentX, currentY, dx, dy);
				const newDist = currentNode.distance + penalty * stepDistance;
				const neighborNode = this.grid.getNode(nextX, nextY);
				if (!neighborNode) continue;

				if (newDist < neighborNode.distance) {
					neighborNode.distance = newDist;
					neighborNode.nextNode = [currentX, currentY];

					if (!neighborNode.inQueue) {
						queue.push([nextX, nextY]);
						neighborNode.inQueue = true;
					}
				}
			}
		}

		// Cache only the raw pathfinding graph. Smoothing is applied to each final path.
		this.pathCache.set(targetX, targetY, allowDiagonal, this.grid);

		const path = this.buildPath(startX, startY);
		return allowDiagonal ? this.smoothPath(path) : path;
	}

	// Method to invalidate cache (useful when map changes)
	invalidateCache(): void {
		this.pathCache.clear();
	}

	canStep(x1: number, y1: number, x2: number, y2: number): boolean {
		if (!this.grid.isValid(x1, y1) || !this.grid.isValid(x2, y2)) {
			return false;
		}

		const dx = x2 - x1;
		const dy = y2 - y1;

		if (dx === 0 && dy === 0) {
			return false;
		}

		if (Math.abs(dx) > 1 || Math.abs(dy) > 1) {
			return false;
		}

		// Orthogonal steps only need a walkable destination.
		if (dx === 0 || dy === 0) {
			return true;
		}

		// A diagonal step must not cut between either adjacent obstacle.
		return (
			this.isClearCorridorTile(x1, y1) &&
			this.isClearCorridorTile(x2, y2) &&
			this.isClearCorridorTile(x1 + dx, y1) &&
			this.isClearCorridorTile(x1, y1 + dy)
		);
	}

	hasClearCorridor(start: GridCoordinate, end: GridCoordinate): boolean {
		const [x1, y1] = start;
		const [x2, y2] = end;

		if (!this.isClearCorridorTile(x1, y1) || !this.isClearCorridorTile(x2, y2)) {
			return false;
		}

		const dx = x2 - x1;
		const dy = y2 - y1;
		const distanceX = Math.abs(dx);
		const distanceY = Math.abs(dy);
		const stepX = Math.sign(dx);
		const stepY = Math.sign(dy);

		// Straight corridors only need to inspect the tiles on the segment.
		if (distanceX === 0 || distanceY === 0) {
			const length = Math.max(distanceX, distanceY);

			for (let step = 1; step <= length; step++) {
				const x = x1 + stepX * step;
				const y = y1 + stepY * step;
				if (!this.isClearCorridorTile(x, y)) return false;
			}

			return true;
		}

		// Advance along the dominant axis and require each 2x2 window to be clear.
		if (distanceX >= distanceY) {
			for (let step = 0; step < distanceX; step++) {
				const x = x1 + stepX * step;
				const y = y1 + stepY * Math.floor((step * distanceY) / distanceX);

				if (!this.isClearWindow(x, y, stepX, stepY)) return false;
			}
		} else {
			for (let step = 0; step < distanceY; step++) {
				const x = x1 + stepX * Math.floor((step * distanceX) / distanceY);
				const y = y1 + stepY * step;

				if (!this.isClearWindow(x, y, stepX, stepY)) return false;
			}
		}

		return true;
	}

	private isClearWindow(x: number, y: number, stepX: number, stepY: number): boolean {
		return (
			this.isClearCorridorTile(x, y) &&
			this.isClearCorridorTile(x + stepX, y) &&
			this.isClearCorridorTile(x, y + stepY) &&
			this.isClearCorridorTile(x + stepX, y + stepY)
		);
	}

	private isClearCorridorTile(x: number, y: number): boolean {
		return this.grid.isValid(x, y) && this.grid.grid[y][x] <= MAX_CLEAR_CORRIDOR_WEIGHT;
	}

	getClearCorridorCost(start: GridCoordinate, end: GridCoordinate): number {
		if (!this.hasClearCorridor(start, end)) return Infinity;

		const dx = end[0] - start[0];
		const dy = end[1] - start[1];
		const distanceX = Math.abs(dx);
		const distanceY = Math.abs(dy);
		const stepX = Math.sign(dx);
		const stepY = Math.sign(dy);

		if (distanceX === 0 && distanceY === 0) return 0;

		// Match the SPFA step-cost model for a straight corridor.
		if (distanceX === 0 || distanceY === 0) {
			const length = Math.max(distanceX, distanceY);
			let cost = 0;

			for (let step = 1; step <= length; step++) {
				cost += this.getCorridorTileWeight(start[0] + stepX * step, start[1] + stepY * step);
			}

			return cost;
		}

		// A diagonal corridor occupies the same advancing 2x2 windows checked by
		// hasClearCorridor(). Charge each slice using its highest tile weight so a
		// weighted corner cannot be bypassed by placing the movement line beside it.
		const stepCount = Math.max(distanceX, distanceY);
		const stepLength = Math.hypot(dx, dy) / stepCount;
		let cost = 0;

		for (let step = 0; step < stepCount; step++) {
			const x = start[0] + stepX * Math.floor((step * distanceX) / stepCount);
			const y = start[1] + stepY * Math.floor((step * distanceY) / stepCount);
			cost += stepLength * this.getCorridorWindowWeight(x, y, stepX, stepY);
		}

		return cost;
	}

	private getCorridorWindowWeight(x: number, y: number, stepX: number, stepY: number): number {
		return Math.max(
			this.getCorridorTileWeight(x, y),
			this.getCorridorTileWeight(x + stepX, y),
			this.getCorridorTileWeight(x, y + stepY),
			this.getCorridorTileWeight(x + stepX, y + stepY)
		);
	}

	private getCorridorTileWeight(x: number, y: number): number {
		const tileValue = this.grid.grid[y][x];
		return tileValue > 0 ? tileValue : 1;
	}

	smoothPath(path: GridCoordinate[]): GridCoordinate[] {
		if (path.length <= 2) return path;

		const target = path[path.length - 1];
		const result: GridCoordinate[] = [path[0]];
		let current = path[0];

		while (!this.coordinatesEqual(current, target)) {
			const currentNode = this.grid.getNode(current[0], current[1]);
			if (!currentNode || currentNode.distance === Infinity) return path;

			// Following nextNode is always a safe fallback. Searching the complete
			// distance field, rather than path[], lets smoothing create waypoints that
			// were not part of the raw SPFA path.
			let bestCandidate = currentNode.nextNode;
			let bestRemainingDistance = bestCandidate
				? this.grid.getNode(bestCandidate[0], bestCandidate[1])?.distance ?? Infinity
				: Infinity;
			const bestCorridorCost = bestCandidate
				? this.getClearCorridorCost(current, bestCandidate)
				: Infinity;
			let bestTotalCost = bestCorridorCost + bestRemainingDistance;

			for (let y = 0; y < this.grid.height; y++) {
				for (let x = 0; x < this.grid.width; x++) {
					const candidateNode = this.grid.getNode(x, y);
					if (!candidateNode || candidateNode.distance >= currentNode.distance) {
						continue;
					}

					const corridorCost = this.getClearCorridorCost(current, [x, y]);
					if (corridorCost === Infinity) continue;

					const totalCost = corridorCost + candidateNode.distance;
					if (
						totalCost < bestTotalCost - COST_EPSILON ||
						(Math.abs(totalCost - bestTotalCost) <= COST_EPSILON &&
							candidateNode.distance < bestRemainingDistance)
					) {
						bestCandidate = [x, y];
						bestRemainingDistance = candidateNode.distance;
						bestTotalCost = totalCost;
					}
				}
			}

			// A raw SPFA path always supplies nextNode here. Keep this guard so a
			// malformed/custom path cannot make smoothing loop forever.
			if (!bestCandidate) return path;

			result.push(bestCandidate);
			current = bestCandidate;
		}

		return result;
	}

	private coordinatesEqual(a: GridCoordinate, b: GridCoordinate): boolean {
		return a[0] === b[0] && a[1] === b[1];
	}

	buildPath(startX: number, startY: number): GridCoordinate[] {
		const startNode = this.grid.getNode(startX, startY);

		// No route from this position to the target
		if (!startNode || startNode.distance === Infinity) {
			return [];
		}

		const path: GridCoordinate[] = [];
		const visited = new Set<string>();
		let currentX = startX;
		let currentY = startY;

		while (this.grid.getNode(currentX, currentY)) {
			const key = `${currentX},${currentY}`;
			if (visited.has(key)) return [];
			visited.add(key);

			path.push([currentX, currentY]);

			const currentNode = this.grid.getNode(currentX, currentY);

			if (!currentNode?.nextNode) {
				break;
			}

			[currentX, currentY] = currentNode.nextNode;
		}

		return path;
	}
}
