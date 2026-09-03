import * as THREE from 'three';
import { AssetManager } from './AssetManager';
import { GameConfig } from './GameConfig';

// Countdown Manager Class
export class CountdownManager {
	private static instance: CountdownManager;
	private assetManager: AssetManager;
	private countdowns: Map<number, CountdownSprite>;
	private shaderMaterial: THREE.ShaderMaterial;
	private indexCounter = 0;
	private colors;

	// Singleton pattern
	public static getInstance(): CountdownManager {
		if (!CountdownManager.instance) {
			CountdownManager.instance = new CountdownManager();
		}
		return CountdownManager.instance;
	}

	private constructor() {
		this.assetManager = AssetManager.getInstance();
		this.countdowns = new Map();
		this.colors = { normal: 0xf08080, standby: 0x5f7af7 };
		// Create the shader material for all countdowns
		this.shaderMaterial = new THREE.ShaderMaterial({
			uniforms: {
				fontTexture: { value: this.assetManager.textures.get('0').texture },
				color: { value: new THREE.Color(0xffffff) },
				time: { value: 0.0 },
				fadeOpacity: { value: 1.0 }
			},
			vertexShader: `
		  varying vec2 vUv;
		  void main() {
			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
		  }
		`,
			fragmentShader: `
		  uniform sampler2D fontTexture;
		  uniform vec3 color;
		  uniform float fadeOpacity;
		  varying vec2 vUv;
		  
		  void main() {
        // Adjust smoothing and threshold for better visibility
        float smoothing = 0.5;
        float threshold = 0.5;

        vec4 texColor = texture2D(fontTexture, vUv);
        float alpha = smoothstep(threshold - smoothing, threshold + smoothing, texColor.a);        
        alpha = max(alpha, 0.0);
			gl_FragColor = vec4(color, alpha * fadeOpacity);
      }
		`,
			transparent: true,
			depthTest: false,
			side: THREE.DoubleSide
		});
	}

	createCountdown(initialTime: number, colorKey = 'normal', countsDown = true): CountdownSprite {
		if (this.countdowns.has(this.indexCounter)) {
			console.warn(
				`Countdown with id ${this.indexCounter} already exists. Returning existing instance.`
			);
			return this.countdowns.get(this.indexCounter)!;
		}
		const countdown = new CountdownSprite(
			this.indexCounter,
			initialTime,
			this.colors[colorKey],
			this.shaderMaterial,
			countsDown
		);
		this.countdowns.set(this.indexCounter, countdown);
		this.indexCounter++;
		return countdown;
	}

	toggleAllCountdowns(val) {
		this.countdowns.forEach((countdown) => {
			countdown.getGroup().visible = val;
		});
	}
	toggleCountdown(id, val) {
		const countdown = this.countdowns.get(id);
		if (!countdown) return;
		countdown.getGroup().visible = val;
	}

	setCountdownOpacity(id: number, opacity: number): void {
		this.countdowns.get(id)?.setOpacity(opacity);
	}

	// Remove a countdown
	removeCountdown(id: number): void {
		const countdown = this.countdowns.get(id);
		if (countdown) {
			countdown.dispose();
			this.countdowns.delete(id);
		}
	}

	// Remove all countdowns
	removeAllCountdowns(): void {
		this.countdowns.forEach((countdown, id) => {
			countdown.dispose();
			this.countdowns.delete(id);
		});
	}

	// Update all countdowns
	update(deltaTime: number): void {
		this.countdowns.forEach((countdown) => {
			countdown.update(deltaTime);
		});
	}

	// Dispose all resources
	dispose(): void {
		this.countdowns.forEach((countdown) => {
			countdown.dispose();
		});
		this.countdowns.clear();
		this.shaderMaterial.dispose();
	}
}

export class CountdownSprite {
	public id: number;
	private group: THREE.Group;
	private time: number;
	private color: number;
	private warningColor = 0xdc143c;
	private warningThreshold = 5.0;

	private circleMesh: THREE.Mesh;
	private ringMesh: THREE.Mesh;
	private textMesh: THREE.Mesh;
	private textGeometry: THREE.BufferGeometry;

	private assetManager: AssetManager;
	private material: THREE.ShaderMaterial;
	private countsDown: boolean;
	private timeStr: string = '';

	// Shared geometry
	private static readonly circleGeometry = new THREE.CircleGeometry(GameConfig.gridSize / 4, 32);
	private static readonly ringGeometry = new THREE.RingGeometry(
		GameConfig.gridSize / 4 - 1,
		GameConfig.gridSize / 4,
		32
	);

	constructor(
		id: number,
		initialTime: number,
		color: number,
		sharedMaterial: THREE.ShaderMaterial,
		countsDown = true
	) {
		this.id = id;
		this.time = initialTime;
		this.color = color;
		this.countsDown = countsDown;
		this.assetManager = AssetManager.getInstance();

		// Create a group to hold all meshes
		this.group = new THREE.Group();
		this.group.renderOrder = 10;

		// Clone the shared material so each countdown can have its own color
		this.material = sharedMaterial.clone();
		this.material.uniforms.time.value = this.time;

		// Create circle background
		const circleMaterial = new THREE.MeshBasicMaterial({
			color: this.color,
			transparent: true,
			depthTest: false
		});
		this.circleMesh = new THREE.Mesh(CountdownSprite.circleGeometry, circleMaterial);

		// Create ring
		const ringMaterial = new THREE.MeshBasicMaterial({
			color: 0x666666,
			transparent: true,
			depthTest: false
		});
		this.ringMesh = new THREE.Mesh(CountdownSprite.ringGeometry, ringMaterial);
		this.ringMesh.position.z = 0.1;

		// Create text geometry (initially empty)
		this.textGeometry = new THREE.BufferGeometry();

		// Create text mesh using the SDF shader
		this.textMesh = new THREE.Mesh(this.textGeometry, this.material);
		this.textMesh.scale.set(20, 20, 20);
		this.textMesh.position.z = 0.2;
		this.textMesh.position.y = -2;

		// Add all meshes to the group
		this.group.add(this.circleMesh, this.ringMesh, this.textMesh);
		this.group.visible = GameConfig.showAllTimers;
		// Update the display
		this.updateDisplay();
	}

