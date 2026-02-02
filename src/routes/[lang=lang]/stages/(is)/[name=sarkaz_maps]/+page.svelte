<script lang="ts">
	import type { RogueTopic } from '$lib/types';
	import type { PageData } from './$types';
	import {
		statMods,
		difficulty,
		difficultyMode,
		specialMods,
		runes,
		allMods,
		selectedRelics,
		selectedFloor,
		otherBuffsList,
		eliteMode,
		disasterEffects
	} from './stores';
	import DifficultySelect from '../../../../../lib/components/DifficultySelect.svelte';
	import NavTemp from '../../../(app)/sarkaz/NavTemp.svelte';
	import StageInfo from '$lib/components/StageInfo.svelte';
	import FooterBar from '$lib/components/FooterBar.svelte';
	import translations from '$lib/translations.json';
	import FloorTitle from './FloorTitle.svelte';
	import StageHeader from '$lib/components/StageHeader.svelte';
	import skzRelics from '$lib/data/is/sarkaz/relics_sarkaz.json';
	import StageDrops from './StageDrops.svelte';
	import { setOtherBuffsList } from '$lib/functions/lib';
	import StageSharedContainer from '$lib/components/StageSharedContainer.svelte';
	import StageHeadMeta from '$lib/components/StageHeadMeta.svelte';

	export let data: PageData;

	$: if (data.mapConfig) {
		updateReqRelic(data.mapConfig?.levelId, selectedRelics);
		setOtherBuffsList(otherBuffsList, rogueTopic, data.enemies, data.mapConfig, language);
		runes.set(data.mapConfig?.n_mods);
		allMods.set(data.mapConfig?.all_mods);
	}
	const ro4_ALTER_BOSS_STAGES = ['level_rogue4_b-4-b', 'level_rogue4_b-5-b'];

	$: language = data.language;
	$: stageName = data.mapConfig?.[`name_${language}`] || data.mapConfig?.name_zh;
	const rogueTopic: RogueTopic = data.rogueTopic;

	function updateReqRelic(levelId, selectedRelics) {
		if (
			ro4_ALTER_BOSS_STAGES.includes(levelId) &&
			!$selectedRelics.find((item) => item.id === 'rogue_4_relic_explore_7')
		) {
			const relic = skzRelics.find((item) => item.id === 'rogue_4_relic_explore_7');
			selectedRelics.update((list) => (list = [...list, relic]));
		}
		if (
			['level_rogue4_b-7'].includes(levelId) &&
			!$selectedRelics.find((item) => item.id === 'rogue_4_relic_final_6')
		) {
			const relic = skzRelics.find((item) => item.id === 'rogue_4_relic_final_6');
			selectedRelics.update((list) => (list = [...list, relic]));
		}
	}
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
			{eliteMode}
			{rogueTopic}
			difficulty={$difficulty}
		>
			<StageDrops slot="drops" mapConfig={data.mapConfig} {language} {rogueTopic} {selectedFloor} />
		</StageInfo>
		<DifficultySelect {language} {difficulty} {rogueTopic} maxDiff={18} mode={$difficultyMode}>
			<div class="flex gap-1.5 mt-1.5 mb-2.5">
				<button
					class="flex items-center justify-center min-w-[70px] px-[10px] rounded-md bg-gray-500 {$difficultyMode ===
					'normal'
						? ''
						: 'brightness-[.6] hover:brightness-100'}"
					on:click={() => difficultyMode.set('normal')}
				>
					{translations[language].normal_state}
				</button>
				<button
					class="flex items-center justify-center min-w-[70px] px-[10px] rounded-md bg-emerald-700 {$difficultyMode ===
					'normal'
						? 'brightness-[.6] hover:brightness-100'
						: ''}"
					on:click={() => difficultyMode.set('deepseek')}
				>
					{{ en: 'selbaF edisecanruF', ja: '談奇辺炉', zh: '语奇终无' }[language]}
				</button>
			</div>
		</DifficultySelect>
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
			otherStores={{ disaster: disasterEffects }}
			difficulty={$difficulty}
		>
			<NavTemp {language} slot="nav" />
		</StageSharedContainer>
	</div>
</main>

<FooterBar {language} {rogueTopic} {selectedRelics} />
