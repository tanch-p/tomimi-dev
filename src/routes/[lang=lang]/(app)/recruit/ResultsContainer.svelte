<script lang="ts">
	import { getTranslations } from '$lib/functions/languageHelpers';
	import type { Language } from '$lib/types';
	import Icon from '$lib/components/Icon.svelte';
	import { onMount } from 'svelte';
	import CharaViewGrid from './CharaViewGrid.svelte';
	import CharaViewDetail from './CharaViewDetail.svelte';
	import { filtersStore, relicFiltersStore } from './stores';

	export let characters, language: Language;

	let displayMode = 'grid';
	let visibleItems = [];
	let itemsPerLoad = 50;
	let currentIndex = 0;
	let showAlt = false;
	$: showAlt =
		$filtersStore.some(({ _, options }) => options.some((item) => item.selected)) ||
		$relicFiltersStore.some((item) => item.selected);
	$: if (characters?.length) {
		visibleItems = [];
		currentIndex = 0;
		loadMoreItems();
	}

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
</script>

<div class="max-w-5xl mx-auto">
	{#if characters.length === 0}
		<p class="text-center">{getTranslations(language).filter_no_result}</p>
	{:else}
		<div class="relative">
			<div class="absolute flex items-center gap-x-2 w-max right-4 -top-2.5">
				<button
					class="display-style-button rounded-full p-[9px]"
					class:active={displayMode === 'grid'}
					on:click={() => (displayMode = 'grid')}
				>
					<Icon name="grid-view" size={24} />
				</button>
				<button
					class="display-style-button rounded-full p-[10px]"
					class:active={displayMode === 'list'}
					on:click={() => (displayMode = 'list')}
				>
					<Icon name="icon-list" size={22} />
				</button>
			</div>
			<p class="md:text-center ml-4 md:ml-0">
				{getTranslations(language).filter_result.replace('<num>', characters.length)}
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
