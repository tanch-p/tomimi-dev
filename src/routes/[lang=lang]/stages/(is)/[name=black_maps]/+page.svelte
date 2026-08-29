<script lang="ts">
	import { onMount } from 'svelte';
	import { dev } from '$app/environment';
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
	import DifficultySelect from '$lib/components/DifficultySelect.svelte';
	import StageNav from '../../../(app)/black/StageNav.svelte';
	import StageInfo from '$lib/components/StageInfo.svelte';
	import FooterBar from '$lib/components/FooterBar.svelte';
	import FloorTitle from './FloorTitle.svelte';
	import StageHeader from '$lib/components/StageHeader.svelte';
	import { getStageType, setOtherBuffsList } from '$lib/functions/lib';
	import StageSharedContainer from '$lib/components/StageSharedContainer.svelte';
	import StageHeadMeta from '$lib/components/StageHeadMeta.svelte';
	import SynchroLoader from '$lib/components/SynchroLoader.svelte';
	import { stageLoadMulti } from '$lib/functions/stageLoad';
	import TitleBlock from '$lib/components/TitleBlock.svelte';
	import { getTranslations } from '$lib/functions/languageHelpers';
	import blackRelics from '$lib/data/is/black/relics.json';
	import weatherOptions from '$lib/data/is/black/weather.json';
	import weather1 from '$lib/images/is/black/rogue_6_weather_1.webp';
	import weather2 from '$lib/images/is/black/rogue_6_weather_2.webp';
	import {
		copyRunState,
		type UserRunState,
		type UserRunStateRelic,
		tryDecodeUserRunState
	} from '$lib/functions/userRunStateHelpers';
	import { createGoldVariationEffect, goldVariation } from './variationHelpers';

	export let data: PageData;

	type BlackRelic = (typeof blackRelics)[number] & { count?: number };

	const variationImageLookup: Record<string, string> = {
		rogue_6_weather_1: weather1,
		rogue_6_weather_2: weather2
	};
	let synchronising = false;

	async function copyCurrentRunState() {
		const relics: UserRunStateRelic[] = $selectedRelics.map((relic) => ({
			id: relic.id,
			...(relic.stages && Number.isSafeInteger(relic.count) ? { count: relic.count } : {})
		}));
		const variation = $activeFloorEffects[0]?.iconId;
		const state: UserRunState = {
			topic: 'ro6',
			relics,
			diff: $difficulty,
			...(variation ? { variation } : {}),
			gold: $gold,
			floor: $selectedFloor,
			...(configIndex !== 0 ? { configIndex } : {})
		};

		try {
			await copyRunState(state);
		} catch (err) {
			dev && console.error(err);
		}
	}

	onMount(() => {
		const initialState = tryDecodeUserRunState(
			new URLSearchParams(window.location.search).get('state'),
			'ro6'
		);

		if (!initialState) return;

		synchronising = true;

		const hideLoaderTimeout = setTimeout(() => {
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

		if (
			initialState.configIndex !== undefined &&
			initialState.configIndex > 0 &&
			initialState.configIndex < data.stageData.data.length
		) {
			configIndex = initialState.configIndex;
		}

		return () => clearTimeout(hideLoaderTimeout);
	});

	const rogueTopic: RogueTopic = data.rogueTopic;
	$: if (data) {
		configIndex = 0;
	}
	$: configIndex = 0;
	$: mapConfig = data.stageData.data[configIndex];
	$: dataET = stageLoadMulti(data.stageData.data[configIndex], language);
	$: enemies = dataET.enemies;
	$: traps = dataET.traps;

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
		{#if dev}
			<button
				type="button"
				class="mx-6 mb-4 rounded bg-sky-600 px-4 py-2 hover:bg-sky-500"
				on:click={copyCurrentRunState}
			>
				Copy run state
			</button>
		{/if}
		<StageInfo {mapConfig} {language} {stageName} {eliteMode} {rogueTopic} difficulty={$difficulty}>
			<!-- <StageDrops slot="drops" mapConfig={mapConfig} {language} {rogueTopic} {selectedFloor} /> -->
			{#if data.stageData.data.length > 1}
				<TitleBlock title={getTranslations(language).stage_choice} size="subheading">
					<div class="flex flex-wrap md:grid grid-flow-col auto-cols-fr">
						{#each data.stageData.data as { suffix }, i}
							<button
								class="basis-1/3 grow {i !== configIndex
									? 'bg-neutral-600 brightness-50 min-h-[50px] hover:brightness-75'
									: 'bg-sky-500'}"
								on:click={() => (configIndex = i)}
							>
								{#if suffix === 'choice_yi'}
									<div class="flex items-center justify-center gap-x-1.5">
										<img
											class="select-none"
											src={`/images/enemy_icons/enemy_2118_dylbhm.webp`}
											height="50px"
											width="50px"
											decoding="async"
											alt={'yi'}
										/>
										<span
											>{{ zh: '化镇抚', ja: '鎮撫と化す', en: 'Suppressive strike' }[
												language
											]}</span
										>
									</div>
								{:else if suffix === 'choice_sui'}
									<div class="flex items-center justify-center gap-x-1.5">
										<img
											class="select-none"
											src={`/images/enemy_icons/enemy_2119_dyshhj.webp`}
											height="50px"
											width="50px"
											decoding="async"
											alt={'sui'}
										/>
										<span>{{ zh: '溯承形', ja: '承形を遡る', en: 'Inheritance' }[language]}</span>
									</div>
								{:else if suffix === 'choice_wang'}
									<div class="flex items-center justify-center gap-x-1.5">
										<img
											class="select-none"
											src={`/images/enemy_icons/enemy_2120_dywqgs.webp`}
											height="50px"
											width="50px"
											decoding="async"
											alt={'wang'}
										/>
										<span>{{ zh: '改对弈', ja: '対局に改める', en: 'Match' }[language]}</span>
									</div>
								{:else if suffix === 'choice_rgdysm'}
									<div class="flex items-center justify-center gap-x-1.5">
										<img
											class="select-none"
											src={`/images/chara_icons/trap_222_rgdysm.webp`}
											height="50px"
											width="50px"
											decoding="async"
											alt={'cyue'}
										/>
										<span>{{ zh: '塑旧历', ja: '旧暦を塑す', en: 'Calendar' }[language]}</span>
									</div>
								{:else if suffix === 'choice_tgr'}
									<div class="flex items-center justify-center gap-x-1.5">
										<img
											class="select-none"
											src={`/images/enemy_icons/enemy_2126_dycyue.webp`}
											height="50px"
											width="50px"
											decoding="async"
											alt={'cyue'}
										/>
										<img
											class="select-none"
											src={`/images/enemy_icons/enemy_2127_dysuih.webp`}
											height="50px"
											width="50px"
											decoding="async"
											alt={'suih'}
										/>
										<span
											>{{ zh: '定本源', ja: '根源を定める', en: 'Define a source' }[language]}</span
										>
									</div>
								{:else if suffix === 'choice_normal'}
									<span class="font-bold text-lg">
										{{ zh: '普通', ja: '通常', en: 'Normal' }[language]}
									</span>
								{:else if suffix === 'choice_all'}
									<div class="flex items-center justify-center gap-x-1.5">
										<img
											class="select-none"
											src={`/images/enemy_icons/enemy_2126_dycyue.webp`}
											height="50px"
											width="50px"
											decoding="async"
											alt={'cyue'}
										/>
										<img
											class="select-none"
											src={`/images/enemy_icons/enemy_2127_dysuih.webp`}
											height="50px"
											width="50px"
											decoding="async"
											alt={'suih'}
										/>
										<span>{{ zh: '役群兽', ja: '群獣を役す', en: 'Wage war' }[language]}</span>
									</div>
								{:else}
									{suffix}
								{/if}
							</button>
						{/each}
					</div>
				</TitleBlock>
			{/if}
		</StageInfo>
		<DifficultySelect {language} {difficulty} {rogueTopic} maxDiff={15} />
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
