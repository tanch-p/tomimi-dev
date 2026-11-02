import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { getRelicImagePath } from '$lib/data/is/relicImages';
import { relicCatalogs, phantomHardRelics } from '$lib/data/is/relicCatalog';
import recruitmentRelics from '$lib/data/chara/relics_chara.json';
import variantDisplay from '$lib/data/stages/stage_variant_lookup.json';
import { getIconPath } from '$lib/functions/stageHelpers';
import { getOptions } from '$lib/functions/waveHelpers';
import type { MapConfig } from '$lib/types';

const assetExists = (path: string) =>
	existsSync(fileURLToPath(new URL(`../../static${path}`, import.meta.url)));

const stageRelics = [...Object.values(relicCatalogs).flat(), ...phantomHardRelics];
const recruitmentIds = Object.values(recruitmentRelics)
	.flat()
	.map((relic) => relic.id);
const variantIds = Object.values(variantDisplay).flatMap((variant) =>
	('icons' in variant ? variant.icons : [])
		.filter((icon) => icon.type === 'relic')
		.map((icon) => icon.id)
);
const knownIds = [
	...new Set([...stageRelics.map((relic) => relic.id), ...recruitmentIds, ...variantIds])
];

describe('relic image resolution', () => {
	it.each([
		['rogue_1_relic_c01', 'relic_ursus_chachek'],
		['rogue_2_relic_fight_105', 'relic_angelina'],
		['rogue_3_relic_boss_2b', 'relic_routeweave_net'],
		['rogue_4_relic_legacy_149', 'relic_civilight_eterna'],
		['rogue_5_relic_legacy_37', 'rogue_4_relic_fight_13'],
		['rogue_6_relic_legacy_56', 'rogue_4_relic_fight_13'],
		// Recruitment-only aliases must survive independently of the IS catalogs.
		['rogue_1_relic_p46', 'relic_hand_superspeed'],
		['rogue_6_relic_legacy_61', 'relic_spinach']
	])('resolves the shared image for %s', (id, image) => {
		expect(getRelicImagePath(id)).toBe(`/images/relics/${image}.webp`);
	});

	it.each([
		'rogue_1_relic_c07',
		'rogue_6_relic_fight_30',
		'new_relic',
		'toString',
		'constructor',
		'__proto__'
	])('uses the ID for an unmapped relic: %s', (id) => {
		expect(getRelicImagePath(id)).toBe(`/images/relics/${id}.webp`);
	});

	it.each(knownIds)('has an image file for catalog or recruitment relic %s', (id) => {
		expect(assetExists(getRelicImagePath(id)), getRelicImagePath(id)).toBe(true);
	});

	it('resolves stage-variant relic aliases without changing enemy or operator paths', () => {
		expect(getIconPath({ type: 'relic', id: 'rogue_2_relic_fight_1' })).toBe(
			'/images/relics/relic_restraints.webp'
		);
		expect(getIconPath({ type: 'relic', id: 'rogue_6_relic_final_7' })).toBe(
			'/images/relics/rogue_6_relic_final_7.webp'
		);
		expect(getIconPath({ type: 'enemy', id: 'enemy_1001' })).toBe(
			'/images/enemy_icons/enemy_1001.webp'
		);
		expect(getIconPath({ type: 'chara', id: 'trap_001' })).toBe(
			'/images/chara_icons/trap_001.webp'
		);
	});

	it('provides existing relic images for the wave options', () => {
		for (const topic of ['rogue_sami', 'rogue_yan', 'rogue_black'] as const) {
			const paths = getOptions({ waves: [] } as unknown as MapConfig, topic, 0, 'en')
				.map((option) => option.src)
				.filter((src) => src?.startsWith('/images/relics/'));
			expect(paths.length).toBeGreaterThan(0);
			for (const path of paths) expect(assetExists(path), path).toBe(true);
		}
	});

	it('keeps image metadata separate from selection and effect definitions', () => {
		for (const relic of stageRelics) expect(relic).not.toHaveProperty('img');
	});
});
