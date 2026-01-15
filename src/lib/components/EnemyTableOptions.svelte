<script lang="ts">
	import { run } from 'svelte/legacy';

	import type { Language } from '$lib/types';
	import { tableHeaders } from '../../routes/stores';
	import translations from '$lib/translations.json';
	import { setLocalStorage } from '$lib/functions/lib';
	interface Props {
		language: Language;
	}

	let { language }: Props = $props();
	function updateHeaders(key) {
		tableHeaders.update((list) => {
			const index = list.findIndex((ele) => ele.key === key);
			list[index].show = !list[index].show;
			return list;
		});
	}

	run(() => {
		setLocalStorage('table_headers', JSON.stringify($tableHeaders));
	});
</script>

<div class="border border-gray-400 mt-3 mb-4">
	<div class="flex flex-wrap gap-x-4 gap-y-3 p-4">
		{#each $tableHeaders as { key, show }}
			<button
				class={`rounded-full px-4 py-1 ${show ? 'bg-sky-600' : 'bg-gray-400'}`}
				onclick={() => updateHeaders(key)}
			>
				{translations[language].table_headers[key] || translations[language][key]}
			</button>
		{/each}
	</div>
</div>
