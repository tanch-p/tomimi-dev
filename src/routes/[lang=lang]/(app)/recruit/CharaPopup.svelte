<script lang="ts">
	import { clickOutside } from '$lib/functions/clickOutside';
	import type { Language } from '$lib/types/types';
	import { selectedChara, moduleIndex } from './stores.old';
	import translations from '$lib/translations.json';
	import { charaAssets } from '$lib/data/chara/chara_assets';
	import CharaSkill from './CharaSkill.svelte';
	import {
		convertStatKeys,
		getFullCharStat,
		getModuleStat,
		getModuleTalentDesc,
		getModuleTrait,
		getTotalPotStat,
		getModuleNewTalent,
		getSkillRangeId,
		getAttackRangeId
	} from '$lib/functions/chara/charaHelpers';
	import TextParser from '$lib/components/TextParser.svelte';
	import RangeParser from '$lib/components/RangeParser.svelte';
	import CharaTokens from './CharaTokens.svelte';
	import DraggableContainer from '$lib/components/DraggableContainer.svelte';

	interface Props {
		language: Language;
	}

	let { language }: Props = $props();

	const statKeys = ['hp', 'respawnTime', 'atk', 'cost', 'def', 'blockCnt', 'res', 'aspd'];
	let hasModule = $derived(['TIER_4', 'TIER_5', 'TIER_6'].includes($selectedChara?.rarity));
	let moduleStage = $state(2);
	

	selectedChara.subscribe((val) => {
		if (!val) {
			moduleIndex.set(0);
		}
	});
	moduleIndex.subscribe((val) => {
		if (val) moduleStage = 2;
	});

	// $: console.log($selectedChara);
</script>

