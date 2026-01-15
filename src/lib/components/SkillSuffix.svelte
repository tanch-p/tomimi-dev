<script lang="ts">
	import type {Language} from "$lib/types"
	import translations from '$lib/translations.json';
	interface Props {
		normalAttack: any;
		language: Language;
	}

	let { normalAttack, language }: Props = $props();
	let atk_type = $derived(normalAttack.atk_type);
	let hits = $derived(normalAttack.hits);
	let separator = $derived(language === 'en' ? '/' : '・');
	let hasAtkElement = $derived(atk_type[0] !== 'raw' && atk_type[0] !== 'no_attack');
</script>

<!-- {@debug normalAttack} -->

{#if atk_type[0] !== 'raw'}
	{#if hits > 1}
		{`x ${hits}`}
	{/if}
	{'('}{translations[language][atk_type[0]]}{#if hasAtkElement}{separator}<span
			class={getDmgEleHighlight(atk_type[1])}>{translations[language][atk_type[1]]}</span
		>{/if}{')'}
{/if}
