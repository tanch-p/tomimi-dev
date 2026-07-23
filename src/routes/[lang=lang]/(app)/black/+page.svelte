<script lang="ts">
	import { getTranslations } from '$lib/functions/languageHelpers';
	import type { PageData } from './$types';
	import banner_black from '$lib/images/banner_black.webp';
	import TogglePanel from '$lib/components/TogglePanel.svelte';
	import HowToUse from '$lib/components/HowToUse.svelte';
	import StageNav from './StageNav.svelte';
	import TitleBlock from '$lib/components/TitleBlock.svelte';
	import BugList from '$lib/components/BugList.svelte';
	import Resources from '$lib/components/Resources.svelte';

	export let data: PageData;
	$: language = data.language;
	const docLink = 'https://docs.qq.com/sheet/DTGxyYk5QWFBEcmJx?opennew=1&tab=esedb6';
</script>

<svelte:head>
	<title>{getTranslations(language).rogue_black} / {getTranslations(language).title_post}</title>
	<meta name="description" content={getTranslations(language).title_post} />
	<meta property="og:description" content={getTranslations(language).title_post} />
	<meta property="og:title" content={getTranslations(language).rogue_black} />
	<meta property="og:url" content={`https://tomimi.dev/${language}/black`} />
</svelte:head>

<div class="bg-neutral-800 min-h-screen">
	<div class="pb-24 max-w-4xl mx-auto">
		<div class="py-4">
			<img
				class="select-none mx-auto py-2"
				src={banner_black}
				alt={getTranslations(language).rogue_black}
			/>
		</div>
		<div class="space-y-6">
			<Resources {language} rogueTopic={'rogue_black'} />
			<BugList list={[]} {language} {docLink} />
			<TogglePanel title={getTranslations(language).how_to_use} isOpen={false}>
				<HowToUse {language} rogueTopic={'rogue_black'} />
			</TogglePanel>
			<TitleBlock title={getTranslations(language).stage_nav}>
				<StageNav {language} />
			</TitleBlock>
		</div>
	</div>
</div>
