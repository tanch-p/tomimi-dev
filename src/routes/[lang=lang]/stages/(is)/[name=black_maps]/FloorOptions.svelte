<script lang="ts">
	import type { Language } from '$lib/types';
	import weather from '$lib/data/is/black/weather.json';
	import weather_1 from '$lib/images/is/black/rogue_6_weather_1.webp';
	import weather_2 from '$lib/images/is/black/rogue_6_weather_2.webp';
	import FloorSettingsContent from './FloorSettingsContent.svelte';
	import { difficulty, activeFloorEffects, gold } from './stores';
	import { createGoldVariationEffect, goldVariation } from './variationHelpers';

	export let optionsOpen: boolean, language: Language;

	const lookup: Record<string, string> = {
		rogue_6_weather_1: weather_1,
		rogue_6_weather_2: weather_2
	};
	type Weather = (typeof weather)[number] & { src: string };
	const weatherOptions: Weather[] = weather.map((option) => ({
		...option,
		src: lookup[option.iconId]
	}));
	let level = 1;

	$: goldVariationEffect = createGoldVariationEffect($gold);

	$: if (
		$activeFloorEffects.length === 1 &&
		$activeFloorEffects[0].id === goldVariation.id &&
		$activeFloorEffects[0] !== goldVariationEffect
	) {
		activeFloorEffects.set([goldVariationEffect]);
	}

	difficulty.subscribe((n) => {
		switch (true) {
			case n <= 5:
				level = 1;
				break;
			case n <= 11:
				level = 2;
				break;
			default:
				level = 3;
		}
		if ($activeFloorEffects.length > 0) {
			if ($activeFloorEffects[0]?.id === goldVariation.id) {
				activeFloorEffects.set([goldVariationEffect]);
				return;
			}
			const weatherEffect = weatherOptions.find(
				(ele) => ele.iconId === $activeFloorEffects[0]?.iconId && ele.level === level
			);
			activeFloorEffects.set(weatherEffect ? [weatherEffect] : []);
		}
	});
</script>

<div
	class={`absolute left-[50%] -translate-x-[50%] mt-2 w-screen md:w-[700px] max-h-[calc(100vh_-_160px)] overflow-y-auto pb-8 rounded-md shadow-lg select-none bg-[#1c1c1c] transition-[opacity_transform] ease-in duration-150 ${
		optionsOpen ? 'opacity-90 translate-y-0' : 'invisible opacity-0 -translate-y-10'
	}`}
>
	<FloorSettingsContent {language} />
</div>
