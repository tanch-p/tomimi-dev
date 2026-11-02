<script lang="ts">
	import { getTranslations } from '$lib/functions/languageHelpers';
	import type { Language, RogueTopic } from '$lib/types';
	import relicIcon from '$lib/images/is/relic.png';
	import settingsIcon from '$lib/images/is/settings.svg';
	import RelicsOverlay from './RelicsOverlay.svelte';
	import DiffHexagon from './DiffHexagon.svelte';
	import Icon from './Icon.svelte';
	import { readable } from 'svelte/store';
	import type { RelicSelectionStore } from '$lib/functions/relicSelection';
	import { getRelicText, type ResolvedRelic } from '$lib/data/is/relicTypes';
	import { getRelicImagePath } from '$lib/data/is/relicImages';
	interface Props {
		language: Language;
		rogueTopic: RogueTopic;
		selectedRelics: RelicSelectionStore;
		selectedUniqueRelic?: RelicSelectionStore | null;
		uniqueRelics?: import('svelte').Snippet;
		banner?: import('svelte').Snippet;
		onSettingsClick?: (trigger: HTMLButtonElement) => void;
		difficulty?: number;
	}

	let {
		language,
		rogueTopic,
		selectedRelics,
		selectedUniqueRelic = null,
		uniqueRelics,
		banner,
		onSettingsClick,
		difficulty
	}: Props = $props();
	let openOverlay = $state(false);
	const emptyRelics = readable<readonly ResolvedRelic[]>([]);
	let resolvedRelics = $derived(selectedRelics.resolved);
	let resolvedUniqueRelics = $derived(selectedUniqueRelic?.resolved ?? emptyRelics);

	const uniqueRelics_render = $derived(uniqueRelics);
</script>

<div class="footerBar fixed overflow-hidden bottom-0 w-full select-none z-10">
	<RelicsOverlay
		{openOverlay}
		{language}
		{rogueTopic}
		{selectedRelics}
		{selectedUniqueRelic}
		onclose={() => (openOverlay = !openOverlay)}
	>
		{#snippet uniqueRelics()}
			{@render uniqueRelics_render?.()}
		{/snippet}
	</RelicsOverlay>
	<div
		class="shadow-2xl shadow-gray-400 bg-white dark:bg-neutral-900 w-full mt-4 fixed bottom-0 py-2"
	>
		<div class="max-w-7xl mx-auto px-2 md:px-4">
			<div class="relative flex items-center h-16">
				{@render banner?.()}
				{#if onSettingsClick}
					<button
						id="settings-toggle"
						type="button"
						aria-haspopup="dialog"
						aria-label={getTranslations(language).settings}
						title={getTranslations(language).settings}
						class="relative mr-2 h-14 w-14 shrink-0 hover:brightness-125"
						onclick={(event) => onSettingsClick(event.currentTarget)}
					>
						<img src={settingsIcon} alt="" aria-hidden="true" />
						{#if difficulty !== undefined}
							<span class="absolute -bottom-1 -left-1 h-8 w-8" aria-hidden="true">
								<DiffHexagon {difficulty} />
							</span>
						{/if}
					</button>
				{/if}
				<div
					role="button"
					tabindex="0"
					class={`group flex items-center py-[2px] bg-gradient-to-r from-neutral-200 via-white to-white dark:from-[#333333] dark:via-neutral-900 dark:to-neutral-900 relative hover:cursor-pointer`}
					onclick={() => (openOverlay = !openOverlay)}
					onkeydown={(event) => {
						if (event.key === 'Enter' || event.key === ' ') openOverlay = !openOverlay;
					}}
				>
					<div
						class="shrink-0 flex items-center px-[6px] py-1 relative bg-white dark:bg-[#313131] group-hover:brightness-125"
					>
						{#if openOverlay}
							<div
								class="absolute flex flex-col inset-0 bg-white/90 dark:bg-[#212121]/70 text-center justify-center"
							>
								<Icon name="down-arrow" className="w-6 h-6 mx-auto" />
								<p class="font-medium text-neutral-800 dark:text-near-white">
									{getTranslations(language)['relic_overlay_close']}
								</p>
							</div>
						{/if}
						<img
							src={relicIcon}
							alt="relic icon"
							class="rounded bg-[#313131] dark:bg-transparent dark:rounded-none"
							loading="lazy"
							decoding="async"
						/>
					</div>
					<div
						class="bg-white dark:bg-neutral-900 min-w-[280px] w-[80vw] md:w-auto overflow-hidden h-14 gap-x-2 pl-1"
					>
						<div class="flex gap-x-2 items-center">
							{#each [...$resolvedUniqueRelics, ...$resolvedRelics] as relic (relic.id)}
								<div class="relative flex items-center">
									<div
										class="absolute rounded-full border-[3px] border-neutral-600/80 left-[50%] w-[44px] h-[44px] -translate-x-[50%]"
									></div>
									<div class="flex items-center text-center w-14 z-[1] h-14">
										<img
											src={getRelicImagePath(relic.id)}
											width="54px"
											alt={getRelicText(relic.name, language)}
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
