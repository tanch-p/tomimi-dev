<script lang="ts">
	import { run } from 'svelte/legacy';

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

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();
	const rogueTopic: RogueTopic = data.rogueTopic;
	let language = $derived(data.language);
	run(() => {
		if (data.mapConfig) {
			setOtherBuffsList(otherBuffsList, rogueTopic, data.enemies, data.mapConfig, language);
			eliteMode.set(false);
			runes.set(data.mapConfig.n_mods);
			allMods.set(data.mapConfig.all_mods);
		}
	});
	let stageName = $derived(data.mapConfig[`name_${language}`] || data.mapConfig.name_zh);
</script>

<StageHeadMeta mapConfig={data.mapConfig} {stageName} {language}/>

<StageHeader {language}>
	{#snippet floorTitle()}
		<FloorTitle  stageFloors={data.mapConfig.floors} {language} />
	{/snippet}
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
			{#snippet drops()}
						<StageDrops  mapConfig={data.mapConfig} {language} {rogueTopic} {selectedFloor} />
					{/snippet}
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
			{#snippet nav()}
						<SamiNav  {language} />
					{/snippet}
		</StageSharedContainer>
	</div>
</main>

<FooterBar {language} {rogueTopic} {selectedRelics} />
