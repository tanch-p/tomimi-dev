<script lang="ts">
	import { pruneExtraEnemies } from '$lib/functions/lib';
	import { applyMods } from '$lib/functions/statHelpers';
	import { applyTrapMods, filterTraps } from '$lib/functions/trapHelpers';
	import { onDestroy } from 'svelte';
	import EliteToggle from './EliteToggle.svelte';
	import EnemyCount from './EnemyCount.svelte';
	import EnemyStatDisplay from './EnemyStatDisplay.svelte';
	import ModsCheck from './ModsCheck.svelte';
	import { GameConfig } from './StageSimulator/objects/GameConfig';
	import TrapContainer from './TrapContainer.svelte';

	export let language,
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
		otherStores = {};

	$: moddedEnemies = applyMods(enemies, $statMods, $specialMods);
	$: moddedTraps = applyTrapMods(traps, $statMods, $specialMods);
	eliteMode.subscribe((v) => (GameConfig.eliteMode = v));
	specialMods.subscribe((v) => (GameConfig.specialMods = v));

	$: if (mapConfig) {
		eliteMode.set(false);
	}

	onDestroy(() => {
		runes.set(null);
		eliteMode.set(false);
	});

	const promise = import('./EnemyWaves.svelte').then(({ default: C }) => C);
</script>

{#await promise then EnemyWaves}
	<EnemyWaves
		{mapConfig}
		enemies={moddedEnemies}
		{language}
		eliteMode={$eliteMode}
		{rogueTopic}
		{otherStores}
		{difficulty}
	>
		<EliteToggle
			slot="eliteMods"
			inWaveOptions={true}
			{eliteMode}
			{runes}
			mapNormalMods={mapConfig?.n_mods}
			mapEliteMods={mapConfig?.elite_mods}
			{rogueTopic}
			{selectedRelics}
			stageId={mapConfig?.levelId}
		/>
	</EnemyWaves>
{/await}
<TrapContainer
	{language}
	traps={filterTraps(moddedTraps)}
	{otherBuffsList}
	specialMods={$specialMods}
	{mapConfig}
/>
<ModsCheck {language} enemies={moddedEnemies} {mapConfig} />
<EnemyCount
	{mapConfig}
	enemies={pruneExtraEnemies(moddedEnemies, mapConfig?.levelId)}
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
		enemies={pruneExtraEnemies(moddedEnemies, mapConfig?.levelId)}
		{language}
		{statMods}
		{specialMods}
		{otherBuffsList}
		{mapConfig}
	/>
	<div id="stageNav" class="mt-8 sm:mt-16 scroll-mt-20">
		<slot name="nav" />
	</div>
</div>
