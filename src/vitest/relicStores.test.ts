import { beforeEach, describe, expect, it, vi } from 'vitest';
import { get } from 'svelte/store';
import { relicCatalogs } from '$lib/data/is/relicCatalog';
import type { RelicDefinition, RelicEffect } from '$lib/data/is/relicTypes';
import { compileHiddenGroups } from '$lib/functions/waveHelpers';
import * as black from '../routes/[lang=lang]/stages/(is)/[name=black_maps]/stores.js';
import * as sui from '../routes/[lang=lang]/stages/(is)/[name=sui_maps]/stores.js';
import * as phantom from '../routes/[lang=lang]/stages/(is)/[name=phantom_maps]/stores.js';
import * as mizuki from '../routes/[lang=lang]/stages/(is)/[name=mizuki_maps]/stores.js';
import * as sami from '../routes/[lang=lang]/stages/(is)/[name=sami_maps]/stores.js';
import * as sarkaz from '../routes/[lang=lang]/stages/(is)/[name=sarkaz_maps]/stores.js';

// Keep browser preferences out of these tests; the actual modifier builders run unchanged.
vi.mock('$app/environment', () => ({ browser: false }));
vi.mock('../routes/stores', () => ({ cookiesEnabled: false }));

vi.mock('$lib/data/is/relicCatalog', async (importOriginal) => {
	const actual = await importOriginal<typeof import('$lib/data/is/relicCatalog')>();
	// A staged system effect guards against a consumer accidentally using base effects.
	// The real catalogs currently only have ordinary stat modifiers on their stages.
	const stagedSystemRelic: RelicDefinition = {
		id: 'test_staged_system_relic',
		name: { zh: '测试' },
		tooltip: { zh: '测试' },
		effects: [
			{
				targets: ['system'],
				mods: [{ key: 'level_hidden_group_enable', value: 0, valueStr: 'base_group' }]
			}
		],
		stages: [
			{ suffix: 'empty', effects: [] },
			{
				suffix: 'active',
				effects: [
					{ targets: ['ALL'], mods: [{ key: 'hp', value: 2, mode: 'mul' }] },
					{
						targets: ['system'],
						mods: [{ key: 'level_hidden_group_enable', value: 0, valueStr: 'stage_group' }]
					}
				]
			}
		]
	};
	return {
		...actual,
		relicCatalogs: {
			...actual.relicCatalogs,
			rogue_black: [...actual.relicCatalogs.rogue_black, stagedSystemRelic],
			rogue_yan: [...actual.relicCatalogs.rogue_yan, stagedSystemRelic]
		},
		phantomHardRelics: [...actual.phantomHardRelics, stagedSystemRelic]
	};
});

const topics = [
	{ name: 'Black', topic: 'rogue_black', store: black },
	{ name: 'Sui', topic: 'rogue_yan', store: sui },
	{ name: 'Phantom', topic: 'rogue_phantom', store: phantom },
	{ name: 'Mizuki', topic: 'rogue_mizuki', store: mizuki },
	{ name: 'Sami', topic: 'rogue_sami', store: sami },
	{ name: 'Sarkaz', topic: 'rogue_skz', store: sarkaz }
] as const;

type RelicModifierSnapshot = {
	others: { key: string; mods: (RelicEffect[] | null | undefined)[] }[];
};

beforeEach(() => {
	for (const { store } of topics) {
		store.selectedRelics.clear();
		store.difficulty.set(0);
		store.selectedFloor.set(1);
		store.eliteMode.set(false);
	}
	black.stageType.set('');
	sui.stageType.set('');
	phantom.selectedUniqueRelic.clear();
});

