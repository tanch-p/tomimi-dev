<script lang="ts">
	import type { RogueTopic } from '$lib/types';
	import type { PageData } from './$types';
	import {
		statMods,
		difficulty,
		specialMods,
		runes,
		allMods,
		selectedRelics,
		otherBuffsList,
		eliteMode,
		stageType
	} from './stores';
	import DifficultySelect from '../../../../../lib/components/DifficultySelect.svelte';
	import StageNav from '../../../(app)/sui/StageNav.svelte';
	import StageInfo from '$lib/components/StageInfo.svelte';
	import FooterBar from '$lib/components/FooterBar.svelte';
	import FloorTitle from './FloorTitle.svelte';
	import StageHeader from '$lib/components/StageHeader.svelte';
	import { setOtherBuffsList } from '$lib/functions/buffHelpers';
	import { getStageType } from '$lib/functions/stageHelpers';
	import StageSharedContainer from '$lib/components/StageSharedContainer.svelte';
	import StageHeadMeta from '$lib/components/StageHeadMeta.svelte';
	import StageVariantSelector from '$lib/components/StageVariantSelector.svelte';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();

	let rogueTopic: RogueTopic = $derived(data.rogueTopic);
	let configIndex = $derived.by(() => {
		// Reset synchronously when the stage changes; variant buttons can override this value.
		void data.stageData.id;
		return 0;
	});
	let selectedStage = $derived(data.stages[configIndex]);
	let mapConfig = $derived(selectedStage.mapConfig);
	let enemies = $derived(selectedStage.enemies);
	let traps = $derived(selectedStage.traps);
	let language = $derived(data.language);
	$effect(() => {
		if (mapConfig) {
			stageType.set(getStageType(mapConfig?.levelId, mapConfig?.tags, rogueTopic));
			runes.set(mapConfig?.n_mods);
			allMods.set(mapConfig?.all_mods);
		}
	});
	$effect(() => {
		if (mapConfig) {
			setOtherBuffsList(
				otherBuffsList,
				rogueTopic,
				enemies,
				traps,
				mapConfig,
				language,
				0,
				$eliteMode,
				$specialMods
			);
		}
	});
	let stageName = $derived(mapConfig ? mapConfig?.[`name_${language}`] || mapConfig?.name_zh : '');
</script>

<StageHeadMeta {mapConfig} {stageName} {language} />

<StageHeader {language}>
	{#snippet floorTitle()}
		<FloorTitle stageFloors={mapConfig?.floors || []} {language} />
	{/snippet}
</StageHeader>

<main
	class="bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-near-white pb-72 pt-8 sm:pt-16 md:pb-28"
>
	<div class="w-screen sm:w-full max-w-7xl mx-auto">
		<StageVariantSelector
			variants={data.stageData.data}
			bind:selectedIndex={configIndex}
			{selectedRelics}
		/>
		<StageInfo {mapConfig} {language} {stageName} {eliteMode} {rogueTopic} difficulty={$difficulty}
		></StageInfo>
		<DifficultySelect {language} {difficulty} {rogueTopic} maxDiff={18} />
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
			{rogueTopic}
			{selectedRelics}
			otherStores={{ relics: selectedRelics }}
			difficulty={$difficulty}
		>
			{#snippet nav()}
				<StageNav {language} />
			{/snippet}
		</StageSharedContainer>
	</div>
</main>

<FooterBar {language} {rogueTopic} {selectedRelics} />
