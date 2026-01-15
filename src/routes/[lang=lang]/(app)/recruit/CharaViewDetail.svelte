<script lang="ts">
	import { run } from 'svelte/legacy';

	import type { Language } from '$lib/types';
	import translations from '$lib/translations.json';
	import TextParser from '$lib/components/TextParser.svelte';
	import { charaAssets } from '$lib/data/chara/chara_assets';
	import {
		getAttackRangeId,
		getSkillRangeId,
		getFullCharStat,
		getModuleNewTalent,
		getModuleStat,
		getModuleTalentDesc,
		getModuleTrait,
		getTotalPotStat
	} from '$lib/functions/chara/charaHelpers';
	import { selectedChara, moduleIndex } from './stores';
	import RangeParser from '$lib/components/RangeParser.svelte';
	import CharaSkill from './CharaSkill.svelte';

	interface Props {
		chara: any;
		language: Language;
		showAlt: any;
	}

	let { chara, language, showAlt }: Props = $props();

	let talents = $state([]),
		skills = $state([]);

	run(() => {
		talents = [...new Set(chara.activeTalents)].sort().map((i) => {
			let talent = chara.talents[i];
			if (i === -1) {
				talent = getModuleNewTalent(chara.uniequip[chara.activeModuleIndex], 2);
			}
			return { talent, idx: i };
		});
	});
	run(() => {
		skills = [...new Set(chara.activeSkills)].sort().map((i) => chara.skills[i]);
	});

	const rarityBgColors = {
		TIER_1: 'bg-[#c1c1c1]',
		TIER_2: 'bg-[#c4cc71]',
		TIER_3: 'bg-[#8eb3c3]',
		TIER_4: 'bg-[#be95c6]',
		TIER_5: 'bg-[#f8ca2c]',
		TIER_6: 'bg-[#c11d1d]'
	};

	const statKeys = ['hp', 'respawnTime', 'atk', 'cost', 'def', 'blockCnt', 'res', 'aspd'];

	const handleClick = (chara) => {
		selectedChara.set(chara);
		moduleIndex.set(chara.activeModuleIndex);
	};

	const phase = ['TIER_1', 'TIER_2'].includes(chara.rarity) ? 0 : chara.rarity === 'TIER_3' ? 1 : 2;
</script>

