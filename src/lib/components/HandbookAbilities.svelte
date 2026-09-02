<script lang="ts">
	import { getTranslations } from '$lib/functions/languageHelpers';
	import type { Enemy, Language } from '$lib/types';
	import Remark from './Remark.svelte';
	import EnemyFormTitle from './EnemyFormTitle.svelte';
	import { getEnemySkills, getHandbookEnemySkills } from '$lib/functions/skillHelpers';
	import HandbookSkills from './HandbookSkills.svelte';
	import { isEquals } from '$lib/functions/equalityHelpers';

	export let enemy: Enemy, language: Language, specialMods, statusImmuneList, formIndex, mapConfig;
	$: traits = getEnemySkills(enemy, enemy.traits, 0, $specialMods, 'trait').filter(
		(skill) => skill.type !== 'skill'
	);
	$: skills = getHandbookEnemySkills(enemy, $specialMods);
</script>

<HandbookSkills {enemy} {skills} {language} {statusImmuneList} {formIndex} {mapConfig} />
{#if traits.length > 0 || enemy.forms.some((form) => form.stats.dmgRes > 0 || form.special.length > 0)}
	{@const sameDmgRedAcrossForms = enemy.forms.reduce((acc, curr, i, list) => {
		if (i + 1 < list.length) {
			acc = acc && isEquals(list[i].stats.dmgRes, list[i + 1].stats.dmgRes);
		}
		return acc;
	}, true)}
	<p class="bg-[#383838] px-3.5 py-0.5 text-[#a2a5a5] font-bold">
		{getTranslations(language).handbook_ability}
	</p>
	<div class="py-1">
		<ul class="list-disc pl-4">
			{#if sameDmgRedAcrossForms}
				{#if enemy.forms[0].stats.dmgRes}
					<li class="py-1">
						{getTranslations(language).dmg_res_short} - {enemy.forms[0].stats.dmgRes * 100}%
						{#if enemy.key === 'enemy_2119_dyshhj'}
							(不生效，25/07/25最终确认)
						{/if}
					</li>
				{/if}
			{/if}
			{#each traits as skill}
				<Remark
					entity={enemy}
					formIndex={0}
					{skill}
					{language}
					mode={'handbook'}
					{statusImmuneList}
					{mapConfig}
				/>
			{/each}
		</ul>
		{#each enemy.forms as form, i}
			{@const specialList = getEnemySkills(enemy, form.special, i, $specialMods, 'special').filter(
				(skill) => skill.type !== 'skill'
			)}
			<ul class="list-disc pl-4">
				{#if !sameDmgRedAcrossForms}
					<li class="py-1">
						{getTranslations(language).dmg_res_short} - {form.stats.dmgRes * 100}%
					</li>
				{/if}
			</ul>
			<EnemyFormTitle {enemy} row={i} {language} />
			<ul class="list-disc pl-4">
				{#each specialList as skill}
					<Remark
						entity={enemy}
						formIndex={i}
						{skill}
						{language}
						mode={'handbook'}
						{statusImmuneList}
						{mapConfig}
					/>
				{/each}
			</ul>
		{/each}
	</div>
{/if}
