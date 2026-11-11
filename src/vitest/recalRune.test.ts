import { existsSync, readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { get, writable } from 'svelte/store';
import config from '$lib/data/recalrune/config.json';
import {
	clearContracts,
	consolidateMods,
	getScore,
	initContracts,
	updateContracts,
	type Contracts
} from '$lib/functions/recalRune';
import { getStageImg } from '$lib/functions/stageHelpers';
import {
	normalizeEnemyDefinitions,
	materializeEnemyDisplayStats
} from '$lib/functions/statHelpers';
import { prepareStage } from '$lib/server/stageLoad';
import { createRecalRuneStores } from '../routes/[lang=lang]/(app)/recalrune/stores';
import { getStatusImmune } from '$lib/functions/skillHelpers';
import type { MapConfig, StatMods } from '$lib/types';

const maps = config.flatMap(({ stages }) =>
	stages.map(
		(stageId) => JSON.parse(readFileSync(`static/stage_data/${stageId}.json`, 'utf8')) as MapConfig
	)
);

function initialize(map = maps[0]) {
	const contracts = writable<Contracts | null>(null);
	initContracts(contracts, map);
	return get(contracts)!;
}

describe('recalrune integration', () => {
	it.each(maps)('prepares $levelId and resolves its contract assets', (map) => {
		const stage = prepareStage(map, 'en');
		expect(stage.enemies).toHaveLength(map.enemies.length);
		for (const rune of map.systems.crisis!.runes) {
			if (rune.runeIcon && rune.runeId !== 'base')
				expect(existsSync(`static/images/recalrune/${rune.runeIcon}.webp`)).toBe(true);
		}
		const stores = createRecalRuneStores(map);
		const enemies = normalizeEnemyDefinitions(stage.enemies, get(stores.specialMods));
		expect(
			materializeEnemyDisplayStats(
				enemies,
				get(stores.statMods) as unknown as StatMods,
				get(stores.specialMods)
			)
		).toHaveLength(stage.enemies.length);
	});

	it.each(maps.filter((map) => config[0].stages.includes(map.levelId)))(
		'resolves the existing map thumbnail for $levelId',
		(map) => {
			expect(existsSync(`static/images/stages/${getStageImg(map.id, false)}.webp`)).toBe(true);
		}
	);

	it('initializes and clears mandatory contracts without mutating source stage data', () => {
		const original = structuredClone(maps[0]);
		const contracts = initialize();
		expect(contracts.base.nullGroup.every((rune) => rune.selected)).toBe(true);
		for (const group of Object.values(contracts.base.exclusiveGroups)) {
			expect(group.filter((rune) => rune.selected)).toHaveLength(1);
			expect(group[0].selected).toBe(true);
		}
		expect(getScore(contracts)).toBe(0);
		expect(consolidateMods(contracts).length).toBeGreaterThan(0);
		expect(clearContracts(contracts)).toEqual(contracts);
		expect(maps[0]).toEqual(original);
	});

	it('replaces exclusive contracts, updates score, and resets selections', () => {
		const contracts = initialize();
		const [groupId, runes] = Object.entries(contracts.others.exclusiveGroups).find(
			([, runes]) => runes.length > 1
		)!;
		const first = updateContracts(contracts, 'others', groupId, runes[0].runeId)!;
		const second = updateContracts(first, 'others', groupId, runes[1].runeId)!;
		expect(getScore(first)).toBe(runes[0].score);
		expect(getScore(second)).toBe(runes[1].score);
		expect(second.others.exclusiveGroups[groupId].filter((rune) => rune.selected)).toHaveLength(1);
		expect(consolidateMods(second).some((mod) => mod.key === `recalrune_${runes[1].runeId}`)).toBe(
			true
		);
		expect(clearContracts(second)).toEqual(contracts);
		expect(getScore(contracts)).toBe(0);
	});

	it('isolates page stores and applies contract stat effects', () => {
		const first = createRecalRuneStores(maps[0]);
		const second = createRecalRuneStores(maps[0]);
		const contracts = get(first.contracts)!;
		const rune = contracts.others.nullGroup.find((rune) =>
			rune.mods.some((effect) => effect.mods?.some((mod) => mod.key === 'hp'))
		)!;
		const { enemies } = prepareStage(maps[0], 'en');
		const display = () =>
			materializeEnemyDisplayStats(
				normalizeEnemyDefinitions(enemies, get(first.specialMods)),
				get(first.statMods) as unknown as StatMods,
				get(first.specialMods)
			);
		const before = display().map((enemy) => enemy.forms[0].stats.hp);
		first.contracts.update((value) => updateContracts(value, 'others', null, rune.runeId));
		expect(getScore(get(first.contracts))).toBe(rune.score);
		expect(getScore(get(second.contracts))).toBe(0);
		expect(display().some((enemy, i) => enemy.forms[0].stats.hp > before[i])).toBe(true);
	});
	it('applies contract immunities to the matching enemy form', () => {
		const stores = createRecalRuneStores(maps[0]);
		stores.contracts.update((value) => updateContracts(value, 'others', null, 'enemy_patrt_5'));
		const enemy = prepareStage(maps[0], 'en').enemies.find(
			(enemy) => enemy.key === 'enemy_1506_patrt'
		)!;
		const mods = get(stores.specialMods);
		expect(getStatusImmune(enemy, [], mods, 0)).toContain('stun');
		expect(getStatusImmune(enemy, [], mods, 1)).toEqual([]);
	});
});
