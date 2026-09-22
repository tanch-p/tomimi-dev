import {
	GameConfig,
	type GameLifecycleState,
	type GameTokenCard,
	type SimulationMode
} from './GameConfig.svelte.js';
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

export interface StageRuntime extends StageRuntimeState {
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

function cloneRuntimeValue<T>(value: T): T {
	if (Array.isArray(value)) return value.map(cloneRuntimeValue) as T;
	if (value !== null && typeof value === 'object') {
		return Object.fromEntries(
			Object.entries(value).map(([key, item]) => [key, cloneRuntimeValue(item)])
		) as T;
	}
	return value;
}

class LiveStageRuntime implements StageRuntime {
	get mode() {
		return GameConfig.mode;
	}
	set mode(value) {
		GameConfig.mode = value;
	}
	get levelId() {
		return GameConfig.levelId;
	}
	set levelId(value) {
		GameConfig.levelId = value;
	}
	get speedFactor() {
		return GameConfig.speedFactor;
	}
	set speedFactor(value) {
		GameConfig.speedFactor = value;
	}
	get isPaused() {
		return GameConfig.isPaused;
	}
	set isPaused(value) {
		GameConfig.isPaused = value;
	}
	get frustumSize() {
		return GameConfig.FrustumSize;
	}
	set frustumSize(value) {
		GameConfig.FrustumSize = value;
	}
	get scaledElapsedTime() {
		return GameConfig.scaledElapsedTime;
	}
	set scaledElapsedTime(value) {
		GameConfig.scaledElapsedTime = value;
	}
	get waveElapsedTime() {
		return GameConfig.waveElapsedTime;
	}
	set waveElapsedTime(value) {
		GameConfig.waveElapsedTime = value;
	}
	get state() {
		return GameConfig.state;
	}
	set state(value) {
		GameConfig.state = value;
	}
	get tokenCard() {
		return GameConfig.tokenCard;
	}
	set tokenCard(value) {
		GameConfig.tokenCard = value;
	}
	get tokensDisabled() {
		return GameConfig.tokensDisabled;
	}
	set tokensDisabled(value) {
		GameConfig.tokensDisabled = value;
	}
	get totalDeductedCost() {
		return GameConfig.totalDeductedCost;
	}
	set totalDeductedCost(value) {
		GameConfig.totalDeductedCost = value;
	}
	get tokenCooldownDuration() {
		return GameConfig.tokenCooldownDuration;
	}
	set tokenCooldownDuration(value) {
		GameConfig.tokenCooldownDuration = value;
	}
	get tokenCooldownRemaining() {
		return GameConfig.tokenCooldownRemaining;
	}
	set tokenCooldownRemaining(value) {
		GameConfig.tokenCooldownRemaining = value;
	}
	get currentWaveIndex() {
		return GameConfig.currentWaveIndex;
	}
	set currentWaveIndex(value) {
		GameConfig.currentWaveIndex = value;
	}
	get stagePhaseIndex() {
		return GameConfig.stagePhaseIndex;
	}
	set stagePhaseIndex(value) {
		GameConfig.stagePhaseIndex = value;
	}
	get eliteMode() {
		return GameConfig.eliteMode;
	}
	set eliteMode(value) {
		GameConfig.eliteMode = value;
	}
	get specialMods() {
		return GameConfig.specialMods;
	}
	set specialMods(value) {
		GameConfig.specialMods = value;
	}
	get steeringEnabled() {
		return GameConfig.steeringEnabled;
	}
	set steeringEnabled(value) {
		GameConfig.steeringEnabled = value;
	}
	get cameraLock() {
		return GameConfig.cameraLock;
	}
	set cameraLock(value) {
		GameConfig.cameraLock = value;
	}

	random() {
		return Math.random();
	}
}

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

	constructor(options: OfflineStageRuntimeOptions) {
		this.mode = options.mode;
		this.levelId = options.levelId ?? '';
		this.speedFactor = options.speedFactor ?? 4;
		this.isPaused = options.isPaused ?? false;
		this.frustumSize = options.frustumSize ?? 900;
		this.scaledElapsedTime = options.scaledElapsedTime ?? 0;
		this.waveElapsedTime = options.waveElapsedTime ?? 0;
		this.state = options.state ?? 'loading';
		this.tokenCard = options.tokenCard ? cloneRuntimeValue(options.tokenCard) : null;
		this.tokensDisabled = options.tokensDisabled ?? false;
		this.totalDeductedCost = options.totalDeductedCost ?? 0;
		this.tokenCooldownDuration = options.tokenCooldownDuration ?? 0;
		this.tokenCooldownRemaining = options.tokenCooldownRemaining ?? 0;
		this.currentWaveIndex = options.currentWaveIndex;
		this.stagePhaseIndex = options.stagePhaseIndex;
		this.eliteMode = options.eliteMode;
		this.specialMods = cloneRuntimeValue(options.specialMods);
		this.steeringEnabled = options.steeringEnabled;
		this.cameraLock = options.cameraLock ?? true;
		this.randomState = options.seed ?? 0x6d2b79f5;
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
