<script lang="ts">
	import type { SvelteComponent } from 'svelte';
	import type { Language } from '$lib/types';
	import type { StageCollection } from './stageNavTypes';

	export let items: readonly string[];
	export let language: Language;
	export let button: typeof SvelteComponent;
	export let stages: StageCollection | undefined = undefined;
	export let label: string | number | undefined = undefined;
	export let labelRowspan = 1;

	const COLUMN_SPANS: Record<number, number> = {
		1: 24,
		2: 12,
		3: 8,
		4: 6
	};

	$: columnSpan = COLUMN_SPANS[items.length];

	$: if (!columnSpan) {
		throw new Error(`Unsupported stage row length: ${items.length}`);
	}
</script>

<tr>
	{#if label !== undefined}
		<td colspan="2" rowspan={labelRowspan}>{label}</td>
	{/if}

	{#each items as levelId (levelId)}
		<td colspan={columnSpan}>
			<svelte:component this={button} {levelId} {language} {stages} />
		</td>
	{/each}
</tr>
