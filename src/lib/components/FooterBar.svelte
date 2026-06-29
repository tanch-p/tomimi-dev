<script lang="ts">
	import { getTranslations } from '$lib/functions/languageHelpers';
	import type { Language, RogueTopic } from '$lib/types';
	import relicIcon from '$lib/images/is/relic.png';
	import RelicsOverlay from './RelicsOverlay.svelte';
	import Icon from './Icon.svelte';
	import { relicLookup } from '$lib/data/is/relic_lookup';
	export let language: Language,
		rogueTopic: RogueTopic,
		selectedRelics,
		selectedUniqueRelic = null;
	let openOverlay = false;
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
		<slot name="uniqueRelics" slot="uniqueRelics" />
	</RelicsOverlay>
	<div class="shadow-2xl shadow-gray-400 bg-neutral-900 w-full mt-4 fixed bottom-0 py-2">
		<div class="max-w-7xl mx-auto px-2 md:px-4">
			<div class="relative flex items-center h-16">
				<slot name="banner" />
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<div
					class={`flex items-center py-[2px] bg-gradient-to-r from-[#333333] via-neutral-900 to-neutral-900 relative hover:cursor-pointer`}
					on:click={() => (openOverlay = !openOverlay)}
				>
					<div class="flex items-center px-[6px] py-1 relative bg-[#313131]">
						{#if openOverlay}
							<div
								class="absolute flex flex-col inset-0 bg-[#212121] bg-opacity-70 text-center justify-center"
							>
								<Icon name="down-arrow" className="w-6 h-6 mx-auto" />
								<p class="font-medium text-near-white">
									{getTranslations(language)['relic_overlay_close']}
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
									/>
									<div class="flex items-center text-center w-14 z-[1]">
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
									/>
									<div class="flex items-center text-center w-14 z-[1] h-14">
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
