<script lang="ts">
	import MediaQuery from './MediaQuery.svelte';
	import type { Enemy, SpecialMods, Language } from '$lib/types';
	import EnemyHandbookDisplay from './EnemyHandbookDisplay.svelte';
	import EnemyDesktopViewController from './EnemyDesktopViewController.svelte';

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
</script>

<MediaQuery>
	{#snippet mobile()}
		<EnemyHandbookDisplay {enemies} {language} {statMods} {specialMods} {otherBuffsList} {mapConfig}  />
	{/snippet}
	{#snippet pc()}
		<EnemyDesktopViewController {enemies} {language} {statMods} {specialMods} {otherBuffsList} {mapConfig}  />
	{/snippet}
</MediaQuery>
