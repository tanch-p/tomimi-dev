<script lang="ts">
	import type { Language } from '$lib/types';
	import ro2 from "$lib/data/stages/ro2.json"
	import { page } from '$app/state';

	interface Props {
		stageName: string;
		language: Language;
	}

	let { stageName, language }: Props = $props();

	let currentStageName = $derived(page?.data?.mapConfig?.name_zh);

	const stageInfo = ro2[stageName];
	if (!stageInfo) {
		throw new Error(`${stageName} is not found!`);
	}
	let stageUrl = $derived(stageInfo.code + '_' + (stageInfo[`name_${language}`] || stageInfo['name_zh']));

	let name = $derived(stageInfo[`name_${language}`] || stageInfo['name_zh']);
</script>

<a
	href={`/${language}/stages/${stageUrl}`}
	class="hover:text-sky-400"
>
	<div
		class:backdrop-brightness-50={stageName === currentStageName}
		class={`py-2 my-0.5 sm:my-1 text-center hover:backdrop-brightness-50`}
	>
		{name.replaceAll('_', ' ')}
	</div>
</a>
