/* takes in a list of enemies and statMods and returns enemy with modifiers applied */
import type {
	Enemy,
	StatMods,
	ModGroup,
	Effects,
	EnemyDBEntry,
	Trap,
	SpecialMods,
	Skill,
	StatKey
} from '$lib/types';
import { round } from './lib';

/*
PLEASE READ https://prts.wiki/w/游戏数据基础#属性的定义


DMG_REDUCTION - values 5% DR = 0.05
VALUE = 1 - (1 - v1) * (1 - v2) * ...

ASPD
VALUE = Math.round((BASE STAT + ATK_INTERVAL_FIXED_VALUE) / (ASPD + ASPD_FIXED_VALUE) * ASPD_MULTIPLIER)

!FOR CURRENT SCHEMA, PLEASE SET RUNES ASPD MODS AS INITIAL

OTHER STATS - ATK/DEF...
VALUE = Math.round((((BASE STAT +/* RUNES) + INITIAL_FIXED_VALUE) * INITIAL_MULTIPLIER) + FINAL_FIXED_VALUE) * FINAL_MULTIPLIER)

FOR INITIAL MODS, IF INCREASE BY 50%, VALUE = 0.5
FOR FINAL MODS, IF INCREASE BY 50%, VALUE = 1.5

?SPECIAL CASES
- 深池逐火战士 余烬 not affected by elite hp mods only, rest affects
report from Legends from qq 25/10/2024

- deyi not affected by relic -atk and diff atk - should be a result of buff loss on death
report from boinexdo from bilibili 29/10/2024
*/

const STATS = [
	'hp',
	'atk',
	'aspd',
	'range',
	'def',
	'res',
	'weight',
	'ms',
	'lifepoint',
	'epDamageResistance',
	'epResistance'
];

const PHCS_BOSSES = ['ICR', 'ICM', 'MSC', 'FSK', 'JTM', 'WDG', 'PTM', 'DOL', 'HST', 'WRT'];
const MZK_BOSSES = [
	'enemy_2026_syudg',
	'enemy_2027_syudg2',
	'enemy_2028_syevil',
	'enemy_2029_symon',
	'enemy_2030_symon2',
	'enemy_2031_syboy',
	'enemy_2032_syboy2',
	'enemy_2036_syshop',
	'enemy_2037_sygirl',
	'enemy_2038_sydonq',
	'enemy_2039_syskad',
	'enemy_2006_flsnip',
	'enemy_2007_flwitch',
	'enemy_2008_flking'
];
const SAMI_BOSSES = [
	'enemy_2048_smgrd',
	'enemy_2049_smgrd2',
	'enemy_2050_smsha',
	'enemy_2051_smsha2',
	'enemy_2052_smgia',
	'enemy_2053_smgia2',
	'enemy_2054_smdeer',
	'enemy_2055_smlead',
	'enemy_2056_smedzi',
	'enemy_2036_syshop',
	'enemy_2057_smkght',
	'enemy_2058_smlion'
];
const SARKAZ_BOSSES = [
	'enemy_2074_skzgly',
	'enemy_2075_skgly2',
	'enemy_2076_skzklz',
	'enemy_2077_skklz2',
	'enemy_2078_skzmst',
	'enemy_2079_skmst2',
	'enemy_2080_skzlwy',
	'enemy_2081_skztxs',
	'enemy_2082_skzdd',
	'enemy_2084_skzcan',
	'enemy_2071_skzdny',
	'enemy_2072_skdny2'
];

const NEUTRAL_ENEMIES = ['enemy_3001_upeopl', 'enemy_10061_cjglon'];
const NOT_AFFECTED_BY_FLOOR_DIFF_KEYS = ['enemy_10062_cjblon'];
const DMG_1_ATK_VARIANTS = ['enemy_2121_dyspl2'];

