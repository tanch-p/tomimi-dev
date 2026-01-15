<script lang="ts">
	import type { Language, sortOrder } from '$lib/types';
	import translations from '$lib/translations.json';
	import { getOptionTranslation, updateSortPriority } from '$lib/functions/chara/charaHelpers';
	import { sortOptions } from './stores';
	import Icon from '$lib/components/Icon.svelte';

	interface Props {
		language: Language;
	}

	let { language }: Props = $props();

	const reset = () => {
		sortOptions.update((list) =>
			list.map((ele, i) => {
				return { ...ele, order: 0, priority: null };
			})
		);
	};

	const updateSortOptions = (key, subKey, order: sortOrder) => {
		sortOptions.update((list) => {
			const copy = Array.from(list);
			const index = list.findIndex((ele) => ele.key === key && ele.subKey === subKey);
			if (index !== -1) {
				if (copy[index].order === order) {
					copy[index].order = 0;
					updateSortPriority(copy, index);
				} else {
					copy[index].order = order;
					if (!copy[index].priority) {
						copy[index].priority = copy.filter((ele) => ele.order !== 0).length;
					}
				}
			}
			list = copy;
			return list;
		});
	};
	// $: console.log($sortOptions);
</script>

<div class="bg-near-white text-almost-black rounded-md p-3 md:p-4 mt-5">
	<p class="border-b text-center pb-1 md:pb-2">{translations[language].sort}</p>
	<div class="relative">
		<button class="absolute right-2 flex" onclick={reset}>
			<Icon name="trash" className="h-[18px] mt-px" />
			{translations[language].filter_reset}
		</button>
		<div class="grid grid-cols-[minmax(75px,auto)_50px_1fr] gap-2 md:gap-3 mt-2 md:mt-3">
			<p>{translations[language].filter_option}</p>
			<p class="text-center">{translations[language].sort_priority}</p>
			<p></p>
			{#each $sortOptions as { key, subKey, suffix, order, priority }}
				<p class="py-[5px] capitalize">
					{getOptionTranslation(
						key,
						language
					)}{#if suffix}{#if language === 'en'}&nbsp;{/if}{translations[language][suffix]}{/if}
				</p>
				<p class="py-[5px] text-center">{priority || ''}</p>
				<div class="flex flex-wrap gap-2">
					<button
						class="filter-btn"
						class:active={order === 1}
						onclick={() => updateSortOptions(key, subKey, 1)}
					>
						{translations[language]['asc']}
					</button>
					<button
						class="filter-btn"
						class:active={order === -1}
						onclick={() => updateSortOptions(key, subKey, -1)}
					>
						{translations[language]['desc']}
					</button>
				</div>
			{/each}
		</div>
	</div>
	<p class="mt-4 text-xs text-end">
		※{translations[language].chara_filter_disclaimer}
	</p>
</div>
