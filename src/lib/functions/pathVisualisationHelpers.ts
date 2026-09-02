import * as THREE from 'three';
import { GameConfig } from '$lib/components/StageSimulator/objects/GameConfig';
import type { AssetManager } from '$lib/components/StageSimulator/objects/AssetManager';
import type { GameManager } from '$lib/components/StageSimulator/objects/GameManager';

const animatedPathLength = GameConfig.gridSize * 2;
const animatedPathSpeed = GameConfig.gridSize * 6;
const animatedPathRenderOrder = Number.MAX_SAFE_INTEGER;
const animatedPathWidth = GameConfig.gridSize * 0.6;

function samplePath(points: THREE.Vector3[]) {
	const sampledPoints = [points[0].clone()];
	const sampleSpacing = GameConfig.gridSize * 0.1;
	for (let i = 1; i < points.length; i++) {
		const start = points[i - 1];
		const end = points[i];
		const sampleCount = Math.max(1, Math.ceil(start.distanceTo(end) / sampleSpacing));
		for (let sampleIndex = 1; sampleIndex <= sampleCount; sampleIndex++) {
			sampledPoints.push(start.clone().lerp(end, sampleIndex / sampleCount));
		}
	}
	return sampledPoints;
}

function createRibbonGeometry(pathPoints: THREE.Vector3[], width: number) {
	const points = samplePath(pathPoints);
	const geometry = new THREE.BufferGeometry();
	const positions: number[] = [];
	const uvs: number[] = [];
	const indices: number[] = [];
	const distances = [0];

	for (let i = 1; i < points.length; i++) {
		distances.push(distances[i - 1] + points[i - 1].distanceTo(points[i]));
	}
	const totalDistance = distances[distances.length - 1];

	for (let i = 0; i < points.length; i++) {
		const previousPoint = points[Math.max(0, i - 1)];
		const nextPoint = points[Math.min(points.length - 1, i + 1)];
		const tangent = new THREE.Vector3().subVectors(nextPoint, previousPoint).normalize();
		const halfWidth = width / 2;
		const normalX = -tangent.y * halfWidth;
		const normalY = tangent.x * halfWidth;
		const u = totalDistance > Number.EPSILON ? distances[i] / totalDistance : 0;

		positions.push(
			points[i].x + normalX,
			points[i].y + normalY,
			0,
			points[i].x - normalX,
			points[i].y - normalY,
			0
		);
		uvs.push(u, 1, u, 0);

		if (i < points.length - 1) {
			const vertexIndex = i * 2;
			indices.push(
				vertexIndex,
				vertexIndex + 1,
				vertexIndex + 2,
				vertexIndex + 1,
				vertexIndex + 3,
				vertexIndex + 2
			);
		}
	}

	geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
	geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
	geometry.setIndex(indices);
	return geometry;
}

export type AnimatedPathVisualisation = {
	group: THREE.Group;
	completed: boolean;
	update: (delta: number) => void;
	dispose: () => void;
};

