<script lang="ts">
	import type { PageData } from './$types';
	import { untrack } from 'svelte';
	import { createRecalRuneStores } from './stores';
	import RecalRune from '$lib/components/recalRune/RecalRuneContainer.svelte';
	import StageInfo from '$lib/components/StageInfo.svelte';
	import StageSharedContainer from '$lib/components/StageSharedContainer.svelte';
	import TitleBlock from '$lib/components/TitleBlock.svelte';
	import { setOtherBuffsList } from '$lib/functions/buffHelpers';
	import { getTranslations } from '$lib/functions/languageHelpers';
	import { initContracts } from '$lib/functions/recalRune';

	let { data }: { data: PageData } = $props();

	let seasonOptions = $derived([...data.stageOptions].sort((a, b) => b.season - a.season));
	let selectedSeasonNumber = $derived(seasonOptions[0].season);
	let selectedSeason = $derived(
		seasonOptions.find((season) => season.season === selectedSeasonNumber) ?? seasonOptions[0]
	);
	let selectedStageId = $derived(selectedSeason.stages[0].stageId);
	let language = $derived(data.language);
	let selectedStage = $derived(
		data.stages.find((stage) => stage.mapConfig.levelId === selectedStageId) ?? data.stages[0]
	);
	let mapConfig = $derived(selectedStage.mapConfig);
	let enemies = $derived(selectedStage.enemies);
	let traps = $derived(selectedStage.traps);
	let stageName = $derived(mapConfig[`name_${language}`] || mapConfig.name_zh);
	let crisis = $derived(mapConfig.systems?.crisis);

	const {
		allMods,
		contracts,
		eliteMode,
		otherBuffsList,
		runes,
		selectedRelics,
		specialMods,
		statMods
	} = createRecalRuneStores(untrack(() => mapConfig));

	$effect(() => {
		const config = mapConfig;
		untrack(() => {
			runes.set(config.n_mods);
			allMods.set(config.all_mods);
			initContracts(contracts, config);
		});
	});
	$effect(() => {
		setOtherBuffsList(
			otherBuffsList,
			null,
			enemies,
			traps,
			mapConfig,
			language,
			0,
			$eliteMode,
			$specialMods
		);
	});
</script>

<svelte:head>
	<title>{getTranslations(language).recalrune} / {getTranslations(language).title_post}</title>
	<meta name="description" content={getTranslations(language).title_post} />
	<meta property="og:description" content={getTranslations(language).title_post} />
	<meta property="og:title" content={getTranslations(language).recalrune} />
	<meta property="og:url" content={`https://tomimi.dev/${language}/recalrune`} />
</svelte:head>

<main
	class="bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-near-white pb-72 pt-8 sm:pt-16 md:pb-28 w-screen sm:w-full max-w-7xl mx-auto"
>
	<TitleBlock title={getTranslations(language).recalrune}>
		<div
			class="flex flex-wrap gap-2 mt-4 px-2 sm:px-0"
			role="group"
			aria-label={getTranslations(language).recal_season}
		>
			{#each seasonOptions as season (season.season)}
				<button
					type="button"
					aria-pressed={season.season === selectedSeasonNumber}
					class="rounded px-4 py-2 text-near-white {season.season === selectedSeasonNumber
						? 'bg-sky-600'
						: 'bg-neutral-700 hover:bg-neutral-600'}"
					onclick={() => (selectedSeasonNumber = season.season)}
				>
					{getTranslations(language).recal_season}
					{season.season}
				</button>
			{/each}
		</div>
		<div class="grid grid-cols-2 md:grid-cols-4 gap-2 mt-4">
			{#each selectedSeason.stages as stage (stage.stageId)}
				<button
					type="button"
					aria-pressed={stage.stageId === selectedStageId}
					class="rounded px-3 py-2 text-left text-near-white {stage.stageId === selectedStageId
						? 'bg-sky-600'
						: 'bg-neutral-700 hover:bg-neutral-600'}"
					onclick={() => (selectedStageId = stage.stageId)}
				>
					<span class="block font-semibold">{stage.code}</span>
					<span class="block text-sm">{stage.name[language] || stage.name.zh}</span>
				</button>
			{/each}
		</div>
	</TitleBlock>

	<div class="relative mt-8">
		<StageInfo {mapConfig} {language} {stageName} {eliteMode} />
		{#if crisis && $contracts}
			<RecalRune {language} {crisis} {contracts} />
		{/if}
		<StageSharedContainer
			{language}
			{traps}
			{otherBuffsList}
			{statMods}
			{specialMods}
			{mapConfig}
			{enemies}
			{eliteMode}
			{runes}
			{selectedRelics}
			difficulty={0}
			rogueTopic={null}
			nav={undefined}
		/>
	</div>
</main>
