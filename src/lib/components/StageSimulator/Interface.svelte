<script lang="ts">
	import { getTranslations } from '$lib/functions/languageHelpers';
	import type { Language } from '$lib/types';
	import { onDestroy, onMount } from 'svelte';
	import { GameConfig } from './objects/GameConfig';
	import enemyCount from '$lib/images/is/enemy_count.webp';
	import Icon from '../Icon.svelte';
	import spriteCost from '$lib/images/is/sprite_cost.webp';
	import SeekBar from './SeekBar.svelte';
	import iconToken from '$lib/images/is/icon_profession_token.webp';

	type TokenCard = {
		count: number;
		cost?: number;
		key: string;
		selected: boolean;
	} & Record<string, unknown>;

	export let game,
		initialCost,
		language: Language,
		count: number,
		randomSeeds,
		simulatedData,
		isSimulationRunning = false,
		maxCost = 99;

	let card: TokenCard | null = GameConfig.tokenCard,
		totalTime = 0,
		min = 0,
		sec = 0,
		totalDeductedCost = GameConfig.totalDeductedCost,
		tokenCooldownDuration = GameConfig.tokenCooldownDuration,
		tokenCooldownRemaining = GameConfig.tokenCooldownRemaining,
		unsubscribeFns = [],
		isPaused = false,
		simMode = 'wave_normal';

	$: cooldownProgress =
		tokenCooldownDuration > 0
			? Math.min(1, Math.max(0, 1 - tokenCooldownRemaining / tokenCooldownDuration))
			: 1;

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
	function toggleTokenCard() {
		if (!card || card.count <= 0) return;

		GameConfig.setValue('tokenCard', { ...card, selected: !card.selected });
	}
	function handleKeydown(event: KeyboardEvent) {
		const target = event.target;
		if (
			event.key.toLowerCase() !== 'r' ||
			event.repeat ||
			event.ctrlKey ||
			event.metaKey ||
			event.altKey ||
			(target instanceof HTMLElement &&
				(target.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName)))
		) {
			return;
		}

		toggleTokenCard();
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
			GameConfig.subscribe('tokenCard', (value: TokenCard | null) => {
				card = value;
			})
		);
		unsubscribeFns.push(
			GameConfig.subscribe('totalDeductedCost', (value: number) => {
				totalDeductedCost = value;
			})
		);
		unsubscribeFns.push(
			GameConfig.subscribe('tokenCooldownDuration', (value: number) => {
				tokenCooldownDuration = value;
			})
		);
		unsubscribeFns.push(
			GameConfig.subscribe('tokenCooldownRemaining', (value: number) => {
				tokenCooldownRemaining = value;
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

<svelte:window on:keydown={handleKeydown} />

{#if simulatedData && simMode === 'wave_normal'}
	<SeekBar {game} {simulatedData} {isSimulationRunning} />
{/if}
<div class="absolute z-[1] right-4 flex gap-x-2 md:gap-x-4 mt-4">
	<button
		class="interface w-[45px] h-[45px] md:w-[60px] md:h-[60px] shadow-lg"
		on:click={handleReset}
	>
		<Icon name="refresh-icon" className="rotate-[185deg]" size={28} />
	</button>
	<button
		class="interface w-[45px] h-[45px] md:w-[60px] md:h-[60px] shadow-lg"
		on:click={handleSpeedFactor}
	>
		<div class="">
			<div class="flex justify-center text-2xl leading-[26px]">{GameConfig.speedFactor}X</div>
			<div class="flex justify-center pl-1">
				{#each Array.from(Array(Math.min(3, GameConfig.speedFactor))) as _, i}
					<div
						class="border-l-[11px] border-l-white border-y-[6px] border-y-transparent {i > 0
							? '-ml-0.5'
							: ''}"
					/>
				{/each}
			</div>
		</div>
	</button>
	<button
		class="interface w-[45px] h-[45px] md:w-[60px] md:h-[60px] shadow-lg"
		on:click={handlePause}
	>
		{#if isPaused}
			<div class="border-l-[22px] border-l-white border-y-[11px] border-y-transparent" />
		{:else}
			<div class="flex justify-center gap-1.5">
				<div class="bg-white h-[22px] w-[8px]" />
				<div class="bg-white h-[22px] w-[8px]" />
			</div>
		{/if}
	</button>
</div>

<div
	class="absolute -top-8 md:top-0 left-1/2 -translate-x-1/2 mt-6 pb-0.5 bg-neutral-800 bg-opacity-80 pointer-events-none"
>
	<div class="flex items-center gap-x-1.5 px-4">
		<img src={enemyCount} width="40" alt={getTranslations(language).enemy_count} class="shrink-0" />
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
	<span class="text-3xl">
		{Math.max(0, Math.min(maxCost, Math.floor(initialCost + totalTime)) - totalDeductedCost)}
	</span>
</div>

<div class="absolute bottom-0 right-0">
	{#if card?.count > 0}
		<button
			class="relative border border-[#ffffff80] {card.selected ? '' : 'opacity-50'}"
			on:click={toggleTokenCard}
			aria-keyshortcuts="R"
		>
			<img
				src="/images/chara_icons/{card.key}.webp"
				width="75"
				height="75"
				alt=""
				class="relative z-0"
			/>
			{#if tokenCooldownRemaining > 0}
				<div
					class="absolute inset-0 z-10 pointer-events-none"
					style="background-color: rgba(126, 22, 22, 0.78);"
				/>
				<svg
					class="absolute z-20 inset-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-90 pointer-events-none"
					width="58"
					height="58"
					viewBox="0 0 64 64"
					aria-hidden="true"
				>
					<circle
						cx="32"
						cy="32"
						r="26"
						fill="none"
						stroke="rgba(255, 255, 255, 0.32)"
						stroke-width="4"
					/>
					<circle
						cx="32"
						cy="32"
						r="26"
						fill="none"
						stroke="white"
						stroke-width="4"
						stroke-linecap="round"
						pathLength="1"
						stroke-dasharray="1"
						stroke-dashoffset={1 - cooldownProgress}
					/>
				</svg>
				<span
					class="absolute z-30 inset-0 flex items-center justify-center text text-white pointer-events-none"
				>
					{tokenCooldownRemaining.toFixed(1)}
				</span>
			{/if}
			<div class="absolute z-40 top-0 left-1/2 -translate-x-1/2 flex items-center opacity-80">
				<img src={iconToken} width="16" height="12" alt="" />
				<span class="bg-black bg-opacity-80 px-1.5 text-sm">{card.cost ?? 5}</span>
			</div>
			<span class="absolute z-40 right-1 bottom-0 text-xs">X{card.count}</span>
		</button>
	{/if}
</div>

{#if isPaused}
	<div
		class="absolute z-[0] inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 pointer-events-none"
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
