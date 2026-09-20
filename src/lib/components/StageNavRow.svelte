<script lang="ts">
	import type { Language } from '$lib/types';
	import StageNavButton from './StageNavButton.svelte';

	interface Props {
		items: any;
		language: Language;
	}

	let { items, language }: Props = $props();
</script>

<tr>
	{#each items as levelId}
		<td colspan={Math.floor(24 / items.length)}>
			<StageNavButton {levelId} {language} />
		</td>
	{/each}
</tr>

<style>
	td {
		border-width: 1px;
		border-color: gray;
	}
</style>
