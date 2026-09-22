import { describe, expect, it } from 'vitest';
import {
	buildWaveScenario,
	getBaseCount,
	getEnemyCountPermutations
} from '$lib/functions/waveHelpers';
import stageData from '../lib/data/stages/ro_stage_data/level_rogue6_1-1.json' with { type: 'json' };
import type { MapConfig, WaveAction } from '$lib/types';

describe('enemy wave counts', () => {
	it('counts the normal version of rogue6_1-1 as 15 enemies', () => {
		const mapConfig = stageData.data[0] as unknown as MapConfig;
		const baseCount = getBaseCount(mapConfig, false);
		const permutations = getEnemyCountPermutations(mapConfig, ['normal'], false, '', baseCount);

		expect(baseCount).toBe(11);
		expect(permutations).toEqual([{ count: 15, permutation: {} }]);
	});

	it('builds deterministic runtime waves and timeline from the same selection snapshot', () => {
		const mapConfig = stageData.data[0] as unknown as MapConfig;
		const hiddenGroups = ['normal'];
		const baseCount = getBaseCount(mapConfig, false);
		const [{ permutation }] = getEnemyCountPermutations(
			mapConfig,
			hiddenGroups,
			false,
			'',
			baseCount
		);
		const randomSeeds = Array.from({ length: 50 }, (_, index) => (index + 1) / 51);

		const first = buildWaveScenario(mapConfig, permutation, hiddenGroups, false, randomSeeds, '');
		const second = buildWaveScenario(mapConfig, permutation, hiddenGroups, false, randomSeeds, '');

		expect(first).toEqual(second);
		if (!first.timeline) throw new Error('Expected a timeline for the selected permutation.');
		expect(first.timeline.count).toBe(15);
		expect(first.waveData).toHaveLength(first.timeline.waves.length);
	});

	it('resolves a random group once for both runtime waves and the displayed timeline', () => {
		const action = (key: string): WaveAction => ({
			actionType: 'SPAWN',
			managedByScheduler: true,
			key,
			count: 1,
			preDelay: 0,
			interval: 1,
			routeIndex: 0,
			blockFragment: false,
			autoPreviewRoute: false,
			autoDisplayEnemyInfo: false,
			isUnharmfulAndAlwaysCountAsKilled: false,
			hiddenGroup: null,
			randomSpawnGroupKey: 'group',
			randomSpawnGroupPackKey: null,
			randomType: 'ALWAYS',
			refreshType: 'ALWAYS',
			weight: 1,
			dontBlockWave: false,
			forceBlockWaveInBranch: false
		});
		const mapConfig = {
			levelId: 'level_test',
			enemies: [],
			waves: [
				{
					preDelay: 0,
					postDelay: 0,
					maxTimeWaitingForNextWave: 0,
					fragments: [
						{
							preDelay: 0,
							actions: [action('enemy_first'), action('enemy_second')]
						}
					],
					advancedWaveTag: null
				}
			]
		};

		// Svelte's deeply reactive state is proxy-backed and cannot be passed to structuredClone().
		const reactiveSelection = new Proxy({}, {});
		const scenario = buildWaveScenario(mapConfig, reactiveSelection, [], false, [0.75], '');
		const restartedScenario = buildWaveScenario(mapConfig, reactiveSelection, [], false, [0.8], '');

		expect(scenario.permutation).toStrictEqual({ w0f0: { group: 1 } });
		expect(restartedScenario.permutation).toStrictEqual(scenario.permutation);
		expect(restartedScenario.revision).not.toBe(scenario.revision);
		expect(
			scenario.waveData[0].fragments[0].actions.map(({ key }: { key: string }) => key)
		).toStrictEqual(['enemy_second']);
		expect(scenario.timeline?.waves[0].timeline[0].actions).toStrictEqual([
			{ actionType: 'SPAWN', key: 'enemy_second' }
		]);
	});
});
