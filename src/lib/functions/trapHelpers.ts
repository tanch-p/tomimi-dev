import type { Language, Trap, MapConfigTrap, TrapData, StatMods, SpecialMods } from '$lib/types';
import trapLookup from '$lib/data/trap/traps.json';
import trapSkills from '$lib/data/trap/traps_skills.json';
import { compileMods, getDmgReductionVal, getModdedStat } from './statHelpers';
import { getOverwrittenKeys } from './skillHelpers';
import { isEquals } from './lib';

const TRAPS_AFFECTED_BY_DIFFICULTY = [
	'trap_054_dancdol',
	'trap_086_larva',
	'trap_760_skztzs',
	'trap_761_skzthx',
	'trap_480_roadblockxb',
	'trap_075_bgarmn',
	'trap_076_bgarms',
	'trap_077_rmtarmn',
	'trap_065_normbox',
	'trap_066_rarebox',
	'trap_108_smbox',
	'trap_109_smrbox',
	'trap_757_skzbox',
	'trap_223_dynbox',
	'trap_224_dyrbox',
	'trap_225_dysbox',
	'trap_219_fttreant'
];

const STATS = ['hp', 'atk', 'aspd', 'def', 'res', 'blockCnt'];

const skillValueKeys = ['cost', 'duration1', 'enhance_duration', 'value'];

export const getTrapModelType = (key) => {
	const trap = trapLookup[key];
	if (!trap) {
		return;
	}
	return trap.modelType;
};

const getTrapWeight = (key) => {
	switch (key) {
		case 'trap_762_skztxy':
		case 'trap_763_skzddd':
		case 'trap_779_skzth':
		case 'trap_761_skzthx':
			return 0;
		case 'trap_760_skztzs':
			return 1;
		case 'trap_024_npcsld':
			return 51;
		case 'trap_079_allydonq':
		case 'trap_764_skzshp':
			return 99;
		case 'trap_065_normbox':
		case 'trap_108_smbox':
		case 'trap_757_skzbox':
			return 100;
		case 'trap_066_rarebox':
		case 'trap_109_smrbox':
		case 'trap_759_skzwyx':
			return 101;
		case 'trap_068_badbox':
		case 'trap_110_smbbox':
		case 'trap_758_skzmbx':
			return 102;
		default:
			return 50;
	}
};
const getTrapStats = (trap: TrapData, level: number) => {
	if (trap.stats.length === 1 || level === 1) {
		return { ...trap.stats[0] };
	}
	const MAX_LEVEL = 30;
	return {
		hp: Math.round(
			trap.stats[0].hp + ((trap.stats[1].hp - trap.stats[0].hp) / (MAX_LEVEL - 1)) * (level - 1)
		),
		atk: Math.round(
			trap.stats[0].atk + ((trap.stats[1].atk - trap.stats[0].atk) / (MAX_LEVEL - 1)) * (level - 1)
		),
		def: Math.round(
			trap.stats[0].def + ((trap.stats[1].def - trap.stats[0].def) / (MAX_LEVEL - 1)) * (level - 1)
		),
		res: Math.round(
			trap.stats[0].res + ((trap.stats[1].res - trap.stats[0].res) / (MAX_LEVEL - 1)) * (level - 1)
		),
		blockCnt: trap.stats[0].blockCnt,
		aspd: trap.stats[0].aspd,
		rangeId: trap.stats[0].rangeId
	};
};

export const parseTraps = (traps: MapConfigTrap[], language: Language) => {
	const holder: Trap[] = [];
	for (const { key, alias, level, skillIndex, mainSkillLvl, overrideSkillBlackboard } of traps) {
		const trap: TrapData = trapLookup[key];
		const talents = trap?.talents?.map((key) => {
			const talent = trapSkills[key];
			return {
				name: talent[`name_${language}`] || talent[`name_zh`],
				desc: talent[`desc_${language}`] || talent[`desc_zh`],
				rangeId: talent.rangeId
			};
		});
		const skills = [];
		const skillKey = trap.skills[skillIndex];
		if (trapSkills[skillKey]) {
			const skill = trapSkills[skillKey];
			const otherKeys = {};
			for (const valueKey of skillValueKeys) {
				if (skill?.[valueKey]) otherKeys[valueKey] = skill[valueKey];
			}
			skills.push({
				skillId: skill.skillId,
				name: skill[`name_${language}`] || skill[`name_zh`],
				desc: skill[`desc_${language}`] || skill[`desc_zh`],
				level: mainSkillLvl + '/' + skill.levels.length,
				skillType: skill.skillType,
				durationType: skill.durationType,
				spType: skill.spType,
				hasIcon: skill.hasIcon ?? true,
				rangeId: skill.rangeId,
				duration: skill.levels[mainSkillLvl - 1].duration,
				spData: skill.levels[mainSkillLvl - 1].spData,
				overwrittenKeys: [],
				...otherKeys
			});
		}
		const stats = getTrapStats(trap, level);
		holder.push({
			key: key,
			stageId: alias,
			name: trap[`name_${language}`] || trap[`name_zh`],
			desc: trap[`desc_${language}`] || trap[`desc_zh`],
			tauntLevel: trap.tauntLevel,
			group: trap.group,
			mainSkillLvl: mainSkillLvl,
			stats: stats,
			talents: talents,
			skills: skills,
			special: trap.special,
			status_immune: trap.status_immune,
			overrideSkillBlackboard: overrideSkillBlackboard
		});
	}
	return holder.sort((a, b) => getTrapWeight(a.key) - getTrapWeight(b.key));
};

