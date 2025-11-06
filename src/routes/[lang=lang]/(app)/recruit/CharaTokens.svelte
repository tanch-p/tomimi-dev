<script lang="ts">
	import type { Language } from '$lib/types';
	import { charaAssets } from '$lib/data/chara/chara_assets';
	import translations from '$lib/translations.json';
	import TextParser from '$lib/components/TextParser.svelte';
	import RangeParser from '$lib/components/RangeParser.svelte';
	import {
		getFullCharStat,
		getModuleStat,
		getSkillImgUrl,
		getTokenModuleTalent,
		getTokenModuleTrait,
		getTokenPosition
	} from '$lib/functions/charaHelpers';

	export let tokens, chara, moduleIndex, moduleStage, language: Language;

	const tokensWithoutIcon = [
		'token_10012_rosmon_shield',
		'token_10015_dusk_drgn',
		'token_10040_siege2_vlion',
		'token_10058_sbell2_icetgt'
	];
	const statKeys = ['hp', 'respawnTime', 'atk', 'cost', 'def', 'blockCnt', 'res', 'aspd'];

	let tokenSkillIndex = 0;
	const tokenToSkill1to1Linked = chara.tokens.length === chara.skills.length;
	const tokenToSkillManyLinked = chara.tokens[0].skills.length === chara.skills.length;
</script>

<p class="mt-6">
	{translations[language].token}
</p>
{#if tokenToSkill1to1Linked || tokenToSkillManyLinked}
	<div class="flex justify-evenly mt-6">
		{#each chara.skills as skill, skillIdx}
			<button class="relative" on:click={() => (tokenSkillIndex = skillIdx)}>
				{#if tokenSkillIndex === skillIdx}
					<div class="absolute w-full h-full border-[3px] border-[#0098dc]" />
				{/if}
				<img
					src="/images/skill_icons/skill_icon_{getSkillImgUrl(skill.skillId)}.webp"
					width="80"
					height="80"
					loading="lazy"
					alt={''}
				/>
			</button>
		{/each}
	</div>
{/if}
{#each tokens as token, tokenIdx}
	<div hidden={tokenToSkill1to1Linked && tokenSkillIndex !== tokenIdx}>
		<div class="flex gap-x-4 mt-8">
			{#if !tokensWithoutIcon.includes(token.id)}
				<div
					class="flex items-center justify-center border-4 border-[#3a3a3a] bg-[#181818] w-[100px] h-[100px]"
				>
					<img src="/images/chara_icons/{token.id}.webp" alt={''} />
				</div>
			{/if}
			<div>
				<p class="text-xl">{token.name}</p>
				<div
					class="flex items-center justify-center rounded-[5px] bg-[#555] mt-1.5 px-2 h-[24px] w-max min-w-[60px]"
				>
					{translations[language][
						`position_${getTokenPosition(token, chara.uniequip[moduleIndex])}`
					]}
				</div>
				<p class="text-[#999] mt-1.5">*{translations[language].token_stat_remark}</p>
			</div>
		</div>
		<div class="grid grid-cols-[130px_1fr] sm:grid-cols-[1fr_2fr] gap-2 mt-4">
			<div class="flex flex-col items-center w-full p-2 pb-1 bg-[#161616] bg-opacity-80 rounded">
				<div class="flex items-center h-full">
					<RangeParser rangeId={token.stats.rangeId} />
				</div>
				<p class="mt-1">{translations[language].attack_range}</p>
			</div>

			<div class="grid grid-cols-2 gap-x-2 gap-y-1.5 h-min">
				{#each statKeys as statKey}
					{@const moduleStat = getModuleStat(
						statKey,
						chara.uniequip?.[moduleIndex]?.combatData?.phases?.[moduleStage]
							?.tokenAttributeBlackboard?.[token.id]
					)}

					<div
						class="grid grid-cols-[20px_1fr] items-center gap-x-2 bg-[#161616] bg-opacity-80 h-[25px]"
					>
						<div class="flex items-center bg-[#444] h-full px-[1px]">
							<img src={charaAssets[statKey]} width="18px" height="18px" alt="" />
						</div>
						<p class="text-near-white whitespace-nowrap">
							{getFullCharStat(statKey, token, moduleStat, 0)}{statKey === 'respawnTime' ? 's' : ''}
							{#if moduleStat}
								<span class="text-red-400 text-sm">({moduleStat > 0 ? '+' : ''}{moduleStat})</span>
							{/if}
						</p>
					</div>
				{/each}
			</div>
		</div>
		<div class="px-1.5 mt-3">
			<p class="text-[#999] text-lg">{translations[language].trait}</p>
			<TextParser
				line={getTokenModuleTrait(token.desc, chara.uniequip[moduleIndex], moduleStage)}
				className="mt-1.5"
			/>
			{#if token.talents && token.talents.length > 0}
				<p class="mt-6 text-[#999] text-lg">{translations[language].talent}</p>
				{#each token.talents as talent, idx}
					{@const moduleTalentDesc = getTokenModuleTalent(
						idx,
						chara.uniequip[moduleIndex],
						moduleStage
					)}
					<p class="py-[1px] px-2 mt-4 w-max bg-[#f9f9f9] rounded-md font-medium text-[#333]">
						{talent.name}
					</p>
					<TextParser className="mt-1" line={moduleTalentDesc || talent.desc} />
				{/each}
			{/if}
			{#if token.skills && token.skills.length > 0}
				<p class="mt-6 text-[#999] text-lg">
					{translations[language].skill}
				</p>
				{#each token.skills as skill, skillIdx}
					<div hidden={tokenToSkillManyLinked && tokenSkillIndex !== skillIdx}>
						<div class="flex gap-x-4 mt-2.5">
							<div
								class="relative flex items-center justify-center w-[100px] h-[100px] {skill.iconId
									? ''
									: 'border-4 border-white bg-[linear-gradient(#191919,#666)]'}"
							>
								{#if skill.iconId}
									<img src="/images/skill_icons/skill_icon_{skill.iconId}.webp" alt={''} />
								{:else if !tokensWithoutIcon.includes(token.id)}
									<img src="/images/chara_icons/{token.id}.webp" alt={''} />
								{/if}
								<div class="absolute flex -bottom-0.5 -right-0.5">
									{#if skill?.spData?.spCost}
										<div
											class="grid grid-cols-[11px_1fr] items-center bg-[#434343] pl-[4px] pr-[1px]"
										>
											<img src={charaAssets.sp_start} alt="" />
											<p class="text-[20px] leading-tight">{skill?.spData?.initSp}</p>
										</div>

										<div class="ml-1 grid grid-cols-[16px_1fr] items-center bg-[#434343] pr-[1px]">
											<img src={charaAssets.sp_cost} alt="" />
											<p class="text-[20px] leading-tight">{skill?.spData?.spCost}</p>
										</div>
									{/if}
								</div>
							</div>
							<div>
								<p class="text-xl">{skill.name}</p>
								<div class="flex mt-2">
									{#if skill.skillType !== 'PASSIVE' && skill.spType !== 8}
										<p class="pill {skill?.spType}">
											{translations[language][skill?.spType]}
										</p>
									{/if}
									<p class="pill bg-[#737373]">
										{translations[language][skill.skillType]}
									</p>
								</div>
							</div>
						</div>
						<TextParser line={skill.desc} className="mt-1.5" />
					</div>
				{/each}
			{/if}
		</div>
	</div>
{/each}

<style>
	.pill {
		min-width: 72px;
		border-radius: 5px;
		padding: 0 6px 1px;
		text-align: center;
	}
</style>
