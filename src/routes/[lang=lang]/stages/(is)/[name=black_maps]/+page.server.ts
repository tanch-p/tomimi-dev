import { loadStageVariants } from '$lib/server/stageLoad';
import type { Language, RogueTopic } from '$lib/types';
import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
	const language = params.lang as Language;
	const { stageData, stages } = await loadStageVariants(params.name, language);
	const rogueTopic: RogueTopic = 'rogue_black';
	return {
		mapConfig: stages[0].mapConfig,
		stageData,
		stages,
		language,
		rogueTopic
	};
}) satisfies PageServerLoad;