export function applyTrapMods(traps: Trap[], statMods: StatMods, specialMods: SpecialMods) {
	return traps.map((trap) => {
		const rangeId = trap.stats.rangeId;
		trap.modsList = [];
		const moddedStats = parseStats(trap, statMods);
		let skill = structuredClone(trap.skills?.[0]);
		if (skill && specialMods[trap.key]?.[skill.skillId]) {
			skill = { ...skill, ...specialMods[trap.key]?.[skill.skillId] };
			skill.overwrittenKeys = getOverwrittenKeys(trap.skills?.[0], skill);
		}
		return {
			...trap,
			skills: trap.skills.length > 0 ? [skill] : [],
			stats: { ...moddedStats, rangeId },
			overwritten: specialMods[trap.key] ? true : false
		};
	});
}

export function getTrapSpecialSkill(
	key: string,
	stageId: string,
	skillRef: string,
	specialMods: SpecialMods
) {
	let skill = trapSkills[skillRef];
	skill.overwrittenKeys = [];
	const specialOverwrite = specialMods?.[key]?.[skillRef] || specialMods?.[stageId]?.[skillRef];
	if (skill && specialOverwrite) {
		skill = { ...skill, ...specialOverwrite };
		skill.overwrittenKeys = getOverwrittenKeys(trapSkills[skillRef], skill);
	}
	return skill;
}

function parseStats(trap: Trap, statMods: StatMods) {
	let diffMods;
	const type = trap.group === 'enemy' ? 'trap_enemy' : 'trap_rune';
	const otherMods = statMods.others
		.map((mods) => {
			if (
				type === 'trap_enemy' &&
				!TRAPS_AFFECTED_BY_DIFFICULTY.includes(trap.key) &&
				mods.key === 'floor_diff'
			) {
				return;
			}
			return compileMods(trap, mods, type);
		})
		.filter(Boolean);
	if (statMods.diff) {
		diffMods = compileMods(
			trap,
			statMods.diff,
			TRAPS_AFFECTED_BY_DIFFICULTY.includes(trap.key) ? 'enemy' : 'trap_rune'
		);
	}
	const secondaryMods = [diffMods, ...otherMods].filter(Boolean);
	//Traps are not affected by rune mods unless specifically targeted (to confirm for both ally and enemy traps)
	const runeMods = compileMods(trap, statMods.runes, 'trap_rune');
	const statsHolder = { dmgRes: 0 };
	for (const statKey of STATS) {
		const initialValue = trap.stats[statKey];
		if (statKey === 'aspd') {
			statsHolder[statKey] = getModdedStat(
				trap.stats[statKey],
				statKey,
				runeMods,
				...secondaryMods
			);
			continue;
		}
		const baseValue = getModdedStat(initialValue, statKey, runeMods);
		statsHolder[statKey] = getModdedStat(baseValue, statKey, ...secondaryMods);
	}
	// if (TRAPS_AFFECTED_BY_DIFFICULTY.includes(trap.key)) {
	// 	statsHolder['dmgRes'] = getDmgReductionVal(runeMods, ...secondaryMods);
	// }
	trap?.modsList?.push(
		[runeMods, diffMods, ...otherMods].filter(Boolean).filter((ele) => ele.mods?.length > 0)
	);
	return statsHolder;
}

export const filterTraps = (traps) => {
	const holder = [];
	for (const trap of traps) {
		let item;
		if (trap.key === 'trap_222_rgdysm') {
			item = holder.find(
				(item) =>
					item.key === trap.key &&
					item.mainSkillLvl === trap.mainSkillLvl &&
					isEquals(item.overrideSkillBlackboard, trap.overrideSkillBlackboard)
			);
		} else {
			item = holder.find(
				(item) => item.key === trap.key && item.mainSkillLvl === trap.mainSkillLvl
			);
		}
		if (item) {
			continue;
		}
		holder.push(trap);
	}
	return holder;
};
