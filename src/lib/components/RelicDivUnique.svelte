<script lang="ts">
	import type { Language } from '$lib/types';
	import { relicLookup } from '$lib/data/is/relic_lookup';
	import TextParser from './TextParser.svelte';
	interface Props {
		relic: any;
		language: Language;
		selectedUniqueRelic: any;
	}

	let { relic = $bindable(), language, selectedUniqueRelic }: Props = $props();

	let name = $derived(relic[`name_${language}`] || relic[`name_zh`]);
	let tooltip = $derived(relic[`tooltip_${language}`] || relic[`tooltip_zh`]);

	relic.count = relic?.count || 0;
	let selected = $derived(Boolean($selectedUniqueRelic?.id === relic.id));

	function handleClick() {
		if (relic.stages) {
			if (selected) {
				relic.count++;
				if (relic.count > relic.stages?.length - 1) {
					relic.count = 0;
					selectedUniqueRelic.set(null);
				} else {
					selectedUniqueRelic.set(relic);
				}
			} else {
				relic.count = 0;
				selectedUniqueRelic.set(relic);
			}
			return;
		}
		if (selected) {
			selectedUniqueRelic.set(null);
		} else {
			selectedUniqueRelic.set(relic);
		}
	}
</script>

<div
	role="button"
	tabindex="0"
	class={`relic grid grid-cols-[75px_auto] sm:grid-cols-[95px_auto] gap-x-2 ${
		selected ? 'bg-neutral-800' : 'hover:bg-neutral-700'
	}`}
	onclick={handleClick}
	onkeydown={(event) => {
		if (event.key === 'Enter' || event.key === ' ') handleClick();
	}}
>
	<img
		src="/images/relics/{relicLookup[relic.id]}.webp"
		alt={name}
		loading="lazy"
		decoding="async"
		class="relic"
	/>
	<div class="relic px-2">
		<p class={`relic text-lg sm:text-xl ${selected ? 'text-[#cea658]' : 'text-gray-400'}`}>
			{name}
			{#if selected && relic.stages && relic?.stages?.[relic?.count]?.suffix}
				({relic?.stages?.[relic?.count]?.suffix})
			{/if}
		</p>
		<TextParser line={tooltip} className="relic text-[#c4c4c4]" />
	</div>
</div>
