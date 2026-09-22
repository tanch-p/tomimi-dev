import * as THREE from 'three';
import { GameConfig } from './GameConfig.svelte.js';

export class TextSprite {
	sprite: THREE.Sprite;

	constructor(text: string, font = '20px Arial', color = 'black', scaleX = 100, scaleY = 100) {
		const canvas = document.createElement('canvas');
		const context = canvas.getContext('2d')!;
		canvas.width = GameConfig.gridSize;
		canvas.height = GameConfig.gridSize;
		context.font = font;
		context.fillStyle = color;
		context.fillText(text, 40, 50);

		const texture = new THREE.CanvasTexture(canvas);
		const material = new THREE.SpriteMaterial({ map: texture });
		this.sprite = new THREE.Sprite(material);
		this.sprite.scale.set(scaleX, scaleY, 1);
	}

	get() {
		return this.sprite;
	}
}
