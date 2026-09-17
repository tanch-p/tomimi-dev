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
	import DifficultySelect from '$lib/components/DifficultySelect.svelte';
	import StageNav from '../../../(app)/black/StageNav.svelte';
	import StageInfo from '$lib/components/StageInfo.svelte';
	import FooterBar from '$lib/components/FooterBar.svelte';
	import FloorTitle from './FloorTitle.svelte';
	import StageHeader from '$lib/components/StageHeader.svelte';
	import { setOtherBuffsList } from '$lib/functions/buffHelpers';
	import { getStageType } from '$lib/functions/stageHelpers';
	import StageSharedContainer from '$lib/components/StageSharedContainer.svelte';
	import StageHeadMeta from '$lib/components/StageHeadMeta.svelte';
	import TitleBlock from '$lib/components/TitleBlock.svelte';
	import { getTranslations } from '$lib/functions/languageHelpers';

	export let data: PageData;

	const rogueTopic: RogueTopic = data.rogueTopic;
	let configIndex = 0;
	$: if (data) {
		configIndex = 0;
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
		<StageInfo {mapConfig} {language} {stageName} {eliteMode} {rogueTopic} difficulty={$difficulty}>
			<!-- <StageDrops slot="drops" mapConfig={mapConfig} {language} {rogueTopic} {selectedFloor} /> -->
			{#if data.stageData.data.length > 1}
				<TitleBlock title={getTranslations(language).stage_choice} size="subheading">
					<div class="flex flex-wrap md:grid grid-flow-col auto-cols-fr">
						{#each data.stageData.data as { suffix, levelId }, i}
							<button
								class="basis-1/3 grow {i !== configIndex
									? 'bg-neutral-600 brightness-50 min-h-[50px] hover:brightness-75'
									: 'bg-sky-500'}"
								on:click={() => (configIndex = i)}
							>
								{#if levelId === 'level_rogue6_t-8'}
									<div class="flex items-center justify-center gap-x-1.5">
										<img
											class="select-none"
											src={`/images/enemy_icons/enemy_10073_mpcar.webp`}
											height="50px"
											width="50px"
											decoding="async"
											alt={'mpcar'}
										/>
										<img
											class="select-none"
											src={`/images/enemy_icons/enemy_10077_mpbarr.webp`}
											height="50px"
											width="50px"
											decoding="async"
											alt={'mpbarr'}
										/>
										<span>{suffix}</span>
									</div>
								{:else if levelId === 'level_rogue6_t-8-b'}
									<div class="flex items-center justify-center gap-x-1.5">
										<img
											class="select-none"
											src={`/images/enemy_icons/enemy_1152_dsurch.webp`}
											height="50px"
											width="50px"
											decoding="async"
											alt={'dsurch'}
										/>
										<img
											class="select-none"
											src={`/images/enemy_icons/enemy_1148_dssbr.webp`}
											height="50px"
											width="50px"
											decoding="async"
											alt={'dssbr'}
										/>
										<span>{suffix}</span>
									</div>
								{:else if levelId === 'level_rogue6_t-8-c'}
									<div class="flex items-center justify-center gap-x-1.5">
										<img
											class="select-none"
											src={`/images/enemy_icons/enemy_2136_shcolo.webp`}
											height="50px"
											width="50px"
											decoding="async"
											alt={'shcolo'}
										/>
										<img
											class="select-none"
											src={`/images/enemy_icons/enemy_1392_dhshld.webp`}
											height="50px"
											width="50px"
											decoding="async"
											alt={'dhshld'}
										/>
										<span>{suffix}</span>
									</div>
								{:else if levelId === 'level_rogue6_t-9'}
									<div class="flex items-center justify-center gap-x-1.5">
										<img
											class="select-none"
											src={`/images/enemy_icons/enemy_1439_dslntf_2.webp`}
											height="50px"
											width="50px"
											decoding="async"
											alt={'dslntf_2'}
										/>
										<img
											class="select-none"
											src={`/images/enemy_icons/enemy_1436_dsdivi_2.webp`}
											height="50px"
											width="50px"
											decoding="async"
											alt={'dsdivi_2'}
										/>
										<span>{suffix}</span>
									</div>
								{:else if levelId === 'level_rogue6_t-9-b'}
									<div class="flex items-center justify-center gap-x-1.5">
										<img
											class="select-none"
											src={`/images/enemy_icons/enemy_10089_hlsprt.webp`}
											height="50px"
											width="50px"
											decoding="async"
											alt={'hlsprt'}
										/>
										<img
											class="select-none"
											src={`/images/enemy_icons/enemy_10126_rkbomb_2.webp`}
											height="50px"
											width="50px"
											decoding="async"
											alt={'rkbomb_2'}
										/>
										<span>{suffix}</span>
									</div>
								{:else if levelId === 'level_rogue6_t-9-c'}
									<div class="flex items-center justify-center gap-x-1.5">
										<img
											class="select-none"
											src={`/images/enemy_icons/enemy_10081_mpplai.webp`}
											height="50px"
											width="50px"
											decoding="async"
											alt={'mpplai'}
										/>
										<img
											class="select-none"
											src={`/images/enemy_icons/enemy_1270_nhstlk.webp`}
											height="50px"
											width="50px"
											decoding="async"
											alt={'nhstlk'}
										/>
										<span>{suffix}</span>
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
