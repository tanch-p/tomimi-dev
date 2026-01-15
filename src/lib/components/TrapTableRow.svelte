<script lang="ts">
	import { getTrapStatSkills } from '$lib/functions/skillHelpers';
	import type { Language, MapConfig, Trap } from '$lib/types';
	import OtherBuffs from './OtherBuffs.svelte';
	import RangeParser from './RangeParser.svelte';
	import StatSkills from './StatSkills.svelte';
	import StatusImmune from './StatusImmune.svelte';
	import TrapAbilities from './TrapAbilities.svelte';

	interface Props {
		trap: Trap;
		tableHeaders: any;
		index: any;
		language: Language;
		specialMods: any;
		otherBuffsList: any;
		mapConfig: MapConfig;
	}

	let {
		trap,
		tableHeaders,
		index,
		language,
		specialMods,
		otherBuffsList,
		mapConfig
	}: Props = $props();
</script>

<tr id={trap.key} class={`scroll-mt-24 ${index % 2 === 1 ? ' bg-[#333333]' : 'bg-neutral-800'}`}>
	{#each tableHeaders as key}
		{#if key === 'icon'}
			<td class={`border border-gray-400 w-[75px]`}>
				<img
					class="select-none"
					src={`/images/chara_icons/${trap.key}.webp`}
					height="75px"
					width="75px"
					decoding="async"
					alt={trap.name}
				/>
			</td>
		{:else if key === 'name'}
			<td class={`border border-gray-400 h-[65px] text-left px-2.5`}>
				<p class="min-w-[80px] max-w-[110px]">
					{trap.name}
				</p>
			</td>
			<!-- {:else if key === 'type'}
			<td class={`border border-gray-400 h-[65px] text-center>
				<div>
					{#each trap.type.filter((ele) => ele !== 'NORMAL') as type}
						<p class="whitespace-nowrap">{translations[language].types[type]}</p>
					{/each}
				</div>
			</td> -->
		{:else if key === 'range_display'}
			<td class={`border border-gray-400 text-center px-1`}>
				{#if trap.stats.rangeId}
					<div
						class="flex flex-col items-center w-[72px] mx-auto p-2 pb-1 bg-[#161616] bg-opacity-80 rounded h-max"
					>
						<div class="flex items-center">
							<RangeParser rangeId={trap.stats.rangeId} size="small" />
						</div>
					</div>
				{:else}
					-
				{/if}
			</td>
		{:else if key === 'remarks'}
			<td class={`border border-gray-400 text-start px-2 py-2 max-w-[500px]`}>
				<StatusImmune statusImmuneList={trap.status_immune} {language} mode="table" />
				<TrapAbilities {trap} {specialMods} {mapConfig} mode="table" />
			</td>
		{:else if key === 'other_buffs'}
			<td class="border border-gray-400 px-1.5">
				{#if trap.key === 'trap_760_skztzs'}
					<OtherBuffs {otherBuffsList} {language} entity={trap} mode="table" />
				{/if}
			</td>
		{:else}
			<td
				class="border border-gray-400 h-[65px] {key === 'atk'
					? 'text-start px-3'
					: 'text-center px-1'}"
			>
				<div>
					<p class={`whitespace-nowrap`}>
						{trap.stats[key] < 0 ? '-' : trap.stats[key]}
					</p>
					{#if key === 'atk'}
						<StatSkills
							entity={trap}
							formIndex={0}
							skills={getTrapStatSkills(trap)}
							stat={key}
							statValue={trap.stats[key]}
							{language}
						/>
					{/if}
				</div>
			</td>
		{/if}
	{/each}
</tr>
