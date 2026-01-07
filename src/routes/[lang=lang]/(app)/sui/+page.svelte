<script lang="ts">
	import type { PageData } from './$types';
	import banner_sui from '$lib/images/banner_sui.webp';
	import translations from '$lib/translations.json';
	import TogglePanel from '$lib/components/TogglePanel.svelte';
	import HowToUse from '$lib/components/HowToUse.svelte';
	import StageNav from './StageNav.svelte';
	import TitleBlock from '$lib/components/TitleBlock.svelte';
	import BugList from '$lib/components/BugList.svelte';
	import suiBugList from '$lib/data/is/sui/bug_list.json';
	import Resources from '$lib/components/Resources.svelte';

	export let data: PageData;
	$: language = data.language;
	const docLink = "https://docs.qq.com/sheet/DTGxyYk5QWFBEcmJx?tab=48nkmm";
</script>

<svelte:head>
	<title>{translations[language].rogue_yan} / {translations[language].title_post}</title>
	<meta name="description" content={translations[language].title_post} />
	<meta property="og:description" content={translations[language].title_post} />
	<meta property="og:title" content={translations[language].rogue_yan} />
	<meta property="og:url" content={`https://tomimi.dev/${language}/sui`} />
</svelte:head>

<div class="bg-neutral-800 min-h-screen">
	<div class="pb-24 max-w-4xl mx-auto">
		<div class="py-4">
			<img
				class="select-none mx-auto py-2"
				src={banner_sui}
				alt={translations[language].rogue_yan}
			/>
		</div>
		<div class="space-y-6">
			<Resources {language} rogueTopic={'rogue_yan'}/>
			<BugList list={suiBugList} {language} {docLink}/>
			<TogglePanel title={translations[language].how_to_use} isOpen={false}>
				<HowToUse {language} rogueTopic={'rogue_yan'} />
			</TogglePanel>
			<TitleBlock title={translations[language].stage_nav}>
				<StageNav {language} />
			</TitleBlock>
		</div>
	</div>
</div>
