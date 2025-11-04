import type { Language } from '$lib/types';
import translations from '$lib/translations.json';
import relics from '$lib/data/chara/relics_chara.json';
import { formatArray } from './languageHelpers';
import { getDisplayKey } from './charaHelpers';

function capitalize(str) {
	// Check if the input is a valid string
	if (typeof str !== 'string' || str.length === 0) {
		return str;
	}

	// Capitalize the first letter and concatenate with the rest of the string
	return str.charAt(0).toUpperCase() + str.slice(1);
}

const DAMAGE_TYPE_KEYS = ['phys', 'arts', 'true', 'ele_dmg', 'aoe'];
const ELE_INJ_KEYS = ['apoptosis', 'burning', 'neural'];
const BUFF_TAGS = [
	'inspire',
	'berserk',
	'protect',
	'fragile',
	'magicfragile',
	'physicfragile',
	'elementfragile',
	'vigor',
	'weaken',
	'barrier',
	'liftoff'
];
const STAT_DEBUFFS = [
	'atk_down',
	'def_down',
	'res_down',
	'aspd_down',
	'ms_down',
	'hitrate_down',
	'heal_scale_down'
];
const DEBUFFS = [
	'stun',
	'sluggish',
	'sleep',
	'silence',
	'cold',
	'levitate',
	'root',
	'tremble',
	'fear',
	'attract',
	'palsy',
	'damage_scale',
	'weightless',
	'cancel_stealth',
	'crit_wound'
];
const ALLY_STAT_BUFFS = [
	'ally_max_hp',
	'ally_atk',
	'ally_def',
	'ally_res',
	'ally_aspd',
	'ally_sp_regen',
	'ally_sp_stock',
	'ally_block_up',
	'ally_damage_scale',
	'ally_max_ammo'
];
const ALLY_CAUSE = ['change_target_priority'];
const ALLY_STAT_MINUS = ['ally_respawn_time', 'ally_cost_down', 'ally_block_down'];
const ALLY_BUFFS = [
	'ally_evasion',
	'ally_shield',
	'ally_reflect_dmg',
	'ally_res_penetrate',
	'ally_def_penetrate',
	'ally_resist',
	'ally_block_dmg',
	'ally_dmg_res',
	'ally_undying',
	'ally_env_dmg_reduce',
	'ally_stealth',
	'ally_camouflage',
	'ally_taunt',
	"ally_arts",
	'ally_apoptosis',
	'ally_burning',
	'ally_lower_target_priority',
	'ally_spareshot',
	'ally_min_aspd',
	'ally_heal_scale'
];
const ALLY_CAN = ['ally_sp_gain', 'add_bullet'];
const SELF_CAN_TAGS = [
	'remove_status',
	'add_sp_gain_option',
	'heal_ally',
	'heal_unhealable',
	'heal_self',
	'sp_gain',
	'force',
	'block_no_attack',
	'teleport_enemy',
	'execute',
	'slow_projectile',
	'erase_projectile',
	'reallocate_hp',
	'ailment_but_skill_cont',
	'target_air',
	'attract_enemy',
	'permanentatk'
];
const SELF_STAT_BUFFS = ['sp_regen', 'sp_stock', 'def', 'res', 'max_ammo'];
const HAVE_TAGS = [
	'max_target',
	'fast_redeploy',
	'revive',
	'spareshot',
	'global_heal',
	'squad_effect',
	'min_damage',
	'dot',
	'no_source',
	'aspd_unrelated',
	'starting_cost',
	'bonus_lifepoint',
	'global_range',
	'heal_on_damage',
	'evasion',
	'shield',
	'block_dmg',
	'dmg_res',
	'undying',
	'env_dmg_reduce',
	'stealth',
	'camouflage',
	'taunt',
	'receive_heal_scale',
	'lower_target_priority',
	'resist',
	'status_immune',
	'ignore_evasion',
	'ignore_stealth',
	'def_penetrate',
	'res_penetrate',
	'reflect_dmg',
	"sp_module"
];
const SKILL_HAVE_TAGS = ['unlimited_duration', 'skill_invincible', 'skill_manual_off'];
const PRIORITY_TAGS = [
	'priority_flying',
	'priority_drone',
	'priority_ranged',
	'priority_stun',
	'priority_sleep',
	'priority_highest_weight',
	'priority_def_high',
	'priority_def_low',
	'priority_res_high',
	'priority_res_low'
];

