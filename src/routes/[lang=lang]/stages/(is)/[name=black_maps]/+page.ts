import type { PageLoad } from './$types';
import type { Language, RogueTopic } from '$lib/types';
import { getStageData } from '$lib/functions/lib';
import { tryDecodeUserRunState } from '$lib/functions/userRunStateHelpers';

export const load = (async ({ params, url }) => {
	const language = params.lang as Language;
	const stageData = await getStageData(params.name);
	const rogueTopic: RogueTopic = 'rogue_black';
	return {
		mapConfig: stageData.data[0],
		stageData,
		language,
		rogueTopic,
		initialRunState: tryDecodeUserRunState(url.searchParams.get('state'), 'ro6')
	};
}) satisfies PageLoad;
