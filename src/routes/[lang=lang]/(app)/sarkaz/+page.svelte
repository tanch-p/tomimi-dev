<script lang="ts">
	import { getTranslations } from '$lib/functions/languageHelpers';
	import type { PageData } from './$types';
	import type { Language } from '$lib/types';
	import banner_sarkaz from '$lib/images/banner_sarkaz.webp';
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
	<title>{getTranslations(language).rogue_skz} / {getTranslations(language).title_post}</title>
	<meta name="description" content={getTranslations(language).title_post} />
	<meta property="og:description" content={getTranslations(language).title_post} />
	<meta property="og:title" content={getTranslations(language).rogue_skz} />
	<meta property="og:url" content={`https://tomimi.dev/${language}/sami`} />
</svelte:head>

<div class="bg-neutral-800 min-h-screen">
	<div class="pb-24 max-w-4xl mx-auto">
		<div class="py-4">
			<img
				class="select-none mx-auto py-2"
				src={banner_sarkaz}
				alt={getTranslations(language).rogue_skz}
			/>
		</div>
		<div class="space-y-6">
			<Resources {language} rogueTopic={'rogue_skz'} />
			<TogglePanel title={getTranslations(language).how_to_use} isOpen={true}>
				<HowToUse {language} rogueTopic={'rogue_skz'} />
			</TogglePanel>
			<Fragments {language} />
			<TitleBlock title={getTranslations(language).stage_nav}>
				<NavTemp {language} />
			</TitleBlock>
		</div>
	</div>
</div>
