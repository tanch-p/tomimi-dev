<script lang="ts">
	import { run } from 'svelte/legacy';

	import type { Language } from '$lib/types';
	import translations from '$lib/translations.json';
	import Icon from '$lib/components/Icon.svelte';
	import { onMount } from 'svelte';
	import CharaViewGrid from './CharaViewGrid.svelte';
	import CharaViewDetail from './CharaViewDetail.svelte';
	import { filtersStore, relicFiltersStore } from './stores';

	interface Props {
		characters: any;
		language: Language;
	}

	let { characters, language }: Props = $props();

	let displayMode = $state('grid');
	let visibleItems = $state([]);
	let itemsPerLoad = 50;
	let currentIndex = $state(0);
	let showAlt = $state(false);

	function loadMoreItems() {
		if (currentIndex >= characters.length) return;

		setTimeout(() => {
			const newItems = characters.slice(currentIndex, currentIndex + itemsPerLoad);
			visibleItems = [...visibleItems, ...newItems];
			currentIndex += itemsPerLoad;
		}, 0);
	}

	function handleScroll() {
		const windowHeight = window.innerHeight;
		const documentHeight = document.documentElement.scrollHeight;
		const scrollTop = window.scrollY || document.documentElement.scrollTop;

		if (documentHeight - (scrollTop + windowHeight) <= 200) {
			loadMoreItems();
		}
	}

	onMount(() => {
		loadMoreItems();
		window.addEventListener('scroll', handleScroll);

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	});
	run(() => {
		showAlt =
			$filtersStore.some(({ _, options }) => options.some((item) => item.selected)) ||
			$relicFiltersStore.some((item) => item.selected);
	});
	run(() => {
		if (characters?.length) {
			visibleItems = [];
			currentIndex = 0;
			loadMoreItems();
		}
	});
</script>

<div class="max-w-5xl mx-auto">
	{#if characters.length === 0}
		<p class="text-center">{translations[language].filter_no_result}</p>
	{:else}
		<div class="relative">
			<div class="absolute flex items-center gap-x-2 w-max right-4 -top-2.5">
				<button
					class="display-style-button rounded-full p-[9px]"
					class:active={displayMode === 'grid'}
					onclick={() => (displayMode = 'grid')}
				>
					<Icon name="grid-view" size={24} />
				</button>
				<button
					class="display-style-button rounded-full p-[10px]"
					class:active={displayMode === 'list'}
					onclick={() => (displayMode = 'list')}
				>
					<Icon name="icon-list" size={22} />
				</button>
			</div>
			<p class="md:text-center ml-4 md:ml-0">
				{translations[language].filter_result.replace('<num>', characters.length)}
			</p>
		</div>
		<div
			class="mt-4 {displayMode === 'grid'
				? 'grid grid-cols-4 sm:flex flex-wrap gap-1.5 px-1.5 sm:px-0'
				: 'flex flex-col gap-4 px-1.5 md:px-0'}"
		>
			{#each visibleItems as chara (chara.id)}
				{#if displayMode === 'grid'}
					<CharaViewGrid {chara} />
				{:else}
					<CharaViewDetail {chara} {language} {showAlt} />
				{/if}
			{/each}
		</div>
	{/if}
</div>

<style>
	.display-style-button.active {
		background-color: dimgrey;
	}
</style>
