<script lang="ts">
	import type { Language } from '$lib/types';
	import ro4 from "$lib/data/stages/ro4.json"
	import { page } from '$app/state';

	interface Props {
		stageName: string;
		language: Language;
	}

	let { stageName, language }: Props = $props();

	let currentStageName = $derived(page?.data?.mapConfig?.name_zh);

	const stageInfo = ro4[stageName];
	if (!stageInfo) {
		throw new Error(`${stageName} is not found!`);
	}
	let name = $derived(stageInfo[`name_${language}`] || stageInfo['name_zh']);
	let stageUrl = $derived(name==="「」" ? "ro4_b_9" :stageInfo.code + '_' + name);
</script>

<a href={`/${language}/stages/${stageUrl}`}>
	<div
		class:active={stageName === currentStageName}
		class={`hover:text-sky-400 hover:bg-[#343434] py-1.5 px-1 md:h-full hover:cursor-pointer`}
	>
		{name.replaceAll('_', ' ')}
	</div>
</a>

<style>
	div.active {
		background-color: #4e4c49;
		color: #38bdf8;
	}
</style>
