<script lang="ts">
	import { getTranslations } from '$lib/functions/languageHelpers';
	import type { Language, MapConfig } from '$lib/types';
	import branchInfo from '$lib/data/stages/branch_info.json';
	import { Game } from './objects/Game';
	import Icon from '../Icon.svelte';
	import { slide } from 'svelte/transition';
	import { isChestBranch } from '$lib/functions/waveHelpers';
	import TextParser from '../TextParser.svelte';

	interface Props {
		mapConfig: MapConfig;
		game: Game;
		language: Language;
		key: string;
		branchKey: string;
		branchIndex: number;
	}
	type BranchExtraInfo = {
		type?: string;
		isRandom?: boolean;
		formIndex?: number;
		tooltip?: Record<Language, string[]>;
		name_zh?: string;
		name_ja?: string;
		name_en?: string;
	};
	const branchMetadata = branchInfo as unknown as Record<string, Record<string, BranchExtraInfo>>;

	let {
		mapConfig,
		game,
		language,
		key,
		branchKey = $bindable(),
		branchIndex = $bindable()
	}: Props = $props();

	let isOpen = $state(false);
	let branchExtraInfo = $derived(branchMetadata[mapConfig.levelId]?.[key]);
	let branchType = $derived(branchExtraInfo?.type);
	let tooltip = $derived(branchExtraInfo?.tooltip?.[language] || []);
	let hasMultipleOptions = $derived(
		mapConfig?.branches?.[key]?.phases?.length > 1 && branchType === 'single'
	);
	let title = $derived(
		isChestBranch(mapConfig?.branches, key)
			? getTranslations(language).mimic
			: branchExtraInfo?.[`name_${language}`] || key
	);
	function handleTitleClick(key: string) {
		if (hasMultipleOptions) {
			isOpen = !isOpen;
			return;
		}
		handleBranchSummon(key);
	}
	function handleBranchSummon(key: string, index = -1) {
		branchKey = key;
		branchIndex = index;
		game.runtime.waveElapsedTime = 0;
		game.gameManager.clearAndAddBranch(branchKey, branchIndex);
	}
</script>

<div class="">
	<button
		class="flex items-center gap-x-1.5 justify-between bg-neutral-600 w-full px-2 py-0.5 text-xs text-end text-near-white hover:bg-near-white hover:text-gray-900 transition-all whitespace-nowrap"
		onclick={() => handleTitleClick(key)}
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
		<div transition:slide={{ duration: 300 }}>
			<div class="mt-1.5 flex flex-wrap gap-2 w-full">
				{#each mapConfig?.branches?.[key]?.phases as phase, index}
					<button
						data-phase-delay={phase.preDelay}
						class="flex items-center justify-center bg-neutral-600 w-[14px] h-[20px] px-2 py-0.5 text-xs text-near-white hover:bg-near-white hover:text-gray-900 transition-all"
						onclick={() => handleBranchSummon(key, index)}
					>
						{index + 1}
					</button>
				{/each}
			</div>
			{#if tooltip.length > 0}
				<div class="mt-1.5 mb-2.5 text-xs p-1 bg-gray-500/80">
					{#each tooltip as line}
						<TextParser {line} />
					{/each}
				</div>
			{/if}
		</div>
	{/if}
</div>
