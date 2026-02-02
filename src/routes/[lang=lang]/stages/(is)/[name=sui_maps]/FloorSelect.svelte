<script lang="ts">
	import type { Language } from '$lib/types';
	import { selectedFloor } from './stores.js';
	import translations from '$lib/translations.json';

	export let language: Language;
	
	const floors = new Array(7);
</script>

<div class="w-[70%] mx-auto py-3 mt-4">
	<div class="grid grid-cols-7">
		{#each floors as _, i}
			<button
				on:click={() => selectedFloor.set(i + 1)}
				class={`py-2 px-2 ${$selectedFloor === i + 1 ? 'bg-gray-500' : ''}`}
				type="button"
			>
				{i + 1}
			</button>
		{/each}
	</div>
	<p class="text-center text-sm mt-4">※{translations[language].sui_sp_floor_tip}</p>
</div>
