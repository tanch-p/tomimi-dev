<script lang="ts">
	import { getTranslations } from '$lib/functions/languageHelpers';
	import type { Enemy, Language } from '$lib/types';
	import Icon from './Icon.svelte';
	import EnemySimpleTable from './EnemySimpleTable.svelte';
	import EnemyHandbookDisplay from './EnemyHandbookDisplay.svelte';

	export let enemies: Enemy[], language: Language, statMods, specialMods, otherBuffsList, mapConfig;
	let displayMode = 'table';
</script>

<div class="grid grid-cols-2 place-items-center h-[58px] mt-3">
	<button
		class="flex items-center justify-center gap-x-1.5 w-full h-full bg-gray-500 {displayMode ===
		'table'
			? ''
			: 'brightness-50'}"
		on:click={() => (displayMode = 'table')}
	>
		<Icon name="icon-list" size={22} />

		<span class="text-lg">{getTranslations(language).table_view}</span>
	</button>
	<button
		class="flex items-center justify-center gap-x-1.5 w-full h-full bg-gray-500 {displayMode ===
		'handbook'
			? ''
			: 'brightness-50'}"
		on:click={() => (displayMode = 'handbook')}
	>
		<Icon name="layout-view" size={28} />
		<span class="text-lg">{getTranslations(language).handbook_view}</span>
	</button>
</div>

{#if displayMode === 'table'}
	<EnemySimpleTable {enemies} {language} {statMods} {specialMods} {otherBuffsList} {mapConfig} />
{:else}
	<EnemyHandbookDisplay
		{enemies}
		{language}
		{statMods}
		{specialMods}
		{otherBuffsList}
		{mapConfig}
		mode="desktop"
	/>
{/if}
