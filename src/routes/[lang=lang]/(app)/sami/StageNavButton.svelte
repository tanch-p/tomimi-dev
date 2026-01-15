<script lang="ts">
	import type { Language } from '$lib/types';
	import ro3 from "$lib/data/stages/ro3.json"
	import { page } from '$app/state';

	interface Props {
		stageName: string;
		language: Language;
	}

	let { stageName, language }: Props = $props();

	let currentStageName = $derived(page?.data?.mapConfig?.name_zh);

	const stageInfo = ro3[stageName];
	if (!stageInfo) {
		throw new Error(`${stageName} is not found!`);
	}
	const stagesToHide = [];
	let name = $derived(stageInfo[`name_${language}`] || stageInfo['name_zh']);
	let stageUrl = $derived(stageInfo.code + '_' + name);
</script>

<a href={`/${language}/stages/${stageUrl}`}>
	<div
		class:active={stageName === currentStageName}
		class={`hover:text-sky-400 hover:bg-[#343434] py-1.5 px-1 md:h-full hover:cursor-pointer ${
			language !== 'zh' && stagesToHide.includes(stageName) ? 'text-neutral-800' : ''
		}`}
	>
		{name.replaceAll('_', ' ')}
	</div>
</a>

<style>
	div.active {
		background-color: #4b555b;
		color: #38bdf8;
	}
</style>
