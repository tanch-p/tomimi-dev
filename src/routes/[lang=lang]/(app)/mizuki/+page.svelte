<script lang="ts">
	import { getTranslations } from '$lib/functions/languageHelpers';
	import MizukiNav from './MizukiNav.svelte';
	import type { PageData } from './$types';
	import banner_mizuki from '$lib/images/banner_mizuki.webp';
	import TogglePanel from '$lib/components/TogglePanel.svelte';
	import HowToUse from '$lib/components/HowToUse.svelte';
	import TitleBlock from '$lib/components/TitleBlock.svelte';
	import Resources from '$lib/components/Resources.svelte';

	export let data: PageData;
	$: language = data.language;
</script>

<svelte:head>
	<title>{getTranslations(language).rogue_mizuki} / {getTranslations(language).title_post}</title>
	<meta name="description" content={getTranslations(language).title_post} />
	<meta property="og:description" content={getTranslations(language).title_post} />
	<meta property="og:title" content={getTranslations(language).rogue_mizuki} />
	<meta property="og:url" content={`https://tomimi.dev/${language}/mizuki`} />
</svelte:head>

<div class="bg-neutral-800 min-h-screen">
	<div class="pb-24 max-w-4xl mx-auto">
		<div class="py-4">
			<img
				class="select-none mx-auto py-2"
				src={banner_mizuki}
				alt={getTranslations(language).rogue_mizuki}
			/>
		</div>
		<div class="space-y-6">
			<Resources {language} />
			<TogglePanel title={getTranslations(language).how_to_use} isOpen={true}>
				<HowToUse {language} rogueTopic={'rogue_mizuki'} />
			</TogglePanel>
			<TogglePanel title={getTranslations(language).related_tools}>
				<ul class="text-lg pt-2 pb-6">
					<li class="list-disc list-inside">
						<a class="text-sky-500 hover:underline" href="/{language}/laoli">
							{getTranslations(language).laoli_title}
						</a>
					</li>
				</ul>
			</TogglePanel>
			<TitleBlock title={getTranslations(language).stage_nav}>
				<MizukiNav {language} />
			</TitleBlock>
		</div>
	</div>
</div>
