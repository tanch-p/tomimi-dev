import type { Enemy } from '$lib/types';

export const BONUS_ENEMY_KEYS = [
	'enemy_2001_duckmi',
	'enemy_2002_bearmi',
	'enemy_2034_sythef',
	'enemy_2035_sybox',
	'enemy_2059_smbox',
	'enemy_2085_skzjxd',
	'enemy_2069_skzbox',
	'enemy_2091_skzgds',
	'enemy_2067_skzcy',
	'enemy_2065_skzjs',
	'enemy_2093_skzams',
	'enemy_2070_skzfbx',
	'enemy_2119_dyshhj_2',
	'enemy_2106_dyremy',
	'enemy_2125_dylnpp',
	'enemy_2152_shezlc'
];

export const DUEL_STAGES = [
	'level_rogue4_b-8',
	'level_rogue2_b-7',
	'level_rogue1_b-7',
	'level_rogue4_d-1',
	'level_rogue4_d-2',
	'level_rogue4_d-3',
	'level_rogue4_d-b',
	'level_rogue5_d-1',
	'level_rogue5_d-2',
	'level_rogue5_d-3',
	'level_rogue5_d-4',
	'level_rogue6_d-1',
	'level_rogue6_d-2'
];

const getEnemyWeight = (key, type) => {
	if (BONUS_ENEMY_KEYS.includes(key)) {
		return 99;
	}
	switch (key) {
		case 'enemy_2101_dyspll':
			return 50;
		case 'enemy_2121_dyspl2':
			return 51;
		default:
			break;
	}
	return type.includes('BOSS') ? 0 : 1;
};

export const sortEnemies = (a: Enemy, b: Enemy) => {
	return getEnemyWeight(a.key, a.type) - getEnemyWeight(b.key, b.type);
};

export function pruneExtraEnemies(enemies, levelId) {
	if (!['level_rogue2_ev-3', 'level_rogue2_b-7', 'level_rogue4_b-8'].includes(levelId)) {
		return enemies;
	}

	const keys = enemies.map((enemy) => enemy.key);
	switch (levelId) {
		case 'level_rogue4_b-8':
			keys.push('enemy_2093_skzams_1', 'enemy_3001_upeopl_1');
			break;
	}
	return enemies.filter((enemy) => keys.includes(enemy.stageId));
}
