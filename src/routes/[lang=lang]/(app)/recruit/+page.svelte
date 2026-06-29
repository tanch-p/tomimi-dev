<script lang="ts">
	import { getTranslations } from '$lib/functions/languageHelpers';
	import type { PageData } from './$types';
	import type { Language } from '$lib/types';
	import { filters, globalCheck, sortFunction } from './stores';
	import { getCharaList } from '$lib/functions/charaHelpers';
	import DisplayContainer from './ResultsContainer.svelte';
	import CharaFilter from './CharaFilter.svelte';
	import CharaFilterDesc from './CharaFilterDesc.svelte';
	import CharaSortOptions from './CharaSortOptions.svelte';
	import CharaSecFilter from './CharaSecFilter.svelte';
	import CharaPopup from './CharaPopup.svelte';
	import ClearButton from './ClearButton.svelte';
	import Settings from './FilterSettings.svelte';

	export let data: PageData;

	let language: Language;
	$: language = data.language;
	let loading = true;
	let characters = [];

	const loadData = async (language: Language) => {
		characters = await getCharaList(language);
	};
</script>

<svelte:head>
	<title>{getTranslations(language).chara_page} / {getTranslations(language).title_post}</title>
	<meta name="description" content={getTranslations(language).title_post} />
	<meta property="og:description" content={getTranslations(language).title_post} />
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
			<p class="text-center">{getTranslations(language).data_loading}</p>
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
