import type { Language } from '$lib/types';

type EnemyCountGroup = {
	label: Record<Language, string>;
	enemyIds: string[];
};

// Enemy IDs match enemy.stageId; array order controls row and icon order.
export const enemyCountGroups: Record<string, EnemyCountGroup[]> = {
	'level_rogue6_5-8': [
		{
			label: {
				zh: '左1-医疗符文列',
				ja: 'R1',
				en: 'R1'
			},
			enemyIds: [
				'enemy_1062_rager_2',
				'enemy_1098_cchmpn_2',
				'enemy_1256_lyacpa_2',
				'enemy_1409_bdguad_2',
				'enemy_10163_mnctur_2',
				'enemy_2002_bearmi'
			]
		},
		{
			label: {
				zh: '左2-特种战术点列',
				ja: 'R2',
				en: 'R2'
			},
			enemyIds: [
				'enemy_1328_cbjedi_2',
				'enemy_10228_agball_2',
				'enemy_10144_xdelk_2',
				'enemy_10116_ymgtop_2',
				'enemy_2034_sythef'
			]
		},
		{
			label: {
				zh: '中-活性源石列',
				ja: 'R3',
				en: 'R3'
			},
			enemyIds: [
				'enemy_10210_muwiz',
				'enemy_9002_adsham',
				'enemy_1359_ekulsr_2',
				'enemy_1121_lifbos_2',
				'enemy_2085_skzjxd'
			]
		},
		{
			label: {
				zh: '右2-地穴列',
				ja: 'R4',
				en: 'R4'
			},
			enemyIds: [
				'enemy_10085_hllevi_2',
				'enemy_10104_mjcbln_2',
				'enemy_10152_nstree_2',
				'enemy_1120_vofwiz_2'
			]
		},
		{
			label: {
				zh: '右1-不可阻挡列',
				ja: 'R5',
				en: 'R5'
			},
			enemyIds: [
				'enemy_2136_shcolo',
				'enemy_1152_dsurch_2',
				'enemy_2046_smwar',
				'enemy_2001_duckmi'
			]
		},
		{
			label: {
				zh: '额外敌人',
				ja: 'R5',
				en: 'R5'
			},
			enemyIds: ['enemy_2137_shsdgo', 'enemy_2152_shezlc']
		}
	]
};
