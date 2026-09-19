import { GameConfig } from './GameConfig';
import type { SpecialMods } from '$lib/types';

export type StageRuntimeValue = string | number | boolean | Record<string, unknown>;

export interface StageRuntime {
	mode: string;
	scaledElapsedTime: number;
	waveElapsedTime: number;
	currentWaveIndex: number;
	stagePhaseIndex: number;
	eliteMode: boolean;
	specialMods: SpecialMods;
	steeringEnabled: boolean;
	setValue(key: keyof StageRuntime, value: StageRuntimeValue): void;
	random(): number;
}

export type OfflineStageRuntimeOptions = Pick<
	StageRuntime,
	'mode' | 'currentWaveIndex' | 'stagePhaseIndex' | 'eliteMode' | 'specialMods' | 'steeringEnabled'
> & {
	seed?: number;
};

class LiveStageRuntime implements StageRuntime {
	get mode() {
		return GameConfig.mode;
	}
	get scaledElapsedTime() {
		return GameConfig.scaledElapsedTime;
	}
	get waveElapsedTime() {
		return GameConfig.waveElapsedTime;
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

	setValue(key: keyof StageRuntime, value: StageRuntimeValue) {
		GameConfig.setValue(key as string, value);
	}

	random() {
		return Math.random();
	}
}

export class OfflineStageRuntime implements StageRuntime {
	mode: string;
	scaledElapsedTime = 0;
	waveElapsedTime = 0;
	currentWaveIndex: number;
	stagePhaseIndex: number;
	eliteMode: boolean;
	specialMods: SpecialMods;
	steeringEnabled: boolean;
	private randomState: number;

	constructor(options: OfflineStageRuntimeOptions) {
		this.mode = options.mode;
		this.currentWaveIndex = options.currentWaveIndex;
		this.stagePhaseIndex = options.stagePhaseIndex;
		this.eliteMode = options.eliteMode;
		this.specialMods = structuredClone(options.specialMods);
		this.steeringEnabled = options.steeringEnabled;
		this.randomState = options.seed ?? 0x6d2b79f5;
	}

	setValue(key: keyof StageRuntime, value: StageRuntimeValue) {
		if (key === 'setValue' || key === 'random') return;
		(this as unknown as Record<string, StageRuntimeValue>)[key] = value;
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