export function createPathVisualisation(
	paths: any[],
	startPos: any,
	spawnOffset: any,
	assetManager: AssetManager,
	gameManager: GameManager
) {
	const returnGroup = new THREE.Group();
	returnGroup.renderOrder = 50;
	const lineGroup = new THREE.Group();
	const movePaths = paths.filter((path) => path.type === 'MOVE' || path.type === 'APPEAR_AT_POS');
	for (let i = 0; i < movePaths.length; i++) {
		const startCoordinates = movePaths[i - 1]?.position || startPos;
		const startOffset = i === 0 ? spawnOffset : movePaths[i - 1].reachOffset;
		const endCoordinates = movePaths[i].position;
		const endOffset = movePaths[i].reachOffset;
		const startPoint = gameManager.getVectorCoordinates(startCoordinates, startOffset);
		const endPoint = gameManager.getVectorCoordinates(endCoordinates, endOffset);
		const geometry = new THREE.BufferGeometry().setFromPoints([
			new THREE.Vector3(startPoint.x, startPoint.y, 0),
			new THREE.Vector3(endPoint.x, endPoint.y, 0)
		]);
		const line = new THREE.Line(
			geometry,
			new THREE.LineBasicMaterial({ color: 0xff0000, transparent: true, depthTest: false })
		);
		line.position.z = 10;
		lineGroup.add(line);
	}
	for (let i = 0; i < paths.length; i++) {
		const { type, pathType, time, position, reachOffset } = paths[i];
		const group = new THREE.Group();
		switch (type) {
			case 'MOVE':
				if (pathType === 'cp') {
					const texture = assetManager.textures.get('flag').texture;
					const sprite = new THREE.Sprite(
						new THREE.SpriteMaterial({ map: texture, transparent: true, depthTest: false })
					);
					sprite.scale.set(GameConfig.gridSize * 0.6, GameConfig.gridSize * 0.6, 1);
					const { x, y } = gameManager.getVectorCoordinates(position, reachOffset);
					sprite.position.set(x + 2, y + GameConfig.gridSize * 0.3, GameConfig.baseZIndex + 10);
					group.renderOrder = 50;
					sprite.renderOrder = 50;
					group.add(sprite);
				}
				break;
			case 'WAIT_FOR_SECONDS': {
				const circle = new THREE.Mesh(
					new THREE.CircleGeometry(GameConfig.gridSize / 4, 32),
					new THREE.MeshBasicMaterial({ color: 0xb1b1b1, transparent: true, depthTest: false })
				);
				const ring = new THREE.Mesh(
					new THREE.RingGeometry(GameConfig.gridSize / 4 - 2, GameConfig.gridSize / 4, 32),
					new THREE.MeshBasicMaterial({ color: 0xdc143c, transparent: true, depthTest: false })
				);
				ring.position.z = 2;
				const waitPosition =
					i === 0
						? startPos
						: paths[i - 1].type === 'DISAPPEAR'
						? paths[i - 2].position
						: paths[i - 1].position;
				const { x, y } = gameManager.getVectorCoordinates(
					waitPosition,
					i === 0 ? spawnOffset : reachOffset
				);
				const text = gameManager.getTextSprite(time.toFixed() + 's', 16);
				text.position.z = 5;
				group.add(text, ring, circle);
				group.position.set(x, y, GameConfig.baseZIndex + 15);
				group.renderOrder = 50;
				circle.renderOrder = 50;
				text.renderOrder = 50;
				ring.renderOrder = 50;
				break;
			}
		}
		returnGroup.add(group);
	}
	returnGroup.add(lineGroup);
	return returnGroup;
}

/**
 * Creates a one-shot, fixed-length line which travels over the remaining route.
 * The line initially grows from the enemy, then its head and tail advance together.
 */
