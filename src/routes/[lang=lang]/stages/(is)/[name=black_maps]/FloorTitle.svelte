<script lang="ts">
	import { getTranslations } from '$lib/functions/languageHelpers';
	import type { Language } from '$lib/types';
	import { clickOutside } from '$lib/functions/clickOutside.js';
	import FloorOptions from './FloorOptions.svelte';
	import { selectedFloor, activeFloorEffects } from './stores';
	import floor1 from '$lib/images/is/black/zone_1.webp';
	import floor2 from '$lib/images/is/black/zone_2.webp';
	import floor3 from '$lib/images/is/black/zone_3.webp';
	import floor4 from '$lib/images/is/black/zone_4.webp';
	import floor5 from '$lib/images/is/black/zone_5.webp';
	import floor6 from '$lib/images/is/black/zone_6.webp';
	import Icon from '$lib/components/Icon.svelte';

	export let stageFloors: number[], language: Language;

	let optionsOpen = false;

	const floorIcons = [floor1, floor2, floor3, floor4, floor5, floor6];

	function updateFloor(floors: number[]) {
		if (!floors.includes($selectedFloor)) {
			selectedFloor.set(Math.min(...stageFloors));
		}
	}
	$: updateFloor(stageFloors);
</script>

<div use:clickOutside on:outclick={() => (optionsOpen = false)} class="mx-auto select-none">
	<button
		id="floor-options"
		class="px-3 py-0.5 md:hover:bg-neutral-500"
		on:click={() => (optionsOpen = !optionsOpen)}
	>
		<div class="flex justify-center items-center gap-x-1">
			<Icon name="left-chevron" className="w-5 h-5 mr-1.5" />
			{#if $activeFloorEffects.length > 0}
				<div class="flex justify-center rounded-full bg-almost-black p-0.5">
					{#each $activeFloorEffects as effect}
						<div class="h-10 w-10">
							<img src={effect.src} class="" alt={effect['name_zh']} />
						</div>
					{/each}
				</div>
			{/if}
			<div class="relative overflow-visible">
				<img
					src={floorIcons[$selectedFloor - 1]}
					alt={getTranslations(language)['black_levels'][$selectedFloor - 1]}
					class={'h-12'}
				/>
			</div>
			<Icon name="left-chevron" className="w-5 h-5 ml-2.5 rotate-180" />
		</div>
	</button>
	<FloorOptions bind:optionsOpen {language} />
</div>
