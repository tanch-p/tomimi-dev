<script lang="ts">
	import { getTranslations } from '$lib/functions/languageHelpers';
	import type { Language } from '$lib/types';
	import weather from '$lib/data/is/black/weather.json';
	import weather1 from '$lib/images/is/black/rogue_6_weather_1.webp';
	import weather2 from '$lib/images/is/black/rogue_6_weather_2.webp';
	import rogueGold from '$lib/images/is/rogue_gold.webp';
	import FloorEffect from './FloorEffect.svelte';
	import FloorSelect from './FloorSelect.svelte';
	import { difficulty, activeFloorEffects, gold } from './stores';
	import { createGoldVariationEffect, goldVariation } from './variationHelpers';

	export let language: Language;
	export let idPrefix = '';

	const imageLookup: Record<string, string> = {
		rogue_6_weather_1: weather1,
		rogue_6_weather_2: weather2
	};
	const weatherOptions = weather.map((option) => ({
		...option,
		src: imageLookup[option.iconId]
	}));

	$: level = $difficulty <= 5 ? 1 : $difficulty <= 11 ? 2 : 3;
	$: options = weatherOptions.filter((option) => option.level === level);
	$: goldVariationEffect = createGoldVariationEffect($gold);

	function updateGold(event: Event) {
		const value = (event.currentTarget as HTMLInputElement).valueAsNumber;
		gold.set(Number.isFinite(value) ? Math.min(100, Math.max(0, value)) : 0);
	}
</script>

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
			{#each options as option (option.id)}
				<FloorEffect effect={option} {language} {idPrefix} />
			{/each}
		</div>
		<p class="mt-4 font-medium text-lg text-red-400 text-center">
			{getTranslations(language).black_variation}
		</p>
		<div class="flex flex-col gap-y-2 mt-2">
			<FloorEffect effect={goldVariationEffect} {language} {idPrefix} />
			{#if $activeFloorEffects.some((effect) => effect.id === goldVariation.id)}
				<label class="flex items-center pl-[83px]">
					<img src={rogueGold} alt="" class="h-[24px]" />
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
