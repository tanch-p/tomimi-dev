<script lang="ts">
	import { clickOutside } from '$lib/functions/clickOutside.js';
	import { page } from '$app/stores';
	import Icon from './Icon.svelte';
	import stageNameOverwriteTable from '$lib/data/stages/stage_name_overwrite_table.json';

	let showOptions = false;
	let pathEN: string, pathJA: string, pathZH: string;

	$: mapConfig = $page.data.mapConfig;
	$: language = $page.data.language;
	$: pathname = $page.url.pathname;
	$: code = mapConfig?.code;
	$: name_zh = mapConfig?.name_zh;
	$: name_ja = mapConfig?.name_ja;
	$: name_en = mapConfig?.name_en;
	$: if (mapConfig) {
		if (name_zh === '「」') {
			pathEN = `/en/stages/ro4_b_9`;
			pathJA = `/ja/stages/ro4_b_9`;
			pathZH = `/zh/stages/ro4_b_9`;
		} else if (stageNameOverwriteTable[mapConfig?.levelId]) {
			const info = stageNameOverwriteTable[mapConfig?.levelId];
			pathEN = `/en/stages/${code}_${info['name_en'] || info['name_zh']}`;
			pathJA = `/ja/stages/${code}_${info['name_ja'] || info['name_zh']}`;
			pathZH = `/zh/stages/${code}_${info['name_zh']}`;
		} else {
			pathEN = `/en/stages/${code}_${name_en || name_zh}`;
			pathJA = `/ja/stages/${code}_${name_ja || name_zh}`;
			pathZH = `/zh/stages/${code}_${name_zh}`;
		}
	} else {
		pathEN = pathname.replace(language, 'en');
		pathJA = pathname.replace(language, 'ja');
		pathZH = pathname.replace(language, 'zh');
	}
	const languageCodes = { en: 'EN', ja: '日本語', zh: '中文' };
</script>

<div class="relative" use:clickOutside on:outclick={() => (showOptions = false)}>
	<button on:click={() => (showOptions = !showOptions)} class="sm:py-1 px-2 hover:underline h-full">
		<span class="flex gap-x-1.5">
			<Icon name="icon-language" size="20" className="mb-0.5" />
			{languageCodes[language]}</span
		>
	</button>
	{#if showOptions}
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<div
			on:click={() => (showOptions = false)}
			class="absolute w-max mt-1 py-0.5 bg-neutral-900 select-none"
		>
			<a href={pathEN}><div class="px-2 my-0.5 hover:bg-gray-600">English</div></a>
			<a href={pathJA}><div class="px-2 my-0.5 hover:bg-gray-600">日本語</div></a>
			<a href={pathZH}><div class="px-2 my-0.5 hover:bg-gray-600">中文</div></a>
		</div>
	{/if}
</div>

<style>
	span {
		display: flex;
		height: 100%;
		align-items: center;
		font-weight: 700;
		font-size: 0.9rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		text-decoration: none;
	}
</style>
