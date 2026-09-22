import trapLookup from '$lib/data/trap/traps.json';
import type { MapConfig, Position } from '$lib/types';
import type { GameManager } from '../objects/GameManager';
import type { StageRuntime } from '../objects/StageRuntime';
import {
	obstacleEventStore,
	type ObstacleEvent,
	type ObstacleEventSnapshot
} from '../stores/obstacleEvents';

export class ObstacleController {
	private events: ObstacleEvent[] = [];
	private replayIndex = 0;
	private readonly unsubscribe: () => void;

	constructor(
		private readonly gameManager: GameManager,
		private config: MapConfig,
		private readonly runtime: StageRuntime
	) {
		this.unsubscribe = obstacleEventStore.subscribe((snapshot) => this.setSnapshot(snapshot));
	}

	setConfig(config: MapConfig) {
		this.config = config;
	}

	reset(levelId = '') {
		obstacleEventStore.reset(levelId);
	}

	dispose() {
		this.unsubscribe();
		this.events = [];
		this.replayIndex = 0;
	}

	recordPlacement(position: Position, trapKey: string) {
		return obstacleEventStore.recordPlacement(this.runtime.scaledElapsedTime, position, trapKey);
	}

	recordRemoval(position: Position, trapKey: string, placementId: string | null) {
		obstacleEventStore.recordRemoval(
			this.runtime.scaledElapsedTime,
			position,
			trapKey,
			placementId
		);
	}

	setReplayTime(time: number) {
		this.rebuildSceneAt(time);
		this.updateReplayIndex(time);
		this.syncTokenStateAt(time);
	}

	replayThrough(time: number) {
		let replayed = false;
		while (this.replayIndex < this.events.length && this.events[this.replayIndex].time <= time) {
			this.gameManager.applyObstacleEvent(this.events[this.replayIndex]);
			this.replayIndex++;
			replayed = true;
		}
		if (replayed) this.syncTokenStateAt(time);
	}

	private setSnapshot(snapshot: ObstacleEventSnapshot) {
		this.events = snapshot.events.map((event) => ({
			...event,
			position: { ...event.position }
		}));
		this.updateReplayIndex(this.runtime.scaledElapsedTime);
	}

	private updateReplayIndex(time: number) {
		this.replayIndex = this.events.findIndex((event) => event.time > time);
		if (this.replayIndex === -1) this.replayIndex = this.events.length;
	}

	private rebuildSceneAt(time: number) {
		const activeByPlacement = new Map<
			string,
			{ key: string; position: Position; placementId: string | null }
		>();
		for (const event of this.events) {
			if (event.time > time) break;
			const positionKey = `${event.position.col},${event.position.row}`;
			const eventKey = event.placementId ?? positionKey;
			if (event.action === 'place') {
				activeByPlacement.set(eventKey, {
					key: event.trapKey,
					position: { ...event.position },
					placementId: event.placementId
				});
				continue;
			}
			if (event.placementId) {
				activeByPlacement.delete(event.placementId);
			} else {
				for (const [key, placement] of activeByPlacement) {
					if (
						placement.position.row === event.position.row &&
						placement.position.col === event.position.col &&
						placement.key === event.trapKey
					) {
						activeByPlacement.delete(key);
					}
				}
			}
		}
		this.gameManager.syncUserRoadblocks([...activeByPlacement.values()]);
	}

	private syncTokenStateAt(time: number) {
		const initialCard = this.config.token_cards?.find((card) => card.key === 'trap_001_crate');
		if (!initialCard) return;
		const placements = this.events.filter(
			(event) => event.action === 'place' && event.time <= time
		);
		const trapData = (trapLookup as Record<string, any>)[initialCard.key];
		const stats = trapData?.stats?.[0];
		const cost = Number(initialCard.cost ?? stats?.cost ?? 5);
		const cooldownDuration = Math.max(0, Number(stats?.respawnTime ?? 0));
		const latestPlacement = placements[placements.length - 1];
		const cooldownRemaining = latestPlacement
			? Math.max(0, cooldownDuration - (time - latestPlacement.time))
			: 0;
		const count = Math.max(0, initialCard.count - placements.length);

		this.runtime.batch(() => {
			this.runtime.setValue('totalDeductedCost', placements.length * cost);
			this.runtime.setValue('tokenCooldownDuration', cooldownDuration);
			this.runtime.setValue('tokenCooldownRemaining', cooldownRemaining);
			this.runtime.setValue(
				'tokenCard',
				count > 0
					? { ...initialCard, count, selected: this.runtime.tokenCard?.selected ?? true }
					: null
			);
		});
	}
}
