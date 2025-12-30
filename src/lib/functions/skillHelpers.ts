import type {
	Enemy,
	Language,
	MapConfig,
	Skill,
	SpecialMods,
	StatusImmune,
	Trap
} from '$lib/types';
import enemySkills from '$lib/data/enemy/enemy_skills.json';
import trapSkills from '$lib/data/trap/traps_skills.json';
import enemyDb from '$lib/data/enemy/enemy_database.json';
import { checkIsTarget, getStatSkillValue } from '$lib/functions/statHelpers';
import { isEquals } from './lib';

export const overwriteBlackboard = (stats, blackboard) => {
	const traits = stats.traits;
	for (const skillRef of blackboard) {
		const traitIndex = traits.findIndex((ele) => ele.key === skillRef.key);
		if (traitIndex !== -1) {
			traits.splice(traitIndex, 1, skillRef);
			continue;
		}
		let specialIndex = -1;
		for (let i = 0; i < stats.special.length; i++) {
			if (specialIndex === -1) {
				specialIndex = stats.special[i].findIndex(
					(ele) => ele.key === skillRef.key && i === skillRef.formIndex
				);
			}
			if (specialIndex !== -1) {
				stats.special[i].splice(specialIndex, 1, skillRef);
				break;
			}
		}
		if (specialIndex === -1) {
			// new trait
			traits.push(skillRef);
			continue;
		}
	}
};

export const getOverwrittenKeys = (skill: Skill, skillRef: Skill) => {
	// first param is skillRef from trap/enemy data.json combined with skillRef in trap/enemy skills.json
	// second param is skillRef after mods
	const list = [];
	for (const key of Object.keys(skillRef)) {
		if (skill?.[key] !== undefined) {
			if (!isEquals(skillRef[key], skill[key])) {
				list.push(key);
			}
		}
	}
	return list;
};

export const getStatSkills = (
	enemy: Enemy,
	skillRefs: Skill[],
	specialMods: SpecialMods
): Skill[] => {
	let currentSkills = [...skillRefs, ...enemy.traits];
	currentSkills = currentSkills.map((skillRef) => {
		if (specialMods[enemy.key] && Object.keys(specialMods[enemy.key]).includes(skillRef.key)) {
			return { ...enemySkills[skillRef.key], ...skillRef, ...specialMods[enemy.key][skillRef.key] };
		} else {
			return { ...enemySkills[skillRef.key], ...skillRef };
		}
	});
	return currentSkills;
};

export const getTrapStatSkills = (trap) => {
	return trap.special.map((key) => trapSkills[key]).filter((skill) => skill?.atk);
};

export const getHandbookEnemySkills = (enemy, specialMods) => {
	const skills = [];
	const traitSkills = getEnemySkills(enemy, enemy.traits, 0, specialMods, 'trait').filter(
		(skill) => skill.type === 'skill'
	);
	for (const skill of traitSkills) {
		skills.push({ ...skill, formIndexes: enemy.forms.map((_, i) => i) });
	}
	enemy.forms.forEach((form, i) => {
		const special = getEnemySkills(enemy, form.special, i, specialMods, 'special').filter(
			(skill) => skill.type === 'skill'
		);
		for (const skill of special) {
			const item = skills.find((ele) => ele.key === skill.key);
			if (item && isEquals(item, skill)) {
				item.formIndexes.push(i);
			} else {
				skills.push({ ...skill, formIndexes: [i] });
			}
		}
	});
	return skills;
};

