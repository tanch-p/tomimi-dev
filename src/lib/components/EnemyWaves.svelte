<script lang="ts">
	import { getTranslations } from '$lib/functions/languageHelpers';
	import type { Language, RogueTopic } from '$lib/types';
	import TogglePanel from './TogglePanel.svelte';
	import {
		buildWaveScenario,
		compileHiddenGroups,
		getBaseCount,
		getBonusEnemies,
		getEnemyCountPermutations,
		getOptions,
		handleOptionsUpdate
	} from '$lib/functions/waveHelpers';
	import DraggableContainer from './DraggableContainer.svelte';
	import DLDGPN from '$lib/images/is/DLDGPN.webp';
	import RandomGroupList from './RandomGroupList.svelte';
	import { defaultOpenStageSim } from '../../routes/stores';
	import { GameConfig, type SimulationMode } from './StageSimulator/objects/GameConfig.svelte.js';
	import { onDestroy } from 'svelte';

	interface Props {
		mapConfig: any;
		enemies: any;
		rogueTopic: RogueTopic;
		language: Language;
		eliteMode: boolean;
		otherStores: any;
		specialMods: any;
		difficulty: number;
		eliteMods?: import('svelte').Snippet;
	}

	type PermutationSelection = Record<string, Record<string, number>>;
	type CountedPermutation = {
		count: number;
		permutation: PermutationSelection;
	};

	let {
		mapConfig,
		enemies,
		rogueTopic,
		language,
		eliteMode,
		otherStores,
		specialMods,
		difficulty,
		eliteMods
	}: Props = $props();

	let hiddenGroups: string[] = $state([]),
		selectedPermGroups: PermutationSelection = $state({}),
		selectedEnemyCount: number | undefined = $state(),
		selectedPermutationSignature: string | undefined = $state(),
		randomSeeds = $state(Array.from({ length: 50 }, () => Math.random())),
		resetGeneration = $state(0),
		mode = $state('predefined'),
		bonusKey = $state('');
	let simMode = $derived(GameConfig.mode);

	const permutationSignature = (permutation: unknown) => JSON.stringify(permutation);
	const simulationModes: SimulationMode[] = ['wave_normal', 'wave_summons'];
	const stageSimulatorPromise = import('./StageSimulator/index.svelte').then(
		({ default: component }) => component
	);

	let compiledHiddenGroups: string[] = $derived(
		compileHiddenGroups(hiddenGroups, eliteMode, mapConfig, rogueTopic, $specialMods)
	);
	let baseCount = $derived(getBaseCount(mapConfig, eliteMode));
	let options = $derived(getOptions(mapConfig, rogueTopic, difficulty, language));
	let maxPermutations = $derived(
		eliteMode ? mapConfig?.ELITE.max_permutations : mapConfig?.NORMAL.max_permutations
	);
	let permutations: CountedPermutation[] = $derived(
		getEnemyCountPermutations(mapConfig, compiledHiddenGroups, eliteMode, bonusKey, baseCount)
	);
	let enemyCounts = $derived([...new Set(permutations.map(({ count }) => count))]);
	let activeEnemyCount = $derived(
		selectedEnemyCount !== undefined && enemyCounts.includes(selectedEnemyCount)
			? selectedEnemyCount
			: enemyCounts[0]
	);
	let permutationsToShow = $derived(permutations.filter(({ count }) => count === activeEnemyCount));
	let activePermutationSignature = $derived(
		selectedPermutationSignature !== undefined &&
			permutationsToShow.some(
				({ permutation }) => permutationSignature(permutation) === selectedPermutationSignature
			)
			? selectedPermutationSignature
			: permutationsToShow[0]
				? permutationSignature(permutationsToShow[0].permutation)
				: undefined
	);
	let selectedWaveGroups = $derived(
		mode === 'predefined'
			? maxPermutations > 32
				? 'random'
				: permutationsToShow.find(
						({ permutation }) => permutationSignature(permutation) === activePermutationSignature
					)?.permutation
			: selectedPermGroups
	);
	let simulatorScenario = $derived(
		buildWaveScenario(
			mapConfig,
			selectedWaveGroups,
			compiledHiddenGroups,
			eliteMode,
			randomSeeds,
			bonusKey,
			resetGeneration
		)
	);

	function selectEnemyCount(count: number) {
		selectedEnemyCount = count;
		selectedPermutationSignature = undefined;
	}

	function selectPermutation(permutation: unknown) {
		selectedPermutationSignature = permutationSignature(permutation);
	}

	function selectBonusEnemy(key: string) {
		bonusKey = key;
		selectedPermutationSignature = undefined;
	}

	function nameForBonusEnemy(key: string) {
		return key || 'No bonus enemy';
	}

	function toggleHiddenGroup(key: string) {
		hiddenGroups = handleOptionsUpdate(hiddenGroups, key, rogueTopic, difficulty, otherStores);
		selectedPermutationSignature = undefined;
	}

	function resetSimulator() {
		randomSeeds = Array.from({ length: 50 }, () => Math.random());
		resetGeneration++;
	}

	$effect(() => {
		if (mapConfig) {
			selectedEnemyCount = undefined;
			selectedPermutationSignature = undefined;
			bonusKey = '';
			GameConfig.mode = 'wave_normal';
		}
	});

	onDestroy(() => {
		GameConfig.mode = 'wave_normal';
	});
