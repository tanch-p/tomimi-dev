import type { Skill } from '$lib/types';
import * as spine from '$lib/spine';
import * as THREE from 'three';
import { Enemy } from './Enemy';
import { AssetManager } from './AssetManager';
import { ActiveSkill, isFtprgSummonSkill } from './ActiveSkill';
import { getDefaultAnimName } from '$lib/functions/spineHelpers';
import { GameManager } from './GameManager';

const skillBarColors: THREE.ColorRepresentation[] = [
	0x74b72e, 0xb9d175, 0xf59e0b, 0xa855f7, 0xef4444, 0x14b8a6
];

export class SkillManager {
	gameManager: GameManager;
	assetManager: AssetManager;
	enemy: Enemy;
	skills: Skill[];
	activeSkills: ActiveSkill[] = [];
	skillBarColorIndexes = new Map<string, number>();
	transformModel;
	isUsingSkill = false;
	accelerationIntervalTimer = 0;
	accelerationPreDelayTimer = 0;
	accelerateParams = null;
	accelerationStacks = 0;
	summonDelayRemaining: number | null = null;
	startedEnemyAfterSummons = false;
	//TODO to rework acceleration into a timer based buff generic skill

	constructor(enemy: Enemy, skills: Skill[], gameManager: GameManager, skillData = null) {
		this.assetManager = AssetManager.getInstance();
		this.enemy = enemy;
		this.gameManager = gameManager;
		this.skills = skills;
		for (const skill of skills) {
			if (skill.key === 'transform') {
				const key = skill.value;
				this.addTransformModel(key);
			}
			if (skill.accelerate) {
				this.accelerateParams = skill.accelerate;
			}
			if (skill.key === 'parasitic') {
				this.addParasiticSprite();
			}
		}
		if (['enemy_2148_shorbb'].includes(this.enemy.key)) {
			this.activeSkills = skills
				.filter((ele) => ele.branches)
				.map((skill) => new ActiveSkill(enemy, skill));
			this.activeSkills.forEach((skill, i) => {
				skill.skillBar.position.y = (i + 1) * -10;
				this.setInitialSkillBarColor(skill, i);
				enemy.meshGroup.add(skill.skillBar);
			});
		} else if (
			['enemy_2042_syboss', 'enemy_2089_skzjkl', 'enemy_2018_csdoll'].includes(this.enemy.key)
		) {
			this.activeSkills = skills
				.filter(
					(ele) =>
						ele.branches ||
						(ele.type === 'skill' && (ele.initCooldown || ele.skillType === 'INCREASE_WITH_TIME'))
				)
				.map((skill) => new ActiveSkill(enemy, skill));
			this.activeSkills.forEach((skill, i) => {
				skill.skillBar.position.y = (i + 1) * -10;
				this.setInitialSkillBarColor(skill, i);
				enemy.meshGroup.add(skill.skillBar);
			});
		} else if (this.enemy.motionMode === 'SKILL_BLINK') {
			this.activeSkills = skills
				.filter((skill) => skill.key === this.enemy.skillBlinkTriggerKey)
				.map((skill) => new ActiveSkill(enemy, skill, true));
			this.activeSkills.forEach((skill, i) => {
				skill.skillBar.position.y = (i + 1) * -10;
				this.setInitialSkillBarColor(skill, i);
				enemy.meshGroup.add(skill.skillBar);
			});
		}
		this.addSummonSkills(skills);
		if (skillData) {
			this.set(skillData);
		}
	}

	addSummonSkills(skills: Skill[]) {
		for (const skill of skills.filter((skill) => isFtprgSummonSkill(skill.key))) {
			if (this.activeSkills.some((activeSkill) => activeSkill.skill === skill)) continue;
			const activeSkill = new ActiveSkill(this.enemy, skill);
			activeSkill.skillBar.position.y = (this.activeSkills.length + 1) * -10;
			this.setInitialSkillBarColor(activeSkill, this.activeSkills.length);
			this.activeSkills.push(activeSkill);
			this.enemy.meshGroup.add(activeSkill.skillBar);
		}
	}

	getSkillBarColor(index: number) {
		return skillBarColors[index % skillBarColors.length];
	}

