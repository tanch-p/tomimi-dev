<script lang="ts">
	import type { Component } from 'svelte';
	import type { Language } from '$lib/types';
	import type { StageCollection } from './stageNavTypes';

	interface Props {
		items: readonly string[];
		language: Language;
		button: Component<any>;
		stages?: StageCollection | undefined;
		label?: string | number | undefined;
		labelRowspan?: number;
		backgroundClass?: string | undefined;
	}

	let {
		items,
		language,
		button,
		stages = undefined,
		label = undefined,
		labelRowspan = 1,
		backgroundClass = undefined
	}: Props = $props();

	const COLUMN_SPANS: Record<number, number> = {
		1: 24,
		2: 12,
		3: 8,
		4: 6
	};

	let columnSpan = $derived.by(() => {
		const span = COLUMN_SPANS[items.length];
		if (!span) {
			throw new Error(`Unsupported stage row length: ${items.length}`);
		}
		return span;
	});
</script>

<tr class={backgroundClass} data-has-label={label !== undefined}>
	{#if label !== undefined}
		<td colspan="2" rowspan={labelRowspan} class="font-bold">{label}</td>
	{/if}

	{#each items as levelId (levelId)}
		{@const SvelteComponent_1 = button}
		<td colspan={columnSpan}>
			<SvelteComponent_1 {levelId} {language} {stages} />
		</td>
	{/each}
</tr>
