<script lang="ts">
	import { run } from 'svelte/legacy';

	import type { Language, RogueTopic } from '$lib/types';
	import translations from '$lib/translations.json';
	import TogglePanel from './TogglePanel.svelte';
	import {
		compileHiddenGroups,
		generateWaveTimeline,
		getBaseCount,
		getBonusEnemies,
		getEnemyCountPermutations,
		getOptions,
		handleOptionsUpdate,
		parseWaves
	} from '$lib/functions/waveHelpers';
	import DraggableContainer from './DraggableContainer.svelte';
	import DLDGPN from '$lib/images/is/DLDGPN.webp';
	import RandomGroupList from './RandomGroupList.svelte';
	import { defaultOpenStageSim } from '../../routes/stores';
	import { GameConfig } from './StageSimulator/objects/GameConfig';
	import { onDestroy, onMount } from 'svelte';

	interface Props {
		mapConfig: any;
		enemies: any;
		rogueTopic: RogueTopic;
		language: Language;
		eliteMode: Boolean;
		otherStores: any;
		difficulty: number;
		eliteMods?: import('svelte').Snippet;
	}

	let {
		mapConfig,
		enemies,
		rogueTopic,
		language,
		eliteMode,
		otherStores,
		difficulty,
		eliteMods
	}: Props = $props();

	let hiddenGroups = $state([]),
		enemyCounts = $state([]),
		relics = $state([]),
		selectedPermGroups = $state({}),
		selectedCountIndex = $state(0),
		selectedPermutationIdx = $state(0),
		randomSeeds = $state(Array.from(Array(50)).map((_) => Math.random())),
		mode = $state('predefined'),
		simMode = $state('wave_normal'),
		bonusKey = $state(''),
		baseCount = $state(0);

	let compiledHiddenGroups = $derived(compileHiddenGroups(hiddenGroups, eliteMode, mapConfig, rogueTopic,relics));
	run(() => {
		baseCount = getBaseCount(mapConfig, eliteMode);
	});
	let options = $derived(getOptions(mapConfig, rogueTopic, difficulty, language));
	let maxPermutations = $derived(eliteMode
		? mapConfig.ELITE.max_permutations
		: mapConfig.NORMAL.max_permutations);
	let permutations = $derived(getEnemyCountPermutations(
		mapConfig,
		compiledHiddenGroups,
		eliteMode,
		bonusKey,
		baseCount
	));
	run(() => {
		enemyCounts = permutations.reduce((acc, { count }) => {
			if (!acc.includes(count)) {
				acc.push(count);
			}
			return acc;
		}, []);
	});
	let permutationsToShow = $derived(permutations.reduce((acc, { count, permutation }) => {
		if (count === enemyCounts[selectedCountIndex]) {
			acc.push({ count, permutation });
		}
		return acc;
	}, []));
	run(() => {
		if (mapConfig) {
			selectedCountIndex = 0;
			selectedPermutationIdx = 0;
			bonusKey = '';
			GameConfig.setValue('mode', 'wave_normal');
		}
	});
	run(() => {
		if (selectedCountIndex) {
			selectedPermutationIdx = 0;
		}
	});
	run(() => {
		if (rogueTopic) {
			switch (rogueTopic) {
				case 'rogue_phantom':
					if (
						difficulty >= 12 &&
						['level_rogue1_b-6', 'level_rogue1_b-7', 'level_rogue1_b-8', 'level_rogue1_b-9'].includes(
							mapConfig.levelId
						)
					) {
						hiddenGroups = ['reforge'];
						break;
					}
				default:
					hiddenGroups = [];
			}
		}
	});

	otherStores?.relics?.subscribe((v) => {
		relics = v;
		if (v?.some((item) => item.id === 'rogue_5_copper_S_1')) {
			hiddenGroups = [...hiddenGroups, 'copper_r'];
		} else {
			hiddenGroups = hiddenGroups.filter((key) => key !== 'copper_r');
		}
	});

	otherStores?.disaster?.subscribe((v) => {
		if (v?.[0]?.iconId === 'rogue_4_disaster_1') {
			hiddenGroups = [...hiddenGroups, 'calamity'];
		} else {
			hiddenGroups = hiddenGroups.filter((key) => key !== 'calamity');
		}
	});

	const unsubscribeFns = [];
	onMount(() => {
		unsubscribeFns.push(
			GameConfig.subscribe('mode', (value) => {
				simMode = value;
			})
		);
	});

	onDestroy(() => {
		GameConfig.setValue('mode', 'wave_normal');
		unsubscribeFns.forEach((fn) => fn());
	});
