import { describe, expect, it } from 'vitest';
import type { EnemyDBEntry, SpecialMods, StatMods } from '$lib/types';
import {
	applyMods,
	createPersistentStatModsSelector,
	getPersistentStatMods,
	materializeEnemyDisplayStats,
	normalizeEnemyDefinitions
} from '$lib/functions/statHelpers';

const enemy = {
	id: 'TEST',
	key: 'enemy_test',
	stageId: 'enemy_test_stage',
	level: 0,
	name_en: 'Test Enemy',
	name_ja: 'Test Enemy',
	name_zh: 'Test Enemy',
	type: ['melee', 'NORMAL'],
	traits: [],
	stats: {
		hp: 1000,
		atk: 100,
		def: 50,
		res: 0,
		aspd: 1,
		range: 0,
		weight: 1,
		lifepoint: 1,
		ms: 1,
		epDamageResistance: 0,
		epResistance: 0,
		traits: [],
		special: [[{ key: 'form_one_skill' }], [{ key: 'form_two_skill' }]],
		form_mods: [[], [{ key: 'atk', value: 1, mode: 'mul', order: 'initial' }]]
	},
	forms: [
		{
			title: null,
			normal_attack: { atk_type: ['melee', 'phys'], hits: 1 },
			status_immune: []
		},
		{
			title: 'second_form',
			normal_attack: { atk_type: ['melee', 'phys'], hits: 1 },
			status_immune: []
		}
	]
} as unknown as EnemyDBEntry;

const statMods = {
	runes: { key: 'combat_ops', mods: [] },
	diff: null,
	others: [
		{
			key: 'preview_buff',
			mods: [
				[
					{
						targets: ['ALL'],
						mods: [{ key: 'ms', value: 2, mode: 'mul', order: 'final' }]
					}
				]
			]
		}
	]
} as unknown as StatMods;

describe('enemy stat preparation', () => {
	it('normalizes form data without applying display modifiers', () => {
		const [normalized] = normalizeEnemyDefinitions([enemy]);

		expect(normalized).not.toBe(enemy);
		expect(normalized.forms[0].special).toEqual([{ key: 'form_one_skill' }]);
		expect(normalized.forms[1].special).toEqual([{ key: 'form_two_skill' }]);
		expect(normalized.forms[0].stats.atk).toBe(100);
		expect(normalized.forms[1].stats.atk).toBe(200);
		expect(normalized.forms[0].stats.ms).toBe(1);
		expect(normalized.modsList).toEqual([]);
		expect((enemy.forms[0] as { stats?: unknown }).stats).toBeUndefined();
	});

	it('materializes display modifiers on a separate clone', () => {
		const [normalized] = normalizeEnemyDefinitions([enemy]);
		const [display] = materializeEnemyDisplayStats([normalized], statMods, {});

		expect(display).not.toBe(normalized);
		expect(display.forms[0].stats.ms).toBe(2);
		expect(normalized.forms[0].stats.ms).toBe(1);
		expect(display.modsList[0].some((group) => group.key === 'preview_buff')).toBe(true);
	});

	it('keeps applyMods as a behavior-compatible composed API', () => {
		const specialMods = {} as SpecialMods;
		const normalized = normalizeEnemyDefinitions([enemy], specialMods);

		expect(applyMods([enemy], statMods, specialMods)).toEqual(
			materializeEnemyDisplayStats(normalized, statMods, specialMods)
		);
	});

	it('excludes table previews from persistent simulation modifiers', () => {
		const persistent = getPersistentStatMods({
			...statMods,
			others: [
				...statMods.others,
				{
					key: 'selected_table_buff',
					scope: 'preview',
					mods: []
				} as unknown as StatMods['others'][number]
			]
		});

		expect(persistent.others.map(({ key }) => key)).toEqual(['preview_buff']);
		expect(statMods.others).toHaveLength(1);
	});

	it('keeps persistent modifier identity stable across preview-only changes', () => {
		const selectPersistent = createPersistentStatModsSelector();
		const first = selectPersistent(statMods);
		const second = selectPersistent({
			...statMods,
			others: [
				...statMods.others,
				{
					key: 'selected_table_buff',
					scope: 'preview',
					mods: []
				} as unknown as StatMods['others'][number]
			]
		});

		expect(second).toBe(first);
	});
});