describe('relic modifier store integration', () => {
	it.each(topics)('applies and removes ordinary relic effects in $name', ({ topic, store }) => {
		const relic = relicCatalogs[topic][0];
		store.selectedRelics.ensureSelected(relic.id);
		expect(
			get<RelicModifierSnapshot>(store.statMods).others.find((group) => group.key === relic.id)
				?.mods
		).toEqual([relic.effects]);
		store.selectedRelics.remove(relic.id);
		expect(
			get<RelicModifierSnapshot>(store.statMods).others.find((group) => group.key === relic.id)
		).toBeUndefined();
	});

	it('updates Black modifiers immediately when a saved stage is restored or edited', () => {
		const id = 'rogue_6_relic_fight_30';
		black.selectedRelics.restore([{ id, count: 3 }]);
		const values = () =>
			get<RelicModifierSnapshot>(black.statMods)
				.others.find((group) => group.key === id)
				?.mods[0]?.[0].mods?.map((mod) => mod.value);
		expect(values()).toEqual([1.6, 1.6]);
		black.selectedRelics.setStage(id, 5);
		expect(values()).toEqual([2.2, 2.2]);
		black.selectedRelics.ensureSelected(id);
		expect(values()).toEqual([2.2, 2.2]);
	});

	it('preserves Sui stacked effects and filters their battle conditions', () => {
		const id = 'rogue_5_copper_B_02';
		sui.selectedRelics.ensureSelected(id);
		sui.selectedRelics.setStage(id, 1);
		const effects = () => get(sui.statMods).others.find((group) => group.key === id)?.mods[0];
		expect(effects()).toHaveLength(2);
		sui.stageType.set('BATTLE_BOSS');
		expect(effects()).toHaveLength(4);
		sui.stageType.set('BATTLE_SKY');
		expect(effects()).toHaveLength(4);
		sui.stageType.set('');
		expect(effects()).toHaveLength(2);
	});

	it('applies Sui alternate states instead of accumulating them', () => {
		const id = 'rogue_5_copper_U_2';
		sui.selectedRelics.ensureSelected(id);
		const value = () =>
			get(sui.statMods).others.find((group) => group.key === id)?.mods[0]?.[0].mods?.[0].value;
		expect(value()).toBe(2000);
		sui.selectedRelics.setStage(id, 3);
		expect(value()).toBe(-3500);
		sui.selectedRelics.setStage(id, 2);
		expect(value()).toBe(4000);
	});

	it('updates the Phantom hard modifier without retaining the previous unique relic', () => {
		const id = 'rogue_1_relic_c07';
		phantom.selectedUniqueRelic.ensureSelected(id);
		phantom.selectedUniqueRelic.setStage(id, 6);
		expect(
			get(phantom.statMods).others.find((group) => group.key === id)?.mods[0]?.[0].mods?.[0].value
		).toBe(1.65);
		phantom.selectedUniqueRelic.toggle('rogue_1_relic_c08');
		expect(get(phantom.statMods).others.some((group) => group.key === id)).toBe(false);
		phantom.selectedUniqueRelic.clear();
		expect(get(phantom.statMods).others.some((group) => group.key === 'rogue_1_relic_c08')).toBe(
			false
		);
	});

	it.each([
		{ name: 'Black', store: black, selection: black.selectedRelics },
		{ name: 'Sui', store: sui, selection: sui.selectedRelics },
		{ name: 'Phantom hard', store: phantom, selection: phantom.selectedUniqueRelic }
	])(
		'uses the same active stage for regular and special modifiers in $name',
		({ store, selection }) => {
			const id = 'test_staged_system_relic';
			selection.ensureSelected(id);
			expect(
				get<RelicModifierSnapshot>(store.statMods).others.find((group) => group.key === id)?.mods
			).toEqual([[]]);
			expect(get(store.specialMods)).not.toHaveProperty('system');
			selection.setStage(id, 1);
			expect(
				get<RelicModifierSnapshot>(store.statMods).others.find((group) => group.key === id)
					?.mods[0]?.[0].mods?.[0].value
			).toBe(2);
			expect(get(store.specialMods)).toMatchObject({ system: [{ valueStr: 'stage_group' }] });
			selection.clear();
			expect(get(store.specialMods)).not.toHaveProperty('system');
		}
	);

	it('updates wave groups through the real special modifier stores', () => {
		black.selectedRelics.ensureSelected('rogue_6_relic_final_7');
		expect(compileHiddenGroups([], false, {}, 'rogue_black', get(black.specialMods))).toContain(
			'shadvr'
		);
		black.selectedRelics.clear();
		expect(
			compileHiddenGroups(['shadvr'], false, {}, 'rogue_black', get(black.specialMods))
		).not.toContain('shadvr');
		sui.selectedRelics.ensureSelected('rogue_5_copper_S_1');
		expect(get(sui.specialMods)).toMatchObject({
			system: [
				{ key: 'level_hidden_group_enable', valueStr: 'copper_r' },
				{ key: 'level_hidden_group_disable', valueStr: 'copper_d' }
			]
		});
		sui.selectedRelics.clear();
		expect(get(sui.specialMods)).not.toHaveProperty('system');
	});
});