	setInitialSkillBarColor(skill: ActiveSkill, index: number) {
		const colorIndex = this.skillBarColorIndexes.get(skill.skill.key) ?? index;
		this.skillBarColorIndexes.set(skill.skill.key, colorIndex);
		skill.setSkillBarColor(this.getSkillBarColor(colorIndex));
	}

	compactSkillBars() {
		this.activeSkills.forEach((skill, index) => {
			skill.skillBar.position.y = (index + 1) * -10;
		});
	}

	get isHoldingForSummons() {
		return (
			this.summonDelayRemaining !== null || this.activeSkills.some((skill) => skill.isSummonSkill)
		);
	}
	addParasiticSprite() {
		if (this.gameManager.isSimulation) return;
		const texture = this.assetManager.textures.get('parasitic')?.texture;
		const material = new THREE.SpriteMaterial({
			map: texture,
			transparent: true,
			depthTest: false
		});
		material.color.multiplyScalar(0.6);
		const sprite = new THREE.Sprite(material);
		sprite.scale.set(50, 50, 50);
		sprite.position.y = this.enemy.height + 20;
		sprite.position.z = 40;
		this.enemy.meshGroup.add(sprite);
	}

	addTransformModel(key) {
		if (this.gameManager.isSimulation) return;

		let skeletonData = this.assetManager.spineMap.get(key);
		if (!skeletonData) {
			const prefabKey = this.enemy.gameManager.config.enemies.find(
				(enemy) => enemy.id === key
			)?.prefabKey;
			if (!prefabKey) {
				return;
			}
			skeletonData = this.assetManager.spineMap.get(prefabKey);
		}
		const skeletonMesh = new spine.SkeletonMesh(skeletonData, (parameters) => {
			parameters.depthTest = false;
			parameters.alphaTest = 0.001;
			parameters.uniforms = {
				map: { type: 't', value: null }
			};
		});
		skeletonMesh.skeleton.color.a = 0.6;
		// console.log(key, skeletonData);
		const defaultAnim = getDefaultAnimName(key, skeletonData);
		skeletonMesh.state.setAnimation(0, defaultAnim, false);
		this.transformModel = skeletonMesh;
		this.enemy.meshGroup.add(skeletonMesh);
	}

	setSkills(skills: Skill[]) {
		this.reset();
		this.skills = skills;
		this.skillBarColorIndexes.clear();
		for (const skill of this.activeSkills) {
			this.enemy.meshGroup.remove(skill.skillBar);
			skill.dispose();
		}
		this.activeSkills = [];
		if (this.enemy.key === 'enemy_2042_syboss') {
			this.activeSkills = skills
				.filter(
					(ele) =>
						ele.type === 'skill' && (ele.initCooldown || ele.skillType === 'INCREASE_WITH_TIME')
				)
				.map((skill) => new ActiveSkill(this.enemy, skill));
			this.activeSkills.forEach((skill, i) => {
				skill.skillBar.position.y = (i + 1) * -20;
				this.setInitialSkillBarColor(skill, i);
				this.enemy.meshGroup.add(skill.skillBar);
			});
		} else if (this.enemy.motionMode === 'SKILL_BLINK') {
			this.activeSkills = skills
				.filter((skill) => skill.key === this.enemy.skillBlinkTriggerKey)
				.map((skill) => new ActiveSkill(this.enemy, skill, true));
			this.activeSkills.forEach((skill, i) => {
				skill.skillBar.position.y = (i + 1) * -20;
				this.setInitialSkillBarColor(skill, i);
				this.enemy.meshGroup.add(skill.skillBar);
			});
		}
		this.addSummonSkills(skills);
		if (this.isHoldingForSummons) {
			this.enemy.prepareForSummons();
		}
	}

