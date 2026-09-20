import { expect, test, vi } from 'vitest';
import { AssetManager } from '$lib/components/StageSimulator/objects/AssetManager';

test('AssetManager disposes aliased textures and model resources before clearing caches', () => {
	const sharedTexture = { dispose: vi.fn(), isTexture: true };
	const modelTexture = { dispose: vi.fn(), isTexture: true };
	const geometry = { dispose: vi.fn() };
	const material = { dispose: vi.fn(), map: modelTexture };
	const model = {
		traverse(callback) {
			callback({ geometry, material });
		}
	};
	const removeAll = vi.fn();
	const fontAtlas = { dispose: vi.fn() };
	const manager = Object.create(AssetManager.prototype) as any;
	Object.assign(manager, {
		font: {},
		fontAtlas,
		models: new Map([['model', model]]),
		spineAssetManager: { removeAll },
		spineMap: new Map([['spine', {}]]),
		textures: new Map([
			['first-alias', { texture: sharedTexture }],
			['second-alias', { texture: sharedTexture }]
		]),
		texturesLoaded: true
	});

	manager.cleanup();

	expect(sharedTexture.dispose).toHaveBeenCalledOnce();
	expect(modelTexture.dispose).toHaveBeenCalledOnce();
	expect(geometry.dispose).toHaveBeenCalledOnce();
	expect(material.dispose).toHaveBeenCalledOnce();
	expect(fontAtlas.dispose).toHaveBeenCalledOnce();
	expect(removeAll).toHaveBeenCalledOnce();
	expect(manager.textures.size).toBe(0);
	expect(manager.models.size).toBe(0);
	expect(manager.spineMap.size).toBe(0);
	expect(manager.texturesLoaded).toBe(false);
});

test('AssetManager serializes stage loads that share its caches', async () => {
	let finishFirstLoad = () => undefined;
	const firstLoadGate = new Promise<void>((resolve) => {
		finishFirstLoad = resolve;
	});
	const startedLoads: string[] = [];
	const manager = Object.create(AssetManager.prototype) as any;
	manager.loadQueue = Promise.resolve();
	manager.performLoadAssets = vi.fn(async (stage: string) => {
		startedLoads.push(stage);
		if (stage === 'first') await firstLoadGate;
		return true;
	});

	const firstLoad = manager.loadAssets('first');
	const secondLoad = manager.loadAssets('second');
	await Promise.resolve();

	expect(startedLoads).toEqual(['first']);
	finishFirstLoad();
	await Promise.all([firstLoad, secondLoad]);
	expect(startedLoads).toEqual(['first', 'second']);
});

test('AssetManager cleans a failed load and keeps the queue usable', async () => {
	const manager = Object.create(AssetManager.prototype) as any;
	manager.loadQueue = Promise.resolve();
	manager.disposeAssets = vi.fn();
	manager.performLoadAssets = vi
		.fn()
		.mockRejectedValueOnce(new Error('asset failed'))
		.mockResolvedValueOnce(true);

	await expect(manager.loadAssets('broken')).rejects.toThrow('asset failed');
	await expect(manager.loadAssets('working')).resolves.toBe(true);

	expect(manager.disposeAssets).toHaveBeenCalledOnce();
	expect(manager.performLoadAssets).toHaveBeenCalledTimes(2);
});
