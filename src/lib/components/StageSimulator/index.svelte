<script lang="ts">
	import type { Enemy, Language, MapConfig } from '$lib/types';
	import type { WaveScenario } from '$lib/functions/waveHelpers';
	import { onDestroy, onMount, tick, untrack } from 'svelte';
	import { Game, type GameScenario } from './objects/Game';
	import { AssetManager } from './objects/AssetManager';
	import LoadingScreen from './LoadingScreen.svelte';
	import Interface from './Interface.svelte';
	import SpawnTimeView from './SpawnTimeView.svelte';
	import Settings from './Settings.svelte';
	import { GameConfig } from './objects/GameConfig.svelte.js';
	import { getSimulatedData } from './functions/Simulator';
	import BranchSummons from './BranchSummons.svelte';
	import { generateBranchTimeline } from '$lib/functions/waveHelpers';
	import { obstacleEventStore, type ObstacleEventSnapshot } from './stores/obstacleEvents';

	interface Props {
		scenario: WaveScenario;
		mapConfig: MapConfig;
		language: Language;
		enemies: Enemy[];
		requestReset: () => void;
	}

	let { scenario, mapConfig, language, enemies, requestReset }: Props = $props();
	let waveData = $derived(scenario.waveData);
	let timeline = $derived(scenario.timeline);

	let simMode = $derived(GameConfig.mode);
	let branchKey = $state(''),
		branchIndex = $state(-1);
	let assetManager = AssetManager.getInstance(),
		canvasElement: HTMLCanvasElement | undefined = $state(),
		game: Game | undefined = $state(),
		simulatedData = $state(),
		assetLoadPromise: Promise<void> | null = $state.raw(null),
		isSimulationRunning = $state(false),
		assetsReady = false,
		simulationGeneration = 0,
		simulationInputVersion = 0,
		lastSimulationRequestKey = '',
		latestObstacleSnapshot: ObstacleEventSnapshot = obstacleEventStore.getSnapshot(),
		initialSimulationWaveIndex = 0,
		assetLoadGeneration = 0,
		isDestroyed = false;

	function simulationInputsChanged(...inputs: unknown[]) {
		if (inputs.some((input) => !input)) return;
		simulationInputVersion++;
		requestSimulation(latestObstacleSnapshot);
	}

	function resetGame(nextScenario: GameScenario) {
		if (game && assetsReady && !isDestroyed) {
			game.replaceScenario(nextScenario);
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

	async function loadGame(mapConfig: MapConfig) {
		const generation = ++assetLoadGeneration;
		assetsReady = false;
		simulatedData = undefined;
		simulationGeneration++;
		if (!canvasElement) throw new Error('The simulator canvas is unavailable.');
		if (game) {
			game.stop();
		}

		const loaded = await assetManager.loadAssets(
			mapConfig,
			() => !isDestroyed && generation === assetLoadGeneration
		);
		if (!loaded || isDestroyed || generation !== assetLoadGeneration) return;

		if (!game) {
			game = new Game(canvasElement, {
				config: mapConfig,
				waveData,
				enemies,
				revision: scenario.revision
			});
			GameConfig.state = 'ready';
		} else {
			assetsReady = true;
			resetGame({ config: mapConfig, waveData, enemies, revision: scenario.revision });
		}
		initialSimulationWaveIndex = GameConfig.currentWaveIndex;
		assetsReady = true;
		requestSimulation(latestObstacleSnapshot, true);
	}

	const unsubscribeFns: Array<() => void> = [];
	onMount(() => {
		unsubscribeFns.push(obstacleEventStore.subscribe(handleObstacleEvents));
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
	$effect(() => {
		const currentMapConfig = mapConfig;
		assetLoadPromise = untrack(() => loadGame(currentMapConfig));
	});
	$effect(() => {
		const currentScenario = scenario;
		const currentMapConfig = mapConfig;
		const currentEnemies = enemies;
		if (currentScenario.timeline) {
			untrack(() =>
				resetGame({
					config: currentMapConfig,
					waveData: currentScenario.waveData,
					enemies: currentEnemies,
					revision: currentScenario.revision
				})
			);
		}
	});
	$effect(() => {
		simulationInputsChanged(mapConfig, scenario.revision, enemies);
	});
	let previousMode = GameConfig.mode;
	$effect(() => {
		const mode = GameConfig.mode;
		if (mode === previousMode) return;
		previousMode = mode;
		untrack(() => {
			if (game && assetsReady && !isDestroyed) game.restart({ resetWaveIndex: false });
		});
	});
	let previousStagePhaseIndex = GameConfig.stagePhaseIndex;
	$effect(() => {
		const stagePhaseIndex = GameConfig.stagePhaseIndex;
		if (stagePhaseIndex === previousStagePhaseIndex) return;
		previousStagePhaseIndex = stagePhaseIndex;
		queueMicrotask(() => {
			initialSimulationWaveIndex = GameConfig.currentWaveIndex;
			requestSimulation(latestObstacleSnapshot);
		});
	});
</script>

<Settings {game} {mapConfig} />
<div class="relative mt-4 md:mt-1.5 max-w-full overflow-hidden">
	{#if assetLoadPromise}
		{#await assetLoadPromise}
			<LoadingScreen />
		{:then}
			{#if game && timeline}
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
					{requestReset}
					{game}
					{mapConfig}
					initialCost={mapConfig?.initialCost}
					{language}
					count={timeline?.count}
					maxCost={mapConfig?.maxCost}
				/>
			{/if}
		{:catch error}
			<p class="py-8 text-center text-red-300">
				Failed to load the stage simulator:<br />{error?.message ?? String(error)}
			</p>
		{/await}
	{:else}
		<LoadingScreen />
	{/if}
	<canvas bind:this={canvasElement} data-scenario-revision={scenario.revision}></canvas>
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