export const getEnemySkills = (
	enemy,
	currentSkills,
	row: number,
	specialMods: SpecialMods,
	skillType: 'trait' | 'special'
): Skill[] => {
	const { key: enemyKey, level } = enemy;
	let extraSkills = [];
	currentSkills = currentSkills.map((skillRef) => {
		const baseEnemy = enemyDb[enemyKey];
		let enemyDBSkillRef;
		if (skillType === 'trait') {
			enemyDBSkillRef = baseEnemy.stats[level].traits.find((ele) => ele.key === skillRef.key);
		} else {
			enemyDBSkillRef = baseEnemy.stats[level].special[row].find((ele) => ele.key === skillRef.key);
		}
		if (skillRef.remove) {
			return skillRef;
		}
		const originalSkill = { ...enemySkills[skillRef.key], ...enemyDBSkillRef };
		if (specialMods[enemyKey] && Object.keys(specialMods[enemyKey]).includes(skillRef.key)) {
			skillRef.overwrittenKeys = getOverwrittenKeys(originalSkill, {
				...skillRef,
				...specialMods[enemyKey][skillRef.key]
			});
			return { ...enemySkills[skillRef.key], ...skillRef, ...specialMods[enemyKey][skillRef.key] };
		} else {
			skillRef.overwrittenKeys = getOverwrittenKeys(originalSkill, skillRef);
			return { ...enemySkills[skillRef.key], ...skillRef };
		}
	});

	if (skillType === 'trait') {
		// extra skills
		for (const target in specialMods) {
			if (checkIsTarget(enemy, target)) {
				extraSkills = Object.keys(specialMods[target])
					.map((key) => {
						if (key === 'status_immune' || key.includes('mods_')) {
							return;
						}
						if (!currentSkills.find((ref) => ref.key === key)) {
							return { key, ...specialMods[target][key] };
						}
					})
					.filter(Boolean);
			}
		}
	}

	return [...extraSkills, ...currentSkills];
};

export const getStatusImmune = (
	enemy: Enemy,
	statusImmuneList: StatusImmune[],
	mods: SpecialMods
) => {
	if (mods?.[enemy.id]?.status_immune) {
		statusImmuneList = [...statusImmuneList, ...mods[enemy.id].status_immune];
	}
	return statusImmuneList;
};

export const parseValues = (
	entity: Enemy | Trap,
	formIndex: number,
	skill: Skill,
	text: string,
	language: Language,
	mapConfig: MapConfig,
	mode
) => {
	if (!text) return '';
	const regex = new RegExp(`<v.*?>`, 'g');
	const extractedSubstrings = text.match(regex) || [];
	for (const string of extractedSubstrings) {
		const isPercent = string.includes('%');
		const key = string.replace('%', '').slice(3, -1);
		if (key.includes('.')) {
			const [statKey, valueKey] = key.split('.');
			if (valueKey === 'multiplier') {
				text = text.replace(
					string,
					addOverwrittenHighlight(
						Math.round(skill[statKey][valueKey] * 100).toString(),
						skill,
						statKey
					)
				);
				if (statKey === 'atk' && mode !== 'table') {
					//check for skilltag
					const endIndex = getTooltipEndIndex(text);
					let value;
					if (entity.key.includes('trap')) {
						value = ` (${entity.stats[statKey] * skill[statKey].multiplier})`;
					} else {
						value = ` (${getStatSkillValue(entity, formIndex, skill, statKey)})`;
					}
					text =
						text.slice(0, endIndex) +
						`<span id="${entity.stageId}-${skill.key}">${value}</span>` +
						text.slice(endIndex);
				}
			} else {
				text = text.replace(string, skill[statKey][valueKey]);
			}
		} else {
			let toReplace = skill[key];
			if (key === 'enemy_key') {
				const stageId = skill[key];
				let enemy = enemyDb[stageId];
				if (!enemy) {
					const item = mapConfig.enemies.find((ele) => ele.id === stageId);
					if (item) {
						enemy = enemyDb[item.prefabKey];
					}
				}
				toReplace = enemy ? enemy[`name_${language}`] || enemy[`name_zh`] : skill[key];
			}
			text = text.replace(
				string,
				addOverwrittenHighlight(
					(isPercent ? Math.round(skill[key] * 100) : toReplace)?.toString(),
					skill,
					key
				)
			);
		}
	}
	return text;
};
//temp hotfix for overwritten skills
const addOverwrittenHighlight = (string: string, skill, key) => {
	if (skill.overwrittenKeys.includes(key)) {
		return '$' + string + '$';
	}
	return string;
};

export const getTooltipEndIndex = (text: string) => {
	if (text[text.length - 1] === '}') {
		for (let i = text.length - 1; i > 0; i--) {
			if (text[i] === '{' && text?.[i - 1] !== '}') {
				return i;
			}
		}
	}
	return text.length;
};
