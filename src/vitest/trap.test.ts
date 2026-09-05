import { describe, expect, it } from 'vitest';
import { Trap } from '$lib/components/StageSimulator/objects/Trap';
import type { GameManager } from '$lib/components/StageSimulator/objects/GameManager';

const branch = {
	phases: [
		{
			preDelay: 0,
			actions: [
				{ actionType: 'SPAWN', routeIndex: 5 },
				{ actionType: 'SPAWN', routeIndex: 6 },
				{ actionType: 'SPAWN', routeIndex: 7 },
				{ actionType: 'SPAWN', routeIndex: 8 }
			]
		}
	]
};

const createTrap = (overrideSkillBlackboard: object[]) =>
	new Trap(
		{
			key: 'trap_086_larva',
			alias: 'trap_086_larva#1',
			direction: 'UP',
			overrideSkillBlackboard
		},
		{ row: 1, col: 4 },
		true,
		null,
		{ config: { branches: { route6: branch } } } as unknown as GameManager
	);

describe('Trap branch actions', () => {
	it('uses the full branch when action_index is absent', () => {
		const trap = createTrap([{ key: 'branch_id', value: 0, valueStr: 'route6' }]);

		expect(trap.actionIndex).toBeNull();
		expect(trap.branch).toBe(branch);
	});

	it('uses only the action selected by action_index', () => {
		const trap = createTrap([
			{ key: 'branch_id', value: 0, valueStr: 'route6' },
			{ key: 'action_index', value: 3, valueStr: null }
		]);

		expect(trap.actionIndex).toBe(3);
		expect(trap.branch.phases[0].actions).toEqual([{ actionType: 'SPAWN', routeIndex: 8 }]);
		expect(branch.phases[0].actions).toHaveLength(4);
	});

	it('supports action index zero', () => {
		const trap = createTrap([
			{ key: 'branch_id', value: 0, valueStr: 'route6' },
			{ key: 'action_index', value: 0, valueStr: null }
		]);

		expect(trap.branch.phases[0].actions).toEqual([{ actionType: 'SPAWN', routeIndex: 5 }]);
	});

	it('does not use the full branch when action_index is out of range', () => {
		const trap = createTrap([
			{ key: 'branch_id', value: 0, valueStr: 'route6' },
			{ key: 'action_index', value: 99, valueStr: null }
		]);

		expect(trap.branch.phases[0].actions).toEqual([]);
	});
});
