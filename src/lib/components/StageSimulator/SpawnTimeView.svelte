<script lang="ts">
	import type { Language } from '$lib/types';
	import { GameConfig } from './objects/GameConfig';
	import { page } from '$app/stores';
	import { wavePrefixSuffix } from '$lib/functions/languageHelpers';
	import { onDestroy, onMount } from 'svelte';
	import translations from '$lib/translations.json';
	import { compileSpawnTimeActions, getImageForWaves } from '$lib/functions/waveHelpers';

	export let waves, mapConfig, branchKey, branchIndex: number;

	let timelineContainer: HTMLDivElement, actionsContainer: HTMLDivElement;
	let currWaveIndex = 0;
	let waveElapsedTime = 0;
	let language: Language;
	let showTimeline = true;
	let index = -1;
	let prevIndexSize = 0;
	let simMode = 'wave_normal';

	$: language = $page.data.language;
	$: GameConfig.showTimeline.subscribe((v) => (showTimeline = v));

	// Sync class -> store
	const unsubscribeFns = [];
	onMount(() => {
		unsubscribeFns.push(
			GameConfig.subscribe('mode', (mode) => {
				simMode = mode;
			})
		);
		unsubscribeFns.push(
			GameConfig.subscribe('waveElapsedTime', (value) => {
				waveElapsedTime = value;
			})
		);
		unsubscribeFns.push(
			GameConfig.subscribe('scaledElapsedTime', (value) => {
				if (value === 0 && !['level_rogue4_b-7', 'level_rogue4_b-8'].includes(mapConfig.levelId)) {
					currWaveIndex = 0;
					timelineContainer && timelineContainer.scrollTo(0, 0);
				}
			})
		);
		unsubscribeFns.push(
			GameConfig.subscribe('currentWaveIndex', (value) => {
				if (currWaveIndex !== value) {
					currWaveIndex = value;
					let indexesToScrollBy = 0;
					switch (mapConfig.levelId) {
						case 'level_rogue4_b-7':
							indexesToScrollBy = [0, 1].includes(value) ? 0 : 23;
							break;
						case 'level_rogue4_b-8':
							indexesToScrollBy = [0, 1].includes(value) ? 0 : [2, 3].includes(value) ? 3 : 7;
							break;
					}
					timelineContainer &&
						timelineContainer.scrollTo({
							top:
								actionsContainer.children?.[indexesToScrollBy]?.offsetTop +
								actionsContainer.children?.[indexesToScrollBy]?.scrollHeight
						});
					return;
				}
			})
		);
	});
	onDestroy(() => {
		unsubscribeFns.forEach((fn) => fn());
	});

	$: prevIndexSize = getPrevActionsSize(currWaveIndex);
	$: index = updateActionIndex(waveElapsedTime, prevIndexSize);

	$: trackAndScrollContainer(index);

	function updateActionIndex(waveElapsedTime: number, prevIndexSize: number) {
		const currActionIndex = getCurrActionIndex(waveElapsedTime);
		return prevIndexSize + currActionIndex;
	}

	function trackAndScrollContainer(index: number) {
		if (simMode === 'wave_summons') return;
		if (timelineContainer && actionsContainer.children[index]) {
			timelineContainer.scrollTo({
				top:
					actionsContainer.children[index].offsetTop +
					actionsContainer.children[index].scrollHeight,
				behavior: 'smooth'
			});
		}
	}
	function getPrevActionsSize(currWaveIndex: number) {
		if (['level_rogue4_b-7', 'level_rogue4_b-8'].includes(mapConfig.levelId)) return 0;
		let size = 0;
		for (let i = 0; i < currWaveIndex; i++) {
			const length = waves?.[i]?.timeline?.length || 0;
			size += length + 2;
		}
		return size;
	}
	function getCurrActionIndex(waveElapsedTime: number) {
		const timeline = waves?.[currWaveIndex]?.timeline;
		if (!timeline) {
			return -1;
		}
		if (timeline.length === 0) {
			return -1;
		}
		for (let i = 0; i < timeline.length; i++) {
			if (waveElapsedTime < timeline[i]?.t) {
				return i - 1;
			}
		}
		return timeline.length - 1;
	}
</script>

{#if waves}
	<div
		class="absolute w-[110px] md:w-[163px] h-full p-3 bg-neutral-800 bg-opacity-80 text-sm {showTimeline
			? ''
			: 'opacity-0 pointer-events-none'}"
	>
		<div bind:this={timelineContainer} class="w-full h-full overflow-y-scroll no-scrollbar">
			<div bind:this={actionsContainer} class="pb-[100vh]">
				{#if simMode === 'wave_summons' && branchKey}
					<h6 class="text-center">
						{branchKey}
						{#if branchIndex > -1}
							#{branchIndex + 1}
						{/if}
					</h6>
				{/if}
				{#each waves as { maxTimeWaitingForNextWave, timeline }, i}
					{#if i > 0 && timeline.length > 0}<p class="mt-4">
							{wavePrefixSuffix(i + 1, language)}
						</p>{/if}
					{#each timeline as { t, actions }}
						{@const min = Math.floor(t / 60)}
						{@const sec = Math.floor(t % 60)}
						{@const compiledActions = compileSpawnTimeActions(actions)}
						{#if compiledActions.length > 0}
							<div class="grid grid-cols-[30px_1fr] gap-x-2 mt-4">
								<p class="text-center mt-[15px]">
									{min}:{#if sec < 10}0{/if}{sec}
								</p>
								<div class="flex flex-wrap">
									{#each compiledActions as { key, count }}
										{#if key !== ''}
											{#if ['trap', 'char', 'token'].some((ele) => key.includes(ele))}
												<div class="relative">
													{#if count > 1}
														<p class="absolute right-0 bottom-0 bg-almost-black px-1 text-xs">
															x{count}
														</p>
													{/if}
													<img
														src="/images/chara_icons/{key}.webp"
														width="50px"
														height="50px"
														alt={key}
														class=""
													/>
												</div>
											{:else}
												{@const prefabKey = getImageForWaves(key, mapConfig)}
												<div class="relative">
													{#if count > 1}
														<p class="absolute right-0 bottom-0 bg-almost-black px-1 text-xs">
															x{count}
														</p>
													{/if}
													<img
														src="/images/enemy_icons/{prefabKey}.webp"
														width="50px"
														height="50px"
														alt={key}
														class=""
													/>
												</div>
											{/if}
										{/if}
									{/each}
								</div>
							</div>
						{/if}
					{/each}
					{#if timeline?.length > 0}
						<div class="text-center mt-4 {language !== 'en' ? '-ml-2' : ''}">
							{#if maxTimeWaitingForNextWave > 0}
								<p>
									{translations[language].max_wait_time}:
									<br />{maxTimeWaitingForNextWave}{translations[language].seconds_abbr}<br />OR
								</p>
							{/if}
							{translations[language].all_enemies_defeated}
						</div>
					{/if}
				{/each}
			</div>
		</div>
	</div>
{/if}
