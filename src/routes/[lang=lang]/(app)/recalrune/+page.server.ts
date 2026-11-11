import config from '$lib/data/recalrune/config.json';
import activities from '$lib/data/stages/activities_list.json';
import { prepareStage } from '$lib/server/stageLoad';
import type { Language, MapConfig } from '$lib/types';
import type { PageServerLoad } from './$types';

export const entries = () => [{ lang: 'en' }, { lang: 'ja' }, { lang: 'zh' }];

export const load = (async ({ fetch, params }) => {
	const language = params.lang as Language;
	const stageLabels = activities
		.filter((activity) => activity.id === 'recalrune')
		.flatMap((activity) => activity.zones.flatMap((zone) => zone.stages));
	const seasons = await Promise.all(
		config.map(async ({ season, stages }) => ({
			season,
			stages: await Promise.all(
				stages.map(async (stageId) => {
					const response = await fetch(`/stage_data/${stageId}.json`);
					if (!response.ok) {
						throw new Error(`Could not load recalrune stage ${stageId}: ${response.status}`);
					}
					return prepareStage((await response.json()) as MapConfig, language);
				})
			)
		}))
	);
	const stageOptions = seasons.map(({ season, stages }) => ({
		season,
		stages: stages.map(({ mapConfig }) => {
			const labels = stageLabels.find((stage) => stage.stageId === mapConfig.levelId);
			return {
				stageId: mapConfig.levelId,
				code: mapConfig.code,
				name: {
					en: mapConfig.name_en || labels?.name.en || mapConfig.name_zh,
					ja: mapConfig.name_ja || labels?.name.ja || mapConfig.name_zh,
					zh: mapConfig.name_zh
				}
			};
		})
	}));

	return { language, stageOptions, stages: seasons.flatMap((season) => season.stages) };
}) satisfies PageServerLoad;
