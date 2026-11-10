<script lang="ts">
	import { getTranslations } from '$lib/functions/languageHelpers';
	import type { Language } from '$lib/types';
	import { getRelicImagePath } from '$lib/data/is/relicImages';
	import { getFormTitle } from '$lib/functions/formHelpers';

	interface Props {
		enemy: any;
		formIndex: any;
		key: any;
		language: Language;
		inline?: boolean;
	}

	let { enemy, formIndex, key, language, inline = false }: Props = $props();
</script>

<div
	class="{inline
		? ''
		: 'absolute top-[125%] left-1/2 -translate-x-[calc(50%_-_10px)]'} w-max text-xs"
>
	{#if getTranslations(language)[key]}
		{getTranslations(language)[key]}
	{:else if key.includes('enemy')}
		<img
			class="select-none"
			src={`/images/enemy_icons/${key}.webp`}
			alt={key}
			height="30px"
			width="30px"
			decoding="async"
		/>
	{:else if key.includes('trap')}
		<img
			class="select-none"
			src={`/images/chara_icons/${key}.webp`}
			alt={key}
			height="30px"
			width="30px"
			decoding="async"
		/>
	{:else if key.startsWith('recalrune_')}
		<img
			src={key === 'recalrune_base'
				? '/images/recalrune/fixed_rune_icon.webp'
				: `/images/recalrune/r_${key.replace('recalrune_', '')}.webp`}
			alt={key}
			loading="lazy"
			height="30px"
			width="30px"
			decoding="async"
		/>
	{:else if key.includes('relic') || key.includes('copper')}
		<img
			src={getRelicImagePath(key)}
			alt={key}
			loading="lazy"
			height="30px"
			width="30px"
			decoding="async"
		/>
	{:else if key === 'form_mods'}
		{getFormTitle(enemy.forms[formIndex].title, formIndex, language)}
	{:else}
		{key}
	{/if}
</div>
