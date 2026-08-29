<script lang="ts">
	import { getTranslations } from '$lib/functions/languageHelpers';
	import type { Language } from '$lib/types';
	import weather from '$lib/data/is/black/weather.json';
	import FloorEffect from './FloorEffect.svelte';
	import FloorSelect from './FloorSelect.svelte';
	import weather_1 from '$lib/images/is/black/rogue_6_weather_1.webp';
	import weather_2 from '$lib/images/is/black/rogue_6_weather_2.webp';
	import rogueGold from '$lib/images/is/rogue_gold.webp';
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
	let options: Weather[] = [];
	let level = 1;

	$: goldVariationEffect = createGoldVariationEffect($gold);

	$: if (
		$activeFloorEffects.length === 1 &&
		$activeFloorEffects[0].id === goldVariation.id &&
		$activeFloorEffects[0] !== goldVariationEffect
	) {
		activeFloorEffects.set([goldVariationEffect]);
	}

	function updateGold(event: Event) {
		const value = (event.currentTarget as HTMLInputElement).valueAsNumber;
		gold.set(Number.isFinite(value) ? Math.min(100, Math.max(0, value)) : 0);
	}

	difficulty.subscribe((n) => {
		switch (true) {
			case n <= 5:
				options = weatherOptions.filter((ele) => ele.level == 1);
				level = 1;
				break;
			case n <= 11:
				options = weatherOptions.filter((ele) => ele.level == 2);
				level = 2;
				break;
			default:
				level = 3;
				options = weatherOptions.filter((ele) => ele.level == 3);
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
	<FloorSelect {language} />
	<div class="mx-auto mt-3 md:px-8">
		<hr class="border-neutral-600" />
		<div class="px-2 md:px-0">
			<p class="mt-4 font-medium text-lg text-red-400 text-center">
				{getTranslations(language).black_weather} ({getTranslations(language)[
					`weather_level_${level}`
				]})
			</p>

			<div class="flex flex-col gap-y-4 mt-2">
				{#each options as option}
					<FloorEffect effect={option} {language} />
				{/each}
			</div>
			<p class="mt-4 font-medium text-lg text-red-400 text-center">
				{getTranslations(language)[`black_variation`]}
			</p>
			<div class="flex flex-col gap-y-2 mt-2">
				<FloorEffect effect={goldVariationEffect} {language} />
				{#if $activeFloorEffects.some((effect) => effect.id === goldVariation.id)}
					<label class="flex items-center pl-[83px]">
						<img src={rogueGold} class="h-[24px]" />
						<span class="ml-1 mr-2">{getTranslations(language).rogue_gold}</span>
						<input
							type="number"
							min="0"
							max="100"
							step="1"
							value={$gold}
							on:input={updateGold}
							class="w-20 rounded bg-neutral-700 px-2 py-1 text-center"
						/>
					</label>
				{/if}
			</div>
		</div>
	</div>
</div>
