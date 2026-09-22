import * as THREE from 'three';
import type { Position } from '$lib/types';
import type { GameManager } from '../objects/GameManager';
import type { StageRuntime } from '../objects/StageRuntime';
import type { ObstacleController } from './ObstacleController';

export type GameInputContext = {
	canvas: HTMLCanvasElement;
	camera: THREE.OrthographicCamera;
	gameManager: GameManager;
	runtime: StageRuntime;
	obstacleController: ObstacleController;
	getObjects: () => THREE.Object3D[];
	getPlacementPlane: () => THREE.Object3D | null;
	isActive: () => boolean;
	startSimulation: () => void;
	documentTarget?: Document;
	raycaster?: THREE.Raycaster;
};

/** Owns pointer state, raycasting, selection, camera dragging, and token placement. */
export class GameInputController {
	private readonly pointer = new THREE.Vector2();
	private readonly raycaster: THREE.Raycaster;
	private readonly documentTarget: Document;
	private attached = false;
	private isDragging = false;
	private previousPointerPosition = { x: 0, y: 0 };
	private pendingTokenPointer: {
		clientX: number;
		clientY: number;
		overCanvas: boolean;
	} | null = null;
	private lastHoveredGridKey: string | null = null;

	constructor(private readonly context: GameInputContext) {
		this.documentTarget = context.documentTarget ?? document;
		this.raycaster = context.raycaster ?? new THREE.Raycaster();
	}

	attach() {
		if (this.attached) return;
		this.attached = true;
		this.context.canvas.addEventListener('pointerdown', this.onPointerDown);
		this.documentTarget.addEventListener('pointermove', this.onPointerMove);
		this.documentTarget.addEventListener('pointerup', this.onPointerUp);
	}

	detach() {
		if (!this.attached) return;
		this.attached = false;
		this.context.canvas.removeEventListener('pointerdown', this.onPointerDown);
		this.documentTarget.removeEventListener('pointermove', this.onPointerMove);
		this.documentTarget.removeEventListener('pointerup', this.onPointerUp);
		this.reset();
	}

	reset() {
		this.isDragging = false;
		this.pendingTokenPointer = null;
		this.lastHoveredGridKey = null;
	}

	hideRollOverMesh() {
		this.lastHoveredGridKey = null;
		for (const trap of this.context.gameManager.rollOverMeshes.values()) {
			trap.getMesh().visible = false;
		}
	}

	setRollOverPlacementValidity(mesh: THREE.Object3D, canPlace: boolean) {
		mesh.visible = true;
		if (mesh.userData.rollOverCanPlace === canPlace) return;
		mesh.userData.rollOverCanPlace = canPlace;
		mesh.traverse((object) => {
			const renderable = object as THREE.Mesh;
			if (!renderable.material) return;

			if (!object.userData.rollOverMaterialsCloned) {
				renderable.material = Array.isArray(renderable.material)
					? renderable.material.map((material) => material.clone())
					: renderable.material.clone();
				object.userData.rollOverMaterialsCloned = true;
			}

			const materials = Array.isArray(renderable.material)
				? renderable.material
				: [renderable.material];
			for (const material of materials) {
				if (material.userData.rollOverOriginalOpacity === undefined) {
					material.userData.rollOverOriginalOpacity = material.opacity;
					material.userData.rollOverOriginalTransparent = material.transparent;
					material.userData.rollOverOriginalDepthWrite = material.depthWrite;
				}
				material.opacity = canPlace
					? material.userData.rollOverOriginalOpacity
					: material.userData.rollOverOriginalOpacity * 0.45;
				material.transparent = canPlace ? material.userData.rollOverOriginalTransparent : true;
				material.depthWrite = canPlace ? material.userData.rollOverOriginalDepthWrite : false;
			}
		});
	}

	getObstaclePlacement(plane: THREE.Intersection, gridKey?: string) {
		const { gameManager, runtime } = this.context;
		const card = runtime.tokenCard;
		if (
			runtime.tokensDisabled ||
			runtime.tokenCooldownRemaining > 0 ||
			!card?.selected ||
			card.count <= 0
		) {
			return null;
		}

		const trap = gameManager.rollOverMeshes.get(card.key);
		const mesh = trap?.getMesh();
		if (!trap || !mesh) return null;

		const placementGridKey = gridKey ?? gameManager.getGridPosFromVectors(plane.point);
		const [col, row] = placementGridKey.split(',').map(Number);
		const position: Position = { row, col };
		const { x, y } = gameManager.getVectorCoordinates(position, null);
		mesh.position.set(x, y, 0.01);

		return {
			canPlace: gameManager.canPlaceRoadblock(position),
			mesh,
			position,
			trap
		};
	}

	processPendingPointerMove() {
		const pendingPointer = this.pendingTokenPointer;
		this.pendingTokenPointer = null;
		if (!pendingPointer) return;

		const { camera, gameManager, runtime } = this.context;
		if (!pendingPointer.overCanvas || runtime.tokensDisabled || !runtime.tokenCard?.selected) {
			this.hideRollOverMesh();
			return;
		}

		this.setPointerFromClient(pendingPointer.clientX, pendingPointer.clientY);
		this.raycaster.setFromCamera(this.pointer, camera);

		const plane = this.context.getPlacementPlane();
		if (!plane) {
			this.hideRollOverMesh();
			return;
		}
		const intersection = this.raycaster.intersectObject(plane, false)[0];
		if (!intersection) {
			this.hideRollOverMesh();
			return;
		}

		const gridKey = gameManager.getGridPosFromVectors(intersection.point);
		const placement = this.getObstaclePlacement(intersection, gridKey);
		if (!placement) {
			this.hideRollOverMesh();
			return;
		}
		const placementUnchanged =
			gridKey === this.lastHoveredGridKey &&
			placement.mesh.userData.rollOverCanPlace === placement.canPlace;
		this.lastHoveredGridKey = gridKey;
		if (placementUnchanged) return;
		this.setRollOverPlacementValidity(placement.mesh, placement.canPlace);
	}

