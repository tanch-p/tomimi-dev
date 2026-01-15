<script lang="ts">
	import type { Enemy, Language } from '$lib/types';
	import Icon from './Icon.svelte';
	import EnemySimpleTable from './EnemySimpleTable.svelte';
	import translations from '$lib/translations.json';
	import EnemyHandbookDisplay from './EnemyHandbookDisplay.svelte';

	interface Props {
		enemies: Enemy[];
		language: Language;
		statMods: any;
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
	let displayMode = $state('table');
</script>

<div class="grid grid-cols-2 place-items-center h-[58px] mt-3">
	<button
		class="flex items-center justify-center gap-x-1.5 w-full h-full bg-gray-500 {displayMode ===
		'table'
			? ''
			: 'brightness-50'}"
		onclick={() => (displayMode = 'table')}
	>
		<Icon name="icon-list" size={22} />

		<span class="text-lg">{translations[language].table_view}</span>
	</button>
	<button
		class="flex items-center justify-center gap-x-1.5 w-full h-full bg-gray-500 {displayMode ===
		'handbook'
			? ''
			: 'brightness-50'}"
		onclick={() => (displayMode = 'handbook')}
	>
		<Icon name="layout-view" size={28} />
		<span class="text-lg">{translations[language].handbook_view}</span>
	</button>
</div>

{#if displayMode === 'table'}
	<EnemySimpleTable {enemies} {language} {statMods} {specialMods} {otherBuffsList} {mapConfig}/>
{:else}
	<EnemyHandbookDisplay {enemies} {language} {statMods} {specialMods} {otherBuffsList} {mapConfig} mode="desktop" />
{/if}
