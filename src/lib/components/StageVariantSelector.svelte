<script lang="ts">
	import TitleBlock from './TitleBlock.svelte';
	import stageVariantDisplay from '$lib/data/stages/stage_variant_lookup.json';
	import { getTranslations } from '$lib/functions/languageHelpers';
	import type { Language } from '$lib/types';
	import { page } from '$app/stores';
	import { getIconPath } from '$lib/functions/stageHelpers';

	export let variants;
	export let selectedIndex = 0;

	let language: Language;
	$: language = $page.data.language;
</script>

{#if variants.length > 1}
	<TitleBlock
		title={getTranslations(language).stage_choice}
		description={getTranslations(language).stage_variant_desc}
	>
		<div class="mb-8 mt-1.5 flex flex-wrap gap-2 px-2 md:flex-nowrap">
			{#each variants as { suffix, levelId }, i}
				{@const display = stageVariantDisplay[levelId]}
				{@const isOnShortRow =
					variants.length === 4 ||
					(variants.length % 3 !== 0 && i >= variants.length - (variants.length % 3))}
				<button
					type="button"
					aria-pressed={i === selectedIndex}
					class="min-h-[96px] min-w-0 grow rounded-lg border px-2 py-2 shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900 md:basis-0 {variants.length ===
					4
						? 'basis-[calc(50%_-_0.25rem)]'
						: 'basis-[calc(33.333333%_-_0.333333rem)]'} {i !== selectedIndex
						? 'border-neutral-500 bg-neutral-700 text-neutral-300 hover:border-neutral-300 hover:bg-neutral-600 hover:text-white'
						: 'border-sky-300 bg-sky-500 text-white shadow-sky-950/40'}"
					on:click={() => (selectedIndex = i)}
				>
					<div class="flex items-center justify-center gap-x-1 md:gap-x-1.5">
						{#each display?.icons ?? [] as icon}
							<img
								class="pointer-events-none select-none {display?.icons?.length === 1 || isOnShortRow
									? 'h-[65px] w-[65px]'
									: 'h-[50px] w-[50px] sm:h-[65px] sm:w-[65px]'}"
								src={getIconPath(icon)}
								height="65"
								width="65"
								decoding="async"
								alt={icon.id}
							/>
						{/each}
					</div>
					<p class="mt-1 font-medium leading-tight text-sm md:text-base">
						{display?.label?.[language] || suffix}
					</p>
				</button>
			{/each}
		</div>
	</TitleBlock>
{/if}
