<script lang="ts">
	import type { Language } from '$lib/types';
	import { page } from '$app/stores';
	import { clickOutside } from '$lib/functions/clickOutside.js';
	import FloorOptions from './FloorOptions.svelte';
	import { selectedFloor, disasterEffects, difficultyMode } from './stores';
	import translations from '$lib/translations.json';
	import roman_1 from '$lib/images/is/sarkaz/icon_zone_1.webp';
	import roman_2 from '$lib/images/is/sarkaz/icon_zone_2.webp';
	import roman_3 from '$lib/images/is/sarkaz/icon_zone_3.webp';
	import roman_4 from '$lib/images/is/sarkaz/icon_zone_4.webp';
	import roman_5 from '$lib/images/is/sarkaz/icon_zone_5.webp';
	import roman_6 from '$lib/images/is/sarkaz/icon_zone_6.webp';
	import omega from '$lib/images/is/sarkaz/icon_zone_7.webp';
	import disaster_1 from '$lib/images/is/sarkaz/rogue_4_disaster_1.webp';
	import disaster_2 from '$lib/images/is/sarkaz/rogue_4_disaster_2.webp';
	import disaster_5 from '$lib/images/is/sarkaz/rogue_4_disaster_5.webp';
	import Icon from '$lib/components/Icon.svelte';

	const lookup = {
		roman_1: roman_1,
		roman_2: roman_2,
		roman_3: roman_3,
		roman_4: roman_4,
		roman_5: roman_5,
		roman_6: roman_6,
		roman_7: omega,
		rogue_4_disaster_1: disaster_1,
		rogue_4_disaster_2: disaster_2,
		rogue_4_disaster_5: disaster_5
	};

	export let stageFloors: number[], language: Language;
	let optionsOpen = false;
	let floor6Index = 5;

	$: if ($page.data.mapConfig) {
		switch ($page.data.mapConfig?.levelId) {
			case 'level_rogue4_b-7':
			case 'level_rogue4_7-1':
			case 'level_rogue4_7-2':
				floor6Index = 7;
				break;
			case 'level_rogue4_b-8':
				floor6Index = 6;
				break;
			default:
				floor6Index = 5;
				break;
		}
	}
	page.subscribe(({ data }) => updateFloor(data?.mapConfig?.floors));
	difficultyMode.subscribe(() => updateFloor(stageFloors));
	function updateFloor(floors: number[]) {
		if (!floors) return;
		if ($difficultyMode !== 'normal') {
			//语奇终无
			if (
				$page.data.mapConfig?.id.includes('_ev_') ||
				$page.data.mapConfig?.id.includes('_duel_') ||
				$page.data.mapConfig?.id.includes('_t_')
			) {
				return;
			}
			if ($page.data.mapConfig?.id.includes('_e_')) {
				const floor = Math.min(...floors);
				if (floor > 5) {
					selectedFloor.set(Math.min(...floors));
					return;
				}
				const reversedFloor = [5, 4, 3, 2, 1][floor - 1];
				selectedFloor.set(reversedFloor);
				return;
			}
		}
		if (!floors.includes($selectedFloor)) {
			selectedFloor.set(Math.min(...floors));
		}
	}
</script>

<div
	use:clickOutside
	on:outclick={() => (optionsOpen = false)}
	class="self-center mx-auto select-none"
>
	<button id="floor-options" class="px-3 py-0.5 md:hover:bg-neutral-500" on:click={() => (optionsOpen = !optionsOpen)}>
		<p class="flex items-center justify-center relative text-center">
			<Icon name="left-chevron" className="w-5 h-5 mr-1.5" />
			<img
				class="h-[20px] mt-[1px]"
				src={lookup[`roman_${$selectedFloor}`]}
				alt={$selectedFloor}
			/>&nbsp;{$selectedFloor === 6
				? translations[language].sarkaz_levels[floor6Index]
				: translations[language].sarkaz_levels[$selectedFloor - 1]}
			<Icon name="left-chevron" className="w-5 h-5 ml-2.5 rotate-180" />
		</p>
		{#if $disasterEffects.length > 0}
			<div class="flex gap-x-2.5 my-0.5 justify-center">
				{#each $disasterEffects as effect}
					<div class="relative rounded-full bg-[#ff382e] w-20 h-6 overflow-hidden">
						<img
							src={lookup[effect.iconId]}
							class="absolute -inset-[9999px] m-auto max-h-[150%]"
							alt={effect['name_zh']}
						/>
					</div>
				{/each}
			</div>
		{/if}
	</button>
	<FloorOptions bind:optionsOpen {language} />
</div>
