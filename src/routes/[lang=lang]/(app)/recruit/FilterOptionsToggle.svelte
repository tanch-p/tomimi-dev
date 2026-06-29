<script lang="ts">
	import { parseConditions, getTranslations } from '$lib/functions/languageHelpers';
	//only used for conditions for now

	export let options, updateFunc, language;

	let showMore = false;
</script>

{#each options as { value, selected }, i}
	<button
		hidden={!showMore ? i > 3 : false}
		class="filter-btn"
		class:active={selected}
		on:click={() => updateFunc(value)}
	>
		{parseConditions(value, language)}
	</button>
{/each}
{#if !showMore}
	<button class="ml-2 text-xs hover:text-blue-500" on:click={() => (showMore = !showMore)}
		>{getTranslations(language).show_more}&nbsp;&gt;</button
	>
{/if}
