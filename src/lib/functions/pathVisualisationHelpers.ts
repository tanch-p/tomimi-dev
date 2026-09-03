import * as THREE from 'three';
import { GameConfig } from '$lib/components/StageSimulator/objects/GameConfig';
import type { AssetManager } from '$lib/components/StageSimulator/objects/AssetManager';
import type { GameManager } from '$lib/components/StageSimulator/objects/GameManager';

const animatedPathLength = GameConfig.gridSize * 3.4;
const animatedPathSpeed = GameConfig.gridSize * 7;
const animatedPathRenderOrder = Number.MAX_SAFE_INTEGER;
const animatedPathWidth = GameConfig.gridSize * 0.6;
const animatedPathGap = GameConfig.gridSize * -0.2;

//settled for rounded joins, miter join causes a protuding section...
function createRibbonGeometry(pathPoints: THREE.Vector3[], width: number) {
	const geometry = new THREE.BufferGeometry();

	// Remove consecutive duplicate points
	const points = pathPoints.filter((point, i) => {
		if (i === 0) return true;

		return point.distanceToSquared(pathPoints[i - 1]) > Number.EPSILON;
	});

	if (points.length < 2) {
		geometry.setAttribute('position', new THREE.Float32BufferAttribute([], 3));

		geometry.setAttribute('uv', new THREE.Float32BufferAttribute([], 2));

		return geometry;
	}

	const halfWidth = width / 2;

	const positions: number[] = [];
	const uvs: number[] = [];
	const indices: number[] = [];

	const distances = [0];

	for (let i = 1; i < points.length; i++) {
		distances.push(distances[i - 1] + points[i - 1].distanceTo(points[i]));
	}

	const totalDistance = distances[distances.length - 1];

	type Section = {
		left: THREE.Vector2;
		right: THREE.Vector2;
		u: number;
	};

	const sections: Section[] = [];

	const getDirection = (from: THREE.Vector3, to: THREE.Vector3) => {
		return new THREE.Vector2(to.x - from.x, to.y - from.y).normalize();
	};

	const getNormal = (direction: THREE.Vector2) => {
		return new THREE.Vector2(-direction.y, direction.x);
	};

	const cross = (a: THREE.Vector2, b: THREE.Vector2) => {
		return a.x * b.y - a.y * b.x;
	};

	const lineIntersection = (
		p1: THREE.Vector2,
		d1: THREE.Vector2,
		p2: THREE.Vector2,
		d2: THREE.Vector2
	) => {
		const denominator = cross(d1, d2);

		if (Math.abs(denominator) < 0.000001) {
			return null;
		}

		const delta = p2.clone().sub(p1);

		const t = cross(delta, d2) / denominator;

		return p1.clone().addScaledVector(d1, t);
	};

	const addSection = (left: THREE.Vector2, right: THREE.Vector2, u: number) => {
		sections.push({
			left,
			right,
			u
		});
	};

	// Start
	{
		const point = points[0];

		const direction = getDirection(points[0], points[1]);

		const normal = getNormal(direction);

		const center = new THREE.Vector2(point.x, point.y);

		addSection(
			center.clone().addScaledVector(normal, halfWidth),

			center.clone().addScaledVector(normal, -halfWidth),

			0
		);
	}

	// Corners
	for (let i = 1; i < points.length - 1; i++) {
		const previous = points[i - 1];
		const current = points[i];
		const next = points[i + 1];

		const previousDirection = getDirection(previous, current);

		const nextDirection = getDirection(current, next);

		const previousNormal = getNormal(previousDirection);

		const nextNormal = getNormal(nextDirection);

		const center = new THREE.Vector2(current.x, current.y);

		const turn = cross(previousDirection, nextDirection);

		const dot = THREE.MathUtils.clamp(previousDirection.dot(nextDirection), -1, 1);

		const u = totalDistance > Number.EPSILON ? distances[i] / totalDistance : 0;

		// Straight line
		if (Math.abs(turn) < 0.0001 && dot > 0) {
			const normal = previousNormal.clone().add(nextNormal);

			if (normal.lengthSq() < 0.000001) {
				normal.copy(nextNormal);
			} else {
				normal.normalize();
			}

			addSection(
				center.clone().addScaledVector(normal, halfWidth),

				center.clone().addScaledVector(normal, -halfWidth),

				u
			);

			continue;
		}

		/*
		 * Proper round join.
		 *
		 * The inside edge meets at one intersection.
		 * Only the OUTSIDE edge travels around an arc.
		 *
		 * This prevents the transparent ribbon from
		 * folding over itself.
		 */

		const isLeftTurn = turn > 0;

		const innerSign = isLeftTurn ? 1 : -1;
		const outerSign = -innerSign;

		const innerPreviousPoint = center
			.clone()
			.addScaledVector(previousNormal, halfWidth * innerSign);

		const innerNextPoint = center.clone().addScaledVector(nextNormal, halfWidth * innerSign);

		let innerPoint = lineIntersection(
			innerPreviousPoint,
			previousDirection,
			innerNextPoint,
			nextDirection
		);

		// Fallback for unusual / near-180° turns
		if (!innerPoint) {
			const innerNormal = previousNormal.clone().add(nextNormal).normalize();

			innerPoint = center.clone().addScaledVector(innerNormal, halfWidth * innerSign);
		}

		const outerPreviousNormal = previousNormal.clone().multiplyScalar(outerSign);

		const outerNextNormal = nextNormal.clone().multiplyScalar(outerSign);

		let startAngle = Math.atan2(outerPreviousNormal.y, outerPreviousNormal.x);

		let endAngle = Math.atan2(outerNextNormal.y, outerNextNormal.x);

		// Make the arc travel in the same direction
		// as the path's turn.
		if (isLeftTurn) {
			while (endAngle < startAngle) {
				endAngle += Math.PI * 2;
			}
		} else {
			while (endAngle > startAngle) {
				endAngle -= Math.PI * 2;
			}
		}

		// Fully rounded
		const roundSegments = 6;

		for (let segmentIndex = 0; segmentIndex <= roundSegments; segmentIndex++) {
			const t = segmentIndex / roundSegments;

			const angle = THREE.MathUtils.lerp(startAngle, endAngle, t);

			const outerPoint = new THREE.Vector2(
				center.x + Math.cos(angle) * halfWidth,

				center.y + Math.sin(angle) * halfWidth
			);

			if (isLeftTurn) {
				addSection(innerPoint.clone(), outerPoint, u);
			} else {
				addSection(outerPoint, innerPoint.clone(), u);
			}
		}
	}

	// End
	{
		const lastIndex = points.length - 1;
		const point = points[lastIndex];

		const direction = getDirection(points[lastIndex - 1], point);

		const normal = getNormal(direction);

		const center = new THREE.Vector2(point.x, point.y);

		addSection(
			center.clone().addScaledVector(normal, halfWidth),

			center.clone().addScaledVector(normal, -halfWidth),

			1
		);
	}

	// Convert sections into ribbon geometry
	for (const section of sections) {
		positions.push(
			section.left.x,
			section.left.y,
			0,

			section.right.x,
			section.right.y,
			0
		);

		uvs.push(
			section.u,
			1,

			section.u,
			0
		);
	}

	for (let i = 0; i < sections.length - 1; i++) {
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
	onWaitReached?: (time: number, position: THREE.Vector3) => void,
	onCheckpointReached?: (position: THREE.Vector3) => void
): AnimatedPathVisualisation | null {
	type RouteSegment = {
		points: THREE.Vector3[];
		waits: { pointIndex: number; time: number }[];
		checkpoints: { pointIndex: number }[];
	};

	const routeSegments: RouteSegment[] = [
		{
			points: [new THREE.Vector3(currentPosition.x, currentPosition.y, 0)],
			waits: [],
			checkpoints: []
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
			activeSegment = { points: [point], waits: [], checkpoints: [] };
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
		if (path.type === 'MOVE' && path.pathType === 'cp') {
			activeSegment.checkpoints.push({
				pointIndex: activeSegment.points.length - 1
			});
		}
	}

	const segments = routeSegments
		.map(({ points, waits, checkpoints }) => {
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
				})),
				checkpoints: checkpoints.map(({ pointIndex }) => ({
					distance: distances[pointIndex],
					position: points[pointIndex]
				}))
			};
		})
		.filter((segment) => segment.totalDistance > Number.EPSILON);

	if (segments.length === 0) return null;

	const initialPoint = segments[0].points[0];
	const geometry1 = createRibbonGeometry([initialPoint, initialPoint], animatedPathWidth);
	const geometry2 = createRibbonGeometry([initialPoint, initialPoint], animatedPathWidth);
	const material1 = new THREE.ShaderMaterial({
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
				float glow = 1.0 - smoothstep(0.0, 0.7, crossDistance);
				glow = pow(glow, 3.0);

				float tailFade = pow(smoothstep(0.0, 0.7, vUv.x), 2.0);
				float headFade = smoothstep(0.0, 0.15, 1.0 - vUv.x);
				float endFade = tailFade * headFade;

				vec3 color = uCoreColor * core * 1.8 + uGlowColor * glow * 0.3;
				float alpha = clamp(core + glow * 0.25, 0.0, 1.0) * endFade * uOpacity;
				gl_FragColor = vec4(color, alpha);
			}
		`,
		transparent: true,
		depthTest: false,
		depthWrite: false,
		blending: THREE.NormalBlending,
		side: THREE.DoubleSide,
		toneMapped: false
	});
	const material2 = material1.clone();

	const beamMesh1 = new THREE.Mesh(geometry1, material1);
	const beamMesh2 = new THREE.Mesh(geometry2, material2);
	beamMesh1.position.z = 11;
	beamMesh2.position.z = 11;
	beamMesh2.renderOrder = animatedPathRenderOrder - 1;
	beamMesh1.renderOrder = animatedPathRenderOrder;
	beamMesh2.visible = false;

	const group = new THREE.Group();
	group.renderOrder = animatedPathRenderOrder;
	group.add(beamMesh2, beamMesh1);

	type BeamState = {
		mesh: THREE.Mesh;
		geometry: THREE.BufferGeometry;
		segmentIndex: number;
		headDistance: number;
		waitIndex: number;
		checkpointIndex: number;
		completed: boolean;
	};

	const firstBeam: BeamState = {
		mesh: beamMesh1,
		geometry: geometry1,
		segmentIndex: 0,
		headDistance: 0,
		waitIndex: 0,
		checkpointIndex: 0,
		completed: false
	};
	const secondBeam: BeamState = {
		mesh: beamMesh2,
		geometry: geometry2,
		segmentIndex: 0,
		headDistance: -animatedPathLength - animatedPathGap,
		waitIndex: 0,
		checkpointIndex: 0,
		completed: false
	};
	let completed = false;

	const setLinePoints = (beam: BeamState, visiblePoints: THREE.Vector3[]) => {
		const nextGeometry = createRibbonGeometry(visiblePoints, animatedPathWidth);
		beam.mesh.geometry = nextGeometry;
		beam.geometry.dispose();
		beam.geometry = nextGeometry;
	};

	const getPointAtDistance = (segment: (typeof segments)[number], distance: number) => {
		const clampedDistance = THREE.MathUtils.clamp(distance, 0, segment.totalDistance);
		for (let i = 1; i < segment.distances.length; i++) {
			if (clampedDistance <= segment.distances[i]) {
				const segmentLength = segment.distances[i] - segment.distances[i - 1];
				const progress = segmentLength
					? (clampedDistance - segment.distances[i - 1]) / segmentLength
					: 0;
				return segment.points[i - 1].clone().lerp(segment.points[i], progress);
			}
		}
		return segment.points[segment.points.length - 1].clone();
	};

	const updateGeometry = (
		beam: BeamState,
		segment: (typeof segments)[number],
		tailDistance: number,
		visibleHeadDistance: number
	) => {
		const visiblePoints = [getPointAtDistance(segment, tailDistance)];
		for (let i = 1; i < segment.points.length - 1; i++) {
			if (segment.distances[i] > tailDistance && segment.distances[i] < visibleHeadDistance) {
				visiblePoints.push(segment.points[i]);
			}
		}
		visiblePoints.push(getPointAtDistance(segment, visibleHeadDistance));

		setLinePoints(beam, visiblePoints);
	};

	const showReachedWaits = (
		beam: BeamState,
		segment: (typeof segments)[number],
		visibleHeadDistance: number
	) => {
		while (
			beam.waitIndex < segment.waits.length &&
			segment.waits[beam.waitIndex].distance <= visibleHeadDistance
		) {
			const wait = segment.waits[beam.waitIndex];
			onWaitReached?.(wait.time, wait.position.clone());
			beam.waitIndex++;
		}
	};

	const showReachedCheckpoints = (
		beam: BeamState,
		segment: (typeof segments)[number],
		visibleHeadDistance: number
	) => {
		while (
			beam.checkpointIndex < segment.checkpoints.length &&
			segment.checkpoints[beam.checkpointIndex].distance <= visibleHeadDistance
		) {
			const checkpoint = segment.checkpoints[beam.checkpointIndex];
			onCheckpointReached?.(checkpoint.position.clone());
			beam.checkpointIndex++;
		}
	};

	const updateBeam = (beam: BeamState, distanceDelta: number, showMarkers: boolean) => {
		if (beam.completed) return;

		beam.headDistance += distanceDelta;
		if (beam.headDistance <= 0) {
			beam.mesh.visible = false;
			return;
		}

		while (!beam.completed) {
			const segment = segments[beam.segmentIndex];
			const visibleHeadDistance = Math.min(beam.headDistance, segment.totalDistance);
			if (showMarkers) {
				showReachedWaits(beam, segment, visibleHeadDistance);
				showReachedCheckpoints(beam, segment, visibleHeadDistance);
			}

			const tailDistance = Math.max(0, beam.headDistance - animatedPathLength);
			if (tailDistance >= segment.totalDistance) {
				const overflow = tailDistance - segment.totalDistance;
				beam.segmentIndex++;
				beam.waitIndex = 0;
				beam.checkpointIndex = 0;
				if (beam.segmentIndex >= segments.length) {
					beam.completed = true;
					beam.mesh.visible = false;
					return;
				}

				beam.headDistance = overflow;
				const nextStart = segments[beam.segmentIndex].points[0];
				setLinePoints(beam, [nextStart, nextStart]);
				continue;
			}

			beam.mesh.visible = true;
			updateGeometry(beam, segment, tailDistance, visibleHeadDistance);
			return;
		}
	};

	return {
		group,
		get completed() {
			return completed;
		},
		update(delta: number) {
			if (completed) return;

			const distanceDelta = animatedPathSpeed * delta;
			updateBeam(firstBeam, distanceDelta, true);
			updateBeam(secondBeam, distanceDelta, false);

			if (secondBeam.completed) {
				completed = true;
				group.visible = false;
			}
		},
		dispose() {
			firstBeam.geometry.dispose();
			secondBeam.geometry.dispose();
			material1.dispose();
			material2.dispose();
			group.remove(beamMesh1, beamMesh2);
		}
	};
}
