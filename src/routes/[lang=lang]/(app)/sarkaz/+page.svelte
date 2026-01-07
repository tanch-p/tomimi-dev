<script lang="ts">
	import type { PageData } from './$types';
	import type { Language } from '$lib/types';
	import banner_sarkaz from '$lib/images/banner_sarkaz_800px.webp';
	import translations from '$lib/translations.json';
	import TogglePanel from '$lib/components/TogglePanel.svelte';
	import HowToUse from '$lib/components/HowToUse.svelte';
	import NavTemp from './NavTemp.svelte';
	import Fragments from './Fragments.svelte';
	import TitleBlock from '$lib/components/TitleBlock.svelte';
	import Resources from '$lib/components/Resources.svelte';

	export let data: PageData, language: Language;
	$: language = data.language;
</script>

<svelte:head>
	<title>{translations[language].rogue_skz} / {translations[language].title_post}</title>
	<meta name="description" content={translations[language].title_post} />
	<meta property="og:description" content={translations[language].title_post} />
	<meta property="og:title" content={translations[language].rogue_skz} />
	<meta property="og:url" content={`https://tomimi.dev/${language}/sami`} />
</svelte:head>

<div class="bg-neutral-800 min-h-screen">
	<div class="pb-24 max-w-4xl mx-auto">
		<div class="py-4">
			<img
				class="select-none mx-auto py-2"
				src={banner_sarkaz}
				alt={translations[language].rogue_skz}
			/>
		</div>
		<div class="space-y-6">
			<Resources {language} rogueTopic={'rogue_skz'}/>
			<TogglePanel title={translations[language].how_to_use} isOpen={true}>
				<HowToUse {language} rogueTopic={'rogue_skz'} />
			</TogglePanel>
			<Fragments {language} />
			<TitleBlock title={translations[language].stage_nav}>
				<NavTemp {language} />
			</TitleBlock>
		</div>
	</div>
</div>
