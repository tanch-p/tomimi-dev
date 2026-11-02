<script lang="ts">
	import type { Language, RogueTopic } from '$lib/types';
	import { getRelicImagePath } from '$lib/data/is/relicImages';
	import {
		getRelicStages,
		getRelicText,
		type RelicDefinition,
		type RelicSelection
	} from '$lib/data/is/relicTypes';

	interface Props {
		relic: RelicDefinition;
		language: Language;
		rogueTopic: RogueTopic;
		selection?: RelicSelection;
		ontoggle: () => void;
		onstagechange: (index: number) => void;
	}

	let { relic, language, rogueTopic, selection, ontoggle, onstagechange }: Props = $props();
	let name = $derived(getRelicText(relic.name, language));
	let tooltip = $derived(getRelicText(relic.tooltip, language));
	let stages = $derived(getRelicStages(relic));
	let suffix = $derived(selection ? stages[selection.stageIndex]?.suffix : '');
</script>

<div
	id={relic.id}
	data-relic-card
	class="relic {selection
		? 'bg-neutral-100 dark:bg-neutral-800'
		: 'hover:bg-neutral-300 dark:hover:bg-neutral-700'}"
>
	<button
		type="button"
		data-relic-toggle
		aria-pressed={Boolean(selection)}
		aria-label={name}
		class="grid w-full grid-cols-[75px_auto] sm:grid-cols-[95px_auto] gap-x-2 text-left cursor-pointer focus-visible:outline-2 focus-visible:outline-sky-400"
		onclick={ontoggle}
	>
		<img
			src={getRelicImagePath(relic.id)}
			alt=""
			loading="lazy"
			decoding="async"
			class="w-[75px] sm:w-[95px]"
		/>
		<div class="px-2">
			<h4
				class="text-lg sm:text-xl {selection
					? rogueTopic === 'rogue_phantom'
						? 'text-[#cea658]'
						: 'text-[#58dbda]'
					: 'text-neutral-600 dark:text-gray-400'}"
			>
				{name}{suffix ? ` (${suffix})` : ''}
			</h4>
			<p class="text-neutral-600 dark:text-[#c4c4c4]">{tooltip}</p>
		</div>
	</button>
	{#if selection && stages.length > 1}
		<div class="flex flex-wrap gap-1 py-2 pl-[85px] sm:pl-[105px] pr-2">
			{#each stages as stage, index}
				<button
					type="button"
					data-stage-index={index}
					aria-label={`${name}: ${stage.suffix || index + 1}`}
					aria-pressed={selection.stageIndex === index}
					class="min-w-9 min-h-9 rounded border px-2 py-1 text-neutral-800 dark:text-near-white {selection.stageIndex ===
					index
						? 'border-sky-400 bg-sky-200 dark:bg-sky-900'
						: 'border-neutral-400 hover:bg-neutral-300 dark:hover:bg-neutral-600'}"
					onclick={() => onstagechange(index)}
				>
					{stage.suffix || index + 1}
				</button>
			{/each}
		</div>
	{/if}
</div>
