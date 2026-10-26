<script lang="ts">
	import { onMount, tick } from 'svelte';
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
	import blackRelics from '$lib/data/is/black/relics.json';
	import weatherOptions from '$lib/data/is/black/weather.json';
	import weather1 from '$lib/images/is/black/rogue_6_weather_1.webp';
	import weather2 from '$lib/images/is/black/rogue_6_weather_2.webp';
	import { type UserRunState, tryDecodeUserRunState } from '$lib/functions/userRunStateHelpers';
	import { createGoldVariationEffect, goldVariation } from './variationHelpers';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();

	type BlackRelic = (typeof blackRelics)[number] & { count?: number };

	const variationImageLookup: Record<string, string> = {
		rogue_6_weather_1: weather1,
		rogue_6_weather_2: weather2
	};
	let synchronising = $state(false);
	let hideLoaderTimeout: ReturnType<typeof setTimeout> | undefined;
	let combinedSettings: { openSettings: (trigger?: HTMLElement) => void };

	async function applyRunState(initialState: UserRunState) {
		synchronising = true;

		clearTimeout(hideLoaderTimeout);
		hideLoaderTimeout = setTimeout(() => {
			synchronising = false;
		}, 300);

		if (initialState.diff !== undefined && initialState.diff <= 16) {
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

		if (initialState.eliteMode !== undefined) {
			// StageSharedContainer resets elite mode when mapConfig changes.
			await tick();
			eliteMode.set(initialState.eliteMode);
		}
	}

	onMount(() => {
		const initialState = tryDecodeUserRunState(
			new URLSearchParams(window.location.search).get('state'),
			'ro6'
		);

		if (initialState) applyRunState(initialState);

		return () => clearTimeout(hideLoaderTimeout);
	});

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
		if (
			mapConfig?.levelId === 'level_rogue6_s-1' &&
			!$selectedRelics.some(
				(relic) => relic.id === 'rogue_6_relic_final_9' || relic.id === 'rogue_6_relic_final_7'
			)
		) {
			const defaultRelic = blackRelics.find((relic) => relic.id === 'rogue_6_relic_final_7');
			if (defaultRelic) selectedRelics.set([...$selectedRelics, defaultRelic]);
		}
		if (
			mapConfig?.levelId === 'level_rogue6_b-6' &&
			!$selectedRelics.some((relic) => relic.id === 'rogue_6_relic_final_3')
		) {
			const defaultRelic = blackRelics.find((relic) => relic.id === 'rogue_6_relic_final_3');
			if (defaultRelic) selectedRelics.set([...$selectedRelics, defaultRelic]);
		}
	});
	$effect(() => {
		if (mapConfig) {
			stageType.set(getStageType(mapConfig?.levelId, mapConfig?.tags, rogueTopic));
			setOtherBuffsList(otherBuffsList, rogueTopic, enemies, traps, mapConfig, language);
			runes.set(mapConfig?.n_mods);
			allMods.set(mapConfig?.all_mods);
		}
	});
	let stageName = $derived(mapConfig ? mapConfig?.[`name_${language}`] || mapConfig?.name_zh : '');
</script>

<StageHeadMeta {mapConfig} {stageName} {language} />

{#if synchronising}
	<SynchroLoader language={data.language} />
{/if}

<StageHeader {language}>
	{#snippet floorTitle()}
		<FloorTitle stageFloors={mapConfig?.floors || []} levelId={mapConfig?.levelId} {language} />
	{/snippet}
</StageHeader>

<main class="bg-neutral-800 text-near-white pb-72 pt-8 sm:pt-16 md:pb-28">
	<div class="w-screen sm:w-full max-w-7xl mx-auto">
		<StageVariantSelector
			variants={data.stageData.data}
			bind:selectedIndex={configIndex}
			{selectedRelics}
			relicsList={blackRelics}
		/>
		<StageInfo {mapConfig} {language} {stageName} {eliteMode} {rogueTopic} difficulty={$difficulty}
		></StageInfo>
		<CombinedSettings
			bind:this={combinedSettings}
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
			{#snippet nav()}
				<StageNav {language} />
			{/snippet}
		</StageSharedContainer>
	</div>
</main>

<FooterBar
	{language}
	{rogueTopic}
	{selectedRelics}
	difficulty={$difficulty}
	onSettingsClick={(trigger) => combinedSettings.openSettings(trigger)}
/>
