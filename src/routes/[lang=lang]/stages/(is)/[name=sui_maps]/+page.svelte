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
		stageType,
		selectedFloor
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

	export let data: PageData;

	const rogueTopic: RogueTopic = data.rogueTopic;
	let configIndex = 0;
	let previousStageId;

	$: if (data.stageData.id !== previousStageId) {
		previousStageId = data.stageData.id;
		configIndex = 0;
	}

	$: {
		if (configIndex >= data.stages.length) {
			configIndex = 0;
		}
	}
	$: selectedStage = data.stages[configIndex];
	$: mapConfig = selectedStage.mapConfig;
	$: enemies = selectedStage.enemies;
	$: traps = selectedStage.traps;

	$: if (mapConfig) {
		stageType.set(getStageType(mapConfig?.levelId, rogueTopic));
		setOtherBuffsList(otherBuffsList, rogueTopic, enemies, traps, mapConfig, language);
		runes.set(mapConfig?.n_mods);
		allMods.set(mapConfig?.all_mods);
	}

	$: language = data.language;
	$: stageName = mapConfig ? mapConfig?.[`name_${language}`] || mapConfig?.name_zh : '';
</script>

<StageHeadMeta {mapConfig} {stageName} {language} />

<StageHeader {language}>
	<FloorTitle slot="floorTitle" stageFloors={mapConfig?.floors || []} {language} />
</StageHeader>

<main class="bg-neutral-800 text-near-white pb-72 pt-8 sm:pt-16 md:pb-28">
	<div class="w-screen sm:w-full max-w-7xl mx-auto">
		<StageVariantSelector variants={data.stageData.data} bind:selectedIndex={configIndex} />
		<StageInfo {mapConfig} {language} {stageName} {eliteMode} {rogueTopic} difficulty={$difficulty}>
			<!-- <StageDrops slot="drops" mapConfig={mapConfig} {language} {rogueTopic} {selectedFloor} /> -->
		</StageInfo>
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
			<StageNav {language} slot="nav" />
		</StageSharedContainer>
	</div>
</main>

<FooterBar {language} {rogueTopic} {selectedRelics} />
