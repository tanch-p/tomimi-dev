<script lang="ts">
	import type { Language } from '$lib/types';
	import type { Contracts } from '$lib/functions/recalRune';
	import type { Writable } from 'svelte/store';
	import { clearContracts, getScore } from '$lib/functions/recalRune';
	import { getTranslations } from '$lib/functions/languageHelpers';

	let { language, contracts }: { language: Language; contracts: Writable<Contracts | null> } =
		$props();

	let score = $derived(getScore($contracts));
</script>

<div class="flex items-center justify-end bg-[#2c2c2c] text-near-white">
	<button
		onclick={() => contracts.update((v) => clearContracts(v))}
		class="hover:brightness-150 active:brightness-125 pt-2"
	>
		<img src="/images/recalrune/button_clear.webp" class="h-[45px]" alt="clear" />
	</button>
	<div class="rounded w-[3px] h-[32px] bg-[#444] ml-2 mr-4"></div>
	<div class="flex items-center justify-center pr-4">
		<img src="/images/recalrune/icon_selected_score.webp" class="h-[45px]" alt="score" />
		<span class="ml-2 text-sm text-[#888]">{getTranslations(language).recal_score}</span>
		<p class="ml-3 w-[40px] text-end text-4xl">{score}</p>
	</div>
</div>
