<script lang="ts">
	import type { Language } from '$lib/types';
	import { clickOutside } from '$lib/functions/clickOutside.js';
	import FloorOptions from './FloorOptions.svelte';
	import { selectedFloor, activeFloorEffects } from './stores';
	import translations from '$lib/translations.json';
	import floor1 from '$lib/images/is/sui/icon_zone_1.webp';
	import floor2 from '$lib/images/is/sui/icon_zone_2.webp';
	import floor3 from '$lib/images/is/sui/icon_zone_3.webp';
	import floor4 from '$lib/images/is/sui/icon_zone_4.webp';
	import floor5 from '$lib/images/is/sui/icon_zone_5.webp';
	import floor6 from '$lib/images/is/sui/icon_zone_6.webp';
	import floor7 from '$lib/images/is/sui/icon_zone_7.webp';
	import floor8 from '$lib/images/is/sui/icon_zone_8.webp';

	import wrath_bg from '$lib/images/is/sui/wrath_bad_back.webp';

	import Icon from '$lib/components/Icon.svelte';

	export let stageFloors: number[], language: Language;

	let optionsOpen = false;

	const floorIcons = [floor1, floor2, floor3, floor4, floor5, floor6, floor7, floor8];

	function updateFloor(floors: number[]) {
		if (!floors.includes($selectedFloor)) {
			selectedFloor.set(Math.min(...stageFloors));
			activeFloorEffects.set([]);
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
			<div class="relative mr-1 w-8 h-8 overflow-visible">
				<div class="absolute inset-y-0 my-auto w-max h-max {$selectedFloor === 7 ? "-left-2" : ""}">
					<img
						src={floorIcons[$selectedFloor - 1]}
						alt={`floor-${$selectedFloor}`}
						class="{$selectedFloor === 7
							? 'w-[50px] h-[50px]'
							: 'w-[32px] h-[32px]'}"
					/>
				</div>
			</div>
			<p>{translations[language]['sui_levels'][$selectedFloor - 1]}</p>
			<Icon name="left-chevron" className="w-5 h-5 ml-2.5 rotate-180" />
		</div>
		{#if $activeFloorEffects.length > 0}
			<div class="flex justify-center gap-x-2.5 mt-1.5">
				{#each $activeFloorEffects as effect}
					<div class="relative wrath-bg rounded-full w-20 h-6 overflow-hidden">
						<img src={wrath_bg} class="absolute z-0 -inset-[9999px] m-auto h-full" alt="" />
						<img
							src={effect.src}
							class="absolute z-[1] -inset-[9999px] m-auto max-h-[150%]"
							alt={effect['name_zh']}
						/>
					</div>
				{/each}
			</div>
		{/if}
	</button>
	<FloorOptions bind:optionsOpen {language} />
</div>
