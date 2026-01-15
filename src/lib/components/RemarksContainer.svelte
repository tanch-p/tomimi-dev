<script lang="ts">
	import type { Enemy, Language } from '$lib/types';
	import Remark from './Remark.svelte';
	import StatusImmune from '$lib/components/StatusImmune.svelte';
	import EnemyFormTitle from './EnemyFormTitle.svelte';
	import { getEnemySkills, getStatusImmune } from '$lib/functions/skillHelpers';
	import translations from '$lib/translations.json';
	import { isEquals } from '$lib/functions/lib';

	interface Props {
		enemy: Enemy;
		row: number;
		language: Language;
		specialMods: any;
		mapConfig: any;
	}

	let {
		enemy,
		row,
		language,
		specialMods,
		mapConfig
	}: Props = $props();
	let traits = $derived(getEnemySkills(enemy, enemy.traits, row, $specialMods, 'trait'));
	let specialList = $derived(getEnemySkills(enemy, enemy.forms[row].special, row, $specialMods, 'special'));
	let statusImmuneList = $derived(getStatusImmune(enemy, enemy.forms[row].status_immune, $specialMods));
</script>

<div>
	{#if enemy.forms.length === 1}
		<StatusImmune {statusImmuneList} {language} mode="table" />
		<ul class="list-disc pl-5">
			{#if enemy.forms[row].stats.dmgRes}
				<li class="py-1">
					<p>{translations[language].dmg_res_short} - {enemy.forms[row].stats.dmgRes * 100}%</p>
					{#if enemy.key === "enemy_2119_dyshhj"}
					<p>不生效(25/07/25最终确认)</p>
					{/if}
				</li>
			{/if}
			{#each traits as skill}
				<Remark
					entity={enemy}
					formIndex={row}
					{skill}
					{language}
					{statusImmuneList}
					{mapConfig}
				/>
			{/each}
		</ul>
		<ul class="list-disc pl-5">
			{#each specialList as skill}
				<Remark
					entity={enemy}
					formIndex={row}
					{skill}
					{language}
					{statusImmuneList}
					{mapConfig}
				/>
			{/each}
		</ul>
	{:else}
		{@const statusImmuneSameAcrossForms = enemy.forms.reduce((acc, curr, i, list) => {
			if (i + 1 < list.length) {
				acc = acc && isEquals(list[i].status_immune, list[i + 1].status_immune);
			}
			return acc;
		}, true)}
		{#if row === 0}
			{#if statusImmuneSameAcrossForms}
				<StatusImmune {statusImmuneList} {language} mode="table" />
			{/if}
			<ul class="list-disc pl-5">
				{#if enemy.forms[row].stats.dmgRes}
					<li class="py-1">
						{translations[language].dmg_res_short} - {enemy.forms[row].stats.dmgRes * 100}%
					</li>
				{/if}
				{#each traits as skill}
					<Remark
						entity={enemy}
						formIndex={row}
						{skill}
						{language}
						{statusImmuneList}
						{mapConfig}
					/>
				{/each}
			</ul>
		{/if}
		<EnemyFormTitle {enemy} {row} {language} />
		{#if !statusImmuneSameAcrossForms}
			<StatusImmune {statusImmuneList} {language} mode="table" />
		{/if}
		<ul class="list-disc pl-5">
			{#each specialList as skill}
				<Remark
					entity={enemy}
					formIndex={row}
					{skill}
					{language}
					{statusImmuneList}
					{mapConfig}
				/>
			{/each}
		</ul>
	{/if}
</div>
