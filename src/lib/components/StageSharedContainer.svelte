<script lang="ts">
	import { pruneExtraEnemies } from '$lib/functions/enemyHelpers';
	import {
		createPersistentStatModsSelector,
		materializeEnemyDisplayStats,
		normalizeEnemyDefinitions
	} from '$lib/functions/statHelpers';
	import { applyTrapMods, filterTraps } from '$lib/functions/trapHelpers';
	import { onDestroy } from 'svelte';
	import EliteToggle from './EliteToggle.svelte';
	import EnemyCount from './EnemyCount.svelte';
	import EnemyStatDisplay from './EnemyStatDisplay.svelte';
	import ModsCheck from './ModsCheck.svelte';
	import { GameConfig } from './StageSimulator/objects/GameConfig.svelte.js';
	import TrapContainer from './TrapContainer.svelte';

	let {
		language,
		traps,
		enemies,
		otherBuffsList,
		statMods,
		specialMods,
		mapConfig,
		eliteMode,
		runes,
		rogueTopic,
		selectedRelics,
		difficulty,
		otherStores = {},
		nav
	} = $props();

	const selectPersistentStatMods = createPersistentStatModsSelector();

	let normalizedEnemies = $derived(normalizeEnemyDefinitions(enemies, $specialMods));
	let displayEnemies = $derived(
		materializeEnemyDisplayStats(normalizedEnemies, $statMods, $specialMods)
	);
	let persistentStatMods = $derived(selectPersistentStatMods($statMods));
	let moddedTraps = $derived(applyTrapMods(traps, $statMods, $specialMods));
	$effect(() => {
		GameConfig.eliteMode = $eliteMode;
	});
	$effect(() => {
		GameConfig.specialMods = $specialMods;
	});

	$effect(() => {
		if (mapConfig) {
			eliteMode.set(false);
		}
	});

	onDestroy(() => {
		runes.set(null);
		eliteMode.set(false);
	});

	const promise = import('./EnemyWaves.svelte').then(({ default: C }) => C);
</script>

{#await promise then EnemyWaves}
	<EnemyWaves
		{mapConfig}
		{normalizedEnemies}
		{persistentStatMods}
		{language}
		eliteMode={$eliteMode}
		{rogueTopic}
		{otherStores}
		{difficulty}
		{specialMods}
	>
		{#snippet eliteMods()}
			<EliteToggle
				inWaveOptions={true}
				{eliteMode}
				{runes}
				mapNormalMods={mapConfig?.n_mods}
				mapEliteMods={mapConfig?.elite_mods}
				{rogueTopic}
				{selectedRelics}
				stageId={mapConfig?.levelId}
			/>
		{/snippet}
	</EnemyWaves>
{/await}
<TrapContainer
	{language}
	traps={filterTraps(moddedTraps)}
	{otherBuffsList}
	specialMods={$specialMods}
	{mapConfig}
/>
<ModsCheck {language} enemies={displayEnemies} {mapConfig} />
<EnemyCount
	{mapConfig}
	enemies={pruneExtraEnemies(displayEnemies, mapConfig?.levelId)}
	eliteMode={$eliteMode}
	{language}
	{rogueTopic}
/>
<div class="sm:px-6">
	<EliteToggle
		{eliteMode}
		{runes}
		mapNormalMods={mapConfig?.n_mods}
		mapEliteMods={mapConfig?.elite_mods}
		{rogueTopic}
		{selectedRelics}
		stageId={mapConfig?.levelId}
	/>
	<EnemyStatDisplay
		enemies={pruneExtraEnemies(displayEnemies, mapConfig?.levelId)}
		{language}
		{statMods}
		{specialMods}
		{otherBuffsList}
		{mapConfig}
	/>
	<div id="stageNav" class="mt-8 sm:mt-16 scroll-mt-20">
		{@render nav?.()}
	</div>
</div>
