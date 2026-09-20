<script lang="ts">
	import { clickOutside } from '$lib/functions/clickOutside.js';
	import { page } from '$app/state';
	import Icon from './Icon.svelte';
	import stageNameOverwriteTable from '$lib/data/stages/stage_name_overwrite_table.json';

	let showOptions = $state(false);

	let mapConfig = $derived(page.data.mapConfig);
	let language = $derived(page.data.language);
	let pathname = $derived(page.url.pathname);
	let code = $derived(mapConfig?.code);
	let name_zh = $derived(mapConfig?.name_zh);
	let name_ja = $derived(mapConfig?.name_ja);
	let name_en = $derived(mapConfig?.name_en);
	let paths = $derived.by(() => {
		if (mapConfig) {
			if (name_zh === '「」') {
				return { en: '/en/stages/ro4_b_9', ja: '/ja/stages/ro4_b_9', zh: '/zh/stages/ro4_b_9' };
			} else if (stageNameOverwriteTable[mapConfig?.levelId]) {
				const info = stageNameOverwriteTable[mapConfig?.levelId];
				return {
					en: `/en/stages/${code}_${info['name_en'] || info['name_zh']}`,
					ja: `/ja/stages/${code}_${info['name_ja'] || info['name_zh']}`,
					zh: `/zh/stages/${code}_${info['name_zh']}`
				};
			} else {
				return {
					en: `/en/stages/${code}_${name_en || name_zh}`,
					ja: `/ja/stages/${code}_${name_ja || name_zh}`,
					zh: `/zh/stages/${code}_${name_zh}`
				};
			}
		}
		return {
			en: pathname.replace(language, 'en'),
			ja: pathname.replace(language, 'ja'),
			zh: pathname.replace(language, 'zh')
		};
	});
	const languageCodes = { en: 'EN', ja: '日本語', zh: '中文' };
</script>

<div class="relative" {@attach clickOutside(() => (showOptions = false))}>
	<button onclick={() => (showOptions = !showOptions)} class="sm:py-1 px-2 hover:underline h-full">
		<span class="flex gap-x-1.5">
			<Icon name="icon-language" size="20" className="mb-0.5" />
			{languageCodes[language]}</span
		>
	</button>
	{#if showOptions}
		<div
			role="presentation"
			onclick={() => (showOptions = false)}
			class="absolute w-max mt-1 py-0.5 bg-neutral-900 select-none"
		>
			<a href={paths.en}><div class="px-2 my-0.5 hover:bg-gray-600">English</div></a>
			<a href={paths.ja}><div class="px-2 my-0.5 hover:bg-gray-600">日本語</div></a>
			<a href={paths.zh}><div class="px-2 my-0.5 hover:bg-gray-600">中文</div></a>
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
