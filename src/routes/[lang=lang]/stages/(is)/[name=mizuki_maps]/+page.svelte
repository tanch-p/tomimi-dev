<script lang="ts">
	import type { PageData } from './$types';
	import type { RogueTopic } from '$lib/types';
	import {
		statMods,
		difficulty,
		specialMods,
		runes,
		allMods,
		selectedRelics,
		eliteMode,
		otherBuffsList
	} from './stores';
	import DifficultySelect from '$lib/components/DifficultySelect.svelte';
	import MizukiNav from '../../../(app)/mizuki/MizukiNav.svelte';
	import StageInfo from '$lib/components/StageInfo.svelte';
	import FooterBar from '$lib/components/FooterBar.svelte';
	import Mission from './Mission.svelte';
	import FloorTitle from './FloorTitle.svelte';
	import StageHeader from '$lib/components/StageHeader.svelte';
	import { setOtherBuffsList } from '$lib/functions/lib';
	import StageSharedContainer from '$lib/components/StageSharedContainer.svelte';
	import StageHeadMeta from '$lib/components/StageHeadMeta.svelte';

	export let data: PageData;
	$: if (data.mapConfig) {
		runes.set(data.mapConfig?.n_mods);
		allMods.set(data.mapConfig?.all_mods);
	}
	$: if (data.mapConfig || $difficulty) {
		setOtherBuffsList(
			otherBuffsList,
			rogueTopic,
			data.enemies,
			data.mapConfig,
			language,
			$difficulty
		);
	}
	$: language = data.language;
	const rogueTopic: RogueTopic = data.rogueTopic;
	$: stageName = data.mapConfig?.[`name_${language}`] || data.mapConfig?.name_zh;
</script>

<StageHeadMeta mapConfig={data.mapConfig} {stageName} {language}/>

<StageHeader {language}>
	<FloorTitle slot="floorTitle" stageFloors={data.mapConfig?.floors} {language} />
</StageHeader>

<main class="bg-neutral-800 text-near-white pb-72 pt-8 sm:pt-16 md:pb-28">
	<div class="w-screen sm:w-full max-w-7xl mx-auto">
		<StageInfo mapConfig={data.mapConfig} {language} {stageName} {eliteMode} {rogueTopic} />
		<Mission {language} />
		<DifficultySelect {language} {difficulty} {rogueTopic} maxDiff={18} />
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
			<MizukiNav slot="nav" {language} />
		</StageSharedContainer>
	</div>
</main>

<FooterBar {language} {rogueTopic} {selectedRelics} />
