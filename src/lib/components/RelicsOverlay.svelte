<script lang="ts">
	import { getTranslations } from '$lib/functions/languageHelpers';
	import type { Language, RogueTopic } from '$lib/types';
	import RelicDiv from './RelicDiv.svelte';
	import type { RelicSelectionStore } from '$lib/functions/relicSelection';

	interface Props {
		openOverlay: boolean;
		language: Language;
		rogueTopic: RogueTopic;
		selectedRelics: RelicSelectionStore;
		selectedUniqueRelic: RelicSelectionStore | null;
		onclose: () => void;
		uniqueRelics?: import('svelte').Snippet;
	}

	let {
		openOverlay,
		language,
		rogueTopic,
		selectedRelics,
		selectedUniqueRelic,
		onclose,
		uniqueRelics
	}: Props = $props();

	function handleOverlayClick(event: MouseEvent) {
		if (
			event.target instanceof Element &&
			!event.target.closest('[data-relic-card], [data-relic-control]')
		)
			onclose();
	}
	let relicsList = $derived(selectedRelics.catalog);
</script>

<svelte:window
	onkeydown={(event) => {
		if (openOverlay && event.key === 'Escape') onclose();
	}}
/>

<div
	class={`relative transition-opacity duration-[50ms] ease-in-out select-none ${
		openOverlay ? 'opacity-100' : 'opacity-0 invisible'
	}`}
>
	{#if openOverlay}
		<div
			role="presentation"
			class="fixed inset-0 bg-neutral-100/95 dark:bg-ph-bg/90 overflow-y-scroll no-scrollbar py-36"
			onclick={handleOverlayClick}
		>
			<div class="w-full max-w-7xl mx-auto">
				{@render uniqueRelics?.()}
				{#if relicsList.length > 0}
					<div
						class="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-8 w-full overflow-x-auto md:overflow-visible my-auto mx-auto px-4 sm:px-24"
					>
						{#each relicsList as relic}
							<RelicDiv
								{relic}
								{language}
								{rogueTopic}
								selection={$selectedRelics.find((entry) => entry.id === relic.id)}
								ontoggle={() => selectedRelics.toggle(relic.id)}
								onstagechange={(index) => selectedRelics.setStage(relic.id, index)}
							/>
						{/each}
					</div>
				{:else}
					<p class="text-neutral-800 dark:text-near-white w-full text-center py-20 text-3xl">
						施工中
					</p>
				{/if}
				<button
					id="reset"
					data-relic-control
					class="block rounded-xl bg-neutral-200 dark:bg-neutral-700 text-neutral-800 dark:text-near-white px-16 py-2 mt-12 mx-auto w-min hover:cursor-pointer hover:bg-neutral-300 dark:hover:bg-neutral-600 whitespace-nowrap"
					onclick={() => {
						selectedRelics.clear();
						if (selectedUniqueRelic !== null) {
							selectedUniqueRelic.clear();
						}
					}}
				>
					{getTranslations(language)['reset']}
				</button>
			</div>
		</div>
	{/if}
</div>
