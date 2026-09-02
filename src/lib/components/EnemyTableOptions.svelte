<script lang="ts">
	import { getTranslations } from '$lib/functions/languageHelpers';
	import type { Language } from '$lib/types';
	import { tableHeaders } from '../../routes/stores';
	import { setLocalStorage } from '$lib/functions/storageHelpers';
	export let language: Language;
	function updateHeaders(key) {
		tableHeaders.update((list) => {
			const index = list.findIndex((ele) => ele.key === key);
			list[index].show = !list[index].show;
			return list;
		});
	}

	$: setLocalStorage('table_headers', JSON.stringify($tableHeaders));
</script>

<div class="border border-gray-400 mt-3 mb-4">
	<div class="flex flex-wrap gap-x-4 gap-y-3 p-4">
		{#each $tableHeaders as { key, show }}
			<button
				class={`rounded-full px-4 py-1 ${show ? 'bg-sky-600' : 'bg-gray-400'}`}
				on:click={() => updateHeaders(key)}
			>
				{getTranslations(language).table_headers[key] || getTranslations(language)[key]}
			</button>
		{/each}
	</div>
</div>
