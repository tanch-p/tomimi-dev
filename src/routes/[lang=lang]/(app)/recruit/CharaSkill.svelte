<script lang="ts">
	import type { Language } from '$lib/types';
	import { charaAssets } from '$lib/data/chara/chara_assets';
	import translations from '$lib/translations.json';
	import Icon from '$lib/components/Icon.svelte';
	import TextParser from '$lib/components/TextParser.svelte';
	import RangeParser from '$lib/components/RangeParser.svelte';
	import { getSkillImgUrl } from '$lib/functions/chara/charaHelpers';

	interface Props {
		skill: any;
		language: Language;
		rangeId: any;
		overrideRangeId: any;
		layout?: string;
	}

	let {
		skill,
		language,
		rangeId,
		overrideRangeId,
		layout = 'default'
	}: Props = $props();

	const hasMastery = skill.levels.length > 1;
	let mastery: number = $state(hasMastery ? 3 : 0);

	function getMasteryLvl(mastery: number) {
		if (!hasMastery) return mastery;
		if (mastery === 3) return 0;
		return mastery + 1;
	}
</script>

{#if layout === 'default'}
	<div class="grid grid-cols-[200px_1fr] gap-x-3 mt-6">
		<div class="self-end">
			<div class="relative h-max w-[90px]">
				<img
					src="/images/skill_icons/skill_icon_{getSkillImgUrl(skill.skillId)}.webp"
					width="90"
					height="90"
					loading="lazy"
					alt={''}
				/>
				{#if skill.skillType !== 'PASSIVE'}
					<div class="absolute flex -bottom-0.5 -right-0.5">
						{#if skill.levels?.[mastery]?.spData?.initSp}
							<div class="grid grid-cols-[11px_1fr] items-center bg-[#434343] pl-[4px] pr-px">
								<img src={charaAssets.sp_start} alt="" />
								<p class="text-[20px] leading-tight">{skill.levels?.[mastery]?.spData?.initSp}</p>
							</div>
						{/if}
						<div class="ml-1 grid grid-cols-[16px_1fr] items-center bg-[#434343] pr-px">
							<img src={charaAssets.sp_cost} alt="" />
							<p class="text-[20px] leading-tight">{skill.levels?.[mastery]?.spData?.spCost}</p>
						</div>
					</div>
				{/if}
			</div>
			<p
				class="mt-1.5 text-lg {language !== 'en'
					? 'text-center max-w-[90px] whitespace-nowrap'
					: ''}"
			>
				{skill.name}
			</p>
			<button
				class:cursor-default={!hasMastery}
				class="grid grid-cols-[1fr_30px] w-max mt-1.5"
				onclick={() => (mastery = getMasteryLvl(mastery))}
			>
				<div class="flex items-center border border-[#3e3e3e] bg-[#272727] pl-2 pr-1 h-[24px]">
					<p class="leading-tight">RANK</p>
					<img src={charaAssets.solid_7} width="12" alt="7" class="ml-1.5 mt-0.5" />
				</div>
				{#if hasMastery}
					<img src={charaAssets.mastery[mastery]} width="25" height="24" alt="M{mastery}" />
				{/if}
			</button>
		</div>
		{#if overrideRangeId || skill.levels?.[mastery]?.rangeId || skill.levels?.[mastery]?.rangeExtend}
			<div class="flex justify-center items-center">
				{#if skill.levels?.[mastery]?.rangeExtend}
					<RangeParser {rangeId} extend={skill.levels?.[mastery]?.rangeExtend} />
				{:else}
					<RangeParser rangeId={overrideRangeId || skill.levels?.[mastery]?.rangeId} />
				{/if}
			</div>
		{/if}
	</div>
	<div class="flex mt-2">
		{#if skill.skillType !== 'PASSIVE'}
			<p class="pill {layout} {skill?.spType}">
				{translations[language][skill?.spType]}
			</p>
		{/if}
		<p class="pill {layout} bg-[#737373]">{translations[language][skill.skillType]}</p>
		{#if skill.levels?.[mastery]?.duration > 0}
			<div class="pill {layout} grid grid-cols-[20px_1fr] gap-x-1.5 items-center bg-[#555]">
				<Icon name="clock-icon" />
				<span>{skill.levels?.[mastery]?.duration}{language === 'en' ? 's' : '秒'}</span>
			</div>
		{/if}
	</div>
	<TextParser line={skill.levels[mastery].desc} className="mt-1.5" />
{:else}
	<div
		class="grid grid-cols-[80px_1fr] min-[500px]:grid-cols-[80px_1fr_104px] gap-x-[16px] pl-2.5 pt-1"
	>
		<div class="flex flex-col items-center">
			<button
				class:cursor-default={!hasMastery}
				class="relative flex items-center justify-center w-[70px] h-[70px] shadow-md"
				onclick={() => (mastery = getMasteryLvl(mastery))}
			>
				<img
					src="/images/skill_icons/skill_icon_{getSkillImgUrl(skill.skillId)}.webp"
					width="65"
					height="65"
					loading="lazy"
					alt={''}
				/>
				{#if hasMastery}
					<img
						src={charaAssets.mastery[mastery]}
						width="15"
						alt="M{mastery}"
						class="absolute top-0 left-0"
					/>
				{:else}
					<div
						class="absolute -top-px -left-px flex items-center justify-center w-[16px] h-[16px] bg-[#131313]"
					>
						<img src={charaAssets.solid_7} width="7" alt="7" />
					</div>
				{/if}
				{#if skill.skillType !== 'PASSIVE'}
					<div class="absolute flex -bottom-0.5 -right-0.5 shadow-md text-near-white">
						{#if skill.levels?.[mastery]?.spData?.initSp}
							<div
								class="grid grid-cols-[9px_1fr] items-center border-r border-black bg-[#434343] pl-[4px] pr-px"
							>
								<img src={charaAssets.sp_start} alt="" />
								<p class="text-sm leading-tight">
									{skill.levels?.[mastery]?.spData?.initSp}
								</p>
							</div>
						{/if}
						<div class="grid grid-cols-[12px_1fr] items-center bg-[#434343] pr-px">
							<img src={charaAssets.sp_cost} alt="" />
							<p class="text-sm leading-tight">
								{skill.levels?.[mastery]?.spData?.spCost}
							</p>
						</div>
					</div>
				{/if}
			</button>
			<p class:whitespace-nowrap={language === 'zh'} class="text-sm mt-0.5">{skill.name}</p>
		</div>
		<div class="max-[500px]:pr-3">
			<div class="flex text-near-white">
				{#if skill.skillType !== 'PASSIVE'}
					<p
						class="pill {layout} px-1.5 {skill?.spType} truncate max-w-[90px] min-[500px]:max-w-[120px] {language ===
						'en'
							? 'text-xs'
							: 'text-sm'}"
					>
						{translations[language][skill?.spType]}
					</p>
				{/if}
				<p
					class="pill {layout} px-1.5 bg-[#737373] truncate max-w-[90px] min-[500px]:max-w-[120px] {language ===
					'en'
						? 'text-xs'
						: 'text-sm'}"
				>
					{translations[language][skill.skillType]}
				</p>
				{#if skill.levels?.[mastery]?.duration > 0}
					<div
						class="pill {layout} px-0.5 grid grid-cols-[20px_1fr] gap-x-1 items-center bg-[#555] text-sm"
					>
						<Icon name="clock-icon" className="w-[20px]" />
						<span>{skill.levels?.[mastery]?.duration}{language === 'en' ? 's' : '秒'}</span>
					</div>
				{/if}
			</div>
			<TextParser line={skill.levels[mastery].desc} className="mt-0.5 text-sm" />
		</div>

		{#if overrideRangeId || skill.levels?.[mastery]?.rangeId || skill.levels?.[mastery]?.rangeExtend}
			<div
				class="hidden min-[500px]:flex flex-col items-center pb-1 pt-1.5 px-1.5 mt-6 h-max w-max bg-[#7f7f7f] rounded"
			>
				<div class="flex justify-center items-center min-h-[45px] max-h-[84px] w-[80px]">
					{#if skill.levels?.[mastery]?.rangeExtend}
						<RangeParser {rangeId} extend={skill.levels?.[mastery]?.rangeExtend} size="small" />
					{:else}
						<RangeParser
							rangeId={overrideRangeId || skill.levels?.[mastery]?.rangeId}
							size="small"
						/>
					{/if}
				</div>
				<p class="text-near-white text-xs">{translations[language].attack_range}</p>
			</div>
		{/if}
	</div>
{/if}

<style>
	.pill.default {
		min-width: 72px;
		border-radius: 5px;
		padding: 0 6px 1px;
		text-align: center;
	}
	.pill.index {
		min-width: 60px;
		border-radius: 5px;
		text-align: center;
		line-height: 24px;
	}
</style>
