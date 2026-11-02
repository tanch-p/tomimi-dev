import { describe, expect, it, vi } from 'vitest';
import { get } from 'svelte/store';
import { relicCatalogs, phantomHardRelics } from '$lib/data/is/relicCatalog';
import { getRelicStages, getRelicText, type RelicDefinition } from '$lib/data/is/relicTypes';
import {
	createRelicSelectionStore,
	resolveRelic,
	serializeRelics
} from '$lib/functions/relicSelection';
import { compileSpecialMods } from '$lib/functions/statHelpers';
import { encodeUserRunState, tryDecodeUserRunState } from '$lib/functions/userRunStateHelpers';
import { compileHiddenGroups, handleOptionsUpdate } from '$lib/functions/waveHelpers';

const blackId = 'rogue_6_relic_fight_30';
const suiId = 'rogue_5_copper_B_02';

function freeze<T>(value: T): T {
	if (value && typeof value === 'object') {
		Object.freeze(value);
		Object.values(value).forEach(freeze);
	}
	return value;
}

function specialEffects(store: ReturnType<typeof createRelicSelectionStore>) {
	return compileSpecialMods(
		get(store.resolved).map((relic) => relic.effects) as unknown as Parameters<
			typeof compileSpecialMods
		>[0]
	);
}

describe('relic catalog', () => {
	it('provides nested translations and Chinese fallback in every dataset', () => {
		for (const catalog of [...Object.values(relicCatalogs), phantomHardRelics]) {
			expect(new Set(catalog.map((relic) => relic.id)).size).toBe(catalog.length);
			for (const relic of catalog) {
				expect(relic.name.zh).toBeTruthy();
				expect(relic.tooltip.zh).toBeTruthy();
				expect(relic).not.toHaveProperty('name_zh');
				expect(relic).not.toHaveProperty('tooltip_zh');
				expect(getRelicStages(relic).length).toBeGreaterThan(0);
			}
		}
		expect(getRelicText({ zh: '探测先锋', en: '' }, 'en')).toBe('探测先锋');
		expect(getRelicText({ zh: '中文', ja: '日本語' }, 'ja')).toBe('日本語');
	});
});

