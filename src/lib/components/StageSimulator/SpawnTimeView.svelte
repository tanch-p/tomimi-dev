<script lang="ts">
	import type { Language } from '$lib/types';
	import { GameConfig } from './objects/GameConfig.svelte.js';
	import { page } from '$app/state';
	import { wavePrefixSuffix, getTranslations } from '$lib/functions/languageHelpers';
	import { compileSpawnTimeActions, getImageForWaves } from '$lib/functions/waveHelpers';
	import { getStageBehavior, getTimelineScrollActionIndex } from './config/stageBehaviors';

	interface Props {
		waves: any;
		mapConfig: any;
		branchKey: any;
		branchIndex: number;
	}

	let { waves, mapConfig, branchKey, branchIndex }: Props = $props();

	let timelineContainer = $state<HTMLDivElement>();
	let actionsContainer = $state<HTMLDivElement>();
	let currWaveIndex = $derived(GameConfig.currentWaveIndex);
	let waveElapsedTime = $derived(GameConfig.waveElapsedTime);
	let language: Language = $derived(page.data.language);
	let showTimeline = $derived(GameConfig.showTimeline);
	let simMode = $derived(GameConfig.mode);
	let timelineBehavior = $derived(getStageBehavior(mapConfig.levelId).timeline);

	$effect(() => {
		if (GameConfig.scaledElapsedTime === 0 && !timelineBehavior?.isolatedWaves) {
			timelineContainer?.scrollTo(0, 0);
		}
	});

	$effect(() => {
		const indexesToScrollBy = getTimelineScrollActionIndex(
			mapConfig.levelId,
			GameConfig.currentWaveIndex
		);
		const targetAction = actionsContainer?.children[indexesToScrollBy] as HTMLElement | undefined;
		if (timelineContainer && targetAction) {
			timelineContainer.scrollTo({
				top: targetAction.offsetTop + targetAction.scrollHeight
			});
		}
	});

	function updateActionIndex(waveElapsedTime: number, prevIndexSize: number) {
		const currActionIndex = getCurrActionIndex(waveElapsedTime);
		return prevIndexSize + currActionIndex;
	}

	function trackAndScrollContainer(index: number) {
		if (simMode === 'wave_summons') return;
		const targetAction = actionsContainer?.children[index] as HTMLElement | undefined;
		if (timelineContainer && targetAction) {
			timelineContainer.scrollTo({
				top: targetAction.offsetTop + targetAction.scrollHeight,
				behavior: 'smooth'
			});
		}
	}
	function getPrevActionsSize(currWaveIndex: number) {
		if (timelineBehavior?.isolatedWaves) return 0;
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

	let prevIndexSize = $derived(getPrevActionsSize(currWaveIndex));
	let index = $derived(updateActionIndex(waveElapsedTime, prevIndexSize));
	$effect(() => {
		trackAndScrollContainer(index);
	});
</script>

{#if waves}
	<div
		class="absolute w-[110px] md:w-[163px] h-full p-3 bg-neutral-800/80 text-sm {showTimeline
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
									{getTranslations(language).max_wait_time}:
									<br />{maxTimeWaitingForNextWave}{getTranslations(language).seconds_abbr}<br />OR
								</p>
							{/if}
							{getTranslations(language).all_enemies_defeated}
						</div>
					{/if}
				{/each}
			</div>
		</div>
	</div>
{/if}
