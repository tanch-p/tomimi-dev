import { readFileSync } from 'node:fs';
import { describe, expect, it, vi } from 'vitest';
import config from '$lib/data/recalrune/config.json';
import { load } from '../routes/[lang=lang]/(app)/recalrune/+page.server';

describe('recalrune season loading', () => {
	it('loads configured seasons and stages in order, preserving labels and falling back to stage names', async () => {
		const fetch = vi.fn(async (url: string) => new Response(readFileSync(`static${url}`, 'utf8')));
		const result = await load({ fetch, params: { lang: 'en' } } as unknown as Parameters<
			typeof load
		>[0]);
		expect(
			result.stageOptions.map(({ season, stages }) => ({
				season,
				stages: stages.map(({ stageId }) => stageId)
			}))
		).toEqual(config);
		expect(result.stages.map(({ mapConfig }) => mapConfig.levelId)).toEqual(
			config.flatMap(({ stages }) => stages)
		);
		expect(fetch).toHaveBeenCalledTimes(config.flatMap(({ stages }) => stages).length);
		expect(result.stageOptions[0].stages[0].name.en).toBe('#Death of a Patriot');
		const seasonTwoStage = result.stageOptions.find(({ season }) => season === 2)!.stages[0];
		expect(seasonTwoStage.code).toBe('M8-8');
		expect(seasonTwoStage.name.en).toBe('#苏醒，浮出梦乡');
	});

	it('reports the configured stage when its data cannot be fetched', async () => {
		const fetch = vi.fn(async () => new Response(null, { status: 404 }));
		await expect(
			load({ fetch, params: { lang: 'en' } } as unknown as Parameters<typeof load>[0])
		).rejects.toThrow(`Could not load recalrune stage ${config[0].stages[0]}: 404`);
	});
});