	update(delta: number) {
		this.startedEnemyAfterSummons = false;
		if (this.summonDelayRemaining !== null) {
			this.summonDelayRemaining -= delta;
			if (this.summonDelayRemaining <= 0) {
				this.summonDelayRemaining = null;
				this.enemy.startAfterSummons();
				this.startedEnemyAfterSummons = true;
				return;
			}
		}
		if (this.accelerateParams) {
			const { i, m, preDelay, limit } = this.accelerateParams;
			this.accelerationPreDelayTimer += delta;
			if (this.accelerationPreDelayTimer > preDelay) {
				this.accelerationIntervalTimer += delta;
				this.accelerationStacks = Math.min(limit, Math.floor(this.accelerationIntervalTimer / i));
				this.enemy.moddedSpeed = this.enemy.baseSpeed * (1 + this.accelerationStacks * m);
			}
		}
		if (this.transformModel) {
			this.transformModel.update(delta);
		}
		for (const skill of this.activeSkills) {
			skill.update(delta);
		}
		this.removeFinishedSummonSkills();
	}

	removeFinishedSummonSkills() {
		const finishedSummonSkills = this.activeSkills.filter(
			(skill) => skill.isSummonSkill && skill.isFinished
		);
		if (!finishedSummonSkills.length) return;

		for (const skill of finishedSummonSkills) {
			this.enemy.meshGroup.remove(skill.skillBar);
			skill.dispose();
		}
		this.activeSkills = this.activeSkills.filter((skill) => !finishedSummonSkills.includes(skill));
		this.compactSkillBars();

		if (!this.activeSkills.some((skill) => skill.isSummonSkill)) {
			const lastFinishedSkill = finishedSummonSkills[finishedSummonSkills.length - 1];
			this.summonDelayRemaining = lastFinishedSkill.skill.delay ?? 0;
		}
	}

	activateReadyManualSkill(key: string) {
		const skill = this.activeSkills.find(
			(skill) => skill.manualActivation && skill.skill.key === key && skill.isReady
		);
		return skill?.activateManually() ? skill : null;
	}

	finishManualSkill(key: string) {
		this.activeSkills.find((skill) => skill.skill.key === key)?.finishManualActivation();
	}

	getData() {
		const manualSkills = this.activeSkills.map((skill) => skill.getManualData()).filter(Boolean);
		const summonSkills = this.activeSkills.map((skill) => skill.getSummonData()).filter(Boolean);
		return {
			accelerationIntervalTimer: this.accelerationIntervalTimer,
			accelerationPreDelayTimer: this.accelerationPreDelayTimer,
			accelerateParams: this.accelerateParams,
			accelerationStacks: this.accelerationStacks,
			manualSkills,
			summonSkills,
			summonDelayRemaining: this.summonDelayRemaining
		};
	}

	set(data) {
		if (!data) return;
		this.accelerationIntervalTimer = data.accelerationIntervalTimer;
		this.accelerationPreDelayTimer = data.accelerationPreDelayTimer;
		this.accelerateParams = data.accelerateParams;
		this.accelerationStacks = data.accelerationStacks;
		for (const skillData of data.manualSkills ?? []) {
			this.activeSkills
				.find((skill) => skill.skill.key === skillData.key)
				?.setManualData(skillData);
		}
		if (data.summonSkills) {
			const nonSummonSkills = this.activeSkills.filter((skill) => !skill.isSummonSkill);
			const currentSummonSkills = this.activeSkills.filter((skill) => skill.isSummonSkill);
			const restoredSummonSkills: ActiveSkill[] = [];
			for (const skillData of data.summonSkills) {
				let activeSkill = currentSummonSkills.find((skill) => skill.skill.key === skillData.key);
				if (!activeSkill) {
					const skill = this.skills.find((skill) => skill.key === skillData.key);
					if (!skill) continue;
					activeSkill = new ActiveSkill(this.enemy, skill);
					this.setInitialSkillBarColor(
						activeSkill,
						nonSummonSkills.length + restoredSummonSkills.length
					);
					this.enemy.meshGroup.add(activeSkill.skillBar);
				}
				activeSkill.setSummonData(skillData);
				restoredSummonSkills.push(activeSkill);
			}
			const summonSkillsToRemove = currentSummonSkills.filter(
				(skill) => !restoredSummonSkills.includes(skill)
			);
			for (const skill of summonSkillsToRemove) {
				this.enemy.meshGroup.remove(skill.skillBar);
				skill.dispose();
			}
			this.activeSkills = [...nonSummonSkills, ...restoredSummonSkills];
			this.compactSkillBars();
			this.summonDelayRemaining = data.summonDelayRemaining ?? null;
		}
	}

	reset() {
		this.summonDelayRemaining = null;
	}
}
