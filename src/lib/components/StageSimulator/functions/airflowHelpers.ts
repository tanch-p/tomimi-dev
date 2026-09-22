import type { Mod, Position } from '$lib/types';

export type AirflowEffect = 'downstream' | 'upstream';
export type AirflowTileEffect = {
	source: string;
	direction: string;
};

type DirectionVector = { x: number; y: number };
type TileWithEffects = {
	effects?: {
		airflow?: AirflowTileEffect[];
	};
};
type Blower = {
	key: string;
	alias?: string | null;
	direction: string;
	position: Position;
};

const AIRFLOW_LENGTH = 3;
const AXIS_EPSILON = 1e-6;
const DIRECTION_VECTORS: Record<string, DirectionVector & Position> = {
	RIGHT: { x: 1, y: 0, row: 0, col: 1 },
	LEFT: { x: -1, y: 0, row: 0, col: -1 },
	UP: { x: 0, y: 1, row: -1, col: 0 },
	DOWN: { x: 0, y: -1, row: 1, col: 0 }
};

export const AIRFLOW_MODIFIER_SOURCE_PREFIX = 'trap:airflow:';

export const AIRFLOW_MODIFIERS: Record<AirflowEffect, Mod> = {
	downstream: { key: 'ms', value: 0.8, mode: 'mul', order: 'initial' },
	upstream: { key: 'ms', value: 0.5, mode: 'mul', order: 'final' }
};

export function getAirflowTilePositions(position: Position, direction: string): Position[] {
	const airflowDirection = DIRECTION_VECTORS[direction];
	if (!airflowDirection) return [];
	return Array.from({ length: AIRFLOW_LENGTH }, (_, index) => {
		const distance = index + 1;
		return {
			row: position.row + airflowDirection.row * distance,
			col: position.col + airflowDirection.col * distance
		};
	});
}

export function getAirflowSource(blower: Blower) {
	const trapId = blower.alias ?? `${blower.key}@${blower.position.col},${blower.position.row}`;
	return `${AIRFLOW_MODIFIER_SOURCE_PREFIX}${trapId}`;
}

export function addBlowerTileEffects(tiles: Map<string, unknown>, blower: Blower) {
	if (blower.key !== 'trap_013_blower') return;
	const source = getAirflowSource(blower);
	for (const position of getAirflowTilePositions(blower.position, blower.direction)) {
		const tile = tiles.get(`${position.col},${position.row}`) as TileWithEffects | undefined;
		if (!tile) continue;
		tile.effects ??= {};
		tile.effects.airflow ??= [];
		if (tile.effects.airflow.some((effect) => effect.source === source)) continue;
		tile.effects.airflow.push({ source, direction: blower.direction });
	}
}

export function removeBlowerTileEffects(tiles: Map<string, unknown>, blower: Blower) {
	if (blower.key !== 'trap_013_blower') return;
	const source = getAirflowSource(blower);
	for (const value of tiles.values()) {
		const tile = value as TileWithEffects;
		if (!tile.effects?.airflow) continue;
		tile.effects.airflow = tile.effects.airflow.filter((effect) => effect.source !== source);
	}
}

export function getAirflowEffect(
	airflowDirectionName: string,
	movementDirection: DirectionVector
): AirflowEffect | null {
	const airflowDirection = DIRECTION_VECTORS[airflowDirectionName];
	if (!airflowDirection) return null;

	const isHorizontalAirflow = airflowDirection.x !== 0;
	const isParallel = isHorizontalAirflow
		? Math.abs(movementDirection.y) <= AXIS_EPSILON && Math.abs(movementDirection.x) > AXIS_EPSILON
		: Math.abs(movementDirection.x) <= AXIS_EPSILON && Math.abs(movementDirection.y) > AXIS_EPSILON;
	if (!isParallel) return null;

	const alignment =
		movementDirection.x * airflowDirection.x + movementDirection.y * airflowDirection.y;
	if (alignment > 0) return 'downstream';
	if (alignment < 0) return 'upstream';
	return null;
}
