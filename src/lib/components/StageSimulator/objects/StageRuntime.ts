import {
	GameConfig,
	type GameConfigKey,
	type GameConfigState,
	type GameLifecycleState,
	type GameTokenCard,
	type SimulationMode
} from './GameConfig';
import type { SpecialMods } from '$lib/types';

export interface StageRuntimeState {
	mode: SimulationMode;
	levelId: string;
	speedFactor: number;
	isPaused: boolean;
	frustumSize: number;
	scaledElapsedTime: number;
	waveElapsedTime: number;
	state: GameLifecycleState;
	tokenCard: GameTokenCard | null;
	tokensDisabled: boolean;
	totalDeductedCost: number;
	tokenCooldownDuration: number;
	tokenCooldownRemaining: number;
	eliteMode: boolean;
	cameraLock: boolean;
	currentWaveIndex: number;
	specialMods: SpecialMods;
	stagePhaseIndex: number;
	steeringEnabled: boolean;
}

export type StageRuntimeKey = keyof StageRuntimeState;

export interface StageRuntime extends StageRuntimeState {
	setValue<Key extends StageRuntimeKey>(key: Key, value: StageRuntimeState[Key]): void;
	subscribe<Key extends StageRuntimeKey>(
		key: Key,
		callback: (value: StageRuntimeState[Key]) => void
	): () => void;
	batch(callback: () => void): void;
	random(): number;
}

type RequiredOfflineState = Pick<
	StageRuntimeState,
	'mode' | 'currentWaveIndex' | 'stagePhaseIndex' | 'eliteMode' | 'specialMods' | 'steeringEnabled'
>;

export type OfflineStageRuntimeOptions = RequiredOfflineState &
	Partial<Omit<StageRuntimeState, keyof RequiredOfflineState>> & {
		seed?: number;
	};

class LiveStageRuntime implements StageRuntime {
	get mode() {
		return GameConfig.mode;
	}
	get levelId() {
		return GameConfig.levelId;
	}
	get speedFactor() {
		return GameConfig.speedFactor;
	}
	get isPaused() {
		return GameConfig.isPaused;
	}
	get frustumSize() {
		return GameConfig.FrustumSize;
	}
	get scaledElapsedTime() {
		return GameConfig.scaledElapsedTime;
	}
	get waveElapsedTime() {
		return GameConfig.waveElapsedTime;
	}
	get state() {
		return GameConfig.state;
	}
	get tokenCard() {
		return GameConfig.tokenCard;
	}
	get tokensDisabled() {
		return GameConfig.tokensDisabled;
	}
	get totalDeductedCost() {
		return GameConfig.totalDeductedCost;
	}
	get tokenCooldownDuration() {
		return GameConfig.tokenCooldownDuration;
	}
	get tokenCooldownRemaining() {
		return GameConfig.tokenCooldownRemaining;
	}
	get currentWaveIndex() {
		return GameConfig.currentWaveIndex;
	}
	get stagePhaseIndex() {
		return GameConfig.stagePhaseIndex;
	}
	get eliteMode() {
		return GameConfig.eliteMode;
	}
	get specialMods() {
		return GameConfig.specialMods as SpecialMods;
	}
	get steeringEnabled() {
		return GameConfig.steeringEnabled;
	}
	get cameraLock() {
		return GameConfig.cameraLock;
	}

	setValue<Key extends StageRuntimeKey>(key: Key, value: StageRuntimeState[Key]) {
		const configKey = key === 'frustumSize' ? 'FrustumSize' : key;
		GameConfig.setValue(configKey as GameConfigKey, value as GameConfigState[GameConfigKey]);
	}

	subscribe<Key extends StageRuntimeKey>(
		key: Key,
		callback: (value: StageRuntimeState[Key]) => void
	) {
		const configKey = key === 'frustumSize' ? 'FrustumSize' : key;
		return GameConfig.subscribe(configKey as GameConfigKey, (value) => {
			callback(value as StageRuntimeState[Key]);
		});
	}

	batch(callback: () => void) {
		GameConfig.batch(callback);
	}

	random() {
		return Math.random();
	}
}

