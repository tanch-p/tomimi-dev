<script lang="ts">
	import { page } from '$app/state';
	import ro6 from '$lib/data/stages/ro6.json';
	import type { Language } from '$lib/types';
	import type { StageCollection } from './stageNavTypes';

	interface Props {
		levelId: string;
		language: Language;
		stages?: StageCollection;
		enemyIcon?: string;
	}

	let { levelId, language, stages = ro6 as StageCollection, enemyIcon }: Props = $props();

	let currentLevelId = $derived(page.data?.mapConfig?.levelId);
	let stageInfo = $derived.by(() => {
		const info = levelId ? stages[levelId] : undefined;
		if (levelId && !info) {
			throw new Error(`Stage "${levelId}" was not found.`);
		}
		return info;
	});

	let name = $derived(stageInfo ? stageInfo[`name_${language}`] || stageInfo.name_zh : '');
	let href = $derived(stageInfo ? `/${language}/stages/${stageInfo.code}_${name}` : '');
</script>

{#if levelId}
	<a
		{href}
		class="block break-words px-1 py-2 hover:cursor-pointer hover:bg-[#343434] hover:text-sky-400 md:h-full"
		class:active={levelId === currentLevelId}
		aria-current={levelId === currentLevelId ? 'page' : undefined}
	>
		{#if enemyIcon}
			<img src={`/images/enemy_icons/${enemyIcon}.webp`} alt="" class="mx-auto mb-2 h-12 w-12" />
		{/if}
		{name.replaceAll('_', ' ')}
	</a>
{/if}

<style>
	.active {
		background-color: #4e4c49;
		color: #38bdf8;
	}
</style>
