<script lang="ts">
	import type { Language } from "$lib/types/types";
	import translations from "$lib/translations.json";
	import { getOptionTranslation } from "$lib/functions/chara/charaHelpers";
	import {
		toggleSortOptions,
		resetSortOptions,
		sortOptions,
	} from "./shared.svelte";
	import Icon from "$lib/components/Icon.svelte";

	interface Props {
		language: Language;
	}

	let { language }: Props = $props();
</script>

<div class="bg-near-white text-almost-black rounded-md p-3 md:p-4 mt-5">
	<p class="border-b border-[#e5e7eb] text-center pb-1 md:pb-2">
		{translations[language].sort}
	</p>
	<div class="relative">
		<button class="absolute right-2 flex" onclick={resetSortOptions}>
			<Icon name="trash" className="h-4.5 mt-px" />
			{translations[language].filter_reset}
		</button>
		<div
			class="grid grid-cols-[minmax(75px,auto)_50px_1fr] gap-2 md:gap-3 mt-2 md:mt-3"
		>
			<p>{translations[language].filter_option}</p>
			<p class="text-center">{translations[language].sort_priority}</p>
			<p></p>
			{#each sortOptions.entries() as [key, value]}
				{#each value as { suffix, order, priority }, subIndex}
					<p class="py-1.25 capitalize">
						{getOptionTranslation(
							key,
							language,
						)}{#if suffix}{#if language === "en"}&nbsp;{/if}{translations[
								language
							][suffix]}{/if}
					</p>
					<p class="py-1.25 text-center">{priority || ""}</p>
					<div class="flex flex-wrap gap-2">
						<button
							class="filter-btn"
							class:active={order === 1}
							onclick={() => toggleSortOptions(key, subIndex, 1)}
						>
							{translations[language]["asc"]}
						</button>
						<button
							class="filter-btn"
							class:active={order === -1}
							onclick={() => toggleSortOptions(key, subIndex, -1)}
						>
							{translations[language]["desc"]}
						</button>
					</div>
				{/each}
			{/each}
		</div>
	</div>
	<p class="mt-4 text-xs text-end">
		※{translations[language].chara_filter_disclaimer}
	</p>
</div>
