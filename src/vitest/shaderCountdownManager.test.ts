import * as THREE from 'three';
import { describe, expect, test, vi } from 'vitest';
import { CountdownSprite } from '$lib/components/StageSimulator/objects/ShaderCountdownManager';

function createCountdownSpriteForTextGeometry() {
	const sprite = Object.create(CountdownSprite.prototype) as any;
	sprite.time = 1;
	sprite.color = 0xf08080;
	sprite.warningColor = 0xdc143c;
	sprite.warningThreshold = 5;
	sprite.timeStr = '';
	sprite.textGeometry = new THREE.BufferGeometry();
	sprite.material = { uniforms: { time: { value: 1 } } };
	sprite.circleMesh = { material: { color: { setHex: vi.fn() } } };
	sprite.textMesh = { geometry: sprite.textGeometry };
	sprite.assetManager = {
		textures: new Map([
			[
				'0',
				{
					config: {
						UVWidth: 0.25,
						UVHeight: 0.25,
						uvOffsetX: 0.25,
						uvOffsetY: 0.75
					}
				}
			]
		])
	};
	return sprite;
}

describe('countdown text geometry', () => {
	test('clamps a negative time to zero before looking it up in the digit atlas', () => {
		const sprite = createCountdownSpriteForTextGeometry();
		const consoleError = vi.spyOn(console, 'error').mockImplementation(() => undefined);

		sprite.setTime(-1);

		expect(consoleError).not.toHaveBeenCalled();
		expect(sprite.time).toBe(0);
		expect(sprite.timeStr).toBe('0');
		expect(sprite.textGeometry.getAttribute('position').count).toBe(4);
		expect(Array.from(sprite.textGeometry.getIndex()!.array)).toEqual([0, 1, 2, 1, 3, 2]);
		consoleError.mockRestore();
	});
});
