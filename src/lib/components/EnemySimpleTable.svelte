<script lang="ts">
	import { getTranslations } from '$lib/functions/languageHelpers';
	import type { Enemy, Language, StatMods } from '$lib/types';
	import { tableHeaders } from '../../routes/stores';
	import EnemySimpleRow from './EnemySimpleRow.svelte';
	import EnemyTableOptions from './EnemyTableOptions.svelte';
	import Tooltip from './Tooltip.svelte';
	export let enemies: Enemy[],
		language: Language,
		statMods: StatMods,
		specialMods,
		otherBuffsList,
		mapConfig;
	$: filteredTableHeaders = $tableHeaders.filter(({ key, show }) => show);

	const tooltips = { e_hp: 'tooltip_ehp' };
</script>

<EnemyTableOptions {language} />
<div id="table-wrapper" class="w-screen sm:w-full">
	<table class="border border-gray-400 border-collapse bg-neutral-800 text-near-white w-full">
		<thead>
			<tr>
				{#each filteredTableHeaders as { key }}
					<th
						class={`border border-gray-400 border-solid py-0.5 px-1.5 ${
							language === 'en' ? 'sm:leading-none' : ''
						}`}
					>
						<div class="relative group">
							{getTranslations(language).table_headers[key] || getTranslations(language)[key]}
							{#if Boolean(tooltips?.[key])}
								&#9432;
								<Tooltip text={getTranslations(language)[tooltips[key]]} />
							{/if}
						</div>
					</th>
				{/each}
			</tr>
		</thead>
		<tbody>
			{#each enemies as enemy, index}
				<EnemySimpleRow
					{enemy}
					{filteredTableHeaders}
					{index}
					{language}
					{statMods}
					{specialMods}
					{otherBuffsList}
					{mapConfig}
				/>
			{/each}
		</tbody>
	</table>
</div>
