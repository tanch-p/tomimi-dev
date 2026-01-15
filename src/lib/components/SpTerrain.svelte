<script lang="ts">
	import type { Language, RogueTopic } from '$lib/types';
	import translations from '$lib/translations.json';
	import spTerrainList from '$lib/sp_terrain_list.json';
	import SpTerrainDesc from './SpTerrainDesc.svelte';
	import { getSkzdwzDesc } from '$lib/functions/rogueHelpers';
	interface Props {
		spTerrain: any;
		rogueTopic: RogueTopic;
		difficulty: any;
		language: Language;
	}

	let {
		spTerrain,
		rogueTopic,
		difficulty,
		language
	}: Props = $props();
</script>

<div class="sm:px-6 my-4">
	<h2 class="px-2 sm:px-0 text-subheading mt-4">{translations[language].spTerrain}</h2>
	<hr class="border-gray-500 my-1" />
	<div class="px-2 sm:px-0">
		<table class="mt-4 sm:mx-auto">
			<thead>
				<tr>
					<th class="border border-gray-400 border-solid py-0.5 px-1.5 md:min-w-[50px]"
						>{translations[language].name}</th
					>
					<th class="border border-gray-400 border-solid py-0.5 px-2.5 md:min-w-[50px] sm:text-left"
						>{translations[language].sp_terrain_desc}</th
					>
				</tr>
			</thead>
			<tbody>
				{#if spTerrain}
					{#each spTerrain as terrain}
						<tr>
							<td class="min-w-[82px] border border-gray-400 px-2 py-1.5 text-center">
								{spTerrainList[terrain.tileKey][`name_${language}`]}
								{#if terrain.alias}({translations[language][terrain.alias]}){/if}
							</td>
							<SpTerrainDesc
								blackboard={terrain.blackboard}
								description={spTerrainList[terrain.tileKey][`description_${language}`]}
							/>
						</tr>
					{/each}
				{/if}
				{#if rogueTopic === 'rogue_skz'}
					<tr>
						<td class="min-w-[82px] border border-gray-400 px-2 py-1.5 text-center">
							{spTerrainList.skzdwz[`name_${language}`]}
						</td>
						<SpTerrainDesc
							description={getSkzdwzDesc(spTerrainList.skzdwz[`description_${language}`],difficulty,language)}
						/>
					</tr>
				{/if}
			</tbody>
		</table>
	</div>
</div>
