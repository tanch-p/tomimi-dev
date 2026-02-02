<script lang="ts">
	import type { Language, MapConfig } from '$lib/types';
	import translations from '$lib/translations.json';
	import { Game } from './objects/Game';
	import BranchOption from './BranchOption.svelte';
	import branchInfo from '$lib/data/stages/branch_info.json';
	import { getFormTitle } from '$lib/functions/lib';

	const BRANCHES_TO_IGNORE = ['skzjkl_stage_2', 'amiy_blink_1', 'amiy_blink_2'];

	export let mapConfig: MapConfig,
		game: Game,
		language: Language,
		branchKey: string,
		branchIndex: number;

	const branches = Object.keys(mapConfig?.branches)
		.filter((key) => !BRANCHES_TO_IGNORE.includes(key))
		.reduce((acc, key) => {
			const branchExtraInfo = branchInfo?.[mapConfig?.levelId]?.[key];
			const index = branchExtraInfo?.index || 0;
			if (!acc[index]) {
				acc[index] = [];
			}
			acc[index].push(key);
			return acc;
		}, {});
</script>

<div
	class="absolute right-4 top-24 z-[2] w-[120px] overflow-y-auto max-h-[80%] bg-neutral-800 bg-opacity-80"
>
	<div>
		<div class="flex items-center gap-x-1.5 pl-1 pr-0.5 border-b border-slate-600 text-end">
			<h6 class="font-semibold text-sky-500 w-full">{translations[language].branch_summon_list}</h6>
		</div>
		<div class="flex flex-col gap-y-1.5 mt-1.5">
			{#each Object.entries(branches) as [index, keyList]}
				{#if Object.keys(branches).length > 1}
					<span class="text-xs text-center">
						{getFormTitle('form', parseInt(index), language)}
					</span>
				{/if}
				{#each keyList as key}
					<BranchOption bind:branchKey bind:branchIndex {language} {mapConfig} {game} {key} />
				{/each}
			{/each}
		</div>
	</div>
</div>
