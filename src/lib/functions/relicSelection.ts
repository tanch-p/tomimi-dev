import { derived, writable, type Readable } from 'svelte/store';
import {
	getRelicStages,
	type RelicDefinition,
	type RelicSelection,
	type ResolvedRelic
} from '$lib/data/is/relicTypes';

export interface SavedRelicSelection {
	id: string;
	count?: number;
}

export interface RelicSelectionStore extends Readable<readonly RelicSelection[]> {
	readonly catalog: readonly RelicDefinition[];
	readonly resolved: Readable<readonly ResolvedRelic[]>;
	ensureSelected: (ids: string | readonly string[]) => void;
	toggle: (id: string) => void;
	setStage: (id: string, stageIndex: number) => void;
	remove: (id: string) => void;
	clear: () => void;
	restore: (saved: readonly SavedRelicSelection[]) => void;
}

export function resolveRelic(
	relic: RelicDefinition,
	selection: RelicSelection
): ResolvedRelic | undefined {
	if (relic.id !== selection.id || !Number.isSafeInteger(selection.stageIndex)) return;
	const stage = getRelicStages(relic)[selection.stageIndex];
	if (!stage) return;
	// Stage effects are complete snapshots, never additions to the base effects.
	return { ...relic, ...selection, stage, effects: stage.effects };
}

/** Keep the published one-based count format at the serialization boundary. */
export function serializeRelics(relics: readonly ResolvedRelic[]): SavedRelicSelection[] {
	return relics.map((relic) => ({
		id: relic.id,
		...(relic.stages ? { count: relic.stageIndex + 1 } : {})
	}));
}

export function createRelicSelectionStore(
	catalog: readonly RelicDefinition[],
	{ exclusive = false }: { exclusive?: boolean } = {}
): RelicSelectionStore {
	const definitions = new Map(catalog.map((relic) => [relic.id, relic]));
	let selections: readonly RelicSelection[] = [];
	const state = writable(selections);

	function commit(next: readonly RelicSelection[]) {
		if (
			next.length === selections.length &&
			next.every(
				(entry, i) => entry.id === selections[i].id && entry.stageIndex === selections[i].stageIndex
			)
		)
			return;
		selections = next;
		state.set(next);
	}

	function validSelection(id: string, stageIndex = 0): RelicSelection | undefined {
		const relic = definitions.get(id);
		if (!relic || !Number.isSafeInteger(stageIndex) || !getRelicStages(relic)[stageIndex]) return;
		return { id, stageIndex };
	}

	function ensureSelected(ids: string | readonly string[]) {
		let next = [...selections];
		for (const id of typeof ids === 'string' ? [ids] : ids) {
			if (next.some((entry) => entry.id === id)) continue;
			const selection = validSelection(id);
			if (selection) next = exclusive ? [selection] : [...next, selection];
		}
		commit(next);
	}

	function remove(id: string) {
		commit(selections.filter((entry) => entry.id !== id));
	}

	return {
		subscribe: state.subscribe,
		catalog,
		resolved: derived(state, (entries) =>
			entries.map((entry) => resolveRelic(definitions.get(entry.id)!, entry)!)
		),
		ensureSelected,
		toggle(id) {
			if (selections.some((entry) => entry.id === id)) remove(id);
			else ensureSelected(id);
		},
		setStage(id, stageIndex) {
			const selection = validSelection(id, stageIndex);
			if (!selection) return;
			commit(selections.map((entry) => (entry.id === id ? selection : entry)));
		},
		remove,
		clear: () => commit([]),
		restore(saved) {
			let next: RelicSelection[] = [];
			for (const entry of saved) {
				const relic = definitions.get(entry.id);
				if (!relic || next.some((selection) => selection.id === entry.id)) continue;
				const selection = validSelection(entry.id, relic.stages ? (entry.count ?? 1) - 1 : 0);
				if (selection) next = exclusive ? [selection] : [...next, selection];
			}
			commit(next);
		}
	};
}