</script>

<TogglePanel
	key={'stageSim'}
	title={getTranslations(language).enemy_routes + ' v0.5'}
	size="subheading"
	isOpen={defaultOpenStageSim}
>
	<div
		class="grid grid-cols-[75px_1fr] md:grid-cols-[120px_1fr] divide-y divide-neutral-700 border-y border-neutral-700 text-sm md:text-base"
	>
		{#if mapConfig?.branches}
			<p class="title {language}">{getTranslations(language).sim_mode}</p>
			<div class="grid grid-cols-2">
				{#each simulationModes as key}
					<button
						class="flex justify-center items-center border-r border-neutral-700 font-semibold text-lg {simMode ===
						key
							? 'bg-gray-600'
							: 'brightness-50 sm:hover:brightness-75 sm:hover:bg-gray-500'} "
						onclick={() => (GameConfig.mode = key)}
					>
						{getTranslations(language)[key]}
					</button>
				{/each}
			</div>
		{/if}
		{#if simMode === 'wave_normal'}
			{#if mapConfig?.elite_mods}
				<p class="title {language}">{getTranslations(language).operation_type}</p>
				{@render eliteMods?.()}
			{/if}
			{#if options?.length > 0}
				<p class="title {language}">{getTranslations(language).hidden_options}</p>
				<div class="grid grid-cols-3 md:grid-cols-5">
					{#each options as { key, src, name }}
						{@const selected = hiddenGroups.includes(key)}
						<button
							class="flex flex-col items-center justify-center border border-neutral-700 p-1 {selected
								? 'bg-gray-600'
								: 'brightness-50 sm:hover:brightness-75 sm:hover:bg-gray-500'} "
							onclick={() => toggleHiddenGroup(key)}
							aria-pressed={selected}
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
			<p class="title {language}">{getTranslations(language).permutation_mode}</p>
			<div class="grid grid-cols-2">
				{#each ['predefined', 'user-select'] as key}
					<button
						class="flex justify-center items-center border-r border-neutral-700 font-semibold text-lg {mode ===
						key
							? 'bg-gray-600'
							: 'brightness-50 sm:hover:brightness-75 sm:hover:bg-gray-500'} "
						onclick={() => (mode = key)}
					>
						{getTranslations(language)[key]}
					</button>
				{/each}
			</div>
			{#if mode === 'predefined'}
				{#if maxPermutations > 32 || permutations.length <= 0}
					<p class="title {language}"></p>
					<div class="flex justify-center items-center">
						{getTranslations(language).max_perm_msg.replace('{perm}', `(${maxPermutations})`)}
					</div>
				{:else}
					{#if mapConfig?.bonus?.type}
						<p class="title {language}"><img src={DLDGPN} width="60" alt="BONUS" /></p>
						<div class="grid grid-flow-col auto-cols-fr">
							{#each getBonusEnemies(rogueTopic) as key}
								<button
									id={`bonus-enemy-${key || 'none'}`}
									class="flex justify-center items-center border-r border-neutral-700 font-semibold text-xl {bonusKey ===
									key
										? 'bg-slate-700'
										: 'brightness-50 sm:hover:brightness-75 sm:hover:bg-gray-500'} "
									onclick={() => selectBonusEnemy(key)}
									aria-pressed={bonusKey === key}
									aria-label={nameForBonusEnemy(key)}
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
					<p class="title {language}">{getTranslations(language).enemy_count}</p>
					<DraggableContainer className="grid grid-flow-col auto-cols-[minmax(100px,1fr)]">
						{#each enemyCounts as count}
							<button
								class="flex justify-center items-center border-r border-neutral-700 font-semibold text-xl {activeEnemyCount ===
								count
									? 'bg-gray-600'
									: 'brightness-50 sm:hover:brightness-75 sm:hover:bg-gray-500'} "
								onclick={() => selectEnemyCount(count)}
								aria-pressed={activeEnemyCount === count}
							>
								{count}
							</button>
						{/each}
					</DraggableContainer>
					{#if permutationsToShow.length > 0}
						<p class="title {language}">
							{getTranslations(language).table_headers.enemy}{getTranslations(language)
								.spacing}{getTranslations(language).permutation}
						</p>
						<DraggableContainer className="grid grid-flow-col auto-cols-[minmax(120px,1fr)]">
							{#each permutationsToShow as { permutation }, i}
								{@const signature = permutationSignature(permutation)}
								<button
									class="flex justify-center items-center border-r border-neutral-700 font-semibold text-xl {activePermutationSignature ===
									signature
										? 'bg-neutral-600'
										: 'brightness-50 sm:hover:brightness-75 sm:hover:bg-gray-500'} "
									onclick={() => selectPermutation(permutation)}
									aria-pressed={activePermutationSignature === signature}
								>
									{i + 1}
								</button>
							{/each}
						</DraggableContainer>
						<p class="title {language}">
							{getTranslations(language).trap}{getTranslations(language).spacing}{getTranslations(
								language
							).permutation}
						</p>
						<div class="flex justify-center items-center font-semibold">
							{getTranslations(language).random}
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
	{#await stageSimulatorPromise then StageSimulator}
		<StageSimulator
			{mapConfig}
			{enemies}
			{language}
			requestReset={resetSimulator}
			scenario={simulatorScenario}
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
