<script lang="ts">
	import type { Enemy, Language, EnemyFormType, StatMods } from '$lib/types';
	import { getNormalAtk } from '$lib/functions/parseAtkType';
	import { getStatSkills } from '$lib/functions/skillHelpers';
	import RemarksContainer from '$lib/components/RemarksContainer.svelte';
	import AtkSuffix from '$lib/components/AtkSuffix.svelte';
	import StatSkills from '$lib/components/StatSkills.svelte';
	import translations from '$lib/translations.json';
	import OtherBuffs from './OtherBuffs.svelte';
	import { isEquals } from '$lib/functions/lib';

	interface Props {
		enemy: Enemy;
		index: number;
		filteredTableHeaders: any;
		language: Language;
		statMods: StatMods;
		specialMods: any;
		otherBuffsList: any;
		mapConfig: any;
	}

	let {
		enemy,
		index,
		filteredTableHeaders,
		language,
		statMods,
		specialMods,
		otherBuffsList,
		mapConfig
	}: Props = $props();

	function textAlign(statKey: string) {
		switch (statKey) {
			case 'hp':
				return 'text-center px-3';
			case 'type':
			case 'atk':
			case 'def':
				return 'text-left px-3 py-1.5';
			case 'remarks':
				return 'text-left px-2 py-2';
			default:
				return 'text-center py-1 px-1';
		}
	}

	const SHARE_HP_FORMS = ['prisoner_imprisoned', 'rage', 'normal_state'];

	const getMultispanKeys = (forms: EnemyFormType[]) => {
		const statKeys: string[] = [];
		if (!SHARE_HP_FORMS.includes(forms[0].title)) {
			statKeys.push('hp');
			statKeys.push('e_hp');
		}
		for (const form of forms) {
			for (const statKey of Object.keys(form.stats)) {
				if (form.stats[statKey] !== forms[0].stats[statKey]) {
					statKeys.push(statKey);
				}
			}
			if (!isEquals(form.normal_attack, forms[0].normal_attack)) {
				statKeys.push('atk');
			}
		}

		return statKeys;
	};
	let maxRowSpan = $derived(enemy.forms.length);
	let multispanKeys = $derived(getMultispanKeys(enemy?.forms));
</script>

<!-- {@debug enemy} -->

{#each enemy.forms as form, row (enemy.key.concat('-', row.toString()))}
	<tr
		id={enemy.stageId}
		class={`scroll-mt-24 ${index % 2 === 1 ? ' bg-[#333333]' : 'bg-neutral-800'}`}
	>
		{#each filteredTableHeaders as { key }}
			{#if key === 'enemy' && row === 0}
				<td class={`border border-gray-400 w-[75px] ${textAlign(key)}`} rowspan={maxRowSpan}>
					<img
						class="select-none"
						src={`/images/enemy_icons/${enemy.key}.webp`}
						height="75px"
						width="75px"
						decoding="async"
						alt={enemy.id}
						title={enemy[`name_${language}`] || enemy[`name_zh`]}
					/>
				</td>
			{:else if key === 'name' && row === 0}
				<td class={`border border-gray-400 h-[65px] text-left px-2.5`} rowspan={maxRowSpan}>
					<p class="min-w-[100px] max-w-[110px]">
						{enemy[`name_${language}`] || enemy[`name_zh`]}
					</p>
				</td>
			{:else if key === 'type' && row === 0}
				<td class={`border border-gray-400 h-[65px] ${textAlign(key)}`} rowspan={maxRowSpan}>
					<div>
						{#each enemy.type.filter((ele) => ele !== 'NORMAL') as type}
							<p class="whitespace-nowrap">{translations[language].types[type]}</p>
						{/each}
					</div>
				</td>
			{:else if key === 'remarks'}
				<td class={`border border-gray-400 h-[65px] ${textAlign(key)}`}>
					<RemarksContainer {enemy} {language} {row} {specialMods} {mapConfig} />
				</td>
			{:else if key === 'other_buffs' && row === 0}
				<td class="border border-gray-400 px-1.5" rowspan={maxRowSpan}>
					<OtherBuffs {otherBuffsList} {language} entity={enemy} mode="table" />
				</td>
			{:else if !(row !== 0 && !multispanKeys.includes(key))}
				<td
					class={`border border-gray-400 h-[65px] ${textAlign(key)}`}
					rowspan={multispanKeys.includes(key) ? 1 : maxRowSpan}
				>
					{#if key === 'e_hp'}
						<p>{Math.round(form.stats.hp / (1 - form.stats.dmgRes))}</p>
					{:else}
						<div>
							<p class={`whitespace-nowrap ${key === 'atk' ? 'flex' : ''}`}>
								{form.stats[key] === -1 ? '-' : form.stats[key]}
								{#if key === 'atk'}
									<AtkSuffix attack={getNormalAtk(enemy, row)} {language} />
								{/if}
							</p>
							<StatSkills
								entity={enemy}
								formIndex={row}
								skills={getStatSkills(
									enemy,
									key === 'atk' && !multispanKeys.includes('atk')
										? enemy.forms.reduce((acc, curr) => {
												acc = [...acc, ...curr.special];
												return acc;
										  }, [])
										: form.special,
									$specialMods
								)}
								stat={key}
								statValue={form.stats[key]}
								{language}
							/>
						</div>
					{/if}
				</td>
			{/if}
		{/each}
	</tr>
{/each}
