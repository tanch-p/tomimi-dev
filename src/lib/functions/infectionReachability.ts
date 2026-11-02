import type { Enemy, MapConfig, Position, WaveAction } from '$lib/types';
import { generateMaze } from './mazeHelpers';

type MapData = {
	map: number[][];
	tiles: [string, number, number, ...unknown[]][];
};

type SpawnRoute = {
	startPosition?: Position;
	motionMode?: string;
};

type Spawn = {
	position: Position;
	motionMode?: string;
};

type ReachabilityIndex = {
	mapData: MapData;
	infection: Set<number>;
	ground: Set<number>;
	hover: Set<number>;
	spawns: Map<string, Spawn[]>;
	eliteSpawns: Map<string, Spawn[]>;
};

// Stage configurations are immutable; variants get their own cache entries.
const indexCache = new WeakMap<MapConfig, ReachabilityIndex>();
const directions = [
	[0, 1],
	[1, 0],
	[0, -1],
	[-1, 0]
];

function buildIndex(config: MapConfig): ReachabilityIndex | undefined {
	const cached = indexCache.get(config);
	if (cached) return cached;
	const mapData = (config as MapConfig & { mapData?: MapData }).mapData;
	if (!mapData?.map.length || !mapData.map[0]?.length) return;

	const { map, tiles } = mapData;
	const width = map[0].length;
	const maze = generateMaze(map, tiles) as number[][];
	const infection = new Set<number>();
	for (let row = 0; row < map.length; row++) {
		for (let col = 0; col < width; col++) {
			const tile = tiles[map[row][col]];
			if (tile[0] === 'tile_infection' && tile[1] === 0 && Number.isFinite(maze[row][col])) {
				infection.add(row * width + col);
			}
		}
	}

	function floodFill(canCrossHoles: boolean): Set<number> {
		const reached = new Set(infection);
		const queue = [...infection];
		// Four-way connectivity suffices: legal diagonals cannot cut blocked corners.
		for (let head = 0; head < queue.length; head++) {
			const row = Math.floor(queue[head] / width);
			const col = queue[head] % width;
			for (const [dr, dc] of directions) {
				const nextRow = row + dr;
				const nextCol = col + dc;
				if (nextRow < 0 || nextRow >= map.length || nextCol < 0 || nextCol >= width) continue;
				const next = nextRow * width + nextCol;
				if (reached.has(next) || !Number.isFinite(maze[nextRow][nextCol])) continue;
				if (!canCrossHoles && tiles[map[nextRow][nextCol]][0] === 'tile_hole') continue;
				reached.add(next);
				queue.push(next);
			}
		}
		return reached;
	}

	const spawns = new Map<string, Spawn[]>();
	const eliteSpawns = new Map<string, Spawn[]>();
	function collect(actions: WaveAction[], routes: SpawnRoute[], applyEliteReplacements: boolean) {
		for (const action of actions) {
			if (action.actionType !== 'SPAWN' || action.count <= 0) continue;
			const route = routes[action.routeIndex];
			if (!route?.startPosition) continue;
			// Route positions use bottom-up rows; mapData uses top-down rows.
			const spawn: Spawn = {
				position: {
					row: map.length - 1 - route.startPosition.row,
					col: route.startPosition.col
				},
				motionMode: route.motionMode
			};
			const eliteId = applyEliteReplacements
				? (config.elite_runes?.enemy_replace?.[action.key] ?? action.key)
				: action.key;
			for (const [index, id] of [
				[spawns, action.key],
				[eliteSpawns, eliteId]
			] as const) {
				const positions = index.get(id) ?? [];
				positions.push(spawn);
				index.set(id, positions);
			}
		}
	}
	for (const wave of config.waves ?? []) {
		for (const fragment of wave.fragments) {
			collect(fragment.actions, (config.routes ?? []) as SpawnRoute[], true);
		}
	}
	for (const branch of Object.values(config.branches ?? {})) {
		for (const phase of branch.phases) {
			collect(phase.actions, (config.extra_routes ?? []) as SpawnRoute[], false);
		}
	}

	const index = {
		mapData,
		infection,
		ground: floodFill(false),
		hover: floodFill(true),
		spawns,
		eliteSpawns
	};
	indexCache.set(config, index);
	return index;
}

/** Potential access from any configured spawn, ignoring movement checkpoints and live obstacles. */
export function getInfectionReachableEnemyIds(
	config: MapConfig,
	enemies: Enemy[],
	eliteMode = false
): Set<string> {
	const eligible = new Set<string>();
	const index = buildIndex(config);
	if (!index?.infection.size) return eligible;
	const { map } = index.mapData;
	const width = map[0].length;
	const spawns = eliteMode ? index.eliteSpawns : index.spawns;
	for (const enemy of enemies) {
		if (enemy.type.includes('flying')) continue;
		const traits = enemy.traits ?? [];
		const specials =
			(enemy.stats as unknown as { special?: { key: string }[][] })?.special ??
			enemy.forms?.map((form) => form.special) ??
			[];
		const hovering = [...traits, ...specials.flat()].some((skill) => skill.key === 'hover');
		const stationary = traits.some((skill) =>
			['self_bind', 'self_bind_plus', 'stationary_boss'].includes(skill.key)
		);
		const reachable = (spawns.get(enemy.stageId) ?? []).some(({ position, motionMode }) => {
			if (motionMode === 'FLY') return false;
			const { row, col } = position;
			if (
				!Number.isInteger(row) ||
				!Number.isInteger(col) ||
				row < 0 ||
				row >= map.length ||
				col < 0 ||
				col >= width
			)
				return false;
			const cell = row * width + col;
			if (stationary || motionMode === 'NONE') return index.infection.has(cell);
			return (hovering ? index.hover : index.ground).has(cell);
		});
		if (reachable) eligible.add(enemy.stageId);
	}
	return eligible;
}
