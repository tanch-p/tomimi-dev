import { describe, expect, it } from 'vitest';
import type { Skill } from '$lib/types';
import { Enemy } from '$lib/components/StageSimulator/objects/Enemy';

describe('smephi_blink', () => {
	it('configures SKILL_BLINK motion and derives the loop animation duration', () => {
		const enemy = Object.create(Enemy.prototype) as Enemy;
		enemy.motionMode = 'NONE';
		enemy.spineAnimIndex = 0;
		enemy.traits = [
			{
				key: 'smephi_blink',
				duration: 2.42,
				motionMode: 'skill_blink',
				beginAnimation: 'Move_begin',
				loopAnimation: 'Move_loop',
				endAnimation: 'Move_end'
			}
		] as Skill[];
		enemy.specials = [];
		enemy.skelData = {
			animations: [
				{ name: 'Move_begin', duration: 0.4 },
				{ name: 'Move_loop', duration: 0.8 },
				{ name: 'Move_end', duration: 0.5 }
			]
		} as unknown as typeof enemy.skelData;

		enemy.configureSkillBlink();
		enemy.setBlinkAnimationDurations();

		expect(enemy.motionMode).toBe('SKILL_BLINK');
		expect(enemy.skillBlinkTriggerKey).toBe('smephi_blink');
		expect(enemy.skillBlinkBeginAnimation).toBe('Move_begin');
		expect(enemy.skillBlinkLoopAnimation).toBe('Move_loop');
		expect(enemy.skillBlinkEndAnimation).toBe('Move_end');
		expect(enemy.skillBlinkBeginDuration).toBe(0.4);
		expect(enemy.skillBlinkLoopDuration).toBeCloseTo(1.52);
		expect(enemy.skillBlinkEndDuration).toBe(0.5);
	});
});
