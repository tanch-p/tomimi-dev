<script lang="ts">
	import type { Enemy, Language } from '$lib/types';
	import { getFormTitle } from '$lib/functions/lib';

	interface Props {
		enemy: Enemy;
		row: number;
		language: Language;
	}

	let { enemy, row, language }: Props = $props();

	let formTitle = $derived(getFormTitle(enemy?.forms?.[row]?.title, row, language));
</script>

{#if formTitle}
	<div class="text-red-400 pl-4 py-1">{formTitle}</div>
{/if}
