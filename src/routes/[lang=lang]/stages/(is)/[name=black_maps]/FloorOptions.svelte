<script lang="ts">
	import { getTranslations } from '$lib/functions/languageHelpers';
	import type { Language } from '$lib/types';
	import weather from '$lib/data/is/black/weather.json';
	import FloorEffect from './FloorEffect.svelte';
	import FloorSelect from './FloorSelect.svelte';
	import weather_1 from '$lib/images/is/black/rogue_6_weather_1.webp';
	import weather_2 from '$lib/images/is/black/rogue_6_weather_2.png';
	import { difficulty, activeFloorEffects } from './stores';

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
		</div>
	</div>
</div>
