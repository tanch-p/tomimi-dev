<script lang="ts">
	import type { Enemy, Language } from '$lib/types';
	import translations from '$lib/translations.json';
	import { getDmgEleHighlight, getNormalAtk } from '$lib/functions/parseAtkType';

	interface Props {
		enemy: Enemy;
		language: Language;
		formIndex: number;
	}

	let { enemy, language, formIndex }: Props = $props();

	let attack = $derived(getNormalAtk(enemy, formIndex));
</script>

{#if attack.atk_type[0] !== 'raw'}
	<p class="flex gap-x-2 font-semibold mt-1">
		<span class="text-[#8c8d8c]">{translations[language].types[attack.atk_type[0]]}</span>
		{#if attack.atk_type[0] !== 'no_attack'}
			<span class={getDmgEleHighlight(attack.atk_type[1])}>
				{translations[language][attack.atk_type[1]]}
			</span>
		{/if}
	</p>
{:else}
	<span></span>
{/if}
