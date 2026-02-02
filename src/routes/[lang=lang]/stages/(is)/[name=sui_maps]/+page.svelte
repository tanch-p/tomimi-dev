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
	import { getStageType, setOtherBuffsList } from '$lib/functions/lib';
	import StageSharedContainer from '$lib/components/StageSharedContainer.svelte';
	import StageHeadMeta from '$lib/components/StageHeadMeta.svelte';
	import { stageLoadMulti } from '$lib/functions/stageLoad';
	import TitleBlock from '$lib/components/TitleBlock.svelte';

	export let data: PageData;

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
		setOtherBuffsList(otherBuffsList, rogueTopic, enemies, mapConfig, language);
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
				<TitleBlock title="选择" size="subheading">
					<div class="flex flex-wrap md:grid grid-flow-col auto-cols-fr">
						{#each data.stageData.data as { suffix }, i}
							<button
								class="basis-1/3 grow {i !== configIndex
									? 'bg-neutral-600 brightness-50 hover:brightness-75'
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
										<span>易</span>
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
										<span>岁</span>
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
										<span>望</span>
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
										<span>一起</span>
									</div>
								{:else if suffix === 'choice_all'}
									<span class="font-bold text-lg">ALL</span>
								{:else}
									{suffix}
								{/if}
							</button>
						{/each}
					</div>
				</TitleBlock>
			{/if}
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
