<script lang="ts">
	import type { Language } from '$lib/types';
	import type { Contracts, Crisis } from '$lib/functions/recalRune';
	import type { Writable } from 'svelte/store';
	import TogglePanel from '../TogglePanel.svelte';
	import ContractDesc from './ContractDesc.svelte';
	import ContractScore from './ContractScore.svelte';
	import ContractSelector from './ContractSelector.svelte';
	import { getTranslations } from '$lib/functions/languageHelpers';

	let {
		language,
		crisis,
		contracts
	}: { language: Language; crisis: Crisis; contracts: Writable<Contracts | null> } = $props();

	let selectorHeight = $state(0);
</script>

<TogglePanel
	title={getTranslations(language).contract_list}
	size="subheading"
	isOpen={true}
	className="my-3"
>
	<div class="flex flex-wrap md:flex-nowrap">
		<div bind:clientHeight={selectorHeight} class="flex flex-col h-min">
			<ContractSelector {contracts} />
			<ContractScore {language} {contracts} />
		</div>
		<div
			class="w-full bg-[#1b1b1b] text-near-white max-h-[60vh] md:max-h-full overflow-y-auto"
			style:height={selectorHeight ? `${selectorHeight}px` : '60vh'}
		>
			<ContractDesc {language} {crisis} {contracts} />
		</div>
	</div>
</TogglePanel>
