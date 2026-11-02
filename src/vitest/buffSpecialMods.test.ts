import { describe, expect, it } from 'vitest';
import { get, writable } from 'svelte/store';
import type { MapConfig, SpecialMods } from '$lib/types';
import { setOtherBuffsList, updateOtherBuffsList } from '$lib/functions/buffHelpers';
import { compileSpecialMods } from '$lib/functions/statHelpers';
import { prepareStage } from '$lib/server/stageLoad';
import stageData from '$lib/data/stages/ro_stage_data/ro6/level_rogue6_5-8.json';
import enemySkills from '$lib/data/enemy/enemy_skills.json';

type Buff = {
	key: string;
	imgKey: string;
	targets: string[];
	mods: unknown[];
	maxCount: number;
	activeTargets: { key: string; count: number }[];
};

function setup() {
	const config = structuredClone(stageData.data[0]) as unknown as MapConfig;
	const { enemies } = prepareStage(config, 'en');
	const source = enemies.find((enemy) => enemy.key === 'enemy_9002_adsham')!;
	const store = writable<Buff[]>([]);
	function build(specialMods?: SpecialMods) {
		setOtherBuffsList(store, 'rogue_black', [source], [], config, 'en', 0, false, specialMods);
		return get(store).find((buff) => buff.imgKey === source.key);
	}
	return { config, source, store, build };
}

describe('enemy buff specialMods overrides', () => {
	it('uses the stage override target list instead of the database default', () => {
		const { config, source, build } = setup();
		const specialMods = compileSpecialMods([config.all_mods] as Parameters<
			typeof compileSpecialMods
		>[0]);
		const original = structuredClone(specialMods);
		const buff = build(specialMods)!;
		expect(buff.targets).toContain('enemy_10210_muwiz');
		expect(buff.targets).not.toContain('enemy_1062_rager_2');
		expect(buff.targets).not.toContain(`exclude:${source.key}`);
		expect(specialMods).toEqual(original);
		expect(enemySkills.adsham_buff.effects.targets).toEqual(['exclude:enemy_9002_adsham']);
	});

	it('gives store overrides precedence over skill references and database effects', () => {
		const { source, build } = setup();
		const ref = source.traits.find((skill) => skill.key === 'adsham_buff')!;
		Object.assign(ref, {
			effects: { targets: ['reference-target'], activeTargets: [], mods: [], maxCount: 2 }
		});
		const effects = {
			targets: ['override-target'],
			activeTargets: [],
			mods: [{ key: 'atk', value: 0.5, mode: 'mul' }],
			maxCount: 3
		};
		const mods = { [source.key]: { adsham_buff: { effects } } } as unknown as SpecialMods;
		expect(build(mods)).toMatchObject(effects);
		expect(build()).toMatchObject({ targets: ['reference-target'], maxCount: 2 });
	});

	it('keeps defaults for missing or unrelated overrides and honors an overridden skill type', () => {
		const { source, build } = setup();
		const original = build();
		expect(build({})).toEqual(original);
		expect(build({ other_enemy: {} })).toEqual(original);
		expect(build({ [source.key]: { other_skill: {} } } as unknown as SpecialMods)).toEqual(
			original
		);
		expect(
			build({ [source.key]: { adsham_buff: { type: 'skill' } } } as unknown as SpecialMods)
		).toBeUndefined();
	});

	it('keeps manual selections out of the specialMods store', () => {
		const { config, source, store, build } = setup();
		const specialMods = compileSpecialMods([config.all_mods] as Parameters<
			typeof compileSpecialMods
		>[0]);
		const original = structuredClone(specialMods);
		const buff = build(specialMods)!;
		updateOtherBuffsList(store, buff.key, source.key);
		expect(get(store).find((item) => item.imgKey === source.key)?.activeTargets).toEqual([
			{ key: source.key, count: 1 }
		]);
		expect(specialMods).toEqual(original);
		expect(build(specialMods)?.activeTargets).toEqual([]);
	});
});
