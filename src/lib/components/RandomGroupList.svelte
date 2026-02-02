<script lang="ts">
	import type { Language } from '$lib/types';
	import translations from '$lib/translations.json';
	import {
		getRandomGroups,
		getRandomChance,
		initialisePermGroupsChoices,
		getImageForWaves,
		compileSpawnTimeActions
	} from '$lib/functions/waveHelpers';

	export let selectedPermGroups, mapConfig, eliteMode, hiddenGroups, language: Language;

	$: if (mapConfig) {
		selectedPermGroups = initialisePermGroupsChoices(mapConfig, eliteMode, hiddenGroups);
	}

	function updatePermGroup(key, groupKey, choice) {
		const holder = structuredClone(selectedPermGroups);
		holder[key][groupKey] = choice;
		selectedPermGroups = holder;
	}
</script>

{#if mapConfig?.waves}
	{#each mapConfig?.waves as wave, waveIdx}
		{@const fragmentGroups = wave.fragments.map((fragment) =>
			getRandomGroups(fragment, hiddenGroups)
		)}
		{#if fragmentGroups.some((groups) => Object.keys(groups).length > 0)}
			<p class="title">{translations[language].enemy_wave} #{waveIdx + 1}</p>
			<div class="pb-2">
				{#each wave.fragments as _, fragIdx}
					{#if Object.keys(fragmentGroups[fragIdx]).length > 0}
						<div class="relative border-b border-neutral-700 last:border-none">
							<span class="text-xs ml-1.5 opacity-80">f{fragIdx}</span>
							{#each Object.entries(fragmentGroups[fragIdx]) as [groupKey, choice]}
								<div class="flex gap-x-2 px-1.5 pb-1">
									<span class="mt-[13px] text-base min-w-[30px] text-center">{groupKey}:</span>
									<div class="flex flex-wrap gap-x-3">
										{#each choice as pack, i}
											{@const key = `w${waveIdx}f${fragIdx}`}
											{#if Array.isArray(pack)}
												{@const weight = getRandomChance(pack, choice)}
												{@const compiledActions = compileSpawnTimeActions(pack)}
												<button
													class={selectedPermGroups?.[key]?.[groupKey] === i
														? ''
														: 'brightness-50 hover:brightness-90'}
													on:click={() => {
														updatePermGroup(key, groupKey, i);
													}}
												>
													<div class="flex items-center justify-center gap-x-1.5 border">
														{#each compiledActions as action}
															{#if action.key === ''}
																<div class="flex items-center justify-center w-[50px] h-[50px]">
																	<div class="w-[46px] h-[46px] border" />
																</div>
															{:else}
																{@const prefabKey = action.key.includes('trap')
																	? action.key.split('#')?.[0]
																	: getImageForWaves(action.key, mapConfig)}
																<div class="relative">
																	<img
																		src={action.key.includes('trap')
																			? `/images/chara_icons/${prefabKey}.webp`
																			: `/images/enemy_icons/${prefabKey}.webp`}
																		width="50"
																		height="50"
																		alt={action.key}
																	/>
																	{#if action.count > 1}
																		<p
																			class="absolute right-0 bottom-0 bg-almost-black px-1 text-xs"
																		>
																			x{action.count}
																		</p>
																	{/if}
																</div>
															{/if}
														{/each}
													</div>
													<p class="text-center">{weight}%</p>
												</button>
											{:else}
												{@const action = pack}
												{@const weight = getRandomChance(action.weight, choice)}
												<button
													class={selectedPermGroups?.[key]?.[groupKey] === i
														? ''
														: 'brightness-50 hover:brightness-90'}
													on:click={() => {
														updatePermGroup(key, groupKey, i);
													}}
												>
													<div class="flex items-center justify-center">
														{#if action.key === ''}
															<div class="flex items-center justify-center w-[50px] h-[50px]">
																<div class="w-[46px] h-[46px] border" />
															</div>
														{:else}
															{@const prefabKey = action.key.includes('trap')
																? action.key.split('#')?.[0]
																: getImageForWaves(action.key, mapConfig)}
															<div class="relative">
																<img
																	src={action.key.includes('trap')
																		? `/images/chara_icons/${prefabKey}.webp`
																		: `/images/enemy_icons/${prefabKey}.webp`}
																	width="50"
																	height="50"
																	alt={action.key}
																/>
																{#if action.count > 1}
																	<p class="absolute right-0 bottom-0 bg-almost-black px-1 text-xs">
																		x{action.count}
																	</p>
																{/if}
															</div>
														{/if}
													</div>
													<p class="text-center">{weight}%</p>
												</button>
											{/if}
										{/each}
									</div>
								</div>
							{/each}
						</div>
					{/if}
				{/each}
			</div>
		{/if}
	{/each}
{/if}

<style>
	.title {
		display: flex;
		justify-content: center;
		align-items: center;
		text-align: center;
		min-height: 58px;
		padding: 0 6px;
		background-color: rgb(23, 23, 23);
	}
</style>