type RuntimeSubscriber = {
	key: StageRuntimeKey;
	callback: (value: never) => void;
};

export class OfflineStageRuntime implements StageRuntime {
	mode: SimulationMode;
	levelId: string;
	speedFactor: number;
	isPaused: boolean;
	frustumSize: number;
	scaledElapsedTime: number;
	waveElapsedTime: number;
	state: GameLifecycleState;
	tokenCard: GameTokenCard | null;
	tokensDisabled: boolean;
	totalDeductedCost: number;
	tokenCooldownDuration: number;
	tokenCooldownRemaining: number;
	currentWaveIndex: number;
	stagePhaseIndex: number;
	eliteMode: boolean;
	specialMods: SpecialMods;
	steeringEnabled: boolean;
	cameraLock: boolean;
	private randomState: number;
	private readonly subscribers = new Set<RuntimeSubscriber>();
	private batchDepth = 0;
	private readonly pendingNotifications = new Map<StageRuntimeKey, unknown>();

	constructor(options: OfflineStageRuntimeOptions) {
		this.mode = options.mode;
		this.levelId = options.levelId ?? '';
		this.speedFactor = options.speedFactor ?? 4;
		this.isPaused = options.isPaused ?? false;
		this.frustumSize = options.frustumSize ?? 900;
		this.scaledElapsedTime = options.scaledElapsedTime ?? 0;
		this.waveElapsedTime = options.waveElapsedTime ?? 0;
		this.state = options.state ?? 'loading';
		this.tokenCard = options.tokenCard ? structuredClone(options.tokenCard) : null;
		this.tokensDisabled = options.tokensDisabled ?? false;
		this.totalDeductedCost = options.totalDeductedCost ?? 0;
		this.tokenCooldownDuration = options.tokenCooldownDuration ?? 0;
		this.tokenCooldownRemaining = options.tokenCooldownRemaining ?? 0;
		this.currentWaveIndex = options.currentWaveIndex;
		this.stagePhaseIndex = options.stagePhaseIndex;
		this.eliteMode = options.eliteMode;
		this.specialMods = structuredClone(options.specialMods);
		this.steeringEnabled = options.steeringEnabled;
		this.cameraLock = options.cameraLock ?? true;
		this.randomState = options.seed ?? 0x6d2b79f5;
	}

	setValue<Key extends StageRuntimeKey>(key: Key, value: StageRuntimeState[Key]) {
		if (Object.is(this[key], value)) return;
		(this as StageRuntimeState)[key] = value;
		if (this.batchDepth > 0) {
			this.pendingNotifications.set(key, value);
			return;
		}
		this.notify(key, value);
	}

	subscribe<Key extends StageRuntimeKey>(
		key: Key,
		callback: (value: StageRuntimeState[Key]) => void
	) {
		const subscriber = { key, callback: callback as (value: never) => void };
		this.subscribers.add(subscriber);
		return () => this.subscribers.delete(subscriber);
	}

	batch(callback: () => void) {
		this.batchDepth++;
		try {
			callback();
		} finally {
			this.batchDepth--;
			if (this.batchDepth === 0) {
				const notifications = [...this.pendingNotifications];
				this.pendingNotifications.clear();
				for (const [key, value] of notifications) {
					this.notify(key, value as StageRuntimeState[typeof key]);
				}
			}
		}
	}

	private notify<Key extends StageRuntimeKey>(key: Key, value: StageRuntimeState[Key]) {
		for (const subscriber of this.subscribers) {
			if (subscriber.key === key) subscriber.callback(value as never);
		}
	}

	// Mulberry32 keeps repeated offline runs deterministic without touching global randomness.
	random() {
		this.randomState = (this.randomState + 0x6d2b79f5) | 0;
		let value = this.randomState;
		value = Math.imul(value ^ (value >>> 15), value | 1);
		value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
		return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
	}
}

export const liveStageRuntime: StageRuntime = new LiveStageRuntime();

export function getStageRuntime(context?: { runtime?: StageRuntime }): StageRuntime {
	return context?.runtime ?? liveStageRuntime;
}
