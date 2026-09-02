import { describe, expect, it } from 'vitest';
import { loadStage, loadStageVariants } from '$lib/server/stageLoad';

describe('server stage loading', () => {
	it('prepares a single-config stage', async () => {
		const stage = await loadStage('ISW-NO_Requiem_Aeternam', 'en');

		expect(stage.mapConfig.levelId).toBe('level_rogue2_b-1');
		expect(stage.enemies).toHaveLength(stage.mapConfig.enemies.length);
		expect(stage.traps).toHaveLength(stage.mapConfig.traps.length);
	});

	it('prepares every variant of a multi-config stage', async () => {
		const { stageData, stages } = await loadStageVariants('ISW-DF_Defining_the_World', 'en');

		expect(stages.length).toBeGreaterThan(1);
		expect(stages).toHaveLength(stageData.data.length);
		expect(stages.map(({ mapConfig }) => mapConfig)).toEqual(stageData.data);
		for (const stage of stages) {
			expect(stage.enemies).toHaveLength(stage.mapConfig.enemies.length);
			expect(stage.traps).toHaveLength(stage.mapConfig.traps.length);
		}
	});
});
