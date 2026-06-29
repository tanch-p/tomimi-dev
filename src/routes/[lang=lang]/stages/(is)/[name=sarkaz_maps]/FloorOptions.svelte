<script lang="ts">
	import { getTranslations } from '$lib/functions/languageHelpers';
	import type { Language } from '$lib/types';
	import FloorEffect from './FloorEffect.svelte';
	import FloorSelect from './FloorSelect.svelte';
	import disasters from '$lib/data/is/sarkaz/disasters.json';
	import { actualDifficulty, disasterEffects } from './stores';

	export let optionsOpen: boolean,
		language: Language,
		level = 1,
		options = [];

	actualDifficulty.subscribe((n) => {
		switch (true) {
			case n <= 5:
				options = disasters.filter((ele) => ele.level == 1);
				level = 1;
				break;
			case n <= 11:
				options = disasters.filter((ele) => ele.level == 2);
				level = 2;
				break;
			default:
				level = 3;
				options = disasters.filter((ele) => ele.level == 3);
		}
		if ($disasterEffects.length > 0) {
			const disaster = disasters.find(
				(ele) => ele.iconId === $disasterEffects[0]?.iconId && ele.level === level
			);
			disasterEffects.set([disaster]);
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
			<p class="mt-4 font-medium text-lg text-[#ff382e] text-center">
				{getTranslations(language).sarkaz_disaster} ({getTranslations(language)[
					`disaster_level_${level}`
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

<style>
	.portal-active {
		clip-path: polygon(53% 4%, 97% 52%, 51% 97%, 5% 52%);
		background: radial-gradient(circle, #000 0%, #6922c6 24%, #7b7aa6 39%);
	}
</style>
