<script lang="ts">
	import { getTranslations } from '$lib/functions/languageHelpers';
	import { getRelicText } from '$lib/data/is/relicTypes';
	import { getRelicImagePath } from '$lib/data/is/relicImages';
	import type { Language } from '$lib/types';
	import { selectedFloor, selectedRelics } from './stores.js';

	interface Props {
		language: Language;
		idPrefix?: string;
	}

	let { language, idPrefix = '' }: Props = $props();

	const floors = new Array(6);
	const resolvedRelics = selectedRelics.resolved;
	let floorRelic = $derived(
		$resolvedRelics.find((relic) => relic.id === 'rogue_6_relic_artifact_5')
	);
</script>

<div class="max-w-125 mx-auto py-3 mt-4">
	<div class="grid grid-cols-6">
		{#each floors as _, i}
			<button
				id={idPrefix ? `${idPrefix}-floor-${i + 1}` : `floor-${i + 1}`}
				onclick={() => selectedFloor.set(i + 1)}
				class={`py-2 px-2 ${$selectedFloor === i + 1 ? 'bg-neutral-200 dark:bg-gray-500' : ''}`}
				type="button"
			>
				{i + 1}
			</button>
		{/each}
	</div>
	<div class="mt-4 flex items-center justify-center gap-2">
		{#if floorRelic}
			<div class="relative w-12 shrink-0">
				<img
					src={getRelicImagePath(floorRelic.id)}
					alt={getRelicText(floorRelic.name, language)}
					class="w-full"
					loading="lazy"
					decoding="async"
				/>
				<div
					class="absolute bottom-0 right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-neutral-200/80 dark:bg-neutral-700/80 text-green-600"
					aria-hidden="true"
				>
					<svg
						class="h-3 w-3"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="3"
						stroke-linecap="round"
						stroke-linejoin="round"
					>
						<path d="m5 12 4 4L19 6" />
					</svg>
				</div>
			</div>
		{/if}
		<div class="min-w-0">
			<p class="text-center text-sm">※{getTranslations(language).black_sp_floor_tip}</p>
			<p class="text-center text-sm mt-1">※{getTranslations(language).black_reenter_floor_tip}</p>
		</div>
	</div>
</div>
