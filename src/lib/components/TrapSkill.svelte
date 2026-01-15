<script lang="ts">
	import type { Language, MapConfig, Skill, Trap } from '$lib/types';
	import { charaAssets } from '$lib/data/chara/chara_assets';
	import { getSkillImgUrl } from '$lib/functions/chara/charaHelpers';
	import RangeParser from './RangeParser.svelte';
	import translations from '$lib/translations.json';
	import TextParser from './TextParser.svelte';
	import Icon from './Icon.svelte';
	import { parseValues } from '$lib/functions/skillHelpers';

	interface Props {
		trap: Trap;
		skill: Skill;
		language: Language;
		mode: any;
		mapConfig: MapConfig;
	}

	let {
		trap,
		skill,
		language,
		mode,
		mapConfig
	}: Props = $props();
</script>

{#if mode === 'handbook'}
	<div class="grid grid-cols-[1fr_80px] gap-x-3 mt-6">
		<div class="self-end">
			<div class="relative h-max w-[80px]">
				{#if skill.hasIcon}
					<img
						src="/images/skill_icons/skill_icon_{getSkillImgUrl(skill.skillId)}.webp"
						width="80"
						height="80"
						loading="lazy"
						alt={''}
					/>
				{/if}
				{#if skill.skillType !== 'PASSIVE'}
					<div class="absolute flex -bottom-0.5 -right-0.5">
						{#if skill.spData?.initSp}
							<div
								class="grid grid-cols-[10px_1fr] items-center gap-x-px bg-[#434343] pl-[4px] pr-px"
							>
								<img src={charaAssets.sp_start} alt="start" />
								<p class="leading-tight">{skill.spData?.initSp}</p>
							</div>
						{/if}
						<div class="ml-1 grid grid-cols-[14px_1fr] items-center bg-[#434343] pr-px">
							<img src={charaAssets.sp_cost} alt="cost" />
							<p class="leading-tight">{skill.spData?.spCost}</p>
						</div>
					</div>
				{/if}
			</div>
			<p class="mt-1.5 {language !== 'en' ? 'text-center max-w-[90px] whitespace-nowrap' : ''}">
				{skill.name}
			</p>
		</div>
		{#if skill.rangeId}
			<div
				class="self-center flex flex-col items-center justify-center min-w-[72px] h-max min-h-[60px] p-2 pb-1 bg-[#161616] bg-opacity-80 rounded"
			>
				<div class="flex items-center h-full">
					<RangeParser rangeId={skill.rangeId} size="small" />
				</div>
				<p class="mt-1 text-xs">{translations[language].effect_range}</p>
			</div>
		{/if}
	</div>
	<div class="flex mt-2 text-sm">
		{#if skill.skillType !== 'PASSIVE' && skill?.spType !== 8}
			<p class="pill default max-w-[110px] {skill?.spType}">
				{translations[language][skill?.spType]}
			</p>
		{/if}
		<p class="pill default bg-[#737373]">{translations[language][skill.skillType]}</p>
		{#if skill?.duration > 0}
			<div class="pill default grid grid-cols-[20px_1fr] gap-x-0.5 items-center bg-[#555]">
				<Icon name="clock-icon" size={20} />
				<span>{skill?.duration}{language === 'en' ? 's' : '秒'}</span>
			</div>
		{/if}
	</div>
	<TextParser
		line={parseValues(trap, 0, skill, skill.desc, language, mapConfig, mode)}
		className="mt-1.5"
	/>
{:else}
	<div class="mt-2.5">
		<div class="flex gap-x-2.5">
			<p>{skill.name}</p>
			{#if skill.skillType !== 'PASSIVE'}
				<div class="flex h-max self-center">
					{#if skill.spData?.initSp}
						<div
							class="grid grid-cols-[10px_1fr] gap-x-px items-center bg-[#434343] pl-[4px] p-0.5"
						>
							<img src={charaAssets.sp_start} alt="start" />
							<p class="leading-tight">{skill.spData?.initSp}</p>
						</div>
					{/if}
					<div class="ml-1 grid grid-cols-[14px_1fr] items-center bg-[#434343] py-0.5 pr-0.5">
						<img src={charaAssets.sp_cost} alt="cost" />
						<p class="leading-tight">{skill.spData?.spCost}</p>
					</div>
				</div>
			{/if}
		</div>
		<div class="flex mt-1.5 text-sm">
			{#if skill.skillType !== 'PASSIVE' && skill?.spType !== 8}
				<p class="pill default {skill?.spType}">
					{translations[language][skill?.spType]}
				</p>
			{/if}
			<p class="pill default bg-[#737373]">{translations[language][skill.skillType]}</p>
			{#if skill?.duration > 0}
				<div class="pill default grid grid-cols-[20px_1fr] gap-x-0.5 items-center bg-[#555]">
					<Icon name="clock-icon" size={20} />
					<span>{skill?.duration}{language === 'en' ? 's' : '秒'}</span>
				</div>
			{/if}
		</div>
		<div class="flex gap-x-2.5">
			<TextParser
				line={parseValues(trap, 0, skill, skill.desc, language, mapConfig, mode)}
				className="mt-1.5"
			/>
			{#if skill.rangeId}
				<div
					class="flex flex-col items-center justify-center min-w-[72px] h-max min-h-[60px] p-2 pb-1 bg-[#161616] bg-opacity-80 rounded"
				>
					<div class="flex items-center h-full">
						<RangeParser rangeId={skill.rangeId} size="small" />
					</div>
					<p class="mt-1 text-xs">{translations[language].effect_range}</p>
				</div>
			{/if}
		</div>
	</div>
{/if}

<style>
	.pill.default {
		border-radius: 5px;
		padding: 0 5px 1px;
		text-align: center;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
</style>
