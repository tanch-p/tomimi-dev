<script lang="ts">
	import type { Enemy, Language, Skill, StatusImmune, Trap } from '$lib/types';
	import translations from '$lib/translations.json';
	import { charaAssets } from '$lib/data/chara/chara_assets';
	import { getFormTitle } from '$lib/functions/lib';
	interface Props {
		entity: Enemy | Trap;
		skill: Skill;
		language: Language;
		mode?: string;
		statusImmuneList?: StatusImmune[];
	}

	let {
		entity,
		skill,
		language,
		mode = 'table',
		statusImmuneList = []
	}: Props = $props();
	let skillType = $derived(skill.skillType || 'COOLDOWN');
</script>

<div class="flex flex-wrap items-center mb-0.5">
	<p class="whitespace-nowrap {mode === 'table' ? 'mr-1.5' : 'mr-2.5'}">{skill.suffix[language]}</p>
	{#if skillType === 'COOLDOWN'}
		<div class={mode === 'table' ? '' : 'pill default bg-[#555]'}>
			{#if mode === 'table'}({/if}{translations[language].initCooldown}{#if language === 'en'}<sub
					>init</sub
				>&nbsp;{/if}<span
				class={skill?.overwrittenKeys?.includes('initCooldown') ? 'text-red-400 font-semibold' : ''}
				>{skill.initCooldown}</span
			>{translations[language].seconds_abbr} / {translations[language]
				.cooldown}{#if language === 'en'}<sub>n</sub>&nbsp;{/if}<span
				class={skill.overwrittenKeys.includes('cooldown') ? 'text-red-400 font-semibold' : ''}
				>{skill.cooldown}</span
			>{translations[language].seconds_abbr}{#if mode === 'table'}){/if}
		</div>
	{:else}
		<div class="flex items-center gap-x-1 rounded-[5px] text-sm bg-[#434343]">
			<div class="grid grid-cols-[9px_1fr] gap-x-px items-center pl-[4px] p-0.5">
				<img src={charaAssets.sp_start} alt="start" />
				<p
					class="leading-tight {skill?.overwrittenKeys?.includes('initSp')
						? 'text-red-400 font-semibold'
						: ''}"
				>
					{skill?.initSp}
				</p>
			</div>
			<div class="grid grid-cols-[12px_1fr] items-center py-0.5 pr-0.5">
				<img src={charaAssets.sp_cost} alt="cost" />
				<p
					class="leading-tight {skill?.overwrittenKeys?.includes('spCost')
						? 'text-red-400 font-semibold'
						: ''}"
				>
					{skill?.spCost}
				</p>
			</div>
		</div>
	{/if}
	<p class="pill default {skillType} ml-0.5">
		{translations[language][skillType]}
	</p>
	{#if skill.can_silence && !statusImmuneList.includes('silence')}
		<span class="skilltag can_silence ml-0!">{translations[language].can_silence}</span>
	{/if}
</div>
{#if entity.forms.length > 1 && skill.formIndexes}
	<p class="text-xs text-gray-400">
		&lt;{#each skill.formIndexes as idx, i}
			{#if i > 0}{translations[language].comma}{/if}<span
				>{getFormTitle(entity?.forms?.[idx]?.title, idx, language)}</span
			>{/each}&gt;
	</p>
{/if}

<style>
	.pill.default {
		display: flex;
		align-items: center;
		border-radius: 5px;
		height: min-content;
		padding: 0 5px 1px;
		text-align: center;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		font-size: 0.8rem;
	}
</style>