export function createAnimatedPathVisualisation(
	paths: any[],
	currentActionIndex: number,
	currentPosition: THREE.Vector3,
	gameManager: GameManager,
	onWaitReached?: (time: number, position: THREE.Vector3) => void
): AnimatedPathVisualisation | null {
	type RouteSegment = {
		points: THREE.Vector3[];
		waits: { pointIndex: number; time: number }[];
	};

	const routeSegments: RouteSegment[] = [
		{
			points: [new THREE.Vector3(currentPosition.x, currentPosition.y, 0)],
			waits: []
		}
	];
	let activeSegment = routeSegments[0];
	let disappeared = false;
	const waitActionTypes = [
		'WAIT_FOR_SECONDS',
		'WAIT_CURRENT_FRAGMENT_TIME',
		'WAIT_CURRENT_WAVE_TIME'
	];

	for (let i = 0; i < currentActionIndex; i++) {
		if (paths[i].type === 'DISAPPEAR') disappeared = true;
		if (paths[i].type === 'APPEAR_AT_POS') disappeared = false;
	}

	for (const path of paths.slice(currentActionIndex)) {
		if (waitActionTypes.includes(path.type)) {
			activeSegment.waits.push({
				pointIndex: activeSegment.points.length - 1,
				time: path.time
			});
			continue;
		}
		if (path.type === 'DISAPPEAR') {
			disappeared = true;
			continue;
		}
		if (path.type !== 'MOVE' && path.type !== 'APPEAR_AT_POS') continue;

		const { x, y } = gameManager.getVectorCoordinates(path.position, path.reachOffset);
		const point = new THREE.Vector3(x, y, 0);
		if (path.type === 'APPEAR_AT_POS' && disappeared) {
			activeSegment = { points: [point], waits: [] };
			routeSegments.push(activeSegment);
			disappeared = false;
			continue;
		}
		if (disappeared) continue;
		if (
			point.distanceToSquared(activeSegment.points[activeSegment.points.length - 1]) >
			Number.EPSILON
		) {
			activeSegment.points.push(point);
		}
	}

	const segments = routeSegments
		.map(({ points, waits }) => {
			const distances = [0];
			for (let i = 1; i < points.length; i++) {
				distances.push(distances[i - 1] + points[i - 1].distanceTo(points[i]));
			}
			return {
				points,
				distances,
				totalDistance: distances[distances.length - 1],
				waits: waits.map(({ pointIndex, time }) => ({
					distance: distances[pointIndex],
					position: points[pointIndex],
					time
				}))
			};
		})
		.filter((segment) => segment.totalDistance > Number.EPSILON);

	if (segments.length === 0) return null;

	let segmentIndex = 0;
	let { points, distances, totalDistance } = segments[segmentIndex];
	let waitIndex = 0;

	let geometry = createRibbonGeometry([points[0], points[0]], animatedPathWidth);
	const material = new THREE.ShaderMaterial({
		uniforms: {
			uCoreColor: { value: new THREE.Color(0xffb3b3) },
			uGlowColor: { value: new THREE.Color(0xff1008) },
			uOpacity: { value: 1 }
		},
		vertexShader: `
			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
			}
		`,
		fragmentShader: `
			varying vec2 vUv;
			uniform vec3 uCoreColor;
			uniform vec3 uGlowColor;
			uniform float uOpacity;

			void main() {
				float crossDistance = abs(vUv.y - 0.5) * 2.0;
				float core = 1.0 - smoothstep(0.02, 0.13, crossDistance);
				float glow = 1.0 - smoothstep(0.0, 1.0, crossDistance);
				glow = pow(glow, 2.0);

				float tailFade = pow(
    smoothstep(0.0, 0.5, vUv.x),
    2.0
);
				float headFade = smoothstep(0.0, 0.05, 1.0 - vUv.x);
				float endFade = tailFade * headFade;

				vec3 color = uCoreColor * core * 1.8 + uGlowColor * glow * 0.6;
				float alpha = clamp(core + glow * 0.5, 0.0, 1.0) * endFade * uOpacity;
				gl_FragColor = vec4(color, alpha);
			}
		`,
		transparent: true,
		depthTest: false,
		depthWrite: false,
		blending: THREE.AdditiveBlending,
		side: THREE.DoubleSide,
		toneMapped: false
	});

	const beamMesh = new THREE.Mesh(geometry, material);
	beamMesh.position.z = 11;
	beamMesh.renderOrder = animatedPathRenderOrder;

	const group = new THREE.Group();
	group.renderOrder = animatedPathRenderOrder;
	group.add(beamMesh);

	let headDistance = 0;
	let completed = false;

	const setLinePoints = (visiblePoints: THREE.Vector3[]) => {
		const nextGeometry = createRibbonGeometry(visiblePoints, animatedPathWidth);
		beamMesh.geometry = nextGeometry;
		geometry.dispose();
		geometry = nextGeometry;
	};

	const getPointAtDistance = (distance: number) => {
		const clampedDistance = THREE.MathUtils.clamp(distance, 0, totalDistance);
		for (let i = 1; i < distances.length; i++) {
			if (clampedDistance <= distances[i]) {
				const segmentLength = distances[i] - distances[i - 1];
				const progress = segmentLength ? (clampedDistance - distances[i - 1]) / segmentLength : 0;
				return points[i - 1].clone().lerp(points[i], progress);
			}
		}
		return points[points.length - 1].clone();
	};

	const updateGeometry = (tailDistance: number, visibleHeadDistance: number) => {
		const visiblePoints = [getPointAtDistance(tailDistance)];
		for (let i = 1; i < points.length - 1; i++) {
			if (distances[i] > tailDistance && distances[i] < visibleHeadDistance) {
				visiblePoints.push(points[i]);
			}
		}
		visiblePoints.push(getPointAtDistance(visibleHeadDistance));

		setLinePoints(visiblePoints);
	};

	const showReachedWaits = (visibleHeadDistance: number) => {
		const waits = segments[segmentIndex].waits;
		while (waitIndex < waits.length && waits[waitIndex].distance <= visibleHeadDistance) {
			const wait = waits[waitIndex];
			onWaitReached?.(wait.time, wait.position.clone());
			waitIndex++;
		}
	};

	return {
		group,
		get completed() {
			return completed;
		},
		update(delta: number) {
			if (completed) return;

			headDistance += animatedPathSpeed * delta;
			showReachedWaits(Math.min(headDistance, totalDistance));
			const tailDistance = Math.max(0, headDistance - animatedPathLength);
			if (tailDistance >= totalDistance) {
				segmentIndex++;
				if (segmentIndex >= segments.length) {
					completed = true;
					group.visible = false;
					return;
				}

				({ points, distances, totalDistance } = segments[segmentIndex]);
				headDistance = 0;
				waitIndex = 0;
				setLinePoints([points[0], points[0]]);
				return;
			}

			updateGeometry(tailDistance, Math.min(headDistance, totalDistance));
		},
		dispose() {
			geometry.dispose();
			material.dispose();
			group.remove(beamMesh);
		}
	};
}
