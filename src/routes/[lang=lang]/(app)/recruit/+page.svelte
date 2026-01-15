<script lang="ts">
	import type { PageProps } from './$types';
	import type { Language } from '$lib/types';
	import { filters, globalCheck, sortFunction } from './stores';
	import { getCharaList } from '$lib/functions/chara/charaHelpers';
	import DisplayContainer from './ResultsContainer.svelte';
	import CharaFilter from './CharaFilter.svelte';
	import CharaFilterDesc from './CharaFilterDesc.svelte';
	import CharaSortOptions from './CharaSortOptions.svelte';
	import CharaSecFilter from './CharaSecFilter.svelte';
	import CharaPopup from './CharaPopup.svelte';
	import translations from '$lib/translations.json';
	import ClearButton from './ClearButton.svelte';
	import Settings from './FilterSettings.svelte';

	let { data }: PageProps = $props();
	let language: Language = $derived(data.language);
	
	let loading = true;
	let characters = $state([]);

	const loadData = async (language:Language) => {
		characters = await getCharaList(language);
	};
</script>

<svelte:head>
	<title>{translations[language].chara_page} / {translations[language].title_post}</title>
	<meta name="description" content={translations[language].title_post} />
	<meta property="og:description" content={translations[language].title_post} />
</svelte:head>

<ClearButton {language} />
<div class:loading class="chara pb-60">
	<div class="sm:mx-10">
		<div class="max-w-5xl mx-auto pt-6 md:pt-10 pb-4 text-[0.75rem] md:text-[0.875rem] {language}">
			<Settings {language} />
			<CharaFilter {language} />
			<CharaSortOptions {language} />
			<CharaSecFilter {language} />
		</div>
		{#await loadData(language)}
			<p class="text-center">{translations[language].data_loading}</p>
		{:then}
			<DisplayContainer
				characters={characters.filter($globalCheck).filter($filters).sort($sortFunction)}
				{language}
			/>
		{:catch error}
			<p class="text-center">An Error occured while loading <br />{error.message}</p>
		{/await}
	</div>
	<CharaFilterDesc {language} />
	<CharaPopup {language} />
</div>