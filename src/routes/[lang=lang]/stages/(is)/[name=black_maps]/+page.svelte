<script lang="ts">
	import { onMount } from 'svelte';
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
		selectedFloor,
		activeFloorEffects,
		gold
	} from './stores';
	import CombinedSettings from './CombinedSettings.svelte';
	import StageNav from '../../../(app)/black/StageNav.svelte';
	import StageInfo from '$lib/components/StageInfo.svelte';
	import FooterBar from '$lib/components/FooterBar.svelte';
	import FloorTitle from './FloorTitle.svelte';
	import StageHeader from '$lib/components/StageHeader.svelte';
	import { setOtherBuffsList } from '$lib/functions/buffHelpers';
	import { getStageType } from '$lib/functions/stageHelpers';
	import StageSharedContainer from '$lib/components/StageSharedContainer.svelte';
	import StageHeadMeta from '$lib/components/StageHeadMeta.svelte';
	import StageVariantSelector from '$lib/components/StageVariantSelector.svelte';
	import SynchroLoader from '$lib/components/SynchroLoader.svelte';
	import TitleBlock from '$lib/components/TitleBlock.svelte';
	import { getTranslations } from '$lib/functions/languageHelpers';
	import blackRelics from '$lib/data/is/black/relics.json';
	import weatherOptions from '$lib/data/is/black/weather.json';
	import weather1 from '$lib/images/is/black/rogue_6_weather_1.webp';
	import weather2 from '$lib/images/is/black/rogue_6_weather_2.webp';
	import { type UserRunState, tryDecodeUserRunState } from '$lib/functions/userRunStateHelpers';
	import { createGoldVariationEffect, goldVariation } from './variationHelpers';

	export let data: PageData;

	type BlackRelic = (typeof blackRelics)[number] & { count?: number };

	const variationImageLookup: Record<string, string> = {
		rogue_6_weather_1: weather1,
		rogue_6_weather_2: weather2
	};
	let synchronising = false;
	let hideLoaderTimeout: ReturnType<typeof setTimeout> | undefined;

	function applyRunState(initialState: UserRunState) {
		synchronising = true;

		clearTimeout(hideLoaderTimeout);
		hideLoaderTimeout = setTimeout(() => {
			synchronising = false;
		}, 300);

		if (initialState.diff !== undefined && initialState.diff <= 15) {
			difficulty.set(initialState.diff);
		}

		const initialRelics = initialState.relics.flatMap(({ id, count }) => {
			const relic = blackRelics.find((item) => item.id === id) as BlackRelic | undefined;

			if (!relic) return [];

			if (relic.stages) {
				const initialCount = count ?? 1;

				if (initialCount < 1 || initialCount > relic.stages.length) return [];

				relic.count = initialCount;
			}

			return [relic];
		});

		selectedRelics.set(initialRelics);
		activeFloorEffects.set([]);

		if (initialState.gold !== undefined) {
			gold.set(Math.min(initialState.gold, 100));
		}

		if (initialState.variation) {
			const weatherLevel = $difficulty <= 5 ? 1 : $difficulty <= 11 ? 2 : 3;
			const weather = weatherOptions.find(
				(option) => option.iconId === initialState.variation && option.level === weatherLevel
			);

			if (weather) {
				activeFloorEffects.set([{ ...weather, src: variationImageLookup[weather.iconId] }]);
			} else if (initialState.variation === goldVariation.id) {
				activeFloorEffects.set([createGoldVariationEffect($gold)]);
			}
		}

		if (initialState.floor !== undefined && initialState.floor >= 1 && initialState.floor <= 6) {
			selectedFloor.set(initialState.floor);
		}

		const nextConfigIndex = initialState.configIndex ?? 0;
		configIndex =
			nextConfigIndex >= 0 && nextConfigIndex < data.stageData.data.length ? nextConfigIndex : 0;
	}

	onMount(() => {
		const initialState = tryDecodeUserRunState(
			new URLSearchParams(window.location.search).get('state'),
			'ro6'
		);

		if (initialState) applyRunState(initialState);

		return () => clearTimeout(hideLoaderTimeout);
	});

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

{#if synchronising}
	<SynchroLoader language={data.language} />
{/if}

<StageHeader {language}>
	<FloorTitle slot="floorTitle" stageFloors={mapConfig?.floors || []} {language} />
</StageHeader>

<main class="bg-neutral-800 text-near-white pb-72 pt-8 sm:pt-16 md:pb-28">
	<div class="w-screen sm:w-full max-w-7xl mx-auto">
		<StageVariantSelector variants={data.stageData.data} bind:selectedIndex={configIndex} />
		<StageInfo {mapConfig} {language} {stageName} {eliteMode} {rogueTopic} difficulty={$difficulty}>
			<!-- <StageDrops slot="drops" mapConfig={mapConfig} {language} {rogueTopic} {selectedFloor} /> -->
		</StageInfo>
		<CombinedSettings
			{language}
			{difficulty}
			{rogueTopic}
			{eliteMode}
			{mapConfig}
			{configIndex}
			onLoadState={applyRunState}
		/>
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
