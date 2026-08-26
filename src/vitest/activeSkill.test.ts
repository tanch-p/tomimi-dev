import { describe, expect, it } from 'vitest';
import type { Skill } from '$lib/types';
import { ActiveSkill } from '$lib/components/StageSimulator/objects/ActiveSkill';

describe('ActiveSkill cooldowns', () => {
	it('starts an empty bar using the initial cooldown', () => {
		const activeSkill = Object.create(ActiveSkill.prototype) as ActiveSkill;
		const skill = {
			initCooldown: 30,
			cooldowns: [75, 65, 60, 45, 30, 30]
		} as unknown as Skill;

		expect(activeSkill.convertCooldownToTimeRegen(skill)).toEqual({ initSp: 0, spCost: 30 });
	});

	it('advances through cooldowns and keeps using the final value', () => {
		const activeSkill = Object.create(ActiveSkill.prototype) as ActiveSkill;
		activeSkill.skill = {
			cooldowns: [75, 65, 60, 45, 30, 30]
		} as unknown as Skill;

		const expectedCooldowns = [75, 65, 60, 45, 30, 30, 30];
		for (const [index, expectedCooldown] of expectedCooldowns.entries()) {
			activeSkill.currCount = index + 1;
			activeSkill.setNextCooldown();
			expect(activeSkill.spCost).toBe(expectedCooldown);
		}
	});

	it('uses a single cooldown after the initial activation', () => {
		const activeSkill = Object.create(ActiveSkill.prototype) as ActiveSkill;
		activeSkill.skill = {
			initCooldown: 10,
			cooldown: 25
		} as unknown as Skill;

		activeSkill.currCount = 0;
		activeSkill.setNextCooldown();
		expect(activeSkill.spCost).toBe(10);

		activeSkill.currCount = 1;
		activeSkill.setNextCooldown();
		expect(activeSkill.spCost).toBe(25);
	});

	it('renders a zero-second initial cooldown as ready', () => {
		const activeSkill = Object.create(ActiveSkill.prototype) as ActiveSkill;
		activeSkill.currSp = 0;
		activeSkill.spCost = 0;

		expect(activeSkill.getSkillBarProgress()).toBe(1);
	});
});
