import * as THREE from 'three';
import { expect, test, vi } from 'vitest';
import { GameInputController } from '$lib/components/StageSimulator/controllers/GameInputController';
import { OfflineStageRuntime } from '$lib/components/StageSimulator/objects/StageRuntime';

test('game input listeners attach once and fully detach', () => {
	const canvas = new EventTarget() as HTMLCanvasElement;
	Object.assign(canvas, {
		getBoundingClientRect: () => ({ left: 0, top: 0, width: 100, height: 100 })
	});
	const documentTarget = new EventTarget() as Document;
	const addCanvasListener = vi.spyOn(canvas, 'addEventListener');
	const removeCanvasListener = vi.spyOn(canvas, 'removeEventListener');
	const addDocumentListener = vi.spyOn(documentTarget, 'addEventListener');
	const removeDocumentListener = vi.spyOn(documentTarget, 'removeEventListener');
	const startSimulation = vi.fn();
	const runtime = new OfflineStageRuntime({
		mode: 'wave_normal',
		currentWaveIndex: 0,
		stagePhaseIndex: 0,
		eliteMode: false,
		specialMods: {},
		steeringEnabled: true,
		state: 'ready'
	});
	const controller = new GameInputController({
		canvas,
		camera: new THREE.OrthographicCamera(),
		gameManager: { rollOverMeshes: new Map() } as any,
		runtime,
		obstacleController: {} as any,
		getObjects: () => [],
		getPlacementPlane: () => null,
		isActive: () => true,
		startSimulation,
		documentTarget
	});

	controller.attach();
	controller.attach();
	canvas.dispatchEvent(
		Object.assign(new Event('pointerdown'), { clientX: 50, clientY: 50 }) as PointerEvent
	);

	expect(startSimulation).toHaveBeenCalledOnce();
	expect(addCanvasListener).toHaveBeenCalledOnce();
	expect(addDocumentListener).toHaveBeenCalledTimes(2);

	controller.detach();
	controller.detach();
	canvas.dispatchEvent(
		Object.assign(new Event('pointerdown'), { clientX: 50, clientY: 50 }) as PointerEvent
	);

	expect(startSimulation).toHaveBeenCalledOnce();
	expect(removeCanvasListener).toHaveBeenCalledOnce();
	expect(removeDocumentListener).toHaveBeenCalledTimes(2);
});

test('hiding token previews does not depend on the currently selected card', () => {
	const canvas = new EventTarget() as HTMLCanvasElement;
	const preview = new THREE.Group();
	preview.visible = true;
	const runtime = new OfflineStageRuntime({
		mode: 'wave_normal',
		currentWaveIndex: 0,
		stagePhaseIndex: 0,
		eliteMode: false,
		specialMods: {},
		steeringEnabled: true,
		tokenCard: null
	});
	const controller = new GameInputController({
		canvas,
		camera: new THREE.OrthographicCamera(),
		gameManager: {
			rollOverMeshes: new Map([['trap_001_crate', { getMesh: () => preview }]])
		} as any,
		runtime,
		obstacleController: {} as any,
		getObjects: () => [],
		getPlacementPlane: () => null,
		isActive: () => true,
		startSimulation: vi.fn(),
		documentTarget: new EventTarget() as Document
	});

	controller.hideRollOverMesh();

	expect(preview.visible).toBe(false);
});