const SQUAD_TAGS = [
	'abyssal',
	'three_star',
	'robot',
	'student',
	'kazimierz',
	'rhine',
	'karlan',
	'minos',
	'siracusa',
	'position_ranged',
	'PIONEER',
	'WARRIOR',
	'SNIPER',
	'TANK',
	'MEDIC',
	'SUPPORT',
	'CASTER',
	'SPECIAL',
	'cost_under_10',
	'mujica',
	"kjerag"
];
const TYPE_TAGS = [
	'flying',
	'drone',
	'infection',
	'sarkaz',
	'machine',
	'wildanimal',
	'seamonster',
	'type_stun',
	'type_sluggish',
	'type_sleep',
	'type_freeze',
	'type_root',
	'type_tremble',
	'blocked_enemy',
	'no_block_enemy',
	'self_no_block_enemy',
	"not_moving"
];

const SP_TYPE_LIST = [
	'PASSIVE',
	'INCREASE_WHEN_ATTACK',
	'INCREASE_WHEN_TAKEN_DAMAGE',
	'INCREASE_WITH_TIME'
];

const getFilterDescCategory = (key) => {
	const categories = [
		{ category: 'damage_type', keyList: DAMAGE_TYPE_KEYS },
		{ category: 'ele_inj', keyList: ELE_INJ_KEYS },
		{ category: 'enemy_stat_debuff', keyList: STAT_DEBUFFS },
		{ category: 'enemy_debuff', keyList: DEBUFFS },
		{ category: 'ally_stat_buff', keyList: ALLY_STAT_BUFFS },
		{ category: 'ally_cause', keyList: ALLY_CAUSE },
		{ category: 'ally_can', keyList: ALLY_CAN },
		{ category: 'ally_stat_minus', keyList: ALLY_STAT_MINUS },
		{ category: 'ally_buff', keyList: ALLY_BUFFS },
		{ category: 'have_tags', keyList: HAVE_TAGS },
		{ category: 'buff_tags', keyList: BUFF_TAGS },
		{ category: 'self_stat_buff', keyList: SELF_STAT_BUFFS },
		{ category: 'self_can', keyList: SELF_CAN_TAGS },
		{ category: 'skill_have', keyList: SKILL_HAVE_TAGS },
		{ category: 'priority', keyList: PRIORITY_TAGS },
		{ category: 'squad', keyList: SQUAD_TAGS },
		{ category: 'type', keyList: TYPE_TAGS },
		{ category: 'blockCnt', keyList: [0, 1, 2, 3, 4, 5] },
		{ category: 'spType', keyList: SP_TYPE_LIST }
	];
	for (const { category, keyList } of categories) {
		if (keyList.includes(key)) {
			return category;
		}
	}
	return 'others';
};
export const generateSkillDesc = (
	activeOptions,
	list,
	language: Language,
	filterMode,
	relicActiveOptions,
	rogueTopic,
	otherOptions
) => {
	//1. split array into indiv categories
	const allyGroups = {};
	const enemyGroups = {};
	const selfGroups = {};
	const otherGroups = {};
	const relicGroups = {};
	for (const relicId of relicActiveOptions) {
		if (!relicGroups['relic']) relicGroups['relic'] = [];
		relicGroups['relic'].push(relicId);
	}
	for (const key of list) {
		const category = getFilterDescCategory(key);
		let holder;
		if (category.includes('ally')) {
			holder = allyGroups;
		} else if (category.includes('enemy')) {
			holder = enemyGroups;
		} else if (category.includes('self')) {
			holder = selfGroups;
		} else {
			holder = otherGroups;
		}
		if (!holder[category]) {
			holder[category] = [];
		}
		holder[category].push(key);
	}
	const descList = [];
	otherOptions.sort((a, b) => {
		if (a.key === 'group') {
			return -1;
		}
		if (b.key === 'group') {
			return 1;
		}
		return 0;
	});
	for (const { key, options } of otherOptions) {
		let value = options
			.map(({ value, selected }) => {
				const key = getDisplayKey(value);
				return (
					selected &&
					(translations[language].table_headers[key] ??
						translations[language][key] ??
						translations[language].types[key])
				);
			})
			.filter(Boolean)
			.join('/');
		let pre = translations[language]['chara_filter']?.[`${key}_pre`] ?? '';
		if (key === 'deployable_tile' && otherOptions.length === 1) {
			pre = 'that ' + pre;
		}
		const post = translations[language]['chara_filter']?.[`${key}_post`] ?? '';
		descList.push(pre + '<@bluehl>' + value + '</>' + post);
	}

	let categoryDescHolder = [];
	let counter = 0;
	[
		{ key: 'others', holder: otherGroups },
		{ key: 'relic', holder: relicGroups },
		{ key: 'self', holder: selfGroups },
		{ key: 'ally', holder: allyGroups },
		{ key: 'enemy', holder: enemyGroups }
	].forEach(({ key, holder }) => {
		categoryDescHolder = [];
		let category_pre = '';
		const entries = Object.entries(holder);
		if (key === 'others') {
			entries.sort((a, b) => {
				if (['damage_type', 'ele_inj'].includes(a[0])) return 1;
				if (['damage_type', 'ele_inj'].includes(b[0])) return -1;
				return 0;
			});
		}
		if (
			key === 'others' &&
			!Object.keys(otherGroups).includes('have_tags') &&
			otherOptions.length === 0
		) {
			if (!(Object.keys(otherGroups).length === 1 && otherGroups['blockCnt'])) {
				category_pre += 'that ';
			}
		}
		if (
			key !== 'others' &&
			Object.keys(holder).length > 0 &&
			counter === 0 &&
			descList.length === 0
		) {
			category_pre += 'that can ';
		}
		if (
			key !== 'others' &&
			counter === 1 &&
			!otherOptions.find((ele) => ele.key === 'deployable_tile') &&
			!Object.keys(otherGroups).some((key) => ['damage_type', 'ele_inj'].includes(key))
		) {
			category_pre += 'can ';
		}
		if (Object.keys(holder).length > 0) {
			counter += 1;
		}
		entries.forEach(([category, options]) => {
			const translatedStrings = options.map((key) => {
				const displayKey = getDisplayKey(key);
				let relic;
				if (category === 'relic') {
					relic = relics[rogueTopic].find((item) => item.id === key);
				}
				let pre = '';
				let post = '';
				let translated =
					translations[language].table_headers[displayKey] ??
					translations[language][displayKey] ??
					translations[language].types[displayKey] ??
					'';
				if (['atk', 'hp', 'res', 'def', 'attack_speed'].includes(displayKey)) {
					translated = translated.toUpperCase();
				}
				switch (displayKey) {
					case 'charged':
					case 'overdrive':
					case 'trigger_time':
					case 'ct':
						pre = 'have ';
						post = ' skills';
						break;
					case 'ms':
						translated = translated.replace('ms', 'Movement Speed');
						break;
					case 'damage_scale':
						translated = 'Damage Taken Increase';
						break;
					case 'respawnTime':
						translated = 'Redeploy Time';
						break;
					case 'squad_effect':
						post = ' when brought';
						break;
					case 'block_up':
					case 'block_down':
						translated = 'Block';
						break;
					case 'enemy_ranged':
						translated = 'Ranged';
						break;
					case 'stun':
						if (category === 'priority' || category === 'type') translated = 'stunned';
						break;
					case 'sleep':
						if (category === 'priority' || category === 'type') translated = 'sleeping';
						break;
					case 'sluggish':
						if (category === 'priority' || category === 'type') translated = 'slowed';
						break;
					case 'freeze':
						if (category === 'priority' || category === 'type') translated = 'frozen';
						break;
					case 'root':
						if (category === 'priority' || category === 'type') translated = 'bound';
						break;
					case 'tremble':
						if (category === 'priority' || category === 'type') translated = 'frightened';
						break;
					case 'fear':
						if (category === 'priority' || category === 'type') translated = 'terrorized';
						break;
					case 'sp_gain':
						post = ' to self';
						break;
					case 'blocked_enemy':
						translated = 'Blocked';
						break;
					case 'self_no_block_enemy':
						translated = 'enemies not being blocked by self';
						break;
					case 'no_block_enemy':
						translated = 'enemies not being blocked';
						break;
					case 'terrain_water':
						pre = 'powerups when around ';
						break;
					case 'ele_dmg':
						translated = 'Elemental';
						break;
					case 'target_air':
						translated = ' attack Aerial enemies';
						break;
					default:
						break;
				}
				translated = capitalize(translated);
				return (
					pre +
					'<@bluehl>' +
					(category === 'blockCnt'
						? key
						: category === 'relic'
						? relic[`name_${language}`] || relic['name_zh']
						: translated) +
					'</>' +
					post
				);
			});
			const joinedString =
				filterMode === 'OR' || ['blockCnt', 'spType'].includes(category)
					? translatedStrings.join('/')
					: formatArray(translatedStrings, ', ', ' and ');
			let pre = translations[language]['chara_filter']?.[`${category}_pre`] ?? '';
			let post = translations[language]['chara_filter']?.[`${category}_post`] ?? '';
			if (
				category === 'type' &&
				!(options.includes('no_block_enemy') || options.includes('self_no_block_enemy'))
			) {
				post = ' enemies';
			}
			if (
				['damage_type', 'ele_inj'].includes(category) &&
				!otherOptions.find((ele) => ele.key === 'deployable_tile')
			) {
				pre = 'can ' + pre;
			}
			categoryDescHolder.push(pre + joinedString + post);
		});
		if (categoryDescHolder.length > 0) {
			descList.push(category_pre + categoryDescHolder.join(', '));
		}
	});

	const innerConnectorFinal = filterMode === 'OR' ? ' or ' : ' and ';

	return formatArray(descList, ', ', innerConnectorFinal);
};
