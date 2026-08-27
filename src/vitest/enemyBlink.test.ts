import { describe, expect, it, vi } from 'vitest';
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

describe('ftprg summon startup', () => {
	it('does not process route actions while summon skills are active', () => {
		const enemy = Object.create(Enemy.prototype) as Enemy;
		enemy.handleAnimUpdate = vi.fn();
		enemy.exit = false;
		enemy.timeoutDuration = null;
		enemy.animState = 'Move';
		enemy.currentActionIndex = 0;
		enemy.skillManager = {
			isHoldingForSummons: true,
			startedEnemyAfterSummons: false,
			update: vi.fn()
		} as unknown as Enemy['skillManager'];

		enemy.update(1);

		expect(enemy.animState).toBe('Default');
		expect(enemy.currentActionIndex).toBe(0);
	});

	it('holds the default animation and then plays Start', () => {
		const enemy = Object.create(Enemy.prototype) as Enemy;
		enemy.animState = 'Move';
		enemy.isMoving = true;
		enemy.startDuration = 4;
		enemy.startElapsedTime = 2;
		enemy.spineAnimIndex = 0;
		enemy.animations = [{ Start: 'Start' }];
		enemy.skelData = {
			animations: [{ name: 'Start', duration: 1.5 }]
		} as unknown as typeof enemy.skelData;

		enemy.prepareForSummons();
		expect(enemy.animState).toBe('Default');
		expect(enemy.isMoving).toBe(false);
		expect(enemy.startDuration).toBe(0);

		enemy.startAfterSummons();
		expect(enemy.animState).toBe('Start');
		expect(enemy.startDuration).toBe(1.5);
	});
});
