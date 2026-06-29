<script lang="ts">
	import { getTranslations } from '$lib/functions/languageHelpers';
	import type { Enemy, Language } from '$lib/types';
	import { getDmgEleHighlight, getNormalAtk } from '$lib/functions/parseAtkType';

	export let enemy: Enemy, language: Language, formIndex: number;

	$: attack = getNormalAtk(enemy, formIndex);
</script>

{#if attack.atk_type[0] !== 'raw'}
	<p class="flex gap-x-2 font-semibold mt-1">
		<span class="text-[#8c8d8c]">{getTranslations(language).types[attack.atk_type[0]]}</span>
		{#if attack.atk_type[0] !== 'no_attack'}
			<span class={getDmgEleHighlight(attack.atk_type[1])}>
				{getTranslations(language)[attack.atk_type[1]]}
			</span>
		{/if}
	</p>
{:else}
	<span />
{/if}
