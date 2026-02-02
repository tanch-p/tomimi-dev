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
		selectedFloor,
		eliteMode,
		otherBuffsList
	} from './stores';
	import DifficultySelect from '../../../../../lib/components/DifficultySelect.svelte';
	import SamiNav from '../../../(app)/sami/SamiNavTemp.svelte';
	import StageInfo from '$lib/components/StageInfo.svelte';
	import FooterBar from '$lib/components/FooterBar.svelte';
	import FloorTitle from './FloorTitle.svelte';
	import StageHeader from '$lib/components/StageHeader.svelte';
	import StageDrops from './StageDrops.svelte';
	import { setOtherBuffsList } from '$lib/functions/lib';
	import StageSharedContainer from '$lib/components/StageSharedContainer.svelte';
	import StageHeadMeta from '$lib/components/StageHeadMeta.svelte';

	export let data: PageData;
	$: if (data.mapConfig) {
		setOtherBuffsList(otherBuffsList, rogueTopic, data.enemies, data.mapConfig, language);
		eliteMode.set(false);
		runes.set(data.mapConfig?.n_mods);
		allMods.set(data.mapConfig?.all_mods);
	}
	$: language = data.language;
	$: stageName = data.mapConfig?.[`name_${language}`] || data.mapConfig?.name_zh;
	const rogueTopic: RogueTopic = data.rogueTopic;
</script>

<StageHeadMeta mapConfig={data.mapConfig} {stageName} {language}/>

<StageHeader {language}>
	<FloorTitle slot="floorTitle" stageFloors={data.mapConfig?.floors} {language} />
</StageHeader>

<main class="bg-neutral-800 text-near-white pb-72 pt-8 sm:pt-16 md:pb-28">
	<div class="w-screen sm:w-full max-w-7xl mx-auto">
		<StageInfo
			mapConfig={data.mapConfig}
			{language}
			{stageName}
			eliteMode={$eliteMode}
			{rogueTopic}
		>
			<StageDrops slot="drops" mapConfig={data.mapConfig} {language} {rogueTopic} {selectedFloor} />
		</StageInfo>
		<DifficultySelect {language} {difficulty} {rogueTopic} />
		<StageSharedContainer
			{language}
			traps={data.traps}
			{otherBuffsList}
			{statMods}
			{specialMods}
			mapConfig={data.mapConfig}
			enemies={data.enemies}
			{eliteMode}
			{runes}
			{rogueTopic}
			{selectedRelics}
			difficulty={$difficulty}
		>
			<SamiNav slot="nav" {language} />
		</StageSharedContainer>
	</div>
</main>

<FooterBar {language} {rogueTopic} {selectedRelics} />
