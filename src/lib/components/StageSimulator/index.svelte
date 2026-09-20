<script lang="ts">
	import type { Enemy, Language, MapConfig } from '$lib/types';
	import { onDestroy, onMount, tick } from 'svelte';
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
	import { obstacleEventStore, type ObstacleEventSnapshot } from './stores/obstacleEvents';

	export let timeline,
		mapConfig: MapConfig,
		waveData,
		language: Language,
		enemies: Enemy[],
		randomSeeds;

	let simMode = 'wave_normal',
		branchKey = null,
		branchIndex = -1;
	let assetManager = AssetManager.getInstance(),
		canvasElement: HTMLCanvasElement,
		game: Game,
		simulatedData,
		isSimulationRunning = false,
		assetsReady = false,
		simulationGeneration = 0,
		simulationInputVersion = 0,
		lastSimulationRequestKey = '',
		latestObstacleSnapshot: ObstacleEventSnapshot = obstacleEventStore.getSnapshot(),
		initialSimulationWaveIndex = 0,
		assetLoadGeneration = 0,
		isDestroyed = false;

	$: if (timeline) {
		resetGame();
	}
	$: simulationInputsChanged(mapConfig, waveData, enemies, timeline, randomSeeds);

	function simulationInputsChanged(...inputs: unknown[]) {
		if (inputs.some((input) => !input)) return;
		simulationInputVersion++;
		requestSimulation(latestObstacleSnapshot);
	}

	function resetGame() {
		if (game && assetsReady && !isDestroyed) {
			game.reset(mapConfig, waveData, enemies);
			initialSimulationWaveIndex = GameConfig.currentWaveIndex;
		}
	}

	function simulationRequestKey(snapshot: ObstacleEventSnapshot) {
		return JSON.stringify([
			simulationInputVersion,
			GameConfig.stagePhaseIndex,
			initialSimulationWaveIndex,
			snapshot.levelId,
			snapshot.events
		]);
	}

	function requestSimulation(snapshot: ObstacleEventSnapshot, force = false) {
		if (!assetsReady) return;
		const requestKey = simulationRequestKey(snapshot);
		if (!force && requestKey === lastSimulationRequestKey) return;
		lastSimulationRequestKey = requestKey;
		void rerunSimulation(snapshot);
	}

	function simulationSeed(levelId: string) {
		let hash = 2166136261;
		for (let i = 0; i < levelId.length; i++) {
			hash ^= levelId.charCodeAt(i);
			hash = Math.imul(hash, 16777619);
		}
		return hash >>> 0;
	}

	async function rerunSimulation(snapshot: ObstacleEventSnapshot) {
		if (!assetsReady || !mapConfig || !waveData || !enemies) return;
		const generation = ++simulationGeneration;
		isSimulationRunning = true;
		await tick();

		try {
			const result = await getSimulatedData(mapConfig, waveData, enemies, {
				obstacleEvents: snapshot,
				mode: 'wave_normal',
				currentWaveIndex: initialSimulationWaveIndex,
				stagePhaseIndex: GameConfig.stagePhaseIndex,
				eliteMode: GameConfig.eliteMode,
				specialMods: GameConfig.specialMods,
				steeringEnabled: GameConfig.steeringEnabled,
				seed: simulationSeed(mapConfig.levelId),
				shouldCancel: () => generation !== simulationGeneration
			});

			if (generation === simulationGeneration) simulatedData = result;
		} catch (error) {
			console.error('Failed to rerun stage simulation', error);
		} finally {
			if (generation === simulationGeneration) isSimulationRunning = false;
		}
	}

	function handleObstacleEvents(snapshot: ObstacleEventSnapshot) {
		latestObstacleSnapshot = snapshot;
		requestSimulation(snapshot);
	}

	async function loadGame(mapConfig) {
		const generation = ++assetLoadGeneration;
		assetsReady = false;
		simulatedData = undefined;
		simulationGeneration++;
		if (game) {
			game.stop();
		}

		const loaded = await assetManager.loadAssets(
			mapConfig,
			() => !isDestroyed && generation === assetLoadGeneration
		);
		if (!loaded || isDestroyed || generation !== assetLoadGeneration) return;

		if (!game) {
			game = new Game(canvasElement, mapConfig, waveData, enemies);
			GameConfig.state = 'ready';
		} else {
			assetsReady = true;
			resetGame();
		}
		initialSimulationWaveIndex = GameConfig.currentWaveIndex;
		assetsReady = true;
		requestSimulation(latestObstacleSnapshot, true);
	}

	const unsubscribeFns = [];
	onMount(() => {
		unsubscribeFns.push(obstacleEventStore.subscribe(handleObstacleEvents));
		unsubscribeFns.push(
			GameConfig.subscribe('mode', (mode) => {
				simMode = mode;
				game && assetsReady && !isDestroyed && game.softReset(false);
			})
		);
		unsubscribeFns.push(
			GameConfig.subscribe('stagePhaseIndex', () => {
				queueMicrotask(() => {
					initialSimulationWaveIndex = GameConfig.currentWaveIndex;
					requestSimulation(latestObstacleSnapshot);
				});
			})
		);
	});

	onDestroy(() => {
		isDestroyed = true;
		assetLoadGeneration++;
		assetsReady = false;
		simulationGeneration++;
		unsubscribeFns.forEach((fn) => fn());
		if (game) {
			game.cleanup();
		}
		simulatedData = undefined;
		latestObstacleSnapshot = obstacleEventStore.getSnapshot();
		assetManager.cleanup();
	});
</script>

<Settings {game} {mapConfig} />
<div class="relative mt-4 md:mt-1.5 max-w-full overflow-hidden">
	{#await loadGame(mapConfig)}
		<LoadingScreen />
	{:then}
		{#if simMode === 'wave_summons' && mapConfig?.branches}
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
			{isSimulationRunning}
			bind:randomSeeds
			{game}
			{mapConfig}
			initialCost={mapConfig?.initialCost}
			{language}
			count={timeline?.count}
			maxCost={mapConfig?.maxCost}
		/>
	{:catch error}
		<p class="py-8 text-center text-red-300">
			Failed to load the stage simulator:<br />{error?.message ?? String(error)}
		</p>
	{/await}
	<canvas bind:this={canvasElement} />
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
