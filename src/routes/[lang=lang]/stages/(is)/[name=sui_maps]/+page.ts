import type { PageLoad } from './$types';
import type { Language, RogueTopic } from '$lib/types';
import { getStageData } from '$lib/functions/lib';
export const load = (async ({ params }) => {
	const language: Language = params.lang;
	const stageData = await getStageData(params.name);
	const rogueTopic: RogueTopic = 'rogue_yan';
	return {
		mapConfig: stageData.data[0],
		stageData,
		language,
		rogueTopic
	};
}) satisfies PageLoad;
