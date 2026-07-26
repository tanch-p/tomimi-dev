import { describe, expect, it } from 'vitest';
import { getBaseCount, getEnemyCountPermutations } from '$lib/functions/waveHelpers';
import stageData from '../lib/data/stages/ro_stage_data/level_rogue6_1-1.json' assert { type: 'json' };

describe('enemy wave counts', () => {
	it('counts the normal version of rogue6_1-1 as 15 enemies', () => {
		const mapConfig = stageData.data[0];
		const baseCount = getBaseCount(mapConfig, false);
		const permutations = getEnemyCountPermutations(mapConfig, ['normal'], false, '', baseCount);

		expect(baseCount).toBe(11);
		expect(permutations).toEqual([{ count: 15, permutation: {} }]);
	});
});