</script>

<TogglePanel
	key={'stageSim'}
	title={translations[language].enemy_routes + ' v0.3'}
	size="subheading"
	isOpen={defaultOpenStageSim}
>
	<div
		class="grid grid-cols-[75px_1fr] md:grid-cols-[120px_1fr] divide-y divide-neutral-700 border-y border-neutral-700 text-sm md:text-base"
	>
		{#if mapConfig.branches}
			<p class="title {language}">{translations[language].sim_mode}</p>
			<div class="grid grid-cols-2">
				{#each ['wave_normal', 'wave_summons'] as key}
					<button
						class="flex justify-center items-center border-r border-neutral-700 font-semibold text-lg {simMode ===
						key
							? 'bg-gray-600'
							: 'brightness-50 sm:hover:brightness-75 sm:hover:bg-gray-500'} "
						onclick={() => GameConfig.setValue('mode', key)}
					>
						{translations[language][key]}
					</button>
				{/each}
			</div>
		{/if}
		{#if simMode === 'wave_normal'}
			{#if mapConfig.elite_mods}
				<p class="title {language}">{translations[language].operation_type}</p>
				{@render eliteMods?.()}
			{/if}
			{#if options?.length > 0}
				<p class="title {language}">{translations[language].hidden_options}</p>
				<div class="grid grid-cols-3 md:grid-cols-5">
					{#each options as { key, src, name }}
						{@const selected = hiddenGroups.includes(key)}
						<button
							class="flex flex-col items-center justify-center border border-neutral-700 p-1 {selected
								? 'bg-gray-600'
								: 'brightness-50 sm:hover:brightness-75 sm:hover:bg-gray-500'} "
							onclick={() =>
								(hiddenGroups = handleOptionsUpdate(
									hiddenGroups,
									key,
									rogueTopic,
									difficulty,
									otherStores
								))}
						>
							{#if src}
								<div class="flex items-center justify-center h-[56px]">
									<img {src} width="56" height="56" alt={name} class="" />
								</div>
							{/if}
							<span class="mt-1 text-xs md:text-sm">{name}</span>
						</button>
					{/each}
				</div>
			{/if}
			<p class="title {language}">{translations[language].permutation_mode}</p>
			<div class="grid grid-cols-2">
				{#each ['predefined', 'user-select'] as key}
					<button
						class="flex justify-center items-center border-r border-neutral-700 font-semibold text-lg {mode ===
						key
							? 'bg-gray-600'
							: 'brightness-50 sm:hover:brightness-75 sm:hover:bg-gray-500'} "
						onclick={() => (mode = key)}
					>
						{translations[language][key]}
					</button>
				{/each}
			</div>
			{#if mode === 'predefined'}
				{#if maxPermutations > 32 || permutations.length <= 0}
					<p class="title {language}"></p>
					<div class="flex justify-center items-center">
						{translations[language].max_perm_msg.replace('{perm}', `(${maxPermutations})`)}
					</div>
				{:else}
					{#if mapConfig.bonus?.type}
						<p class="title {language}"><img src={DLDGPN} width="60" alt="BONUS" /></p>
						<div class="grid grid-flow-col auto-cols-fr">
							{#each getBonusEnemies(rogueTopic) as key}
								<button
									class="flex justify-center items-center border-r border-neutral-700 font-semibold text-xl {bonusKey ===
									key
										? 'bg-slate-700'
										: 'brightness-50 sm:hover:brightness-75 sm:hover:bg-gray-500'} "
									onclick={() => (bonusKey = key)}
								>
									{#if key === ''}
										<div class="flex items-center justify-center w-[50px] h-[50px]">
											<div class="w-[46px] h-[46px] border"></div>
										</div>
									{:else}
										<img src="/images/enemy_icons/{key}.webp" width="55" alt="" />
									{/if}
								</button>
							{/each}
						</div>
					{/if}
					<p class="title {language}">{translations[language].enemy_count}</p>
					<DraggableContainer className="grid grid-flow-col auto-cols-[minmax(100px,1fr)]">
						{#each enemyCounts as count, i}
							<button
								class="flex justify-center items-center border-r border-neutral-700 font-semibold text-xl {selectedCountIndex ===
								i
									? 'bg-gray-600'
									: 'brightness-50 sm:hover:brightness-75 sm:hover:bg-gray-500'} "
								onclick={() => (selectedCountIndex = i)}
							>
								{count}
							</button>
						{/each}
					</DraggableContainer>
					{#if permutationsToShow.length > 0}
						<p class="title {language}">
							{translations[language].table_headers.enemy}{translations[language]
								.spacing}{translations[language].permutation}
						</p>
						<DraggableContainer className="grid grid-flow-col auto-cols-[minmax(120px,1fr)]">
							{#each permutationsToShow as _, i}
								<button
									class="flex justify-center items-center border-r border-neutral-700 font-semibold text-xl {selectedPermutationIdx ===
									i
										? 'bg-neutral-600'
										: 'brightness-50 sm:hover:brightness-75 sm:hover:bg-gray-500'} "
									onclick={() => (selectedPermutationIdx = i)}
								>
									{i + 1}
								</button>
							{/each}
						</DraggableContainer>
						<p class="title {language}">
							{translations[language].trap}{translations[language].spacing}{translations[language]
								.permutation}
						</p>
						<div class="flex justify-center items-center font-semibold">
							{translations[language].random}
						</div>
					{/if}
				{/if}
			{:else}
				<RandomGroupList
					bind:selectedPermGroups
					{eliteMode}
					{mapConfig}
					hiddenGroups={compiledHiddenGroups}
					{language}
				/>
			{/if}
		{/if}
	</div>
	{#await import('./StageSimulator/index.svelte').then(({ default: C }) => C) then StageSimulator}
		<StageSimulator
			{mapConfig}
			{enemies}
			{language}
			bind:randomSeeds
			waveData={parseWaves(
				mapConfig,
				mode === 'predefined'
					? maxPermutations > 32
						? 'random'
						: permutationsToShow[selectedPermutationIdx]?.permutation
					: selectedPermGroups,
				compiledHiddenGroups,
				eliteMode,
				randomSeeds,
				bonusKey
			)}
			timeline={generateWaveTimeline(
				mapConfig,
				compiledHiddenGroups,
				mode === 'predefined'
					? maxPermutations > 32
						? 'random'
						: permutationsToShow[selectedPermutationIdx]?.permutation
					: selectedPermGroups,
				eliteMode,
				randomSeeds,
				bonusKey
			)}
		/>
	{/await}
</TogglePanel>

<style>
	.title {
		display: flex;
		justify-content: center;
		align-items: center;
		text-align: center;
		min-height: 58px;
		padding: 0 6px;
		background-color: rgb(23, 23, 23);
	}
	.title.en {
		font-size: 0.875rem;
		text-transform: capitalize;
	}
	@media only screen and (max-width: 640px) {
		.title.en {
			font-size: 0.625rem;
			text-transform: capitalize;
			line-height: 1.5;
		}
	}
</style>
