<script lang="ts">
	import type { Enemy, Language } from '$lib/types';
	import { getFormTitle } from '$lib/functions/formHelpers';

	export let enemy: Enemy, row: number, language: Language;

	$: formTitle = getFormTitle(enemy?.forms?.[row]?.title, row, language);
</script>

{#if formTitle}
	<div class="text-red-400 pl-4 py-1">{formTitle}</div>
{/if}
