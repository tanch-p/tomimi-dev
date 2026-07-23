<script lang="ts">
	import type { SvelteComponent } from 'svelte';
	import type { Language } from '$lib/types';
	import StageNavRow from './StageNavRow.svelte';
	import type { StageCollection, StageGroup } from './stageNavTypes';

	export let group: StageGroup;
	export let language: Language;
	export let button: typeof SvelteComponent;
	export let stages: StageCollection | undefined = undefined;
</script>

{#each group.rows as items, index}
	<StageNavRow
		{items}
		{language}
		{button}
		{stages}
		label={index === 0 ? group.label : undefined}
		labelRowspan={group.rows.length}
	/>
{/each}
