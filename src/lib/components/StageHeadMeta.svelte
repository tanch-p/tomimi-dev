<script lang="ts">
	import type { Language, MapConfig } from "$lib/types";
    import translations from "$lib/translations.json"

    export let mapConfig:MapConfig, stageName:string,language:Language

</script>

<svelte:head>
	<title
		>{mapConfig?.code}
		{stageName.replaceAll('_', ' ')} / {translations[language].title_post}</title
	>
	<meta name="description" content={translations[language].title_post} />
	<meta property="og:description" content={translations[language].title_post} />
	<meta property="og:title" content={mapConfig?.code + '_' + stageName} />
	<meta
		property="og:url"
		content={`https://tomimi.dev/${language}/stages/${mapConfig?.code + '_' + stageName}`}
	/>
</svelte:head>