import { loadStage } from '$lib/server/stageLoad';
import type { Language, RogueTopic } from '$lib/types';
import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
	const language = params.lang as Language;
	const { mapConfig, enemies, traps } = await loadStage(params.name, language);
	const rogueTopic: RogueTopic = 'rogue_phantom';
	return { mapConfig, enemies, language, traps, rogueTopic };
}) satisfies PageServerLoad;
