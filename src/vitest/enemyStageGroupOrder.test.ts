import { describe, expect, it } from 'vitest';
import { enemyCountGroups } from '$lib/data/stages/enemyCountGroups';
import { sortEnemiesByStageGroups } from '$lib/functions/enemyHelpers';
import type { Enemy } from '$lib/types';

const levelId = 'level_rogue6_5-8';
const configuredIds = enemyCountGroups[levelId].flatMap((group) => group.enemyIds);
const makeEnemy = (stageId: string, boss = false) =>
	({ stageId, type: boss ? ['BOSS'] : ['NORMAL'] }) as Enemy;

describe('sortEnemiesByStageGroups', () => {
	it('uses flattened config order and preserves unconfigured enemy order without mutating input', () => {
		const enemies = [
			makeEnemy('unconfigured-a'),
			...configuredIds.toReversed().map((id) => makeEnemy(id)),
			makeEnemy('unconfigured-b')
		];
		const original = [...enemies];
		expect(sortEnemiesByStageGroups(enemies, levelId).map((enemy) => enemy.stageId)).toEqual([
			...configuredIds,
			'unconfigured-a',
			'unconfigured-b'
		]);
		expect(enemies).toEqual(original);
	});

	it('keeps configured and unconfigured bosses first in their existing order', () => {
		const regular = makeEnemy(configuredIds[0]);
		const boss = makeEnemy('unconfigured-boss', true);
		const configuredBoss = makeEnemy(configuredIds[1], true);
		expect(sortEnemiesByStageGroups([regular, boss, configuredBoss], levelId)).toEqual([
			boss,
			configuredBoss,
			regular
		]);
	});

	it('preserves the list when the stage has no config or no level ID', () => {
		const enemies = [makeEnemy('a'), makeEnemy('b')];
		expect(sortEnemiesByStageGroups(enemies, 'unknown-stage')).toBe(enemies);
		expect(sortEnemiesByStageGroups(enemies)).toBe(enemies);
	});
});
