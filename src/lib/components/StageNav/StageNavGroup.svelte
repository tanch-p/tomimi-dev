<script lang="ts">
	import type { Component } from 'svelte';
	import type { Language } from '$lib/types';
	import StageNavRow from './StageNavRow.svelte';
	import type { StageCollection, StageGroup } from './stageNavTypes';

	interface Props {
		group: StageGroup;
		language: Language;
		button: Component<any>;
		stages?: StageCollection | undefined;
	}

	let { group, language, button, stages = undefined }: Props = $props();
</script>

{#each group.rows as items, index}
	<StageNavRow
		{items}
		{language}
		{button}
		{stages}
		label={index === 0 ? group.label : undefined}
		labelRowspan={group.rows.length}
		backgroundClass={group.backgroundClass}
	/>
{/each}
