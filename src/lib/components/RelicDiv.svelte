<script lang="ts">
	import type { Language, RogueTopic } from '$lib/types';
	import { relicLookup } from '$lib/data/is/relic_lookup';
	interface Props {
		relic: any;
		language: Language;
		rogueTopic: RogueTopic;
		selectedRelics: any;
	}

	let {
		relic = $bindable(),
		language,
		rogueTopic,
		selectedRelics
	}: Props = $props();

	let name = $derived(relic[`name_${language}`] || relic[`name_zh`]);
	let tooltip = $derived(relic[`tooltip_${language}`] || relic[`tooltip_zh`]);

	let selected = $state(false);
	relic.count = relic?.count || 0;

	selectedRelics.subscribe((list) => {
		selected = Boolean(list.find((item) => item.id === relic.id));
	});

	function handleClick() {
		if (relic.stages) {
			if (selected) {
				relic.count++;
				if (relic.count > relic.stages.length) {
					relic.count = 0;
					removeRelicFromList();
				} else {
					removeRelicFromList();
					addRelicToList();
				}
			} else {
				relic.count = 1;
				addRelicToList();
			}
			return;
		}
		if (!$selectedRelics.find((item) => item.id === relic.id)) {
			addRelicToList();
		} else {
			removeRelicFromList();
		}
	}
	function removeRelicFromList() {
		selectedRelics.update((list) => (list = list.filter((item) => item.id !== relic.id)));
	}
	function addRelicToList() {
		selectedRelics.update((list) => (list = [...list, relic]));
	}
	function getSelectedTextColor(rogueTopic: RogueTopic) {
		switch (rogueTopic) {
			case 'rogue_phantom':
				return 'text-[#cea658]';
			default:
				return 'text-[#58dbda]';
		}
	}
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<div
	id={relic.id}
	class={`relic grid grid-cols-[75px_auto] sm:grid-cols-[95px_auto] gap-x-2 ${
		selected ? 'bg-neutral-800' : 'hover:bg-neutral-700'
	}`}
	onclick={handleClick}
>
	<img
		src="/images/relics/{relicLookup?.[relic.id] ?? relic.id}.webp"
		alt={name}
		loading="lazy"
		decoding="async"
		class="relic w-[75px] sm:w-[95px]"
	/>
	<div class="relic px-2">
		<p
			class={`relic text-lg sm:text-xl ${
				selected ? getSelectedTextColor(rogueTopic) : 'text-gray-400'
			}`}
		>
			{name}
			{#if selected && relic?.stages?.[relic?.count - 1]?.suffix}
				({relic.stages[relic.count - 1].suffix})
			{/if}
		</p>
		<p class="relic text-[#c4c4c4]">{tooltip}</p>
	</div>
</div>
