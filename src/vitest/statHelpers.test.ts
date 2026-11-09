import { describe, expect, it } from 'vitest';
import type { EnemyDBEntry, Skill, SpecialMods, StatMods, Stats } from '$lib/types';
import { relicCatalogs } from '$lib/data/is/relicCatalog';
import { getRelicStages, type RelicEffect } from '$lib/data/is/relicTypes';
import { loadStageVariants } from '$lib/server/stageLoad';
import {
	applyMods,
	compileSpecialMods,
	createPersistentStatModsSelector,
	getPersistentStatMods,
	getStatSkillValue,
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

const runeStatMods = (effects: RelicEffect[]): StatMods =>
	({
		runes: {
			key: 'combat_ops',
			mods: [[{ targets: ['ALL'], mods: [{ key: 'hp', value: 1.25, mode: 'mul' }] }]]
		},
		diff: null,
		others: [{ key: 'test_relic', mods: [effects] }]
	}) as unknown as StatMods;

describe('rune-type stat modifiers', () => {
	const baseEnemy = structuredClone(enemy);
	Object.assign(baseEnemy.stats, { hp: 101, atk: 101, ms: 1.23 });
	const mixedEffects: RelicEffect[] = [
		{
			targets: ['ALL'],
			mods: [
				{ key: 'hp', value: 2.5, mode: 'mul', type: 'rune' },
				{ key: 'hp', value: 2, mode: 'mul' },
				{ key: 'hp', value: 10, mode: 'add', order: 'initial' }
			]
		}
	];

	it('applies tagged mods before rune rounding and ordinary mods once, without mutating input', () => {
		const modifiers = runeStatMods(mixedEffects);
		const original = structuredClone(modifiers);
		const [display] = applyMods([baseEnemy], modifiers, {});

		// round(101 * 1.25 * 2.5) = 316; (316 + 10) * 2 = 652.
		expect(display.forms[0].stats.hp).toBe(652);
		expect(display.modsList[0]).toMatchObject([
			{ key: 'combat_ops', mods: [{ key: 'hp', value: 3.125 }] },
			{
				key: 'test_relic',
				mods: [
					{ key: 'hp', value: 2, mode: 'mul' },
					{ key: 'hp', value: 10, mode: 'add' }
				]
			}
		]);
		expect(modifiers).toEqual(original);
		// Buff loss drops ordinary modifiers while retaining the augmented rune base.
		expect(
			getStatSkillValue(
				display,
				0,
				{ key: 'test_skill', hp: { multiplier: 2 }, buffloss: true } as Skill,
				'hp'
			)
		).toBe(632);
	});

	it('preserves the existing calculation for untagged mods', () => {
		const effects = structuredClone(mixedEffects);
		delete effects[0].mods![0].type;
		const [display] = applyMods([baseEnemy], runeStatMods(effects), {});
		// round(101 * 1.25) = 126; (126 + 10) * 2.5 * 2 = 680.
		expect(display.forms[0].stats.hp).toBe(680);
	});

	it('preserves additive modifiers and their order within the rune phase', () => {
		const modifiers = runeStatMods([
			{
				targets: ['ALL'],
				mods: [
					{ key: 'hp', value: 3, mode: 'add', order: 'initial', type: 'rune' },
					{ key: 'hp', value: 7, mode: 'add', order: 'final', type: 'rune' },
					{ key: 'hp', value: 2, mode: 'mul' }
				]
			}
		]);
		const [display] = applyMods([baseEnemy], modifiers, {});
		// round((101 + 3 + 7) * 1.25) * 2 = 278.
		expect(display.forms[0].stats.hp).toBe(278);
	});

	it('keeps Duck Coin as a displayed rune source on Whack-A-Mus, including merged elite mods', async () => {
		const { stages } = await loadStageVariants('ISW-NO_Whack-A-Mus', 'en', 'ro5');
		const { enemies, mapConfig } = stages[0];
		expect(mapConfig.levelId).toBe('level_rogue5_1-1');
		for (const stage of getRelicStages(duckCoin)) {
			for (const elite of [false, true]) {
				const modifiers = runeStatMods(stage.effects);
				modifiers.others[0].key = duckCoin.id;
				modifiers.runes = {
					key: elite ? 'elite_ops' : 'combat_ops',
					mods: [elite ? mapConfig.elite_mods : mapConfig.n_mods, mapConfig.all_mods]
				} as unknown as StatMods['runes'];
				const display = applyMods(enemies as unknown as EnemyDBEntry[], modifiers, {});
				const duck = display.find((enemy) => enemy.key === 'enemy_2001_duckmi')!;
				const runeMods = duck.modsList[0].find((group) => group.key === modifiers.runes.key)!;
				expect(runeMods.mods).toEqual(
					expect.arrayContaining([
						expect.objectContaining({
							key: 'hp',
							sourceKeys: elite ? ['elite_ops', duckCoin.id] : [duckCoin.id],
							contributions: [
								...(elite ? [{ value: 1.2, sourceKeys: ['elite_ops'] }] : []),
								{ value: stage.suffix === 'x1' ? 2.5 : 5, sourceKeys: [duckCoin.id] }
							]
						}),
						expect.objectContaining({ key: 'ms', sourceKeys: [duckCoin.id] })
					])
				);
			}
		}
	});

	it('keeps tagged preview modifiers out of persistent simulation stats', () => {
		const modifiers = runeStatMods(mixedEffects);
		modifiers.others[0].scope = 'preview';
		const [display] = applyMods([baseEnemy], getPersistentStatMods(modifiers), {});
		expect(display.forms[0].stats.hp).toBe(126);
	});

	const duckCoin = relicCatalogs.rogue_yan.find((relic) => relic.id === 'rogue_5_copper_S_1')!;
	it.each([{ suffix: 'base', effects: duckCoin.effects }, ...getRelicStages(duckCoin)])(
		'calculates Duck Coin $suffix stats in the rune phase and preserves its system effects',
		({ effects }) => {
			const modifiers = runeStatMods(effects);
			modifiers.runes.mods[0][0].mods = ['hp', 'atk', 'ms'].map((key) => ({
				key,
				value: 1.1,
				mode: 'mul',
				order: 'final'
			}));
			modifiers.others.push({
				key: 'other_buff',
				mods: [
					[
						{
							targets: ['ALL'],
							mods: [{ key: 'hp', value: 10, mode: 'add', order: 'initial' }],
							special: {}
						}
					]
				]
			});
			const special = compileSpecialMods([effects] as unknown as Parameters<
				typeof compileSpecialMods
			>[0]);
			expect(special).toEqual({
				system: [
					{ key: 'level_hidden_group_enable', value: 0, valueStr: 'copper_r' },
					{ key: 'level_hidden_group_disable', value: 0, valueStr: 'copper_d' }
				]
			});
			for (const effect of effects.filter((effect) => !effect.targets.includes('system'))) {
				for (const key of effect.targets) {
					const [display] = applyMods([{ ...baseEnemy, key }], modifiers, special);
					for (const mod of effect.mods!) {
						expect(mod.type).toBe('rune');
						const base = mod.key === 'ms' ? 1.23 : 101;
						const precision = mod.key === 'ms' ? 100 : 1;
						const expected = Math.round(base * 1.1 * mod.value * precision) / precision;
						expect(display.forms[0].stats[mod.key as keyof Stats]).toBeCloseTo(
							expected + (mod.key === 'hp' ? 10 : 0)
						);
					}
					expect(display.modsList[0].some((group) => group.key === 'test_relic')).toBe(false);
				}
			}
			const [unrelated] = applyMods([baseEnemy], modifiers, special);
			expect(unrelated.forms[0].stats.hp).toBe(121);
			expect(unrelated.forms[0].stats.ms).toBe(1.35);
		}
	);
});
