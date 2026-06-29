<script lang="ts">
	import { getTranslations } from '$lib/functions/languageHelpers';
	import type { Language, MapConfig } from '$lib/types';

	export let mapConfig: MapConfig, stageName: string, language: Language;
</script>

<svelte:head>
	<title
		>{mapConfig?.code}
		{stageName.replaceAll('_', ' ')} / {getTranslations(language).title_post}</title
	>
	<meta name="description" content={getTranslations(language).title_post} />
	<meta property="og:description" content={getTranslations(language).title_post} />
	<meta property="og:title" content={mapConfig?.code + '_' + stageName} />
	<meta
		property="og:url"
		content={`https://tomimi.dev/${language}/stages/${mapConfig?.code + '_' + stageName}`}
	/>
</svelte:head>
