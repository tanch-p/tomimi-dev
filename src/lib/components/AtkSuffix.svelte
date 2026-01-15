<script lang="ts">
	import type { Language } from '$lib/types';
	import { getDmgEleHighlight } from '$lib/functions/parseAtkType';
	import translations from '$lib/translations.json';
	interface Props {
		attack: any;
		language: Language;
	}

	let { attack, language }: Props = $props();
	let atk_type = $derived(attack.atk_type);
	let hits = $derived(attack.hits);
	let separator = $derived(language === 'en' ? '/' : '・');
</script>

<!-- {@debug normalAttack} -->

{#if atk_type[0] !== 'raw'}
	{#if hits > 1}
		{`x ${hits}`}
	{/if}
	{#if atk_type[0] !== 'raw' && atk_type[0] !== 'no_attack'}
		{'('}{translations[language][atk_type[0]]}{separator}
		<span class={getDmgEleHighlight(atk_type[1])}>{translations[language][atk_type[1]]}</span>
		{')'}
	{/if}
{/if}
