<script lang="ts">
	import { run } from 'svelte/legacy';

	import type { Language } from '$lib/types';
	import { clickOutside } from '$lib/functions/clickOutside.js';
	import FloorOptions from './FloorOptions.svelte';
	import { selectedFloor, activeChaosEffects, portalMods } from './stores';
	import translations from '$lib/translations.json';
	import { floorPrefixSuffix } from '$lib/functions/languageHelpers';
	import Icon from '$lib/components/Icon.svelte';

	interface Props {
		stageFloors: number[]|null;
		language: Language;
	}

	let { stageFloors, language }: Props = $props();
	let optionsOpen = $state(false);

	// const floorIcons = [floor1, floor2, floor3, floor4, floor5, floor6];

	function updateFloor(floors: number[]|null) {
		if(!floors) return;
		if (!floors?.includes($selectedFloor)) {
			selectedFloor.set(Math.min(...floors));
		}
	}
	run(() => {
		updateFloor(stageFloors);
	});
</script>

<div
	use:clickOutside
	onoutclick={() => (optionsOpen = false)}
	class="relative mx-auto select-none"
>
	<button id="floor-options" class="px-3 py-0.5 md:hover:bg-neutral-500" onclick={() => (optionsOpen = !optionsOpen)}>
		<div class="flex justify-center items-center gap-x-1">
			<Icon name="left-chevron" className="w-5 h-5 mr-1.5" />
			<p>
				{floorPrefixSuffix($selectedFloor, language)} -
			</p>
			{#if $portalMods}
				<p class="text-[#FF99CA]">{translations[language].sami_portal}</p>
			{:else}
				<p>{translations[language]['sami_levels'][$selectedFloor - 1]}</p>
			{/if}
			<Icon name="left-chevron" className="w-5 h-5 ml-1.5 rotate-180" />
		</div>
	</button>
	{#if $activeChaosEffects.length > 0}
		{#each $activeChaosEffects as effect}
			<img
				width="75"
				src={effect.src}
				class="absolute -inset-[9999px] z-[-1] m-auto"
				alt={effect['name_zh']}
			/>
		{/each}
	{/if}
	<FloorOptions bind:optionsOpen {language} />
</div>
