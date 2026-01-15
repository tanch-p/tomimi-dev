<script lang="ts">
	import { parseConditions } from '$lib/functions/languageHelpers';
	import translations from '$lib/translations.json';
	

	interface Props {
		//only used for conditions for now
		options: any;
		//only used for conditions for now
		updateFunc: any;
		//only used for conditions for now
		language: any;
	}

	let { options, updateFunc, language }: Props = $props();

	let showMore = $state(false);
</script>

{#each options as { value, selected }, i}
	<button
		hidden={!showMore ? i > 3 : false}
		class="filter-btn"
		class:active={selected}
		onclick={() => updateFunc(value)}
	>
		{parseConditions(value, language)}
	</button>
{/each}
{#if !showMore}
	<button class="ml-2 text-xs hover:text-blue-500" onclick={() => (showMore = !showMore)}
		>{translations[language].show_more}&nbsp;&gt;</button
	>
{/if}