	// Get the Three.js group for this countdown
	getGroup(): THREE.Group {
		return this.group;
	}

	// Set position of the countdown
	setPosition(x: number, y: number, z = 0): void {
		this.group.position.set(x, y, z);
	}

	setOpacity(opacity: number): void {
		const clampedOpacity = THREE.MathUtils.clamp(opacity, 0, 1);
		this.material.uniforms.fadeOpacity.value = clampedOpacity;
		(this.circleMesh.material as THREE.MeshBasicMaterial).opacity = clampedOpacity;
		(this.ringMesh.material as THREE.MeshBasicMaterial).opacity = clampedOpacity;
	}

	// Set position relative to grid (compatible with your original code)
	setGridPosition(height: number, gridSize: number): void {
		this.group.position.set(0, height + gridSize / 5, 0);
	}

	// Update the countdown time
	setTime(time: number): void {
		this.time = time;
		this.updateDisplay();
	}

	// Set the color
	setColor(color: number): void {
		this.color = color;
		this.material.uniforms.color.value.setHex(color);
		(this.circleMesh.material as THREE.MeshBasicMaterial).color.setHex(
			this.time <= this.warningThreshold ? this.warningColor : this.color
		);
	}

	private createTextGeometry(text: string): THREE.BufferGeometry {
		// Skip if text is unchanged
		if (text === this.timeStr) return this.textGeometry;

		this.timeStr = text;
		// Calculate geometry for the text
		const digitWidth = 1; // Width of each digit
		const spacing = -0.44; // Spacing between digits
		const totalWidth = text.length * digitWidth + (text.length - 1) * spacing;

		// Arrays to hold the geometry data
		const positions: number[] = [];
		const uvs: number[] = [];
		const indices: number[] = [];
		this.timeStr.split('').forEach((digit, index) => {
			const texture = this.assetManager.textures.get(digit);
			if (!texture) {
				console.error(`Digit ${digit} not found in font atlas`);
				return;
			}
			const { config } = texture;
			const x0 = -totalWidth / 2 + index * (digitWidth + spacing) + 0.16;
			const x1 = x0 + digitWidth;
			const y0 = digitWidth / 2;
			const y1 = -digitWidth / 2;

			positions.push(
				x0,
				y0,
				0, // Bottom left
				x1,
				y0,
				0, // Bottom right
				x0,
				y1,
				0, // Top left
				x1,
				y1,
				0 // Top right
			);

			uvs.push(
				config.uvOffsetX,
				config.uvOffsetY + config.UVHeight, // Bottom left
				config.uvOffsetX + config.UVWidth,
				config.uvOffsetY + config.UVHeight, // Bottom right
				config.uvOffsetX,
				config.uvOffsetY, // Top left
				config.uvOffsetX + config.UVWidth,
				config.uvOffsetY // Top right
			);

			// Indices for two triangles
			const vertexOffset = index * 4;
			indices.push(
				vertexOffset,
				vertexOffset + 1,
				vertexOffset + 2, // First triangle
				vertexOffset + 1,
				vertexOffset + 3,
				vertexOffset + 2 // Second triangle
			);
		});

		// Create or update the geometry
		const geometry = new THREE.BufferGeometry();
		geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
		geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
		geometry.setIndex(indices);
		return geometry;
	}

	// Update time-based appearance
	private updateDisplay(): void {
		// Update material uniforms
		this.material.uniforms.time.value = this.time;

		// Update circle color based on warning threshold
		(this.circleMesh.material as THREE.MeshBasicMaterial).color.setHex(
			this.time <= this.warningThreshold ? this.warningColor : this.color
		);

		// Convert time to string and update geometry with proper UVs
		const timeString = Math.ceil(this.time).toString();

		// Create new geometry with the correct UVs for each digit
		const newGeometry = this.createTextGeometry(timeString);

		// Update the mesh with the new geometry
		if (newGeometry !== this.textGeometry) {
			this.textMesh.geometry.dispose(); // Clean up old geometry
			this.textMesh.geometry = newGeometry;
			this.textGeometry = newGeometry;
		}
	}

	update(deltaTime: number): void {
		if (!this.countsDown) return;
		const newTime = this.time - deltaTime;
		// Check if countdown has completed
		if (newTime <= 0) {
			this.time = 0;
			CountdownManager.getInstance().removeCountdown(this.id);
		} else {
			this.time = newTime;
		}

		// Update the display
		this.updateDisplay();
	}

	// Dispose resources
	dispose(): void {
		this.group.removeFromParent();
		this.material.dispose();
		this.textGeometry.dispose();
		(this.circleMesh.material as THREE.MeshBasicMaterial).dispose();
		(this.ringMesh.material as THREE.MeshBasicMaterial).dispose();
		this.group.remove(this.circleMesh, this.ringMesh, this.textMesh);
	}
}
