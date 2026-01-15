<script lang="ts">
	import { run } from 'svelte/legacy';

	import type { Enemy, Language, MapConfig } from '$lib/types';
	import { onDestroy, onMount } from 'svelte';
	import { Game } from './objects/Game';
	import { AssetManager } from './objects/AssetManager';
	import LoadingScreen from './LoadingScreen.svelte';
	import Interface from './Interface.svelte';
	import SpawnTimeView from './SpawnTimeView.svelte';
	import Settings from './Settings.svelte';
	import { GameConfig } from './objects/GameConfig';
	import { getSimulatedData } from './functions/Simulator';
	import BranchSummons from './BranchSummons.svelte';
	import { generateBranchTimeline } from '$lib/functions/waveHelpers';

	interface Props {
		timeline: any;
		mapConfig: MapConfig;
		waveData: any;
		language: Language;
		enemies: Enemy[];
		randomSeeds: any;
	}

	let {
		timeline,
		mapConfig,
		waveData,
		language,
		enemies,
		randomSeeds = $bindable()
	}: Props = $props();

	let simMode = $state('wave_normal'),
		branchKey = $state(null),
		branchIndex = $state(-1);
	let assetManager = AssetManager.getInstance(),
		canvasElement: HTMLCanvasElement = $state(),
		game: Game = $state(),
		simulatedData = $state();


	function resetGame() {
		if (game) {
			game.reset(mapConfig, waveData, enemies);
		}
	}

	async function loadGame(mapConfig) {
		if (game) {
			game.stop();
		}

		await assetManager.loadAssets(mapConfig);
		assetManager.texturesLoaded = true;
		resetGame();
		if (!game) {
			game = new Game(canvasElement, mapConfig, waveData, enemies);
			GameConfig.state = 'ready';
		}
	}

	const unsubscribeFns = [];
	onMount(() => {
		unsubscribeFns.push(
			GameConfig.subscribe('mode', (mode) => {
				simMode = mode;
				game && assetManager.texturesLoaded && game.softReset(false);
			})
		);
	});

	onDestroy(() => {
		unsubscribeFns.forEach((fn) => fn());
		assetManager.cleanup();
		assetManager.texturesLoaded = false;
		if (game) {
			game.cleanup();
		}
	});
	run(() => {
		if (timeline) {
			resetGame();
		}
	});
	run(() => {
		if (waveData) {
			simulatedData = getSimulatedData(mapConfig, waveData, enemies);
		}
	});
</script>

<Settings {game} {mapConfig} />
<div class="relative mt-4 md:mt-1.5 max-w-full overflow-hidden">
	{#await loadGame(mapConfig)}
		<LoadingScreen />
	{:then}
		{#if simMode === 'wave_summons' && mapConfig.branches}
			<BranchSummons bind:branchKey bind:branchIndex {language} {game} {mapConfig} />
		{/if}
		<SpawnTimeView
			{branchKey}
			{branchIndex}
			waves={simMode === 'wave_summons'
				? generateBranchTimeline(mapConfig, branchKey, branchIndex)
				: timeline.waves}
			{mapConfig}
		/>
		<Interface
			{simulatedData}
			bind:randomSeeds
			{game}
			initialCost={mapConfig.initialCost}
			{language}
			count={timeline?.count}
			maxCost={mapConfig.maxCost}
		/>
		<!-- {:catch error} -->
		<!-- <p class="text-center">An error occured while loading: <br />{error.message}</p> -->
	{/await}
	<canvas bind:this={canvasElement}></canvas>
</div>

<style>
	canvas {
		width: 100%;
		height: 100%;
		display: block;
		margin: 0 auto;
		touch-action: none; /* Prevents default touch behaviors on mobile */
	}
</style>
