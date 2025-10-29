<script lang="ts">
	import PhantomNav from './PhantomNav.svelte';
	import type { PageData } from './$types';
	import banner_phantom from '$lib/images/banner_phantom_800px.webp';
	import translations from '$lib/translations.json';
	import TogglePanel from '$lib/components/TogglePanel.svelte';
	import HowToUse from '$lib/components/HowToUse.svelte';
	import TitleBlock from '$lib/components/TitleBlock.svelte';
	import phBugList from '$lib/data/is/phantom/bug_list.json';
	import BugList from '$lib/components/BugList.svelte';

	export let data: PageData;
	$: language = data.language;
</script>

<svelte:head>
	<title>{translations[language].rogue_phantom} / {translations[language].title_post}</title>
	<meta name="description" content={translations[language].title_post} />
	<meta property="og:description" content={translations[language].title_post} />
	<meta property="og:title" content={translations[language].rogue_phantom} />
	<meta property="og:url" content={`https://tomimi.dev/${language}/phantom`} />
</svelte:head>

<div class="bg-neutral-800 min-h-screen">
	<div class="pb-24 max-w-6xl mx-auto">
		<div class="py-4">
			<img
				class="select-none mx-auto py-2"
				src={banner_phantom}
				alt={translations[language].rogue_phantom}
			/>
		</div>
		<div class="space-y-6">
			<BugList list={phBugList} {language} />
			<TogglePanel title={translations[language].how_to_use}>
				<HowToUse {language} rogueTopic={"rogue_phantom"}/>
			</TogglePanel>
			<TitleBlock title={translations[language].stage_nav}>
				<PhantomNav {language} />
			</TitleBlock>
		</div>
	</div>
</div>
