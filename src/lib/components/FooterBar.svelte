<script lang="ts">
	import type { Language, RogueTopic } from '$lib/types';
	import relicIcon from '$lib/images/is/relic.png';
	import RelicsOverlay from './RelicsOverlay.svelte';
	import translations from '$lib/translations.json';
	import Icon from './Icon.svelte';
	import { relicLookup } from '$lib/data/is/relic_lookup';
	interface Props {
		language: Language;
		rogueTopic: RogueTopic;
		selectedRelics: any;
		selectedUniqueRelic?: any;
		uniqueRelics?: import('svelte').Snippet;
		banner?: import('svelte').Snippet;
	}

	let {
		language,
		rogueTopic,
		selectedRelics,
		selectedUniqueRelic = null,
		uniqueRelics,
		banner
	}: Props = $props();
	let openOverlay = $state(false);

	const uniqueRelics_render = $derived(uniqueRelics);
</script>

<div class="footerBar fixed overflow-hidden bottom-0 w-full select-none z-10">
	<RelicsOverlay
		{openOverlay}
		{language}
		{rogueTopic}
		{selectedRelics}
		{selectedUniqueRelic}
		on:close={() => (openOverlay = !openOverlay)}
	>
		{#snippet uniqueRelics()}
				{@render uniqueRelics_render?.()}
			{/snippet}
	</RelicsOverlay>
	<div class="shadow-2xl shadow-gray-400 bg-neutral-900 w-full mt-4 fixed bottom-0 py-2">
		<div class="max-w-7xl mx-auto px-2 md:px-4">
			<div class="relative flex items-center h-16">
				{@render banner?.()}
				<!-- svelte-ignore a11y_click_events_have_key_events -->
				<div
					class={`flex items-center py-[2px] bg-linear-to-r from-[#333333] via-neutral-900 to-neutral-900 relative hover:cursor-pointer`}
					onclick={() => (openOverlay = !openOverlay)}
				>
					<div class="flex items-center px-[6px] py-1 relative bg-[#313131]">
						{#if openOverlay}
							<div
								class="absolute flex flex-col inset-0 bg-[#212121] bg-opacity-70 text-center justify-center"
							>
								<Icon name="down-arrow" className="w-6 h-6 mx-auto" />
								<p class="font-medium text-near-white">
									{translations[language]['relic_overlay_close']}
								</p>
							</div>
						{/if}
						<img src={relicIcon} alt="relic icon" loading="lazy" decoding="async" />
					</div>
					<div
						class="bg-neutral-900 min-w-[280px] w-[80vw] md:w-auto overflow-hidden h-14 gap-x-2 pl-1"
					>
						<div class="flex gap-x-2 items-center">
							{#if Boolean(selectedUniqueRelic) && Boolean($selectedUniqueRelic)}
								<div class="relative flex items-center">
									<div
										class="absolute rounded-full border-[3px] border-neutral-600 border-opacity-80 left-[50%] w-[44px] h-[44px] -translate-x-[50%]"
									></div>
									<div class="flex items-center text-center w-14 z-1">
										<img
											src="/images/relics/{$selectedUniqueRelic.id}.webp"
											width="54px"
											alt={$selectedUniqueRelic[`name_${language}`] || $selectedUniqueRelic.name_zh}
											loading="lazy"
											decoding="async"
										/>
									</div>
								</div>
							{/if}
							{#each $selectedRelics as relic}
								<div class="relative flex items-center">
									<div
										class="absolute rounded-full border-[3px] border-neutral-600 border-opacity-80 left-[50%] w-[44px] h-[44px] -translate-x-[50%]"
									></div>
									<div class="flex items-center text-center w-14 z-1 h-14">
										<img
											src="/images/relics/{relicLookup?.[relic.id] ?? relic.id}.webp"
											width="54px"
											alt={relic[`name_${language}`] || relic.name_zh}
											loading="lazy"
											decoding="async"
										/>
									</div>
								</div>
							{/each}
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
