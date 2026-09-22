export type StagePhaseBehavior = {
	waveIndex: number;
	cameraX: number;
	autoBranches?: readonly string[];
	advanceWhileReady?: boolean;
	freezeEnemies?: boolean;
};

export type StageTimelineBehavior = {
	isolatedWaves: boolean;
	scrollOffsets: ReadonlyArray<{
		fromWave: number;
		actionIndex: number;
	}>;
};

export type StageBehavior = {
	phases: readonly StagePhaseBehavior[];
	resetToFirstPhase?: boolean;
	offlineSimulation?: 'enabled' | 'disabled';
	disabledOfflinePhases?: readonly number[];
	timeline?: StageTimelineBehavior;
};

const DEFAULT_PHASE: StagePhaseBehavior = {
	waveIndex: 0,
	cameraX: 0
};

const DEFAULT_BEHAVIOR: StageBehavior = {
	phases: [DEFAULT_PHASE],
	resetToFirstPhase: true,
	offlineSimulation: 'enabled'
};

export const DUEL_STAGE_IDS = [
	'level_rogue4_d-1',
	'level_rogue4_d-2',
	'level_rogue4_d-3',
	'level_rogue4_d-b',
	'level_rogue5_d-1',
	'level_rogue5_d-2',
	'level_rogue5_d-3',
	'level_rogue5_d-4',
	'level_rogue6_d-1',
	'level_rogue6_d-2'
] as const;

const SINGLE_WALK_BRANCH_DUEL_STAGES = new Set<string>([
	'level_rogue4_d-1',
	'level_rogue5_d-1',
	'level_rogue5_d-3',
	'level_rogue6_d-1'
]);

function createDuelBehavior(levelId: string): StageBehavior {
	return {
		phases: [
			{
				waveIndex: 0,
				cameraX: -450,
				advanceWhileReady: true,
				freezeEnemies: true
			},
			{
				waveIndex: 4,
				cameraX: 450,
				autoBranches: SINGLE_WALK_BRANCH_DUEL_STAGES.has(levelId) ? ['Walk'] : ['Walk_1', 'Walk_2']
			}
		],
		resetToFirstPhase: true,
		offlineSimulation: 'disabled'
	};
}

const stageBehaviors: Record<string, StageBehavior> = Object.fromEntries(
	DUEL_STAGE_IDS.map((levelId) => [levelId, createDuelBehavior(levelId)])
);

for (const levelId of ['level_rogue1_b-7', 'level_rogue2_b-7']) {
	stageBehaviors[levelId] = {
		...DEFAULT_BEHAVIOR,
		offlineSimulation: 'disabled'
	};
}

stageBehaviors['level_rogue4_b-7'] = {
	phases: [
		{ waveIndex: 0, cameraX: -600 },
		{ waveIndex: 2, cameraX: 800, autoBranches: ['skzjkl_stage_2'] }
	],
	resetToFirstPhase: false,
	disabledOfflinePhases: [1],
	timeline: {
		isolatedWaves: true,
		scrollOffsets: [
			{ fromWave: 0, actionIndex: 0 },
			{ fromWave: 2, actionIndex: 23 }
		]
	}
};

stageBehaviors['level_rogue4_b-8'] = {
	phases: [
		{ waveIndex: 1, cameraX: -1300 },
		{ waveIndex: 3, cameraX: 0, autoBranches: ['amiy_blink_1'] },
		{ waveIndex: 5, cameraX: 1250, autoBranches: ['amiy_blink_2'] }
	],
	resetToFirstPhase: false,
	timeline: {
		isolatedWaves: true,
		scrollOffsets: [
			{ fromWave: 0, actionIndex: 0 },
			{ fromWave: 2, actionIndex: 3 },
			{ fromWave: 4, actionIndex: 7 }
		]
	}
};

export function getStageBehavior(levelId: string): StageBehavior {
	return stageBehaviors[levelId] ?? DEFAULT_BEHAVIOR;
}

export function getStagePhaseBehavior(levelId: string, phaseIndex: number): StagePhaseBehavior {
	const behavior = getStageBehavior(levelId);
	return behavior.phases[phaseIndex] ?? behavior.phases[0] ?? DEFAULT_PHASE;
}

export function getSelectableStagePhases(levelId: string) {
	const phases = getStageBehavior(levelId).phases;
	return phases.length > 1 ? phases : [];
}

export function isDuelStage(levelId: string) {
	return (DUEL_STAGE_IDS as readonly string[]).includes(levelId);
}

export function shouldSkipOfflineSimulation(levelId: string, phaseIndex: number) {
	const behavior = getStageBehavior(levelId);
	return (
		behavior.offlineSimulation === 'disabled' ||
		behavior.disabledOfflinePhases?.includes(phaseIndex) === true
	);
}

export function getTimelineScrollActionIndex(levelId: string, waveIndex: number) {
	const timeline = getStageBehavior(levelId).timeline;
	if (!timeline) return 0;
	let actionIndex = 0;
	for (const offset of timeline.scrollOffsets) {
		if (waveIndex < offset.fromWave) break;
		actionIndex = offset.actionIndex;
	}
	return actionIndex;
}