export function applyMods(
	enemies: EnemyDBEntry[],
	statMods: StatMods,
	specialMods: SpecialMods
): Enemy[] {
	return enemies.map((enemy) => {
		const holder = structuredClone(enemy);
		holder.modsList = [];
		for (let i = 0; i < holder.forms.length; i++) {
			holder.forms[i].special = holder.stats.special?.[i] || [];
			holder.forms[i].stats = parseStats(holder, statMods, i, specialMods);
		}
		return holder;
	});
}

//returns enemy 'stats' object with modded stats
export function parseStats(
	enemy: EnemyDBEntry,
	statMods: StatMods,
	row: number,
	specialMods: SpecialMods
) {
	const isDamage1Enemy = enemy.traits.some(
		(skill) =>
			['damage_1', 'damage_1_arts'].includes(skill.key) &&
			!['enemy_2122_dybgzd'].includes(enemy.key)
	);
	const type = NEUTRAL_ENEMIES.includes(enemy.key)
		? 'neutral'
		: DMG_1_ATK_VARIANTS.includes(enemy.key)
		? 'damage_1_atk_variant'
		: isDamage1Enemy
		? 'damage_1_enemy'
		: 'enemy';
	let diffMods;
	if (statMods.diff) {
		diffMods = compileMods(enemy, statMods.diff, type);
	}

	const formMods = { key: 'form_mods', mods: enemy.stats?.form_mods?.[row] ?? [] };
	if (specialMods?.[enemy.key]?.[`mods_${row}`]) {
		formMods.mods = Object.values(specialMods?.[enemy.key]?.[`mods_${row}`]);
	}
	const runeMods = compileMods(enemy, statMods.runes);
	const otherMods = statMods.others.map((mods) =>
		compileMods(enemy, mods, ['damage_1_atk_variant'].includes(type) ? type : 'enemy')
	);
	const secondaryMods = [formMods, diffMods, ...otherMods].filter((ele) => {
		if (
			NEUTRAL_ENEMIES.includes(enemy.key) ||
			type === 'damage_1_enemy' ||
			NOT_AFFECTED_BY_FLOOR_DIFF_KEYS.includes(enemy.key)
		) {
			return Boolean(ele) && !['floor_diff'].includes(ele.key);
		}
		return Boolean(ele);
	});

	const statsHolder = { dmgRes: 0 };
	for (const statKey of STATS) {
		let isSet = false;
		let initialValue = enemy.stats[statKey];
		if (formMods.mods) {
			const item = formMods.mods.find((ele) => ele.key === statKey && ele.mode === 'set');
			if (item) {
				initialValue = item.value;
				isSet = true;
			}
		}
		if (statKey === 'aspd') {
			statsHolder[statKey] = getModdedStat(
				enemy.stats[statKey],
				statKey,
				runeMods,
				...secondaryMods
			);
			continue;
		}
		const baseValue = isSet
			? initialValue
			: round(
					getModdedStat(initialValue, statKey, runeMods),
					['ms', 'range'].includes(statKey) ? 2 : 0
			  );
		statsHolder[statKey] = getModdedStat(baseValue, statKey, ...secondaryMods);
	}
	statsHolder['dmgRes'] = getDmgReductionVal(runeMods, ...secondaryMods);
	enemy?.modsList?.push(
		[runeMods, ...secondaryMods].filter(Boolean).filter((ele) => ele.mods?.length > 0)
	);
	return statsHolder;
}

export const getModdedStat = (baseValue: number, statKey: string, ...modsList) => {
	let initialAdd = 0,
		initialMul = 1,
		finalAdd = 0,
		finalMul = 1,
		atkIntervalAdd = 0,
		atkIntervalMul = 1;
	for (const { mods } of modsList) {
		if (!mods) {
			continue;
		}
		for (const { key, value, mode, order = 'final' } of mods) {
			if (key === 'atk_interval') {
				switch (mode) {
					case 'mul':
						atkIntervalMul *= value;
						break;
					case 'add':
						atkIntervalAdd += value;
						break;
				}
				continue;
			}
			if (key === statKey) {
				switch (mode) {
					case 'mul':
						if (order === 'initial') {
							initialMul += value;
						} else {
							finalMul *= value;
						}
						break;
					case 'add':
						if (order === 'initial') {
							initialAdd += value;
						} else {
							finalAdd += value;
						}
						break;
				}
			}
		}
	}
	return calculateModdedStat(
		baseValue,
		statKey,
		initialAdd,
		initialMul,
		finalAdd,
		finalMul,
		atkIntervalAdd,
		atkIntervalMul
	);
};

