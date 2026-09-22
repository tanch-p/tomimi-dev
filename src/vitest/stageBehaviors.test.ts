import { describe, expect, test } from 'vitest';
import {
	DUEL_STAGE_IDS,
	getSelectableStagePhases,
	getStageBehavior,
	getStagePhaseBehavior,
	getTimelineScrollActionIndex,
	isDuelStage,
	shouldSkipOfflineSimulation
} from '$lib/components/StageSimulator/config/stageBehaviors';

const SINGLE_WALK_STAGES = new Set([
	'level_rogue4_d-1',
	'level_rogue5_d-1',
	'level_rogue5_d-3',
	'level_rogue6_d-1'
]);

describe('duel stage behavior', () => {
	test.each(DUEL_STAGE_IDS)('%s has the expected two-phase policy', (levelId) => {
		const behavior = getStageBehavior(levelId);

		expect(behavior.resetToFirstPhase).toBe(true);
		expect(behavior.phases).toHaveLength(2);
		expect(behavior.phases[0]).toMatchObject({
			waveIndex: 0,
			cameraX: -450,
			advanceWhileReady: true,
			freezeEnemies: true
		});
		expect(behavior.phases[1]).toMatchObject({
			waveIndex: 4,
			cameraX: 450,
			autoBranches: SINGLE_WALK_STAGES.has(levelId) ? ['Walk'] : ['Walk_1', 'Walk_2']
		});
		expect(isDuelStage(levelId)).toBe(true);
		expect(shouldSkipOfflineSimulation(levelId, 0)).toBe(true);
		expect(shouldSkipOfflineSimulation(levelId, 1)).toBe(true);
	});
});

describe('multi-phase boss stage behavior', () => {
	test('level_rogue4_b-7 preserves its selected phase and isolated timeline', () => {
		const behavior = getStageBehavior('level_rogue4_b-7');

		expect(behavior.resetToFirstPhase).toBe(false);
		expect(behavior.phases).toEqual([
			{ waveIndex: 0, cameraX: -600 },
			{ waveIndex: 2, cameraX: 800, autoBranches: ['skzjkl_stage_2'] }
		]);
		expect(shouldSkipOfflineSimulation('level_rogue4_b-7', 0)).toBe(false);
		expect(shouldSkipOfflineSimulation('level_rogue4_b-7', 1)).toBe(true);
		expect(
			[0, 1, 2, 9].map((wave) => getTimelineScrollActionIndex('level_rogue4_b-7', wave))
		).toEqual([0, 0, 23, 23]);
	});

	test('level_rogue4_b-8 maps all three phases and timeline sections', () => {
		const behavior = getStageBehavior('level_rogue4_b-8');

		expect(behavior.resetToFirstPhase).toBe(false);
		expect(behavior.phases).toEqual([
			{ waveIndex: 1, cameraX: -1300 },
			{ waveIndex: 3, cameraX: 0, autoBranches: ['amiy_blink_1'] },
			{ waveIndex: 5, cameraX: 1250, autoBranches: ['amiy_blink_2'] }
		]);
		expect(
			[0, 1, 2, 3, 4, 9].map((wave) => getTimelineScrollActionIndex('level_rogue4_b-8', wave))
		).toEqual([0, 0, 3, 3, 7, 7]);
	});
});

describe('default and offline-only behavior', () => {
	test('unknown stages use a stable single-phase default', () => {
		expect(getStagePhaseBehavior('unknown-stage', 99)).toEqual({ waveIndex: 0, cameraX: 0 });
		expect(getSelectableStagePhases('unknown-stage')).toEqual([]);
		expect(getTimelineScrollActionIndex('unknown-stage', 99)).toBe(0);
		expect(isDuelStage('unknown-stage')).toBe(false);
		expect(shouldSkipOfflineSimulation('unknown-stage', 0)).toBe(false);
	});

	test.each(['level_rogue1_b-7', 'level_rogue2_b-7'])(
		'%s disables offline simulation without changing live behavior',
		(levelId) => {
			expect(getStageBehavior(levelId).phases).toEqual([{ waveIndex: 0, cameraX: 0 }]);
			expect(shouldSkipOfflineSimulation(levelId, 0)).toBe(true);
		}
	);
});
