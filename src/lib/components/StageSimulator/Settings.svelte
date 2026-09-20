<script lang="ts">
	import { getTranslations } from '$lib/functions/languageHelpers';
	import type { Language, MapConfig } from '$lib/types';
	import { GameConfig } from './objects/GameConfig';
	import { page } from '$app/state';
	import { Game } from './objects/Game';
	import { setLocalStorage } from '$lib/functions/storageHelpers';
	import { onDestroy, onMount } from 'svelte';

	interface Props {
		game?: Game;
		mapConfig: MapConfig;
	}
	type ConfigKey = 'showAllRange' | 'showAllTimers' | 'cameraLock';

	let { game, mapConfig }: Props = $props();
	let language: Language = $derived(page.data.language);

	let showTimeline = $state(true);
	let configValues = $state({
		showAllRange: GameConfig.showAllRange,
		showAllTimers: GameConfig.showAllTimers,
		cameraLock: GameConfig.cameraLock
	});
	const maxFrustumSize = 1500;
	const minFrustumSize = 500;
	let zoomSize = $state((GameConfig.FrustumSize + minFrustumSize) / maxFrustumSize);
	let currentWaveIndex = 0;
	let stagePhaseIndex = $state(0);

	const DEFAULT_STAGE_WAVES = [0, 4];

	const stageOptions: Record<string, number[]> = {
		...Object.fromEntries(
			[
				'level_rogue4_d-1',
				'level_rogue4_d-2',
				'level_rogue4_d-3',
				'level_rogue4_d-b',
				'level_rogue5_d-1',
				'level_rogue5_d-2',
				'level_rogue5_d-3',
				'level_rogue5_d-4',
				'level_rogue6_d-1',
				'level_rogue6_d-2'
			].map((levelId) => [levelId, DEFAULT_STAGE_WAVES])
		),

		'level_rogue4_b-7': [0, 2],
		'level_rogue4_b-8': [1, 3, 5]
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
			fn: (key: string) => {
				if (!game) return;
				const configKey = key as ConfigKey;
				configValues[configKey] = !configValues[configKey];
				GameConfig.setValue(configKey, configValues[configKey]);
				setLocalStorage('showAllRange', configValues[configKey] ? 1 : 0);
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
			fn: (key: string) => {
				if (!game) return;
				const configKey = key as ConfigKey;
				configValues[configKey] = !configValues[configKey];
				GameConfig.setValue(configKey, configValues[configKey]);
				setLocalStorage('showAllTimers', configValues[configKey] ? 1 : 0);
				game.gameManager.countdownManager.toggleAllCountdowns(configValues[configKey]);
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
			fn: (key: string) => {
				const configKey = key as ConfigKey;
				configValues[configKey] = !configValues[configKey];
				GameConfig.setValue(configKey, configValues[configKey]);
			}
		}
	];
	function updateCamera(event: Event) {
		if (!game) return;
		zoomSize = parseFloat((event.currentTarget as HTMLInputElement).value);
		GameConfig.FrustumSize = 900 + 900 * (1.5 - (zoomSize + 0.5));
		game.onWindowResize();
	}

	function getOptionValue(key: string) {
		return key === 'showTimeline' ? showTimeline : configValues[key as ConfigKey];
	}

	const unsubscribeFns: Array<() => void> = [];
	onMount(() => {
		unsubscribeFns.push(GameConfig.showTimeline.subscribe((v) => (showTimeline = v)));
		unsubscribeFns.push(
			GameConfig.subscribe('currentWaveIndex', (value: number) => {
				currentWaveIndex = value;
			})
		);
		unsubscribeFns.push(
			GameConfig.subscribe('stagePhaseIndex', (value: number) => {
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
		{@const value = getOptionValue(key)}
		{@const requiresGame = ['showAllRange', 'showAllTimers'].includes(key)}
		<button
			class="grid grid-cols-[1fr_30px] gap-x-1 rounded-xs px-2 py-1.5 w-max {value
				? 'bg-gray-500'
				: 'bg-gray-700 hover:bg-gray-600'} disabled:opacity-50"
			disabled={requiresGame && !game}
			onclick={() => fn(key)}
		>
			<span>{icon} {texts[language]}: </span>
			<span class="text-center">{value ? 'YES' : 'NO'}</span>
		</button>
	{/each}
	<button
		class="bg-gray-500 rounded-xs px-2 py-1.5 w-max active:bg-gray-600 disabled:opacity-50"
		disabled={!game}
		onclick={() => game && game.onWindowResize()}
	>
		{getTranslations(language).adjust_screen}
	</button>
</div>

<div class="flex items-center md:justify-center gap-x-2.5 ml-3 mb-1.5">
	<label for="zoom">{getTranslations(language).zoom}</label>
	<input
		bind:value={zoomSize}
		type="range"
		id="zoom"
		name="zoom"
		min={0.5}
		max={1.5}
		step="0.05"
		disabled={!game}
		oninput={updateCamera}
		class="w-[150px] md:w-[200px] h-1.5 bg-gray-300 rounded-lg appearance-none cursor-pointer"
	/>
	<span class="w-[50px]">{zoomSize.toFixed(2)}x</span>
</div>
{#if stageOptions[mapConfig?.levelId]}
	<div class="flex justify-center gap-x-3 mb-2">
		{#each stageOptions[mapConfig.levelId] as wave, idx}
			<button
				class="rounded-xs px-2 py-1.5 {stagePhaseIndex === idx
					? 'bg-gray-500'
					: 'bg-gray-700 hover:bg-gray-600'} disabled:opacity-50"
				disabled={!game}
				onclick={() => {
					if (!game) return;
					GameConfig.setValue('stagePhaseIndex', idx);
					GameConfig.setValue('currentWaveIndex', wave);
					game.softReset(false);
				}}
			>
				{getTranslations(language).mapstate_prefix}{idx + 1}{getTranslations(language)
					.mapstate_suffix}
			</button>
		{/each}
	</div>
{/if}
