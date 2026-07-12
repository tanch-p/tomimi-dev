<script lang="ts">
	import type { Language } from '$lib/types';
	import ro5 from '$lib/data/stages/ro5.json';
	import { page } from '$app/stores';

	export let levelId: string, language: Language;

	$: currentLevel = $page?.data?.mapConfig?.levelId;
	const stageInfo = ro5[levelId];
	if (!stageInfo) {
		throw new Error(`${levelId} is not found!`);
	}
	$: name = stageInfo[`name_${language}`] || stageInfo['name_zh'];
	$: stageUrl = stageInfo.code + '_' + name;
</script>

<a href={`/${language}/stages/${stageUrl}`}>
	<div
		class:active={levelId === currentLevel}
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
