<script lang="ts">
	import type { RogueTopic } from '$lib/types';
	import type { PageData } from './$types';
	import {
		statMods,
		difficulty,
		specialMods,
		selectedRelics,
		selectedUniqueRelic,
		eliteMode,
		runes,
		allMods,
		otherBuffsList,
		isBossStage,
		capsule
	} from './stores';
	import StageInfo from '$lib/components/StageInfo.svelte';
	import FooterBar from '$lib/components/FooterBar.svelte';
	import hardRelics from '$lib/data/is/phantom/relics_phantom_hard.json';
	import RelicDivUnique from '$lib/components/RelicDivUnique.svelte';
	import StageHeader from '$lib/components/StageHeader.svelte';
	import FloorTitle from './FloorTitle.svelte';
	import StageNav from '../../../(app)/phantom/PhantomNav.svelte';
	import { setOtherBuffsList } from '$lib/functions/lib';
	import StageSharedContainer from '$lib/components/StageSharedContainer.svelte';
	import DifficultySelect from '$lib/components/DifficultySelect.svelte';
	import StageHeadMeta from '$lib/components/StageHeadMeta.svelte';

	export let data: PageData;
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
	$: if (data.mapConfig) {
		runes.set(data.mapConfig?.n_mods);
		allMods.set(data.mapConfig?.all_mods);
		isBossStage.set(data.mapConfig?.id.includes('_b_'));
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
		<StageInfo mapConfig={data.mapConfig} {language} {stageName} {eliteMode} {rogueTopic} />
		<DifficultySelect {language} {difficulty} {rogueTopic} />

		<div class="mt-8">
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
				otherStores={{ eliteMode: eliteMode }}
			>
				<StageNav slot="nav" {language} />
			</StageSharedContainer>
		</div>
	</div>
</main>

<FooterBar {language} {rogueTopic} {selectedRelics} {selectedUniqueRelic}>
	<div slot="banner" class="absolute right-0 z-[1] h-16 w-16 overflow-hidden">
		{#if $capsule}
			<img src={$capsule.src} width="" height="" class=""/>
		{/if}
	</div>
	<div
		slot="uniqueRelics"
		class="grid lg:grid-cols-3 gap-x-10 gap-y-8 w-full overflow-x-auto md:overflow-visible my-auto mx-auto px-4 sm:px-24 mb-4"
	>
		{#each hardRelics as relic}
			<RelicDivUnique {relic} {language} {rogueTopic} {selectedUniqueRelic} />
		{/each}
	</div>
</FooterBar>
