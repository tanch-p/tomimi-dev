<script lang="ts">
	import type { Language } from '$lib/types';
	import type { Contracts, Crisis } from '$lib/functions/recalRune';
	import type { Writable } from 'svelte/store';
	import { getTranslations } from '$lib/functions/languageHelpers';
	import TextParser from '../TextParser.svelte';

	let {
		language,
		crisis,
		contracts
	}: { language: Language; crisis: Crisis; contracts: Writable<Contracts | null> } = $props();
</script>

<div class="flex items-center justify-center bg-[#82000e] text-near-white">
	<img src="/images/recalrune/icon_rune_head_essential.webp" alt="essential_icon" />
	<h6>{crisis.fixedRuneSeriesName[language] || crisis.fixedRuneSeriesName['zh']}</h6>
</div>
<div class="grid grid-cols-[50px_1fr] gap-y-5 pt-3">
	{#each $contracts?.base.nullGroup ?? [] as rune}
		<div class="px-1">
			<div
				class="flex items-center justify-center rounded w-full py-0.5 mt-0.5 bg-neutral-200 h-min"
			>
				<img src="/images/recalrune/icon_rune_essential_fixed.webp" alt="base_fixed" width="16" />
			</div>
		</div>
		<TextParser line={rune.description[language] || rune.description['zh'] || ''} />
	{/each}
	{#each Object.values($contracts?.base.exclusiveGroups ?? {}) as runes}
		{#each runes as rune}
			{#if rune.selected}
				<div class="px-1">
					<div
						class="flex items-center justify-center rounded w-full py-0.5 mt-0.5 bg-neutral-200 h-min"
					>
						<img
							src="/images/recalrune/icon_rune_essential_exclusive.webp"
							alt="base_fixed"
							width="16"
						/>
					</div>
				</div>
				<TextParser line={rune.description[language] || rune.description['zh'] || ''} />
			{/if}
		{/each}
	{/each}
</div>
<div class="flex items-center justify-center bg-[#82000e] text-near-white mt-5">
	<img src="/images/recalrune/icon_rune_head_rewarding.webp" alt="rewarding_icon" />
	<h6>{getTranslations(language).recal_non_essential}</h6>
</div>
<div class="grid grid-cols-[50px_1fr] gap-y-5 pt-3 pb-4">
	{#each $contracts?.others.nullGroup ?? [] as rune}
		{#if rune.selected}
			<div class="px-1">
				<div
					class="flex items-center justify-center gap-x-0.5 rounded w-full py-0.5 mt-0.5 bg-neutral-200 h-min"
				>
					<img src="/images/recalrune/icon_rune_rewarding.webp" alt="base_fixed" width="16" />
					<span class="text-[#333] font-semibold">{rune.score}</span>
				</div>
			</div>
			<TextParser line={rune.description[language] || rune.description['zh'] || ''} />
		{/if}
	{/each}
	{#each Object.values($contracts?.others.exclusiveGroups ?? {}) as runes}
		{#each runes as rune}
			{#if rune.selected}
				<div class="px-1">
					<div
						class="flex items-center justify-center gap-x-0.5 rounded w-full py-0.5 mt-0.5 bg-neutral-200 h-min"
					>
						<img src="/images/recalrune/icon_rune_rewarding.webp" alt="base_fixed" width="16" />
						<span class="text-[#333] font-semibold">{rune.score}</span>
					</div>
				</div>
				<TextParser line={rune.description[language] || rune.description['zh'] || ''} />
			{/if}
		{/each}
	{/each}
</div>
