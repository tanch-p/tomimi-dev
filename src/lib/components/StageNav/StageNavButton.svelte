<script lang="ts">
	import { page } from '$app/stores';
	import ro6 from '$lib/data/stages/ro6.json';
	import type { Language } from '$lib/types';
	import type { StageCollection } from './stageNavTypes';

	export let levelId: string;
	export let language: Language;
	export let stages: StageCollection = ro6 as StageCollection;

	$: currentLevelId = $page.data?.mapConfig?.levelId;
	$: stageInfo = levelId ? stages[levelId] : undefined;

	$: if (levelId && !stageInfo) {
		throw new Error(`Stage "${levelId}" was not found.`);
	}

	$: name = stageInfo ? stageInfo[`name_${language}`] || stageInfo.name_zh : '';
	$: href = stageInfo ? `/${language}/stages/${stageInfo.code}_${name}` : '';
</script>

{#if levelId}
	<a
		{href}
		class="block break-words px-1 py-1.5 hover:cursor-pointer hover:bg-[#343434] hover:text-sky-400 md:h-full"
		class:active={levelId === currentLevelId}
		aria-current={levelId === currentLevelId ? 'page' : undefined}
	>
		{name.replaceAll('_', ' ')}
	</a>
{/if}

<style>
	.active {
		background-color: #4e4c49;
		color: #38bdf8;
	}
</style>