export const calculateModdedStat = (
	baseValue: number,
	statKey: string,
	initialAdd: number,
	initialMul: number,
	finalAdd: number,
	finalMul: number,
	atkIntervalAdd: number,
	atkIntervalMul: number
) => {
	const aspd = 100;
	if (statKey !== 'aspd') {
		baseValue += initialAdd;
	}
	switch (statKey) {
		case 'aspd':
			return round(
				((baseValue + atkIntervalAdd) * atkIntervalMul) /
					(Math.max(10, Math.min(((aspd + initialAdd) * initialMul + finalAdd) * finalMul, 600)) /
						100)
			);
		case 'range':
		case 'ms':
			return round((baseValue * initialMul + finalAdd) * finalMul);
		case 'weight':
		case 'res':
			return Math.round(Math.min(Math.max((baseValue * initialMul + finalAdd) * finalMul, 0), 100));
		case 'hp': {
			const value = (baseValue * initialMul + finalAdd) * finalMul;
			if (value < 100) return round(value, 1);
			return Math.round(value);
		}
		default:
			return Math.round(Math.max(0, (baseValue * initialMul + finalAdd) * finalMul));
	}
};

export const getDmgReductionVal = (...modsList) => {
	const namedValues = [];
	const otherValues = [];
	// get highest value from all named values
	for (const { mods } of modsList) {
		for (const mod of mods) {
			const { key, value, name } = mod;
			if (key !== 'dmg_res') continue;
			if (name) {
				const index = namedValues.findIndex((ele) => ele.name === name);
				if (index === -1) {
					namedValues.push({ name, value });
				} else {
					if (value > namedValues[index].value) {
						namedValues[index].value = value;
					}
				}
				continue;
			}
			otherValues.push(value);
		}
	}
	const namedValuesToValue = namedValues.map((ele) => ele.value);
	return round(
		[...namedValuesToValue, ...otherValues].reduce((acc, curr) => {
			if (acc === 0) {
				acc = curr;
			} else {
				acc = 1 - (1 - acc) * (1 - curr);
			}
			return acc;
		}, 0)
	);
};

//for compilation of difficulty mods
export function compileMods(entity: EnemyDBEntry | Trap, mod: ModGroup, type = 'enemy') {
	const modsHolder = [];
	const { key: modKey, mods, stackType = 'mul' } = mod;
	for (const effects of mods.filter(Boolean)) {
		for (const effect of effects) {
			if (!effect.mods) continue;
			if (['trap_rune', 'neutral', 'damage_1_enemy'].includes(type)) {
				if (!effect.targets.some((target) => target.includes(entity.key))) {
					continue;
				}
			}
			if (effect.targets.some((target) => checkIsTarget(entity, target))) {
				for (const mod of effect.mods) {
					const { key, value, mode, order = 'final', name = '' } = mod;
					if (['damage_1_atk_variant'].includes(type) && key === 'hp') {
						if (modKey === 'floor_diff') {
							continue;
						} else if (modKey === 'difficulty') {
							if (!effect.targets.some((target) => target.includes(entity.key))) {
								continue;
							}
						}
					}
					const item = modsHolder.find(
						(ele) => ele.key === key && ele.order === order && ele.mode === mode
					);
					if (!item) {
						modsHolder.push({ key: key, order: order, mode: mode, value: value, name });
						continue;
					}
					if (key === 'dmg_res') {
						if (item.name) {
							if (value > item.value) {
								item.value = value;
							}
							continue;
						}
						item.value += value;
						continue;
					}
					switch (mode) {
						case 'mul':
							if (stackType === 'mul') {
								item.value *= value;
							} else {
								item.value += value - 1;
							}
							break;
						case 'add':
							item.value += value;
							break;
						default:
							console.warn('Unknown mod mode', mode);
					}
				}
			}
		}
	}
	return { key: modKey, mods: modsHolder };
}

