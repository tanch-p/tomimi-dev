<script lang="ts">
	import type { Language } from "$lib/types";
	import { clickOutside } from "$lib/functions/clickOutside.js";
	import { page } from "$app/state";
	import Icon from "./Icon.svelte";
	import { getStagePaths } from "$lib/functions/utils";

	let showOptions = $state(false);

	let mapConfig = $derived(page.data.mapConfig);
	let language: Language = $derived(page.data.language);
	let { pathEN, pathJA, pathZH } = $derived(
		getStagePaths(mapConfig, language, page.url.pathname)
	);

	const languageCodes = { en: "EN", ja: "日本語", zh: "中文" };
</script>

<div class="relative" use:clickOutside onoutclick={() => (showOptions = false)}>
	<button
		onclick={() => (showOptions = !showOptions)}
		class="sm:py-1 px-2 hover:underline h-full"
	>
		<span class="flex gap-x-1.5">
			<Icon name="icon-language" size="20" className="mb-0.5" />
			{languageCodes[language]}</span
		>
	</button>
	{#if showOptions}
		<button
			onclick={() => (showOptions = false)}
			class="absolute left-0 top-full w-max mt-1 py-0.5 bg-neutral-900 select-none"
		>
			<a href={pathEN}
				><div class="px-2 my-0.5 hover:bg-gray-600">English</div></a
			>
			<a href={pathJA}
				><div class="px-2 my-0.5 hover:bg-gray-600">日本語</div></a
			>
			<a href={pathZH}><div class="px-2 my-0.5 hover:bg-gray-600">中文</div></a>
		</button>
	{/if}
</div>

<style>
	span {
		display: flex;
		height: 100%;
		align-items: center;
		font-weight: 700;
		font-size: 0.9rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		text-decoration: none;
	}
</style>
