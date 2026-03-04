import { SvelteSet } from "svelte/reactivity";

export const rogueTopic = $state({ value: "rogue_4" });
export const selectedRelicIds = new SvelteSet();

export function toggleRelic(id: string) {
	selectedRelicIds.has(id)
		? selectedRelicIds.delete(id)
		: selectedRelicIds.add(id);
}

// export const relicFilterContext = $derived(() => {
// 	const relics = getRelicsByTopic(relicTopic.value);

// 	return relics.filter((r) => selectedRelicIds.has(r.id));
// });