<div class="max-w-[500px] w-full mx-auto">
	<div class="relative z-1 {rarityBgColors[chara.rarity]} pl-1.5 rounded-md">
		<button
			class="grid grid-cols-[130px_1fr] p-1.5 pb-0 w-full shadow-md rounded-md bg-white text-start"
			onclick={() => handleClick(chara)}
		>
			<div class="relative pl-4.5 pr-4 h-[102px]">
				<div class="absolute z-1 top-0 left-0 bg-[#2c2c2c] p-1 rounded-md">
					<img
						src={charaAssets[chara.profession]}
						alt={chara.profession}
						width="26"
						loading="lazy"
						decoding="async"
					/>
				</div>
				<div class="feathered">
					<img
						src={`/images/chara_icons/${chara.id}.webp`}
						width="100"
						height="100"
						alt={chara.appellation}
						class="rounded"
					/>
				</div>
				<div class="absolute z-1 bottom-4 left-0">
					{#if chara.potential.length > 0}
						<img src={charaAssets.potential[5]} width="30" alt="p5" class="potential-shadow" />
					{:else}
						<img src={charaAssets.potential[0]} width="30" alt="p0" />
					{/if}
				</div>
				<img
					src={charaAssets['sandbox_' + chara.rarity]}
					alt={chara.rarity}
					class="absolute z-1 bottom-0 left-0 h-[20px]"
				/>

				<div class="absolute z-1 -right-2.5 -bottom-0.5 pointer-events-none">
					<img
						src={charaAssets['phase'][phase]}
						width="36"
						alt="E{phase}"
						class="absolute z-2 bottom-[32px] left-[50%] -translate-x-[50%]"
					/>
					<svg width="0">
						<clipPath id="teardrop">
							<path
								fill="transparent"
								stroke="#000"
								stroke-width="1.5"
								d="M10.3 4.86
								   Q25.515 7.938 40.5 28.16
								   A20.736 20.736 0 1 1 8.1 28.16
								   Q35.085 7.938 15.3 4.86z"
							/>
						</clipPath>
					</svg>
					<div class="raindrop-wrap">
						<div class="raindrop-shadow w-[47px] h-[68px]"></div>
					</div>
					<div
						class="absolute bottom-3 left-[50%] -translate-x-[50%] flex items-center justify-center"
					>
						<p class="text-xl">{chara.stats.level}</p>
					</div>
				</div>
			</div>
			<div class="text-[#333] pl-1.5">
				<h3 class="border-b border-[#d8d3d3] font-medium leading-[20px] pb-0.5">{chara.name}</h3>
				<div class="pt-1.5">
					<div class="flex min-[500px]:gap-x-3 pb-1 min-[500px]:pb-1.5">
						<div class="flex">
							<div
								class="flex shrink-0 items-center justify-center mt-3 w-[40px] h-[40px] bg-[#313131]"
							>
								<img
									src="/images/chara_assets/sub_{chara.subProfessionId}_icon.webp"
									width="30"
									alt={chara.subProfessionId}
								/>
							</div>
							{#if chara.uniequip.length === 0}
								<div
									class="relative shrink-0 module none mt-3 mr-1 w-[40px] h-[40px] border-4 border-[#ccc]"
								></div>
							{:else}
								<div
									class="relative flex items-center justify-center shrink-0 module mt-3 mr-1 w-[40px] h-[40px] {chara.activeModuleIndex
										? 'bg-[#b6b6b6]'
										: ' border-4 border-[#ccc]'}"
								>
									{#if chara.activeModuleIndex}
										{@const typeIcon =
											chara.uniequip[chara.activeModuleIndex].typeIcon.toLowerCase()}
										<div
											class="w-[32px] h-[32px] bg-center bg-contain bg-no-repeat"
											style="background-image: url(/images/color_equip_icons/{typeIcon}.webp);"
										></div>
									{/if}
								</div>
							{/if}
						</div>
						<div class="flex justify-center self-center w-full min-[500px]:w-auto h-min">
							<div class="flex flex-col items-center py-0.5 px-1.5 bg-[#7f7f7f] rounded">
								<div class="flex justify-center items-center min-h-[45px] max-h-[65px] w-[55px]">
									<RangeParser
										rangeId={getAttackRangeId(chara, chara.activeModuleIndex, 0)}
										size="small"
									/>
								</div>
								<p class="text-near-white text-xs">{translations[language].attack_range}</p>
							</div>
						</div>
						<div class="hidden min-[500px]:grid grid-cols-2 gap-x-2 gap-y-1 ml-2.5">
							{#each statKeys as statKey}
								{@const potStat = getTotalPotStat(statKey, chara.potential)}
								{@const moduleStat = getModuleStat(
									statKey,
									chara.uniequip?.[chara.activeModuleIndex]?.combatData?.phases?.[2]
										?.attributeBlackboard
								)}
								<div class={`grid grid-cols-[16px_1fr] items-center gap-x-1 bg-[#e5e5e5] w-[72px]`}>
									<div class="flex justify-center items-center bg-[#313131] w-[16px] h-[16px]">
										<img src={charaAssets[statKey]} width="12px" height="12px" alt="" />
									</div>
									<p class="text-sm leading-[16px] font-medium">
										{getFullCharStat(statKey, chara, moduleStat, potStat)}{statKey === 'respawnTime'
											? 's'
											: ''}
									</p>
								</div>
							{/each}
						</div>
					</div>
				</div>
			</div>
		</button>
	</div>
	{#if showAlt}
		<div
			class="relative rounded-b-md bg-[#e9e9e9] pt-4 pb-2 -mt-2.5 space-y-2.5 text-[#333] overflow-hidden"
		>
			<div class="px-4 min-[500px]:pr-[120px]">
				<p class="font-medium">{translations[language][chara.subProfessionId]}</p>
				<TextParser
					line={getModuleTrait(chara.desc, chara.uniequip[chara.activeModuleIndex], 2)}
					className="text-sm"
				/>
			</div>
			{#if talents.length > 0}
				<div class="px-4 min-[500px]:pr-[120px]">
					{#each talents as { talent, idx }}
						{@const moduleTalentDesc = getModuleTalentDesc(
							idx,
							chara.uniequip[chara.activeModuleIndex],
							2
						)}
						<p class="px-1 w-max bg-[#d4d4d4] rounded-md font-medium text-[#333]">
							{talent.name}
						</p>
						<TextParser className="mt-1 text-sm" line={moduleTalentDesc || talent.desc} />
					{/each}
				</div>
			{/if}
			{#if skills.length > 0}
				{#each skills as skill}
					<CharaSkill
						{skill}
						{language}
						overrideRangeId={getSkillRangeId(skill, chara, chara.activeModuleIndex, 2)}
						rangeId={getAttackRangeId(chara, chara.activeModuleIndex, 2)}
						layout="index"
					/>
				{/each}
			{/if}
		</div>
	{/if}
	<div></div>
</div>

<style>
	.potential-shadow {
		filter: drop-shadow(0 2px 1.5px #333a);
	}
	.raindrop-wrap {
		filter: blur(3.5px);
	}
	.raindrop-shadow {
		clip-path: url(#teardrop);
		background: radial-gradient(#333d, #333d 40%, #3331 70%);
	}
	.level-shadow {
		width: 20px;
		height: 20px;
		background-color: #666;
		box-shadow: 0 0 6px 8px #666;
	}
	.feathered {
		position: relative;
		display: inline-block;
		border-radius: 5px;
	}
	.feathered::after {
		content: '';
		position: absolute;
		display: block;
		inset: 0;
		box-shadow: inset 0 0 12px 4px #fff;
	}
	.module.none:after {
		content: '';
		position: absolute;
		top: 50%;
		left: 3px;
		width: calc(1px * sqrt(pow(18, 2) * 2) - 1px);
		height: 2px;
		background-color: #ccc;
		transform: rotate(-45deg);
	}
</style>