export const compileSpecialMods = (...modsList: [[Effects]]) => {
	const specialMods = {};
	for (const effectsList of modsList) {
		for (const effects of effectsList)
			if (effects && effects.length > 0) {
				effects.forEach((effect) => {
					if (effect.special) {
						for (const target of effect.targets) {
							if (!specialMods[target]) {
								specialMods[target] = {};
							}
							for (const key of Object.keys(effect.special)) {
								specialMods[target][key] = { ...specialMods[target][key], ...effect.special[key] };
							}
						}
					}
				});
			}
	}
	return specialMods;
};

export const getStatSkillValue = (
	entity: Enemy | Trap,
	formIndex = 0,
	skill: Skill,
	stat: StatKey
) => {
	const runeMods =
		entity.modsList[formIndex].find((ele) => ['combat_ops', 'elite_ops'].includes(ele.key)) || [];
	let otherMods = entity.modsList[formIndex].filter(
		(ele) => !['combat_ops', 'elite_ops'].includes(ele.key)
	);
	const skillMod = {
		key: skill.key,
		mods: [
			{
				key: stat,
				value: skill[stat].multiplier || skill[stat].fixed,
				order: skill[stat].order || 'final',
				mode: skill[stat].multiplier ? 'mul' : 'add'
			}
		]
	};
	if (stat === 'aspd') {
		return getModdedStat(entity.stats[stat], stat, runeMods, skillMod, ...otherMods);
	}
	const baseValue = getModdedStat(entity.stats[stat], stat, runeMods);
	if (skill.buffloss) {
		otherMods = [];
	}
	return getModdedStat(baseValue, stat, skillMod, ...otherMods);
};

export const checkIsTarget = (entity: Enemy | Trap | EnemyDBEntry, target: string): boolean => {
	if (target.includes('exclude:')) {
		const list = target.replace('exclude:', '').split('|');
		return !list.includes(entity.key);
	}
	if (target.includes('&')) {
		const targets = target.split('&');
		return targets.reduce((acc, curr) => {
			acc = acc && checkIsTarget(entity, curr);
			return acc;
		}, true);
	}
	const { id, key, type, stageId } = entity;
	switch (target) {
		case 'ALL':
			return true;
		case 'ranged':
		case 'melee':
		case 'ELITE':
		case 'BOSS':
		case 'collapsal':
		case 'sarkaz':
		case 'animated':
			return type?.includes(target);
		case 'PHCS_BOSS':
			return PHCS_BOSSES.includes(id);
		case 'NOT_PHCS_BOSS':
			return !PHCS_BOSSES.includes(id);
		case 'MZK_BOSS':
			return MZK_BOSSES.includes(key);
		case 'NOT_MZK_BOSS':
			return !MZK_BOSSES.includes(key);
		case 'SAMI_BOSS':
			return SAMI_BOSSES.includes(key);
		case 'NOT_SAMI_BOSS':
			return !SAMI_BOSSES.includes(key);
		case 'SARKAZ_BOSS':
			return SARKAZ_BOSSES.includes(key);
		case 'NOT_SARKAZ_BOSS':
			return !SARKAZ_BOSSES.includes(key);
		case 'not_flying':
			return !type?.includes(target.replace('not_', ''));
		case 'not_trap':
			return !key.includes('trap');
		default:
			return [id, key, stageId].includes(target);
	}
};

export const filterModCondition = (effect, stageType) => {
	if (!effect.conditions) return true;
	return effect.conditions.some((condition) => {
		switch (condition) {
			case 'BATTLE_BOSS':
			case 'BATTLE_SKY':
				return stageType === condition;
		}
	});
};