describe('relic selections', () => {
	it('preserves stages and order when variants or pages ensure existing relics', () => {
		const store = createRelicSelectionStore(relicCatalogs.rogue_black);
		store.ensureSelected(blackId);
		store.setStage(blackId, 3);
		store.ensureSelected([blackId, 'rogue_6_relic_final_3', blackId]);
		expect(get(store)).toEqual([
			{ id: blackId, stageIndex: 3 },
			{ id: 'rogue_6_relic_final_3', stageIndex: 0 }
		]);
	});

	it('does not publish no-op changes, including reactive defaults', () => {
		const store = createRelicSelectionStore(relicCatalogs.rogue_black);
		const listener = vi.fn();
		const unsubscribe = store.subscribe(listener);
		store.clear();
		store.ensureSelected('unknown');
		store.remove(blackId);
		expect(listener).toHaveBeenCalledTimes(1);
		store.ensureSelected(blackId);
		store.ensureSelected(blackId);
		store.setStage(blackId, 0);
		store.restore([{ id: blackId, count: 1 }]);
		expect(listener).toHaveBeenCalledTimes(2);
		unsubscribe();
	});

	it('rejects invalid stages and never adds an unselected relic by changing its stage', () => {
		const store = createRelicSelectionStore(relicCatalogs.rogue_black);
		store.setStage(blackId, 2);
		expect(get(store)).toEqual([]);
		store.ensureSelected(blackId);
		for (const stage of [-1, 6, 0.5, NaN, Infinity]) store.setStage(blackId, stage);
		expect(get(store)).toEqual([{ id: blackId, stageIndex: 0 }]);
		store.toggle('unknown');
		expect(get(store)).toHaveLength(1);
	});

	it('keeps catalog objects untouched and selections isolated between stores', () => {
		const catalog = freeze(structuredClone(relicCatalogs.rogue_black));
		const original = structuredClone(catalog);
		const first = createRelicSelectionStore(catalog);
		const second = createRelicSelectionStore(catalog);
		first.ensureSelected(blackId);
		first.setStage(blackId, 4);
		second.ensureSelected(blackId);
		expect(get(second)[0].stageIndex).toBe(0);
		first.restore([{ id: blackId, count: 3 }]);
		first.clear();
		first.toggle(blackId);
		expect(get(first)[0].stageIndex).toBe(0);
		expect(catalog).toEqual(original);
	});

	it('replaces unique selections and uses the same zero-based stages', () => {
		const store = createRelicSelectionStore(phantomHardRelics, { exclusive: true });
		const [first, second] = phantomHardRelics;
		store.toggle(first.id);
		store.setStage(first.id, 6);
		expect(get(store.resolved)[0].effects[0].mods?.[0].value).toBe(1.65);
		store.toggle(second.id);
		expect(get(store)).toEqual([{ id: second.id, stageIndex: 0 }]);
		store.setStage(second.id, 1);
		expect(get(store.resolved)[0].stage.suffix).toBe('ALL');
		store.toggle(second.id);
		expect(get(store)).toEqual([]);
	});

	it('uses complete stage snapshots for additive stacks and alternate states', () => {
		const black = createRelicSelectionStore(relicCatalogs.rogue_black);
		black.ensureSelected(blackId);
		black.setStage(blackId, 2);
		expect(get(black.resolved)[0].effects[0].mods?.[0].value).toBe(1.6);
		const sui = createRelicSelectionStore(relicCatalogs.rogue_yan);
		sui.ensureSelected(suiId);
		sui.setStage(suiId, 1);
		expect(get(sui.resolved)[0].effects).toHaveLength(4);
		sui.ensureSelected('rogue_5_copper_U_2');
		sui.setStage('rogue_5_copper_U_2', 3);
		expect(get(sui.resolved)[1].effects[0].mods?.[0].value).toBe(-3500);
	});

	it('uses the selected snapshot for special effects as well as stats', () => {
		const relic: RelicDefinition = {
			id: 'test',
			name: { zh: '测试' },
			tooltip: { zh: '测试' },
			effects: [
				{
					targets: ['system'],
					mods: [{ key: 'level_hidden_group_enable', value: 0, valueStr: 'base' }]
				}
			],
			stages: [
				{ suffix: '1', effects: [] },
				{
					suffix: '2',
					effects: [
						{
							targets: ['system'],
							mods: [{ key: 'level_hidden_group_enable', value: 0, valueStr: 'stage' }]
						}
					]
				}
			]
		};
		const store = createRelicSelectionStore([relic]);
		store.ensureSelected(relic.id);
		expect(get(store.resolved)[0].effects).toEqual([]);
		expect(specialEffects(store)).toEqual({});
		store.setStage(relic.id, 1);
		expect(specialEffects(store)).toEqual({
			system: [{ key: 'level_hidden_group_enable', value: 0, valueStr: 'stage' }]
		});
		expect(resolveRelic(relic, { id: 'wrong', stageIndex: 0 })).toBeUndefined();
	});

	it('restores published counts and round-trips the existing share-code format', () => {
		const store = createRelicSelectionStore(relicCatalogs.rogue_black);
		const state = tryDecodeUserRunState('AQUPAwAHAwQAD2QF')!;
		expect(state).toBeTruthy();
		store.restore(state.relics);
		expect(get(store).find((entry) => entry.id === blackId)?.stageIndex).toBe(2);
		const saved = serializeRelics(get(store.resolved));
		expect(saved).toEqual(state.relics);
		const code = encodeUserRunState({ ...state, relics: saved })!;
		expect(tryDecodeUserRunState(code)?.relics).toEqual(state.relics);
	});

	it('validates restored IDs, counts, and duplicates', () => {
		const store = createRelicSelectionStore(relicCatalogs.rogue_black);
		for (const count of [0, -1, 7, 1.5, NaN]) {
			store.restore([{ id: blackId, count }]);
			expect(get(store)).toEqual([]);
		}
		store.restore([{ id: 'unknown' }, { id: blackId }, { id: blackId, count: 4 }]);
		expect(get(store)).toEqual([{ id: blackId, stageIndex: 0 }]);
	});
});

describe('relic wave synchronization', () => {
	it('updates Black groups when relics change outside the wave panel', () => {
		const store = createRelicSelectionStore(relicCatalogs.rogue_black);
		const groups = handleOptionsUpdate([], 'shadvr', 'rogue_black', 0, { relics: store });
		expect(compileHiddenGroups(groups, false, {}, 'rogue_black', specialEffects(store))).toContain(
			'shadvr'
		);
		store.remove('rogue_6_relic_final_7');
		expect(
			compileHiddenGroups(groups, false, {}, 'rogue_black', specialEffects(store))
		).not.toContain('shadvr');
	});

	it('updates Sui groups and restores the default group after overlay reset', () => {
		const store = createRelicSelectionStore(relicCatalogs.rogue_yan);
		const groups = handleOptionsUpdate([], 'copper_r', 'rogue_yan', 0, { relics: store });
		expect(
			compileHiddenGroups(
				groups,
				false,
				{ NORMAL: { groupKey: '' } },
				'rogue_yan',
				specialEffects(store)
			)
		).toEqual(['copper_r']);
		store.clear();
		expect(
			compileHiddenGroups(
				groups,
				false,
				{ NORMAL: { groupKey: '' } },
				'rogue_yan',
				specialEffects(store)
			)
		).toEqual(['copper_d']);
	});
});
