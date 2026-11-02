import { describe, expect, it } from 'vitest';
import { get, writable } from 'svelte/store';
import type { Enemy, MapConfig } from '$lib/types';
import { getInfectionReachableEnemyIds } from '$lib/functions/infectionReachability';
import {
	getApplicableBuffsList,
	setOtherBuffsList,
	updateOtherBuffsList
} from '$lib/functions/buffHelpers';
import { prepareStage } from '$lib/server/stageLoad';
import stageData from '$lib/data/stages/ro_stage_data/ro6/level_rogue6_5-8.json';

function enemy(stageId: string, traits: string[] = [], specials: string[] = []): Enemy {
	return {
		id: stageId,
		key: stageId.split('#')[0],
		stageId,
		type: ['NORMAL'],
		traits: traits.map((key) => ({ key })),
		stats: { special: [specials.map((key) => ({ key }))] }
	} as unknown as Enemy;
}

type SpawnSpec = { id: string; row: number; col: number; mode?: string; count?: number };

function stage(map: number[][], spawns: SpawnSpec[]) {
	return {
		levelId: 'test',
		traps: [],
		mapData: {
			map,
			tiles: [
				['tile_road', 0, 0],
				['tile_wall', 1, 1],
				['tile_hole', 0, 0],
				['tile_infection', 0, 0],
				['tile_infection', 1, 1]
			]
		},
		sp_terrain: [
			{
				tileKey: 'tile_infection',
				heightType: 'LOWLAND',
				blackboard: { atk: 0.5, attack_speed: 50 }
			}
		],
		routes: spawns.map(({ row, col, mode }) => ({
			startPosition: { row: map.length - 1 - row, col },
			motionMode: mode ?? 'WALK',
			endPosition: { row: 0, col: 0 },
			checkpoints: [{ type: 'APPEAR_AT_POS', position: { row: 0, col: 0 } }]
		})),
		waves: [
			{
				fragments: [
					{
						actions: spawns.map(({ id, count }, routeIndex) => ({
							actionType: 'SPAWN',
							key: id,
							count: count ?? 1,
							routeIndex
						}))
					}
				]
			}
		],
		branches: {}
	};
}

const asConfig = (config: unknown) => config as MapConfig;