	handleRoadblockInteraction(intersects: THREE.Intersection[]) {
		const removeIntersection = intersects.find(
			(intersection) => intersection.object.userData.roadblockRemove
		);
		if (removeIntersection) {
			const roadblock = removeIntersection.object.userData.roadblockRemove;
			this.context.obstacleController.recordRemoval(
				roadblock.position,
				roadblock.key,
				roadblock.userPlacementId
			);
			roadblock.remove();
			return true;
		}

		const roadblockIntersection = intersects.find(
			(intersection) => intersection.object.userData.trap?.isRoadblock
		);
		if (!roadblockIntersection) return false;
		const roadblock = roadblockIntersection.object.userData.trap;
		roadblock.onSelect();
		for (const object of this.context.getObjects()) {
			const selectable = object.userData.enemy || object.userData.trap;
			if (selectable && selectable !== roadblock) selectable.onDeselect();
		}
		return true;
	}

	private readonly onPointerMove = (event: PointerEvent) => {
		if (!this.context.isActive()) return;
		const { camera, canvas, runtime } = this.context;
		if (!runtime.cameraLock) {
			this.hideRollOverMesh();
			if (!this.isDragging) return;
			camera.position.x -= event.clientX - this.previousPointerPosition.x;
			camera.lookAt(new THREE.Vector3(camera.position.x, 38, 0));
			this.previousPointerPosition = { x: event.clientX, y: event.clientY };
			return;
		}

		this.pendingTokenPointer = {
			clientX: event.clientX,
			clientY: event.clientY,
			overCanvas: event.target === canvas
		};
	};

	private readonly onPointerDown = (event: PointerEvent) => {
		if (!this.context.isActive()) return;
		const { camera, runtime } = this.context;
		if (!runtime.cameraLock) {
			this.isDragging = true;
			this.previousPointerPosition = { x: event.clientX, y: event.clientY };
		}
		this.setPointerFromClient(event.clientX, event.clientY);
		if (['reset', 'loading', 'stop'].includes(runtime.state)) return;
		if (runtime.state === 'ready') {
			this.context.startSimulation();
			return;
		}

		this.raycaster.setFromCamera(this.pointer, camera);
		const objects = this.context.getObjects();
		const intersects = this.raycaster.intersectObjects(objects, false);
		if (intersects.length === 0) return;
		if (this.handleRoadblockInteraction(intersects)) return;

		const intersect = intersects[0];
		const plane = intersects.find((item) => item.object.userData.name === 'plane');
		if (plane && !runtime.tokensDisabled && runtime.tokenCard?.selected) {
			if (this.placeObstacle(plane)) return;
		}

		if (intersect.object.userData.enemy) {
			const enemy = intersect.object.userData.enemy;
			if (enemy.selected) {
				if (enemy.pathVisualisationStage === 'static') enemy.startAnimatedPathVisualisation();
				else enemy.onDeselect();
			} else {
				enemy.onSelect();
			}
		}
		if (intersect.object.userData.trap) {
			const trap = intersect.object.userData.trap;
			if (trap.selected) trap.activateBranch();
			else trap.onSelect();
		}

		for (const object of objects) {
			if (object.uuid === intersect.object.uuid) continue;
			const selectable = object.userData.enemy || object.userData.trap;
			selectable?.onDeselect();
		}
	};

	private placeObstacle(plane: THREE.Intersection) {
		const { gameManager, obstacleController, runtime } = this.context;
		const placement = this.getObstaclePlacement(plane);
		if (!placement?.canPlace) {
			if (placement) this.setRollOverPlacementValidity(placement.mesh, false);
			else this.hideRollOverMesh();
			return true;
		}
		if (runtime.tokenCooldownRemaining > 0) return true;

		const card = runtime.tokenCard;
		if (!card) return true;
		const placedTrap = gameManager.addTrap(
			{ key: placement.trap.key, direction: 'UP', pos: placement.position },
			null,
			'world'
		);
		if (!placedTrap) {
			this.setRollOverPlacementValidity(placement.mesh, false);
			return true;
		}

		placedTrap.userPlacementId = obstacleController.recordPlacement(
			placement.position,
			placedTrap.key
		);
		placement.mesh.visible = false;
		const tokenStats = placedTrap.data?.stats?.[0] ?? placement.trap.data?.stats?.[0];
		const tokenCost = Number(card.cost ?? tokenStats?.cost ?? 5);
		const cooldownDuration = Math.max(0, Number(tokenStats?.respawnTime ?? 0));
		const remainingCount = Math.max(0, card.count - 1);
		runtime.totalDeductedCost += tokenCost;
		runtime.tokenCooldownDuration = cooldownDuration;
		runtime.tokenCooldownRemaining = cooldownDuration;
		runtime.tokenCard = remainingCount > 0 ? { ...card, count: remainingCount } : null;
		return true;
	}

	private setPointerFromClient(clientX: number, clientY: number) {
		const rect = this.context.canvas.getBoundingClientRect();
		this.pointer.set(
			((clientX - rect.left) / rect.width) * 2 - 1,
			-((clientY - rect.top) / rect.height) * 2 + 1
		);
	}

	private readonly onPointerUp = () => {
		this.isDragging = false;
	};
}
