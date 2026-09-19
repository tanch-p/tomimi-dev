import { get, writable } from 'svelte/store';
import type { Position } from '$lib/types';

export type ObstacleEvent = {
	action: 'place' | 'remove';
	time: number;
	position: Position;
	trapKey: string;
	placementId: string | null;
};

export type ObstacleEventSnapshot = {
	version: 1;
	levelId: string;
	events: ObstacleEvent[];
};

function createObstacleEventStore() {
	const initialState = (levelId = ''): ObstacleEventSnapshot => ({
		version: 1,
		levelId,
		events: []
	});
	const store = writable<ObstacleEventSnapshot>(initialState());
	let nextPlacementId = 1;

	function append(event: ObstacleEvent) {
		store.update((state) => ({
			...state,
			// An action after seeking backwards creates a new timeline branch.
			events: [...state.events.filter((existing) => existing.time <= event.time), event]
		}));
	}
	function getSnapshot(): ObstacleEventSnapshot {
		const state = get(store);
		return {
			...state,
			events: state.events.map((event) => ({
				...event,
				position: { ...event.position }
			}))
		};
	}

	return {
		subscribe: store.subscribe,
		reset(levelId = '') {
			nextPlacementId = 1;
			store.set(initialState(levelId));
		},
		recordPlacement(time: number, position: Position, trapKey: string) {
			const placementId = `obstacle-${nextPlacementId++}`;
			append({
				action: 'place',
				time,
				position: { ...position },
				trapKey,
				placementId
			});
			return placementId;
		},
		recordRemoval(
			time: number,
			position: Position,
			trapKey: string,
			placementId: string | null = null
		) {
			append({
				action: 'remove',
				time,
				position: { ...position },
				trapKey,
				placementId
			});
		},
		getSnapshot,
		serialize() {
			return JSON.stringify(getSnapshot());
		}
	};
}

export const obstacleEventStore = createObstacleEventStore();
