<script lang="ts">
	import { getTranslations } from '$lib/functions/languageHelpers';
	import type { Language, RogueTopic } from '$lib/types';
	import SpTerrain from './SpTerrain.svelte';
	import StageMap from './StageMap.svelte';
	import TextParser from './TextParser.svelte';
	import { getStageImg } from '$lib/functions/lib';

	export let mapConfig,
		language: Language,
		stageName: string,
		eliteMode,
		difficulty = 0,
		rogueTopic: RogueTopic = null;

	const getEliteDescColor = (rogueTopic: RogueTopic) => {
		switch (rogueTopic) {
			case 'rogue_sami':
				return 'text-[#dc555a]';
			case 'rogue_mizuki':
				return 'text-[#FF99CA]';
			case 'rogue_phantom':
				return 'text-[#ffb476]';
			default:
				return '';
		}
	};
</script>

<div class="sm:px-6 mb-4">
	<h1 id="stage-title" class="px-2 sm:px-0 text-3xl">
		{mapConfig?.code ?? ''}
		{stageName.replaceAll('_', ' ')}
	</h1>
	<hr class="border-gray-500 my-1" />
	{#if mapConfig?.[`description_${language}`] || mapConfig?.[`description_zh`]}
		<div class="px-2 sm:px-0">
			<TextParser line={mapConfig?.[`description_${language}`] || mapConfig?.[`description_zh`]} />
		</div>
	{/if}

	<div class="px-2 sm:px-0 mt-2.5">
		<p>
			{getTranslations(language).initialCost} - {mapConfig?.initialCost}
		</p>
		<p>
			{getTranslations(language).characterLimit} - {mapConfig?.characterLimit}
		</p>
		{#if mapConfig?.[`addInfo_${language}`]}
			<div class="flex gap-x-1 mt-4 sm:mt-2.5">
				<p class="whitespace-nowrap">{getTranslations(language).addInfo} -</p>
				<div>
					{#each mapConfig?.[`addInfo_${language}`] as line}
						<TextParser {line} />
					{/each}
				</div>
			</div>
		{/if}
		{#if mapConfig?.[`eliteDesc_${language}`]}
			<div class="flex gap-x-1 mt-4 sm:mt-2.5">
				<p class="whitespace-nowrap">
					<span class={`${getEliteDescColor(rogueTopic)}`}
						>{getTranslations(language).eliteDesc}</span
					>
					-
				</p>
				<div>
					{#each mapConfig?.[`eliteDesc_${language}`] as line}
						<TextParser {line} />
					{/each}
				</div>
			</div>
		{/if}
	</div>
	<div class="flex gap-x-1 mt-4 sm:mt-2.5 px-2 sm:px-0">
		<p class="whitespace-nowrap">
			<span class="">{getTranslations(language).outLink}</span>
			-
		</p>
		<div class="flex flex-wrap items-center gap-2">
			<a
				href="https://search.bilibili.com/all?keyword=明日方舟 {mapConfig?.name_zh}"
				target="_blank"
				rel="noopener noreferrer"
				class="text-blue-400 hover:text-blue-300"
			>
				bilibili
			</a>
			{#if mapConfig?.[`name_${language}`]}
				<a
					href="https://www.youtube.com/results?search_query={mapConfig?.[`name_${language}`]}"
					target="_blank"
					rel="noopener noreferrer"
					class="text-blue-400 hover:text-blue-300">YouTube</a
				>
			{/if}
			<a
				href="https://map.ark-nights.com/map/{getStageImg(mapConfig?.id, eliteMode)}"
				target="_blank"
				rel="noopener noreferrer"
				class="text-blue-400 hover:text-blue-300"
			>
				PRTS.Map
			</a>
		</div>
	</div>
</div>
<slot />
<slot name="drops" />
{#if mapConfig?.sp_terrain || rogueTopic === 'rogue_skz'}
	<SpTerrain {difficulty} spTerrain={mapConfig?.sp_terrain} {rogueTopic} {language} />
{/if}
<StageMap {mapConfig} {rogueTopic} {language} {eliteMode} />
