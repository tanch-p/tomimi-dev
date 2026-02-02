<script lang="ts">
	import type { Language, MapConfig } from '$lib/types';
	import { GameConfig } from './objects/GameConfig';
	import { page } from '$app/stores';
	import { Game } from './objects/Game';
	import { setLocalStorage } from '$lib/functions/lib';
	import translations from '$lib/translations.json';
	import { onDestroy, onMount } from 'svelte';

	export let game: Game, mapConfig: MapConfig;
	let language: Language;
	$: language = $page.data.language;

	let showTimeline = true;
	const maxFrustumSize = 1500;
	const minFrustumSize = 500;
	let zoomSize = (GameConfig.FrustumSize + minFrustumSize) / maxFrustumSize;
	let currentWaveIndex = 0;
	let stagePhaseIndex = 0;

	const stageOptions = {
		'level_rogue4_d-1': [
			{ wave: 0, display: '1' },
			{ wave: 4, display: '2' }
		],
		'level_rogue4_d-2': [
			{ wave: 0, display: '1' },
			{ wave: 4, display: '2' }
		],
		'level_rogue4_d-3': [
			{ wave: 0, display: '1' },
			{ wave: 4, display: '2' }
		],
		'level_rogue4_d-b': [
			{ wave: 0, display: '1' },
			{ wave: 4, display: '2' }
		],
		'level_rogue4_b-7': [
			{ wave: 0, display: '1' },
			{ wave: 2, display: '2' }
		],
		'level_rogue4_b-8': [
			{ wave: 1, display: '1' },
			{ wave: 3, display: '2' },
			{ wave: 5, display: '3' }
		]
	};

	const options = [
		{
			key: 'showAllRange',
			type: 'key',
			icon: '🎯',
			texts: {
				zh: '显示攻击范围',
				ja: '攻撃範囲表示',
				en: 'Show Attack Range'
			},
			fn: (key) => {
				GameConfig[key] = !GameConfig[key];
				setLocalStorage('showAllRange', GameConfig[key] ? 1 : 0);
				game.gameManager.enemiesOnMap
					.filter((enemy) => enemy.alive)
					.forEach((enemy) => {
						if (enemy.atkRangeMesh) {
							enemy.atkRangeMesh.visible = GameConfig.showAllRange;
						}
						enemy.skillRangeMeshes.forEach((mesh) => (mesh.visible = GameConfig.showAllRange));
					});
			}
		},
		{
			key: 'showAllTimers',
			type: 'key',
			icon: '🕓',
			texts: { zh: '显示待机倒数', ja: '待機残り時間表示', en: 'Show Wait Timer' },
			fn: (key) => {
				GameConfig[key] = !GameConfig[key];
				setLocalStorage('showAllTimers', GameConfig[key] ? 1 : 0);
				game.gameManager.countdownManager.toggleAllCountdowns(GameConfig[key]);
			}
		},
		{
			key: 'showTimeline',
			type: 'store',
			icon: '',
			texts: { zh: '显示出怪顺序', ja: '敵出現表表示', en: 'Show Enemy Spawn Timeline' },
			fn: () => {
				GameConfig.showTimeline.update((v) => {
					setLocalStorage('showTimeline', !v ? 1 : 0);
					return !v;
				});
			}
		},
		{
			key: 'cameraLock',
			type: 'key',
			icon: '🎥',
			texts: {
				zh: '锁定镜头',
				ja: 'カメラロック',
				en: 'Lock Camera'
			},
			fn: () => {
				GameConfig.cameraLock = !GameConfig.cameraLock;
			}
		}
	];
	GameConfig.showTimeline.subscribe((v) => (showTimeline = v));

	function updateCamera(v) {
		zoomSize = parseFloat(v.target.value);
		GameConfig.FrustumSize = 900 + 900 * (1.5 - (zoomSize + 0.5));
		game.onWindowResize();
	}

	$: lookup = { showTimeline };

	const unsubscribeFns = [];
	onMount(() => {
		unsubscribeFns.push(
			GameConfig.subscribe('currentWaveIndex', (value) => {
				currentWaveIndex = value;
			})
		);
		unsubscribeFns.push(
			GameConfig.subscribe('stagePhaseIndex', (value) => {
				stagePhaseIndex = value;
			})
		);
	});
	onDestroy(() => {
		unsubscribeFns.forEach((fn) => fn());
	});
</script>

<p class="text-xs">
	※{{
		zh: '这只是根据数据的不完整再现，可能与实际游戏里情况不同。',
		ja: 'これはあくまでデータからの不完全な再現で、実際の動きとは異なる場合があります。',
		en: 'This is only an rough simulation from the data, actual movement may differ from the actual game.'
	}[language]}
</p>
<div class="flex flex-col md:flex-row md:flex-wrap md:justify-end gap-4 py-4 px-3">
	{#each options as { key, texts, icon, type, fn }}
		{@const value = type === 'store' ? lookup[key] : GameConfig[key]}
		<button
			class="grid grid-cols-[1fr_30px] gap-x-1 rounded-sm px-2 py-1.5 w-max {value
				? 'bg-gray-500'
				: 'bg-gray-700 hover:bg-gray-600'} "
			on:click={() => fn(key)}
		>
			<span>{icon} {texts[language]}: </span>
			<span class="text-center">{value ? 'YES' : 'NO'}</span>
		</button>
	{/each}
	<button
		class="bg-gray-500 rounded-sm px-2 py-1.5 w-max active:bg-gray-600"
		on:click={() => game && game.onWindowResize()}
	>
		{translations[language].adjust_screen}
	</button>
</div>

<div class="flex items-center md:justify-center gap-x-2.5 ml-3 mb-1.5">
	<label for="volume">{translations[language].zoom}</label>
	<input
		bind:value={zoomSize}
		type="range"
		id="zoom"
		name="zoom"
		min={0.5}
		max={1.5}
		step="0.05"
		on:input={updateCamera}
		class="w-[150px] md:w-[200px] h-1.5 bg-gray-300 rounded-lg appearance-none cursor-pointer"
	/>
	<span class="w-[50px]">{zoomSize.toFixed(2)}x</span>
</div>
{#if stageOptions[mapConfig?.levelId]}
	<div class="flex justify-center gap-x-3 mb-2">
		{#each stageOptions[mapConfig?.levelId] as { wave, display }, idx}
			<button
				class="rounded-sm px-2 py-1.5 {stagePhaseIndex == idx
					? 'bg-gray-500'
					: 'bg-gray-700 hover:bg-gray-600'}"
				on:click={() => {
					GameConfig.setValue('stagePhaseIndex', idx);
					GameConfig.setValue('currentWaveIndex', wave);
					game.softReset(false);
				}}
			>
				{translations[language].mapstate_prefix}{display}{translations[language].mapstate_suffix}
			</button>
		{/each}
	</div>
{/if}
