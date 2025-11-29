<script lang="ts">
	import MizukiNav from './MizukiNav.svelte';
	import type { PageData } from './$types';
	import banner_mizuki from '$lib/images/banner_mizuki_800px.webp';
	import translations from '$lib/translations.json';
	import TogglePanel from '$lib/components/TogglePanel.svelte';
	import HowToUse from '$lib/components/HowToUse.svelte';
	import TitleBlock from '$lib/components/TitleBlock.svelte';
	import Resources from '$lib/components/Resources.svelte';

	export let data: PageData;
	$: language = data.language;
</script>

<svelte:head>
	<title>{translations[language].rogue_mizuki} / {translations[language].title_post}</title>
	<meta name="description" content={translations[language].title_post} />
	<meta property="og:description" content={translations[language].title_post} />
	<meta property="og:title" content={translations[language].rogue_mizuki} />
	<meta property="og:url" content={`https://tomimi.dev/${language}/mizuki`} />
</svelte:head>

<div class="bg-neutral-800 min-h-screen">
	<div class="pb-24 max-w-4xl mx-auto">
		<div class="py-4">
			<img
				class="select-none mx-auto py-2"
				src={banner_mizuki}
				alt={translations[language].rogue_mizuki}
			/>
		</div>
		<div class="space-y-6">
			<Resources {language}/>
			<TogglePanel title={translations[language].how_to_use} isOpen={true}>
				<HowToUse {language} rogueTopic={'rogue_mizuki'} />
			</TogglePanel>
			<TogglePanel title={translations[language].related_tools}>
				<ul class="text-lg pt-2 pb-6">
					<li class="list-disc list-inside">
						<a class="text-sky-500 hover:underline" href="/{language}/laoli">
							{translations[language].laoli_title}
						</a>
					</li>
				</ul>
			</TogglePanel>
			<TitleBlock title={translations[language].stage_nav}>
				<MizukiNav {language} />
			</TitleBlock>
		</div>
	</div>
</div>
