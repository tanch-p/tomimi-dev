<script lang="ts">
	import type { Character } from "$lib/types/chara.types";
	import type { Language } from "$lib/types/types";
	import translations from "$lib/translations.json";
	import Icon from "$lib/components/Icon.svelte";
	import { onMount } from "svelte";
	import CharaViewGrid from "./CharaViewGrid.svelte";
	// import CharaViewDetail from "./CharaViewDetail.svelte";

	interface Props {
		characters: Character[];
		language: Language;
	}

	let { characters, language }: Props = $props();

	let displayMode = $state("grid");
	let index = $state(0);
	let visible = $derived(characters.slice(0, index));
	const ITEMS_PER_LOAD = 50;

	$effect(() => {
		index = Math.min(ITEMS_PER_LOAD, characters.length);
	});

	// const showAlt = $derived(
	// 	$filtersStore.some(({ options }) =>
	// 		options.some((item) => item.selected),
	// 	) || $relicFiltersStore.some((item) => item.selected),
	// );

	function loadMoreItems() {
		if (index >= characters.length) return;
		index += ITEMS_PER_LOAD;
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
		window.addEventListener("scroll", handleScroll);

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
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
					class:active={displayMode === "grid"}
					onclick={() => (displayMode = "grid")}
				>
					<Icon name="grid-view" size={24} />
				</button>
				<button
					class="display-style-button rounded-full p-[10px]"
					class:active={displayMode === "list"}
					onclick={() => (displayMode = "list")}
				>
					<Icon name="icon-list" size={22} />
				</button>
			</div>
			<p class="md:text-center ml-4 md:ml-0">
				{translations[language].filter_result.replace(
					"<num>",
					characters.length,
				)}
			</p>
		</div>
		<div
			class="mt-4 {displayMode === 'grid'
				? 'grid grid-cols-4 sm:flex flex-wrap gap-1.5 px-1.5 sm:px-0'
				: 'flex flex-col gap-4 px-1.5 md:px-0'}"
		>
			{#each visible as chara (chara.id)}
				{#if displayMode === "grid"}
					<CharaViewGrid {chara} />
				{:else}
					<!-- <CharaViewDetail {chara} {language} {showAlt} /> -->
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
