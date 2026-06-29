<script lang="ts">
	import { getTranslations } from '$lib/functions/languageHelpers';
	import type { Language, MapConfig, Trap } from '$lib/types';
	import { page } from '$app/stores';
	import TextParser from './TextParser.svelte';
	import TrapSkill from './TrapSkill.svelte';
	import Remark from './Remark.svelte';
	import { getFormTitle, getTrapFormIndex } from '$lib/functions/lib';
	import RangeParser from './RangeParser.svelte';
	import { getTrapSpecialSkill } from '$lib/functions/trapHelpers';

	export let trap: Trap,
		mode = 'handbook',
		specialMods,
		mapConfig: MapConfig;
	let language: Language;
	$: language = $page.data.language;
</script>

{#if trap.desc}
	{#if mode === 'handbook'}
		<p class="bg-[#383838] px-3.5 py-0.5 text-[#a2a5a5] font-bold">
			{getTranslations(language).trait}<span class="font-normal" />
		</p>
	{/if}
	<ul class="list-disc pl-4 {mode === 'handbook' ? 'py-1' : ''}">
		<li class="py-1">
			<TextParser line={trap.desc} />
		</li>
	</ul>
{/if}
{#if trap.special.length > 0}
	{#if mode === 'handbook'}
		<p class="bg-[#383838] px-3.5 py-0.5 text-[#a2a5a5] font-bold">
			{getTranslations(language).handbook_mechanics}<span class="font-normal" />
		</p>
	{/if}
	<ul class="list-disc pl-4 py-1">
		<!-- {#if trap.stats.dmgRes}
			<li class="py-1">
				{getTranslations(language).dmg_res_short} - {trap.stats.dmgRes * 100}%
			</li>
		{/if} -->
		{#each trap.special as item, i}
			{#if typeof item === 'string'}
				<Remark
					entity={trap}
					formIndex={0}
					skill={getTrapSpecialSkill(trap.key, trap.stageId, item, specialMods)}
					{language}
					{mode}
					{mapConfig}
				/>
			{:else}
				{@const formIndex = getTrapFormIndex(trap.special, i)}
				{@const formTitle = getFormTitle('form', formIndex, language)}
				<div class="text-red-400 py-1">{formTitle}</div>
				{#each item as key}
					<Remark
						entity={trap}
						formIndex={0}
						skill={getTrapSpecialSkill(trap.key, trap.stageId, key, specialMods)}
						{language}
						{mode}
						{mapConfig}
					/>
				{/each}
			{/if}
		{/each}
	</ul>
{/if}

{#if trap.talents?.length > 0}
	{#if mode === 'handbook'}
		<p class="px-3.5 py-0.5 font-bold bg-[#383838] text-[#a2a5a5]">
			{getTranslations(language).talent}
		</p>
	{/if}
	<ul class="py-1 h-max {mode === 'table' ? 'pl-4 list-disc' : ''}">
		{#each trap.talents as talent}
			<li>
				{#if mode === 'handbook'}
					<p class="py-[1px] px-2 mt-1.5 w-max bg-[#d4d4d4] rounded-md font-medium text-[#333]">
						{talent.name}
					</p>
				{/if}
				<div class="py-1.5 {talent.rangeId ? 'grid grid-cols-[1fr_72px] gap-x-2' : ''}">
					<TextParser line={talent.desc} />
					{#if talent.rangeId}
						<div
							class="flex flex-col items-center w-[72px] p-2 pb-1 bg-[#161616] bg-opacity-80 rounded h-max"
						>
							<div class="flex items-center h-full">
								<RangeParser rangeId={talent.rangeId} size="small" />
							</div>
							<p class="mt-1 text-xs">{getTranslations(language).effect_range}</p>
						</div>
					{/if}
				</div>
			</li>
		{/each}
	</ul>
{/if}
{#if trap.skills?.length > 0}
	<p
		class="px-3.5 py-0.5 font-bold {mode === 'table'
			? 'bg-[#4f4f4f]'
			: 'bg-[#383838] text-[#a2a5a5]'}"
	>
		{getTranslations(language).skill}
	</p>
	<div class="pb-1.5 {mode === 'table' ? 'pl-4' : ''}">
		{#each trap.skills as skill}
			<TrapSkill {trap} {skill} {language} {mode} {mapConfig} />
		{/each}
	</div>
{/if}