<div class="overlay" class:visible={$selectedChara}>
	<div
		class:visible={$selectedChara}
		class="popup text-near-white bg-neutral-800 bg-opacity-95 pb-12 no-scrollbar"
		use:clickOutside
		onoutclick={() => selectedChara.set(null)}
	>
		{#if $selectedChara}
			{@const phase = ['TIER_1', 'TIER_2'].includes($selectedChara.rarity)
				? 0
				: $selectedChara.rarity === 'TIER_3'
				? 1
				: 2}
			<div class="grid grid-cols-[100px_1fr] pr-10">
				<img
					src={`/images/chara_icons/${$selectedChara.id}.webp`}
					width="100"
					height="100"
					alt={$selectedChara.appellation}
					class="ring-1 ring-[#555]"
				/>
				<div class="pl-3 pt-1.5">
					<img
						src={charaAssets[$selectedChara.rarity]}
						alt={$selectedChara.rarity}
						class="relative -left-1 h-[20px]"
					/>
					{#if language !== 'en'}
						<p>{$selectedChara.appellation}</p>
					{/if}
					<p class="text-xl">{$selectedChara.name}</p>
				</div>
			</div>
			<div class="relative">
				<p class="absolute -translate-y-full right-2 text-xs text-[#b3b3b3]">
					※{translations[language].chara_stat_disclaimer}
				</p>
				<div class="grid grid-cols-[70px_1fr] gap-x-2 items-center px-1 mt-3">
					<div class="flex flex-col items-center justify-evenly h-full">
						<div class="border-2 border-[#ffd800] rounded-full h-[60px] w-[60px] text-center">
							<p class="text-[10px] mt-px tracking-widest">LV</p>
							<p class="-mt-2 text-4xl">{$selectedChara.stats.level}</p>
						</div>
						<img src={charaAssets['phase'][phase]} width="50" alt="E{phase}" />
						{#if $selectedChara.potential.length > 0}
							<div class="relative group">
								<img src={charaAssets.potential[5]} width="60" alt="p5" />
								<div
									class="absolute hidden group-hover:block top-[-50%] left-full bg-neutral-700 text-near-white w-max py-1.5 px-2 z-1 rounded-md text-sm shadow-md"
								>
									{#each $selectedChara.potential as pot}
										<p>{pot.desc}</p>
									{/each}
								</div>
							</div>
						{:else}
							<img src={charaAssets.potential[0]} width="60" alt="p0" />
						{/if}
					</div>
					<div class="grid grid-cols-2 gap-x-2 gap-y-1">
						{#each statKeys as statKey}
							{@const potStat = getTotalPotStat(statKey, $selectedChara.potential)}
							{@const moduleStat = getModuleStat(
								statKey,
								$selectedChara.uniequip?.[$moduleIndex]?.combatData?.phases?.[moduleStage]
									?.attributeBlackboard
							)}
							<div
								class={`flex flex-col bg-[#161616] bg-opacity-80 px-1 ${
									language === 'en' ? 'text-sm' : ''
								}`}
							>
								<div class="grid grid-cols-[16px_1fr] items-center gap-x-1">
									<img src={charaAssets[statKey]} width="16px" height="16px" alt="" />
									<span class="text-[#b3b3b3] font-semibold">
										{translations[language].table_headers[statKey]}
									</span>
								</div>
								<p class="text-near-white pl-[20px] whitespace-nowrap">
									{getFullCharStat(statKey, $selectedChara, moduleStat, potStat)}{statKey ===
									'respawnTime'
										? 's'
										: ''}
									{#if potStat}
										<span class="text-[#00B0FF] text-sm">({potStat > 0 ? '+' : ''}{potStat})</span>
									{/if}
									{#if moduleStat}
										<span class="text-red-400 text-sm"
											>({moduleStat > 0 ? '+' : ''}{moduleStat})</span
										>
									{/if}
								</p>
							</div>
						{/each}
					</div>
				</div>
			</div>
			<div class="px-1.5 mt-3">
				<div
					class="flex flex-col items-center min-w-28 p-3 pb-1 bg-[#161616] bg-opacity-80 rounded float-right"
				>
					<div class="flex items-center min-h-[50px] max-w-[90px]">
						<RangeParser rangeId={getAttackRangeId($selectedChara, $moduleIndex, moduleStage)} />
					</div>
					<p class="mt-1">{translations[language].attack_range}</p>
				</div>
				<div class="min-h-[130px]">
					{#if Object.keys($selectedChara.favorData).length > 0}
						<p class="mb-3">
							{translations[language].favor}:
							{#each Object.keys($selectedChara.favorData) as key, i}
								{#if i !== 0}
									,
								{/if}
								<span>
									{translations[language].table_headers[convertStatKeys[key]]}+{$selectedChara
										.favorData[key]}
								</span>
							{/each}
						</p>
					{/if}
					<div class="grid grid-cols-[70px_1fr] items-center">
						<div class="flex items-center justify-center w-[65px] h-[65px] bg-neutral-900">
							<img
								src="/images/chara_assets/sub_{$selectedChara.subProfessionId}_icon.webp"
								width="50"
								alt={$selectedChara.subProfessionId}
							/>
						</div>
						<p class="ml-3 text-xl">
							{translations[language][$selectedChara.subProfessionId]}
						</p>
					</div>
					<TextParser
						line={getModuleTrait(
							$selectedChara.desc,
							$selectedChara.uniequip[$moduleIndex],
							moduleStage
						)}
						className="mt-2 {hasModule ? 'min-h-20' : ''}"
					/>
					{#if hasModule}
						<p class="mt-4">
							{translations[language].module}
							{#if hasModule && $selectedChara.uniequip.length > 0}
								<span class="text-[#999]">※{translations[language].chara_module_stage_click}</span>
							{/if}
						</p>
						<div class="mt-4 px-4">
							{#if $selectedChara.uniequip.length === 0}
								<div class="module none"></div>
							{:else}
								<DraggableContainer
									className="overflow-y-visible no-scrollbar snap-proximity snap-x "
								>
									<div
										class="flex pb-8 w-max min-[520px]:px-10 gap-x-[calc((min(100vw-15px,550px)/2)-135px)] min-[520px]:gap-x-[calc((min(100vw-15px,550px)/2)-175px)]"
									>
										{#each $selectedChara.uniequip as equip, idx}
											{@const typeIcon = equip.typeIcon.toLowerCase()}
											<div class="relative select-none">
												<button
													class:active={$moduleIndex === idx}
													class="module flex-col snap-center shrink-0"
													onclick={() => moduleIndex.set(idx)}
												>
													<div class="grid place-items-center h-[48px]">
														<img
															src="/images/equip_icons/{typeIcon}.webp"
															height="40"
															alt={typeIcon}
															class="max-h-[40px] pointer-events-none"
														/>
													</div>
													<div class="flex gap-x-0.5 text-xs font-light uppercase">
														{#if typeIcon !== 'original'}
															{@const parts = typeIcon.split('-')}
															{parts[0]}
															<img
																src={charaAssets[parts[1]]}
																alt={parts[1]}
																width="12px"
																class="pointer-events-none"
															/>
														{:else}
															{typeIcon}
														{/if}
													</div>
												</button>
												{#if idx !== 0}
													{#if $moduleIndex === idx}
														<button
															class="absolute bottom-[-30px] left-1/2 -translate-x-1/2 flex items-center justify-center border border-[#3d3d3d] bg-[#272727] mt-1.5 py-px px-4"
															onclick={() => {
																if (moduleStage === 2) return (moduleStage = 0);
																return (moduleStage += 1);
															}}
														>
															<p class="text-[#7d7d7d] font-bold text-sm">STAGE</p>
															<div class="w-[11px] ml-1.5 mt-0.5">
																<img
																	src={charaAssets[`solid_${moduleStage + 1}`]}
																	alt={moduleStage + 1}
																	class="max-h-[15px] pointer-events-none"
																/>
															</div>
														</button>
													{:else}
														<div
															class="absolute bottom-[-30px] left-1/2 -translate-x-1/2 flex items-center justify-center border border-[#3d3d3d] bg-[#272727] mt-1.5 py-px px-4"
														>
															<p class="text-[#7d7d7d] font-bold text-sm">STAGE</p>
															<div class="w-[11px] ml-1.5 mt-0.5">
																<img
																	src={charaAssets[`solid_3`]}
																	alt="3"
																	class="max-h-[15px] pointer-events-none"
																/>
															</div>
														</div>
													{/if}
												{/if}
											</div>
										{/each}
									</div>
								</DraggableContainer>
								<div
									class="flex justify-center mt-1 text-center {language !== 'en'
										? 'whitespace-nowrap'
										: ''}"
								>
									<p title={$selectedChara.uniequip[$moduleIndex].name}>
										{$selectedChara.uniequip[$moduleIndex].name}
									</p>
								</div>
							{/if}
						</div>
					{/if}
				</div>
				<hr class="mt-4 mb-3 border-t-2 border-[#555]" />
				{#if $selectedChara.talents && $selectedChara.talents.length > 0}
					{@const newTalent = getModuleNewTalent(
						$selectedChara.uniequip[$moduleIndex],
						moduleStage
					)}
					<p>{translations[language].talent}</p>
					{#each $selectedChara.talents as talent, idx}
						{@const moduleTalentDesc = getModuleTalentDesc(
							idx,
							$selectedChara.uniequip[$moduleIndex],
							moduleStage
						)}
						<p class="py-px px-2 mt-4 w-max bg-[#f9f9f9] rounded-md font-medium text-[#333]">
							{talent.name}
						</p>
						<TextParser className="mt-1" line={moduleTalentDesc || talent.desc} />
					{/each}
					{#if newTalent}
						<p class="py-px px-2 mt-4 w-max bg-[#f9f9f9] rounded-md font-medium text-[#333]">
							{newTalent.name}
						</p>
						<TextParser className="mt-1" line={newTalent.desc} />
					{/if}
				{/if}
				{#if $selectedChara.skills && $selectedChara.skills.length > 0}
					<p class="mt-8">
						{translations[language].skill}
						{#if $selectedChara.rarity !== 'TIER_3'}
							<span class="text-[#999]">※{translations[language].chara_skill_rank_click}</span>
						{/if}
					</p>
					{#each $selectedChara.skills as skill}
						<CharaSkill
							{skill}
							{language}
							overrideRangeId={getSkillRangeId(skill, $selectedChara, $moduleIndex, moduleStage)}
							rangeId={getAttackRangeId($selectedChara, $moduleIndex, moduleStage)}
						/>
					{/each}
				{/if}
				{#if $selectedChara.tokens && $selectedChara.tokens.length > 0}
					<hr class="mt-4 mb-3 border-t-2 border-[#555]" />
					<CharaTokens
						tokens={$selectedChara.tokens}
						chara={$selectedChara}
						moduleIndex={$moduleIndex}
						{moduleStage}
						{language}
					/>
				{/if}
			</div>
		{/if}
	</div>
</div>

<style>
	.overlay {
		position: fixed;
		inset: 0;
		background-color: rgba(0, 0, 0, 0.8);
		z-index: 99;
		pointer-events: none;
		opacity: 0;
		transition: opacity 0.3s;
	}
	.popup {
		border-radius: 5px;
		width: min(calc(100% - 15px), 550px);
		position: fixed;
		inset: 0;
		min-height: 300px;
		max-height: max(500px, 70vh);
		margin: auto;
		pointer-events: none;
		transition: transform 0.3s, opacity 0.2s, -webkit-transform 0.3s;
		opacity: 0;
		overflow-y: auto;
		overflow-x: clip;
		overscroll-behavior: contain;
	}
	.overlay.visible,
	.popup.visible {
		pointer-events: all;
		opacity: 1;
	}
	.module {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 75px;
		height: 75px;
		border: 3px solid #555;
	}
	.module.active {
		border-color: #0098dc;
	}
	.module.none:after {
		content: '';
		position: absolute;
		top: 50%;
		left: 0;
		width: calc(1px * sqrt(pow(50, 2) * 2) - 1px);
		height: 1px;
		background-color: #555;
		transform: rotate(-45deg);
	}
</style>
