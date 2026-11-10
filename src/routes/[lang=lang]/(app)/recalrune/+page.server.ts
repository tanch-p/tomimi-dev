import activities from '$lib/data/stages/activities_list.json';
import { prepareStage } from '$lib/server/stageLoad';
import type { Language, MapConfig } from '$lib/types';
import type { PageServerLoad } from './$types';

export const entries = () => [{ lang: 'en' }, { lang: 'ja' }, { lang: 'zh' }];

export const load = (async ({ fetch, params }) => {
	const language = params.lang as Language;
	const stageOptions = activities
		.filter((activity) => activity.id === 'recalrune')
		.flatMap((activity) => activity.zones.flatMap((zone) => zone.stages));
	const stages = await Promise.all(
		stageOptions.map(async ({ stageId }) => {
			const response = await fetch(`/stage_data/${stageId}.json`);
			if (!response.ok) {
				throw new Error(`Could not load recalrune stage ${stageId}: ${response.status}`);
			}
			return prepareStage((await response.json()) as MapConfig, language);
		})
	);

	return { language, stageOptions, stages };
}) satisfies PageServerLoad;
