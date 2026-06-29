import { describe, expect, it } from 'vitest';
import { getTranslations } from '$lib/functions/languageHelpers';

describe('getTranslations', () => {
	it('returns top-level leaf values', () => {
		expect(getTranslations('en').home).toBe('Home');
		expect(getTranslations('ja').home).toBe('ホーム');
		expect(getTranslations('zh').home).toBe('首页');
	});

	it('returns nested object leaf values', () => {
		expect(getTranslations('en').index.perma_stage).toBe('Permanent Stage');
		expect(getTranslations('ja').index.daily_stage).toBe('デイリーステージ');
		expect(getTranslations('zh').index.daily_stage).toBe('日常');
	});

	it('supports nested dynamic lookup', () => {
		const key = 'hp';
		expect(getTranslations('en').table_headers[key]).toBe('hp');
		expect(getTranslations('zh').table_headers[key]).toBe('生命值');
	});

	it('supports nested text fragment objects', () => {
		const ja = getTranslations('ja');
		expect(ja.status_immune.pre).toBe('【');
		expect(ja.status_immune.post).toBe('】無効');
		expect(ja.status_immune.separator).toBe('、');
	});

	it('returns array leaves intact', () => {
		const en = getTranslations('en');
		expect(Array.isArray(en.mizuki_levels)).toBe(true);
		expect(en.mizuki_levels[0]).toBe('Sunshine Coast');
		expect(en.sarkaz_levels[0]).toBe('Furnace Origin');
	});

	it('supports top-level dynamic lookup', () => {
		const key = 'rogue_phantom';
		expect(getTranslations('en')[key]).toBe('Phantom & Crimson Solitaire');
		expect(getTranslations('ja')[key]).toBe('ファントムと緋き貴石');
	});

	it('returns empty string for missing translation values', () => {
		expect(getTranslations('ja').allow_camera_move).toBe('');
		expect(getTranslations('ja').chara_filter.ally_buff_pre).toBe('');
		expect(getTranslations('zh').chara_filter.ally_buff_post).toBe('');
	});

	it('reuses the cached translation view for the same language', () => {
		expect(getTranslations('en')).toBe(getTranslations('en'));
	});
});
