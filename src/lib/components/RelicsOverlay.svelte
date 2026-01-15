<script lang="ts">
	import type { Language, RogueTopic } from '$lib/types';
	import { createEventDispatcher } from 'svelte';
	import RelicDiv from './RelicDiv.svelte';
	import translations from '$lib/translations.json';
	import mizukiRelics from '$lib/data/is/mizuki/relics_mizuki.json';
	import phantomRelics from '$lib/data/is/phantom/relics_phantom.json';
	import samiRelics from '$lib/data/is/sami/relics_sami.json';
	import skzRelics from '$lib/data/is/sarkaz/relics_sarkaz.json';
	import suiRelics from "$lib/data/is/sui/relics_sui.json";

	const dispatch = createEventDispatcher();

	interface Props {
		openOverlay: boolean;
		language: Language;
		rogueTopic: RogueTopic;
		selectedRelics: any;
		selectedUniqueRelic: any;
		uniqueRelics?: import('svelte').Snippet;
	}

	let {
		openOverlay,
		language,
		rogueTopic,
		selectedRelics,
		selectedUniqueRelic,
		uniqueRelics
	}: Props = $props();

	function handleOverlayClick(e) {
		if (!e.target.className.includes('relic') && !e.target.id.includes('reset')) {
			dispatch('close');
		}
	}
	const getRelicsList = (rogueTopic: RogueTopic) => {
		switch (rogueTopic) {
			case 'rogue_mizuki':
				return mizukiRelics;
			case 'rogue_phantom':
				return phantomRelics;
			case 'rogue_sami':
				return samiRelics;
			case 'rogue_skz':
				return skzRelics;
			case 'rogue_yan':
				return suiRelics;
			default:
				return [];
		}
	};
	let relicsList = $derived(getRelicsList(rogueTopic));
</script>

<div
	class={`relative transition-opacity duration-50 ease-in-out select-none ${
		openOverlay ? 'opacity-100' : 'opacity-0 invisible'
	}`}
>
	{#if openOverlay}
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<div
			class="fixed inset-0 bg-ph-bg bg-opacity-90 overflow-y-scroll no-scrollbar"
			onclick={handleOverlayClick}
		>
			<div class="w-full max-w-7xl mx-auto py-36">
				{@render uniqueRelics?.()}
				{#if relicsList.length > 0}
					<div
						class="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-8 w-full overflow-x-auto md:overflow-visible my-auto mx-auto px-4 sm:px-24"
					>
						{#each relicsList as relic}
							<RelicDiv {relic} {language} {rogueTopic} {selectedRelics} />
						{/each}
					</div>
				{:else}
					<p class="text-near-white w-full text-center py-20 text-3xl">施工中</p>
				{/if}
				<button
					id="reset"
					class="block rounded-xl bg-neutral-700 text-near-white px-16 py-2 mt-12 mx-auto w-min hover:cursor-pointer hover:bg-neutral-600 whitespace-nowrap"
					onclick={() => {
						selectedRelics.set([]);
						if (selectedUniqueRelic !== null) {
							selectedUniqueRelic.set(null);
						}
					}}
				>
					{translations[language]['reset']}
				</button>
			</div>
		</div>
	{/if}
</div>
