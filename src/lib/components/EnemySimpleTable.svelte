<script lang="ts">
	import type { Enemy, Language, StatMods } from '$lib/types';
	import { tableHeaders } from '../../routes/stores';
	import EnemySimpleRow from './EnemySimpleRow.svelte';
	import EnemyTableOptions from './EnemyTableOptions.svelte';
	import translations from '$lib/translations.json';
	import Tooltip from './Tooltip.svelte';
	interface Props {
		enemies: Enemy[];
		language: Language;
		statMods: StatMods;
		specialMods: any;
		otherBuffsList: any;
		mapConfig: any;
	}

	let {
		enemies,
		language,
		statMods,
		specialMods,
		otherBuffsList,
		mapConfig
	}: Props = $props();
	let filteredTableHeaders = $derived($tableHeaders.filter(({ key, show }) => show));

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
							{translations[language].table_headers[key] || translations[language][key]}
							{#if Boolean(tooltips?.[key])}
								&#9432;
								<Tooltip text={translations[language][tooltips[key]]} />
							{/if}
						</div>
					</th>
				{/each}
			</tr>
		</thead>
		<tbody>
			{#each enemies as enemy, index}
				<EnemySimpleRow {enemy} {filteredTableHeaders} {index} {language} {statMods} {specialMods} {otherBuffsList} {mapConfig}/>
			{/each}
		</tbody>
	</table>
</div>