describe('infection tile reachability', () => {
	it('uses spawn connectivity, converts bottom-up rows, and ignores route checkpoints', () => {
		const config = stage(
			[
				[3, 0, 1, 0],
				[0, 0, 1, 0],
				[1, 1, 1, 0]
			],
			[
				{ id: 'connected', row: 1, col: 1 },
				{ id: 'isolated', row: 0, col: 3 }
			]
		);
		expect(
			getInfectionReachableEnemyIds(asConfig(config), [enemy('connected'), enemy('isolated')])
		).toEqual(new Set(['connected']));
	});

	it('does not connect diagonal cells through blocked corners', () => {
		const config = stage(
			[
				[3, 1],
				[1, 0]
			],
			[{ id: 'corner', row: 1, col: 1 }]
		);
		expect(getInfectionReachableEnemyIds(asConfig(config), [enemy('corner')]).size).toBe(0);
	});

	it('lets hovering enemies cross pits but keeps walls impassable', () => {
		const config = stage(
			[[3, 2, 0, 1, 0]],
			[
				{ id: 'walker', row: 0, col: 2 },
				{ id: 'hover-trait', row: 0, col: 2 },
				{ id: 'hover-form', row: 0, col: 2 },
				{ id: 'walled-hover', row: 0, col: 4 }
			]
		);
		const enemies = [
			enemy('walker'),
			enemy('hover-trait', ['hover']),
			enemy('hover-form', [], ['hover']),
			enemy('walled-hover', ['hover'])
		];
		expect(getInfectionReachableEnemyIds(asConfig(config), enemies)).toEqual(
			new Set(['hover-trait', 'hover-form'])
		);
	});

	it('excludes flying enemy types and flying routes, even above infection tiles', () => {
		const config = stage(
			[[3, 0]],
			[
				{ id: 'flying-type', row: 0, col: 0 },
				{ id: 'flying-route', row: 0, col: 0, mode: 'FLY' },
				{ id: 'mixed-routes', row: 0, col: 0, mode: 'FLY' },
				{ id: 'mixed-routes', row: 0, col: 1 }
			]
		);
		const flying = enemy('flying-type');
		flying.type.push('flying');
		expect(
			getInfectionReachableEnemyIds(asConfig(config), [
				flying,
				enemy('flying-route'),
				enemy('mixed-routes')
			])
		).toEqual(new Set(['mixed-routes']));
	});

	it('requires stationary enemies to spawn on infection terrain', () => {
		const config = stage(
			[[3, 0]],
			[
				{ id: 'on-tile', row: 0, col: 0 },
				{ id: 'off-tile', row: 0, col: 1 },
				{ id: 'route-none', row: 0, col: 1, mode: 'NONE' }
			]
		);
		expect(
			getInfectionReachableEnemyIds(asConfig(config), [
				enemy('on-tile', ['self_bind']),
				enemy('off-tile', ['stationary_boss']),
				enemy('route-none')
			])
		).toEqual(new Set(['on-tile']));
	});

	it('accepts any possible spawn and keeps stage aliases separate', () => {
		const config = stage(
			[[3, 1, 0]],
			[
				{ id: 'same#1', row: 0, col: 2 },
				{ id: 'same#1', row: 0, col: 0 },
				{ id: 'same#2', row: 0, col: 2 },
				{ id: 'zero-count', row: 0, col: 0, count: 0 }
			]
		);
		expect(
			getInfectionReachableEnemyIds(asConfig(config), [
				enemy('same#1'),
				enemy('same#2'),
				enemy('zero-count'),
				enemy('no-spawn')
			])
		).toEqual(new Set(['same#1']));
	});

	it('collects branch spawns from extra_routes and respects elite replacements', () => {
		const config = {
			...stage([[3, 1, 0]], [{ id: 'normal', row: 0, col: 0 }]),
			elite_runes: { enemy_replace: { normal: 'elite', branch: 'unused' } },
			extra_routes: [{ startPosition: { row: 0, col: 0 }, motionMode: 'WALK' }],
			branches: {
				summon: {
					phases: [{ actions: [{ actionType: 'SPAWN', key: 'branch', count: 1, routeIndex: 0 }] }]
				}
			}
		};
		const enemies = [enemy('normal'), enemy('elite'), enemy('branch')];
		expect(getInfectionReachableEnemyIds(asConfig(config), enemies)).toEqual(
			new Set(['normal', 'branch'])
		);
		expect(getInfectionReachableEnemyIds(asConfig(config), enemies, true)).toEqual(
			new Set(['elite', 'branch'])
		);
		// A different stage object must not reuse the previous map's cache.
		const variant = stage([[0, 1, 3]], [{ id: 'normal', row: 0, col: 0 }]);
		expect(getInfectionReachableEnemyIds(asConfig(variant), enemies).size).toBe(0);
	});

	it('handles multiple infection tiles, missing map data, and highland infection', () => {
		const config = stage(
			[[3, 1, 3, 1, 4]],
			[
				{ id: 'second', row: 0, col: 2 },
				{ id: 'highland', row: 0, col: 4 }
			]
		);
		expect(
			getInfectionReachableEnemyIds(asConfig(config), [enemy('second'), enemy('highland')])
		).toEqual(new Set(['second']));
		expect(getInfectionReachableEnemyIds(asConfig({}), [enemy('second')]).size).toBe(0);
	});

	it('matches the middle lane and extra enemy in level_rogue6_5-8', () => {
		const config = asConfig(stageData.data[0]);
		const { enemies } = prepareStage(config, 'en');
		const expected = new Set([
			'enemy_2137_shsdgo',
			'enemy_10210_muwiz',
			'enemy_9002_adsham',
			'enemy_1359_ekulsr_2',
			'enemy_1121_lifbos_2',
			'enemy_2085_skzjxd'
		]);
		expect(getInfectionReachableEnemyIds(config, enemies)).toEqual(expected);
		expect(getInfectionReachableEnemyIds(config, enemies, true)).toEqual(expected);
	});
});

describe('infection buff visibility', () => {
	it('filters table/handbook buffs by stage ID while retaining the manual toggle', () => {
		const config = stage(
			[[3, 1, 0]],
			[
				{ id: 'same#1', row: 0, col: 0 },
				{ id: 'same#2', row: 0, col: 2 }
			]
		);
		const enemies = [enemy('same#1'), enemy('same#2')];
		const store = writable([]);
		setOtherBuffsList(store, 'rogue_phantom', enemies, [], asConfig(config), 'en');
		const buffs = get(store);
		expect(
			getApplicableBuffsList(buffs, enemies[0]).map((buff: { key: string }) => buff.key)
		).toEqual(['tile_infection']);
		expect(getApplicableBuffsList(buffs, enemies[1])).toEqual([]);
		expect(getApplicableBuffsList(buffs, { key: 'trap_test', stageId: 'same#1' })).toEqual([]);
		updateOtherBuffsList(store, 'tile_infection', enemies[0].key);
		expect(get(store)).toMatchObject([{ activeTargets: [{ key: 'same', count: 1 }] }]);
		updateOtherBuffsList(store, 'tile_infection', enemies[0].key);
		expect(get(store)).toMatchObject([{ activeTargets: [{ key: 'same', count: 0 }] }]);
	});

	it('keeps other buff targeting intact', () => {
		const buff = { key: 'other', targets: ['ALL'] };
		expect(getApplicableBuffsList([buff], enemy('test'))).toEqual([buff]);
		expect(getApplicableBuffsList(undefined, enemy('test'))).toEqual([]);
	});
});
