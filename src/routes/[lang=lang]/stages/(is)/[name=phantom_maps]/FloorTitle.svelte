<script lang="ts">
	import { run } from 'svelte/legacy';

	import type { Language } from '$lib/types';
	import { clickOutside } from '$lib/functions/clickOutside.js';
	import FloorOptions from './FloorOptions.svelte';
	import { selectedFloor, activeFloorEffects } from './stores';
	import translations from '$lib/translations.json';
	import romanNumerals from '$lib/roman_numerals.json';
	import Icon from '$lib/components/Icon.svelte';

	interface Props {
		stageFloors: number[];
		language: Language;
	}

	let { stageFloors, language }: Props = $props();
	let optionsOpen = $state(false);

	function updateFloor(floors: number[]) {
		if (!floors.includes($selectedFloor)) {
			selectedFloor.set(Math.min(...stageFloors));
			activeFloorEffects.set([]);
		}
	}
	run(() => {
		updateFloor(stageFloors);
	});
</script>

<div use:clickOutside onoutclick={() => (optionsOpen = false)} class="mx-auto select-none">
	<button id="floor-options" class="group" onclick={() => (optionsOpen = !optionsOpen)}>
		<div class="flex justify-center items-center gap-x-6 md:gap-x-8">
			<div class="border-y border-neutral-600 w-[80px] md:w-[104px]"></div>
			<p class="text-center text-neutral-300">
				{romanNumerals[$selectedFloor - 1]}
			</p>
			<div class="border-y border-neutral-600 w-[80px] md:w-[104px]"></div>
		</div>
		{#if $activeFloorEffects.length > 0}
			<div class="flex gap-x-2.5 my-0.5 justify-center">
				{#each $activeFloorEffects as effect}
					<div class="relative rounded-full bg-[#640c1c] w-20 h-6 overflow-hidden">
						<p class="text-center">{effect[`outerName_${language}`]}</p>
					</div>
				{/each}
			</div>
		{/if}
		<div class="flex justify-center items-center gap-x-2.5 group-hover:md:bg-neutral-500">
			<Icon name="left-chevron" className="w-5 h-5" />
			<p class="text-center">{translations[language].phcs_levels[$selectedFloor - 1]}</p>
			<Icon name="left-chevron" className="w-5 h-5 rotate-180" />
		</div>
	</button>
	<FloorOptions bind:optionsOpen {language} />
</div>
