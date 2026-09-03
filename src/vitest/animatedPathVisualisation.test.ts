import { describe, expect, it, vi } from 'vitest';
import * as THREE from 'three';
import { Enemy } from '$lib/components/StageSimulator/objects/Enemy';
import { GameConfig } from '$lib/components/StageSimulator/objects/GameConfig';
import type { GameManager } from '$lib/components/StageSimulator/objects/GameManager';
import { createAnimatedPathVisualisation } from '$lib/functions/pathVisualisationHelpers';

describe('animated path visualisation', () => {
	it('reports a checkpoint when the beam reaches it', () => {
		const onCheckpointReached = vi.fn();
		const gameManager = {
			getVectorCoordinates: ({ col, row }: { col: number; row: number }) => ({
				x: col * GameConfig.gridSize,
				y: row * GameConfig.gridSize
			})
		} as unknown as GameManager;
		const visualisation = createAnimatedPathVisualisation(
			[
				{
					type: 'MOVE',
					pathType: 'cp',
					position: { col: 1, row: 0 }
				},
				{
					type: 'MOVE',
					pathType: 'end',
					position: { col: 2, row: 0 }
				}
			],
			0,
			new THREE.Vector3(),
			gameManager,
			undefined,
			onCheckpointReached
		);

		visualisation?.update(1);

		expect(onCheckpointReached).toHaveBeenCalledOnce();
		expect(onCheckpointReached).toHaveBeenCalledWith(new THREE.Vector3(GameConfig.gridSize, 0, 0));
	});

	it('fades and removes the checkpoint flag using the animated marker lifecycle', () => {
		const enemy = Object.create(Enemy.prototype) as Enemy;
		const scene = new THREE.Scene();
		enemy.selected = true;
		enemy.assetManager = {
			textures: new Map([['flag', { texture: new THREE.Texture() }]])
		} as unknown as Enemy['assetManager'];
		enemy.gameManager = { scene } as unknown as Enemy['gameManager'];
		enemy.animatedPathFlags = [];

		enemy.showAnimatedPathFlag(new THREE.Vector3(10, 20));

		expect(enemy.animatedPathFlags).toHaveLength(1);
		const sprite = enemy.animatedPathFlags[0].sprite;
		const material = sprite.material as THREE.SpriteMaterial;
		const dispose = vi.spyOn(material, 'dispose');
		expect(scene.children).toContain(sprite);

		enemy.updateAnimatedPathFlags(1);

		expect(material.opacity).toBeGreaterThan(0);
		expect(material.opacity).toBeLessThan(1);

		enemy.updateAnimatedPathFlags(10);

		expect(scene.children).not.toContain(sprite);
		expect(enemy.animatedPathFlags).toEqual([]);
		expect(dispose).toHaveBeenCalledOnce();
	});

	it('stops and removes the animated path when the enemy is deselected', () => {
		const enemy = Object.create(Enemy.prototype) as Enemy;
		const scene = new THREE.Scene();
		const group = new THREE.Group();
		const dispose = vi.fn();
		scene.add(group);
		enemy.gameManager = { scene, isSimulation: true } as unknown as Enemy['gameManager'];
		enemy.animatedPathGroup = {
			group,
			completed: false,
			update: vi.fn(),
			dispose
		};
		enemy.animatedPathCountdowns = [];
		enemy.animatedPathFlags = [];

		enemy.onDeselect();

		expect(scene.children).not.toContain(group);
		expect(dispose).toHaveBeenCalledOnce();
		expect(enemy.animatedPathGroup).toBeNull();
		expect(enemy.pathVisualisationStage).toBe('none');
	});

	it('does not update geometry after the visualisation is disposed', () => {
		const onCheckpointReached = vi.fn();
		const gameManager = {
			getVectorCoordinates: ({ col, row }: { col: number; row: number }) => ({
				x: col * GameConfig.gridSize,
				y: row * GameConfig.gridSize
			})
		} as unknown as GameManager;
		const visualisation = createAnimatedPathVisualisation(
			[
				{
					type: 'MOVE',
					pathType: 'cp',
					position: { col: 2, row: 0 }
				}
			],
			0,
			new THREE.Vector3(),
			gameManager,
			undefined,
			onCheckpointReached
		);

		visualisation?.dispose();
		visualisation?.update(1);
		visualisation?.dispose();

		expect(visualisation?.completed).toBe(true);
		expect(visualisation?.group.children).toEqual([]);
		expect(onCheckpointReached).not.toHaveBeenCalled();
	});
});
