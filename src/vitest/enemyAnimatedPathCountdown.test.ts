import { describe, expect, it, vi } from 'vitest';
import { Enemy } from '$lib/components/StageSimulator/objects/Enemy';
import * as THREE from 'three';

describe('animated path countdown fade', () => {
	it('fades over four seconds and then removes only the animated path countdown', () => {
		const setCountdownOpacity = vi.fn();
		const removeCountdown = vi.fn();
		const enemy = Object.create(Enemy.prototype) as Enemy;
		enemy.gameManager = {
			countdownManager: { setCountdownOpacity },
			removeCountdown
		} as unknown as Enemy['gameManager'];
		enemy.countdownId = 99;
		enemy.animatedPathCountdowns = [{ id: 42, elapsed: 0 }];

		enemy.updateAnimatedPathCountdowns(2);

		expect(setCountdownOpacity).toHaveBeenCalledWith(42, 0.5);
		expect(removeCountdown).not.toHaveBeenCalled();
		expect(enemy.animatedPathCountdowns).toEqual([{ id: 42, elapsed: 2 }]);

		enemy.updateAnimatedPathCountdowns(2);

		expect(removeCountdown).toHaveBeenCalledOnce();
		expect(removeCountdown).toHaveBeenCalledWith(42);
		expect(removeCountdown).not.toHaveBeenCalledWith(enemy.countdownId);
		expect(enemy.animatedPathCountdowns).toEqual([]);
	});

	it('fully removes a live enemy even when its interactive sprite was never created', () => {
		const enemy = Object.create(Enemy.prototype) as Enemy;
		const removeCountdown = vi.fn();
		const removeFromScene = vi.fn();
		const resetSkills = vi.fn();
		const enemiesOnMap = [enemy];

		Object.assign(enemy, {
			animatedPathGroup: null,
			animatedPathCountdowns: [],
			animatedPathFlags: [],
			countdownId: 7,
			meshGroup: new THREE.Group(),
			pathGroup: null,
			selected: true,
			skillManager: { activeSkills: [], reset: resetSkills },
			spawnUID: 'missing-sprite',
			sprite: null
		});
		enemy.gameManager = {
			enemiesOnMap,
			game: { objects: [] },
			isSimulation: false,
			killedCount: 0,
			removeCountdown,
			scene: { remove: removeFromScene }
		} as unknown as Enemy['gameManager'];

		enemy.remove();

		expect(enemiesOnMap).toEqual([]);
		expect(removeCountdown).toHaveBeenCalledWith(7);
		expect(removeFromScene).toHaveBeenCalledWith(enemy.meshGroup);
		expect(resetSkills).toHaveBeenCalledOnce();
		expect(enemy.selected).toBe(false);
	});
});
