<script lang="ts">
	import { run } from 'svelte/legacy';

	import type { Language } from '$lib/types';
	import translations from '$lib/translations.json';
	import { missionMods } from './stores.js';

	const missionModEffects = [
		{
			targets: ['ALL'],
			mods: [
				{ key: 'atk', value: 1.3, mode: 'mul' },
				{ key: 'hp', value: 1.3, mode: 'mul' }
			]
		}
	];
	let selected = $state(false);

	run(() => {
		selected ? missionMods.set(missionModEffects) : missionMods.set(null);
	});

	interface Props {
		language: Language;
	}

	let { language }: Props = $props();
</script>

<button
	id="mission"
	class={`max-w-screen sm:w-max sm:px-6 mt-4 mb-6 select-none hover:cursor-pointer hover:bg-neutral-700 text-start`}
	onclick={() => {
		selected = !selected;
	}}
>
	<p class="px-2 sm:px-0 text-subheading">{translations[language].mizuki_mission}</p>
	<hr class="border-gray-500 my-1" />
	<div class="px-2 sm:px-0 flex gap-x-1.5 sm:items-center mt-1.5">
		<input type="checkbox" class="accent-red-500 w-4 h-4 mt-1 sm:mt-0" checked={selected} />
		{translations[language].mizuki_mission_text}
	</div>
</button>
