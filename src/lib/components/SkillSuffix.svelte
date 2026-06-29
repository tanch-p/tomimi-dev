<script lang="ts">
	import { getTranslations } from '$lib/functions/languageHelpers';
	import type { Language } from '$lib/types';
	export let normalAttack, language: Language;
	$: atk_type = normalAttack.atk_type;
	$: hits = normalAttack.hits;
	$: separator = language === 'en' ? '/' : '・';
	$: hasAtkElement = atk_type[0] !== 'raw' && atk_type[0] !== 'no_attack';
</script>

<!-- {@debug normalAttack} -->

{#if atk_type[0] !== 'raw'}
	{#if hits > 1}
		{`x ${hits}`}
	{/if}
	{'('}{getTranslations(language)[atk_type[0]]}{#if hasAtkElement}{separator}<span
			class={getDmgEleHighlight(atk_type[1])}>{getTranslations(language)[atk_type[1]]}</span
		>{/if}{')'}
{/if}
