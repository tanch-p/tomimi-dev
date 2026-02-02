<script lang="ts">
	import type { Language, MapConfig } from '$lib/types';
	import translations from '$lib/translations.json';
	import branchInfo from '$lib/data/stages/branch_info.json';
	import { Game } from './objects/Game';
	import Icon from '../Icon.svelte';
	import { slide } from 'svelte/transition';
	import { GameConfig } from './objects/GameConfig';
	import { isChestBranch } from '$lib/functions/waveHelpers';
	import TextParser from '../TextParser.svelte';

	export let mapConfig: MapConfig,
		game: Game,
		language: Language,
		key: string,
		branchKey: string,
		branchIndex: number;

	let isOpen = false;
	const branchExtraInfo = branchInfo?.[mapConfig?.levelId]?.[key];
	const branchType = branchExtraInfo?.type;
	const branchRandom = branchExtraInfo?.isRandom || false;
	const tooltip = branchExtraInfo?.tooltip?.[language] || [];
	const hasMultipleOptions =
		mapConfig?.branches?.[key]?.phases?.length > 1 && branchType === 'single';
	const title = isChestBranch(mapConfig?.branches, key)
		? translations[language].mimic
		: branchExtraInfo?.[`name_${language}`] || key;
	function handleTitleClick(key) {
		if (hasMultipleOptions) {
			isOpen = !isOpen;
			return;
		}
		handleBranchSummon(key);
	}
	function handleBranchSummon(key: string, index = -1) {
		branchKey = key;
		branchIndex = index;
		GameConfig.setValue('waveElapsedTime', 0);
		game?.gameManager?.clearAndAddBranch(key, index);
	}
</script>

<div class="">
	<button
		class="flex items-center gap-x-1.5 justify-between bg-neutral-600 w-full px-2 py-0.5 text-xs text-end text-near-white hover:bg-near-white hover:text-gray-900 transition-all whitespace-nowrap"
		on:click={() => handleTitleClick(key)}
	>
		{#if hasMultipleOptions}
			{#if isOpen}
				<Icon name="icon-minus" className="w-3 h-3 shrink-0" />
			{:else}
				<Icon name="icon-plus" className="w-3 h-3 shrink-0" />
			{/if}
		{:else}
			<Icon name="left-chevron" className="w-3 h-3 mt-[1px] shrink-0" />
		{/if}
		<span>{title}</span>
	</button>
	{#if isOpen}
		<div transition:slide|local={{ duration: 300 }}>
			<div class="mt-1.5 flex flex-wrap gap-2 w-full">
				{#each mapConfig?.branches?.[key]?.phases as _, index}
					<button
						class="flex items-center justify-center bg-neutral-600 w-[14px] h-[20px] px-2 py-0.5 text-xs text-near-white hover:bg-near-white hover:text-gray-900 transition-all"
						on:click={() => handleBranchSummon(key, index)}
					>
						{index + 1}
					</button>
				{/each}
			</div>
			{#if tooltip.length > 0}
				<div class="mt-1.5 mb-2.5 text-xs p-1 bg-gray-500 bg-opacity-80">
					{#each tooltip as line}
						<TextParser {line} />
					{/each}
				</div>
			{/if}
		</div>
	{/if}
</div>
