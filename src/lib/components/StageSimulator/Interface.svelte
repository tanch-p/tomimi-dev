<script lang="ts">
	import type { Language } from '$lib/types';
	import { onDestroy, onMount } from 'svelte';
	import { GameConfig } from './objects/GameConfig';
	import enemyCount from '$lib/images/is/enemy_count.webp';
	import translations from '$lib/translations.json';
	import Icon from '../Icon.svelte';
	import spriteCost from '$lib/images/is/sprite_cost.webp';
	import SeekBar from './SeekBar.svelte';

	interface Props {
		game: any;
		initialCost: any;
		language: Language;
		count: number;
		randomSeeds: any;
		simulatedData: any;
		maxCost?: number;
	}

	let {
		game,
		initialCost,
		language,
		count,
		randomSeeds = $bindable(),
		simulatedData,
		maxCost = 99
	}: Props = $props();

	let card = $state(GameConfig.tokenCard),
		totalTime = $state(0),
		min = $state(0),
		sec = $state(0),
		unsubscribeFns = [],
		isPaused = $state(false),
		simMode = $state('wave_normal');

	function handleSpeedFactor() {
		switch (GameConfig.speedFactor) {
			case 1:
				return (GameConfig.speedFactor = 2);
			case 2:
				return (GameConfig.speedFactor = 4);
			case 4:
				return (GameConfig.speedFactor = 1);
		}
	}
	function handlePause() {
		GameConfig.setValue('isPaused', !GameConfig.isPaused);
		GameConfig.state = 'running';
	}
	function handleReset() {
		randomSeeds = Array.from(Array(50)).map((_) => Math.random());
		game.softReset();
	}
	// Sync class -> store
	onMount(() => {
		unsubscribeFns.push(
			GameConfig.subscribe('scaledElapsedTime', (value) => {
				totalTime = value;
			})
		);
		unsubscribeFns.push(
			GameConfig.subscribe('waveElapsedTime', (value) => {
				min = Math.floor(value / 60);
				sec = Math.floor(value % 60);
			})
		);
		unsubscribeFns.push(
			GameConfig.subscribe('tokenCard', (value) => {
				card = value;
			})
		);
		unsubscribeFns.push(
			GameConfig.subscribe('isPaused', (value) => {
				isPaused = value;
			})
		);
		unsubscribeFns.push(
			GameConfig.subscribe('mode', (value) => {
				simMode = value;
			})
		);
	});

	onDestroy(() => {
		unsubscribeFns.forEach((fn) => fn());
	});
</script>

{#if simulatedData && simMode === 'wave_normal'}
	<SeekBar {game} {simulatedData} />
{/if}
<div class="absolute z-1 right-4 flex gap-x-2 md:gap-x-4 mt-4">
	<button
		class="interface w-[45px] h-[45px] md:w-[60px] md:h-[60px] shadow-lg"
		onclick={handleReset}
	>
		<Icon name="refresh-icon" className="rotate-185" size={28} />
	</button>
	<button
		class="interface w-[45px] h-[45px] md:w-[60px] md:h-[60px] shadow-lg"
		onclick={handleSpeedFactor}
	>
		<div class="">
			<div class="flex justify-center text-2xl leading-[26px]">{GameConfig.speedFactor}X</div>
			<div class="flex justify-center pl-1">
				{#each Array.from(Array(Math.min(3, GameConfig.speedFactor))) as _, i}
					<div
						class="border-l-11 border-l-white border-y-[6px] border-y-transparent {i > 0
							? '-ml-0.5'
							: ''}"
					></div>
				{/each}
			</div>
		</div>
	</button>
	<button
		class="interface w-[45px] h-[45px] md:w-[60px] md:h-[60px] shadow-lg"
		onclick={handlePause}
	>
		{#if isPaused}
			<div class="border-l-22 border-l-white border-y-11 border-y-transparent"></div>
		{:else}
			<div class="flex justify-center gap-1.5">
				<div class="bg-white h-[22px] w-[8px]"></div>
				<div class="bg-white h-[22px] w-[8px]"></div>
			</div>
		{/if}
	</button>
</div>

<div
	class="absolute -top-8 md:top-0 left-1/2 -translate-x-1/2 mt-6 pb-0.5 bg-neutral-800 bg-opacity-80 pointer-events-none"
>
	<div class="flex items-center gap-x-1.5 px-4">
		<img src={enemyCount} width="40" alt={translations[language].enemy_count} class="shrink-0" />
		<span>{count ?? '-'}</span>
	</div>
	<p class="text-center text-sm mt-1.5 px-3">
		wave<sub>t</sub>
		{min}:{#if sec < 10}0{/if}{sec}
	</p>
</div>

<div
	class="absolute right-4 bottom-[24%] grid grid-cols-[20px_33px] items-center gap-x-2 px-1.5 bg-neutral-800 bg-opacity-80 pointer-events-none font-light"
>
	<img src={spriteCost} width="20" alt="Cost:" />
	<span class="text-3xl">{Math.min(maxCost, Math.floor(initialCost + totalTime))}</span>
</div>

<div class="absolute bottom-0 right-0">
	{#if card?.count > 0}
		<button
			class="relative border border-[#ffffff80] {card.selected ? '' : 'opacity-50'}"
			onclick={() => {
				GameConfig.setValue('tokenCard', { ...card, selected: !card.selected });
			}}
		>
			<div class="absolute top-0 left-1/2 -translate-x-1/2 flex items-center">
				<!-- <img src="/images/chara_icons/token.webp" width="10" height="10" alt="" /> -->
				<span class="bg-black bg-opacity-80 px-1.5 text-sm">5</span>
			</div>
			<img src="/images/chara_icons/{card.key}.webp" width="75" height="75" alt="" />
			<span class="absolute right-2 bottom-0 text-sm">X{card.count}</span>
		</button>
	{/if}
</div>

{#if isPaused}
	<div
		class="absolute z-0 inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 pointer-events-none"
	>
		<p class="text-2xl">{GameConfig.state === 'end' ? 'ENDED' : 'PAUSE'}</p>
		{#if language === 'zh'}<p class="text-sm">----暂停中----</p>{/if}
	</div>
{/if}

<style>
	.interface {
		display: flex;
		justify-content: center;
		align-items: center;
		transform: skew(4deg, 0deg);
		background-color: rgb(115 115 115 / 0.5) /* #737373 */;
	}
	.interface:active {
		background-color: rgb(115 115 115 / 0.8) /* #737373 */;
	}
</style>
