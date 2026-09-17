<script lang="ts">
	import TitleBlock from './TitleBlock.svelte';
	import stageVariantDisplay from '$lib/data/stages/stage_variant_lookup.json';
	import { getTranslations } from '$lib/functions/languageHelpers';
	import type { Language } from '$lib/types';
	import { page } from '$app/stores';
	import { getIconPath } from '$lib/functions/stageHelpers';

	export let variants;
	export let selectedIndex = 0;

	let language: Language;
	$: language = $page.data.language;
</script>

{#if variants.length > 1}
	<TitleBlock title={getTranslations(language).stage_choice} size="subheading">
		<div class="flex flex-wrap md:grid grid-flow-col auto-cols-fr mb-8">
			{#each variants as { suffix, levelId }, i}
				{@const display = stageVariantDisplay[levelId]}
				<button
					class="basis-1/3 grow {i !== selectedIndex
						? 'bg-neutral-600 brightness-50 min-h-[50px] hover:brightness-75'
						: 'bg-sky-500'}"
					on:click={() => (selectedIndex = i)}
				>
					<div class="flex items-center justify-center gap-x-1.5">
						{#each display?.icons ?? [] as icon}
							<img
								class="select-none pointer-events-none"
								src={getIconPath(icon)}
								height="50"
								width="50"
								decoding="async"
								alt={icon.id}
							/>
						{/each}
						<span>{display?.label?.[language] || suffix}</span>
					</div>
				</button>
			{/each}
		</div>
	</TitleBlock>
{/if}
