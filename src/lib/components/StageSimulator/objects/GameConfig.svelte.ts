import type { MapConfigTokenCard, SpecialMods } from '$lib/types';

export type GameTokenCard = MapConfigTokenCard & { selected: boolean };
export type SimulationMode = 'wave_normal' | 'wave_summons';
export type GameLifecycleState = 'loading' | 'ready' | 'running' | 'end' | 'stop' | 'reset';

export interface GameConfigState {
	mode: SimulationMode;
	levelId: string;
	gridSize: number;
	speedFactor: number;
	baseZIndex: number;
	isPaused: boolean;
	FrustumSize: number;
	showAllRange: boolean;
	showAllTimers: boolean;
	showTimeline: boolean;
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

/** Shared live simulator state. Svelte components track property reads automatically. */
export const GameConfig = $state<GameConfigState>({
	mode: 'wave_normal',
	levelId: '',
	gridSize: 100,
	speedFactor: 4,
	baseZIndex: 0,
	isPaused: false,
	FrustumSize: 900,
	showAllRange: true,
	showAllTimers: true,
	showTimeline: true,
	scaledElapsedTime: 0,
	waveElapsedTime: 0,
	state: 'loading',
	tokenCard: null,
	tokensDisabled: false,
	totalDeductedCost: 0,
	tokenCooldownDuration: 0,
	tokenCooldownRemaining: 0,
	eliteMode: false,
	cameraLock: true,
	currentWaveIndex: 0,
	specialMods: {},
	stagePhaseIndex: 0,
	steeringEnabled: true
});
