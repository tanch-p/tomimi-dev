<script lang="ts">
	import { getTranslations } from '$lib/functions/languageHelpers';
	import type { PageData } from './$types';
	import banner_sami from '$lib/images/banner_sami.webp';
	import TogglePanel from '$lib/components/TogglePanel.svelte';
	import HowToUse from '$lib/components/HowToUse.svelte';
	import SamiNavTemp from './SamiNavTemp.svelte';
	import TitleBlock from '$lib/components/TitleBlock.svelte';
	import Resources from '$lib/components/Resources.svelte';

	export let data: PageData;
	$: language = data.language;
</script>

<svelte:head>
	<title>{getTranslations(language).rogue_sami} / {getTranslations(language).title_post}</title>
	<meta name="description" content={getTranslations(language).title_post} />
	<meta property="og:description" content={getTranslations(language).title_post} />
	<meta property="og:title" content={getTranslations(language).rogue_sami} />
	<meta property="og:url" content={`https://tomimi.dev/${language}/sami`} />
</svelte:head>

<div class="bg-neutral-800 min-h-screen">
	<div class="pb-24 max-w-4xl mx-auto">
		<div class="py-4">
			<img
				class="select-none mx-auto py-2"
				src={banner_sami}
				alt={getTranslations(language).rogue_sami}
			/>
		</div>
		<div class="space-y-6">
			<Resources {language} />
			<TogglePanel title={getTranslations(language).how_to_use} isOpen={true}>
				<HowToUse {language} rogueTopic={'rogue_sami'} />
			</TogglePanel>
			<TitleBlock title={getTranslations(language).stage_nav}>
				<SamiNavTemp {language} />
			</TitleBlock>
		</div>
	</div>
</div>
