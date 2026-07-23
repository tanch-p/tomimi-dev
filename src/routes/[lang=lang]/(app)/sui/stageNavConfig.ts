import type { StageGroup } from '$lib/components/StageNav/stageNavTypes';

export type { StageGroup };

export const normalStageGroups: readonly StageGroup[] = [
	{
		label: 1,
		rows: [
			['level_rogue5_1-1', 'level_rogue5_1-2', 'level_rogue5_1-3', 'level_rogue5_1-4'],
			['level_rogue5_1-5', 'level_rogue5_1-6']
		]
	},
	{
		label: 2,
		rows: [
			['level_rogue5_2-1', 'level_rogue5_2-2', 'level_rogue5_2-3', 'level_rogue5_2-4'],
			['level_rogue5_2-5', 'level_rogue5_2-6']
		]
	},
	{
		label: 3,
		rows: [
			['level_rogue5_3-1', 'level_rogue5_3-2', 'level_rogue5_3-3', 'level_rogue5_3-4'],
			['level_rogue5_3-5', 'level_rogue5_3-6']
		]
	},
	{
		label: 4,
		rows: [
			['level_rogue5_4-1', 'level_rogue5_4-2', 'level_rogue5_4-3', 'level_rogue5_4-4'],
			['level_rogue5_4-5', 'level_rogue5_4-6', 'level_rogue5_4-7']
		]
	},
	{
		label: 5,
		rows: [
			['level_rogue5_5-1', 'level_rogue5_5-2', 'level_rogue5_5-3', 'level_rogue5_5-4'],
			['level_rogue5_5-5', 'level_rogue5_5-6', 'level_rogue5_5-7']
		]
	},
	{
		label: 6,
		rows: [
			['level_rogue5_6-1', 'level_rogue5_6-2'],
			['level_rogue5_7-1', 'level_rogue5_7-2']
		]
	}
];

export const bossStageGroups: readonly StageGroup[] = [
	{
		label: 3,
		rows: [
			['level_rogue5_b-1', 'level_rogue5_b-2', 'level_rogue5_b-3'],
			['level_rogue5_b-1-b', 'level_rogue5_b-2-b', 'level_rogue5_b-3-b']
		]
	},
	{
		label: 5,
		rows: [
			['level_rogue5_b-4', 'level_rogue5_b-5'],
			['level_rogue5_b-4-b', 'level_rogue5_b-5-b']
		]
	},
	{ label: 6, rows: [['level_rogue5_b-6', 'level_rogue5_b-7']] },
	{ label: '?', rows: [['level_rogue5_b-8']] },
	{ label: '6/7', rows: [['level_rogue5_b-9-a', 'level_rogue5_b-10']] }
];

export const encounterRows = [
	['level_rogue5_t-1', 'level_rogue5_t-2', 'level_rogue5_t-3', 'level_rogue5_t-4'],
	['level_rogue5_t-5', 'level_rogue5_t-6', 'level_rogue5_t-7', 'level_rogue5_t-8'],
	['level_rogue5_t-9-a', 'level_rogue5_t-9-b', 'level_rogue5_t-9-c', 'level_rogue5_t-10']
] as const;

export const shopRows = [['level_rogue5_ev-1', 'level_rogue5_ev-2']] as const;

export const candleRows = [
	['level_rogue5_fs-1', 'level_rogue5_fs-2', 'level_rogue5_fs-3'],
	['level_rogue5_fs-1b', 'level_rogue5_fs-2b', 'level_rogue5_fs-3b'],
	['level_rogue5_fs-4', 'level_rogue5_fs-5'],
	['level_rogue5_fs-4b', 'level_rogue5_fs-5b'],
	['level_rogue5_dv-5']
] as const;

export const duelRows = [
	['level_rogue5_d-1', 'level_rogue5_d-2'],
	['level_rogue5_d-3', 'level_rogue5_d-4']
] as const;

export const portalRows = [
	['level_rogue5_sv-1', 'level_rogue5_sv-3', 'level_rogue5_sv-5', 'level_rogue5_sv-6'],
	['level_rogue5_sv-1-b', 'level_rogue5_sv-3-b', 'level_rogue5_sv-5-b', 'level_rogue5_sv-6-b'],
	['level_rogue5_sv-7', 'level_rogue5_sv-8', 'level_rogue5_sv-10'],
	['level_rogue5_sv-7-b', 'level_rogue5_sv-8-b', 'level_rogue5_sv-10-b'],
	['level_rogue5_sv-2', 'level_rogue5_sv-2-b', 'level_rogue5_sv-2-c'],
	['level_rogue5_sv-9', 'level_rogue5_sv-9-b', 'level_rogue5_sv-9-c'],
	['level_rogue5_sv-11', 'level_rogue5_sv-12'],
	['level_rogue5_sv-13', 'level_rogue5_sv-14', 'level_rogue5_sv-15'],
	['level_rogue5_sv-4']
] as const;

export const dlcPortalRows = [
	[
		'level_rogue5_sv-1_dlc1',
		'level_rogue5_sv-3_dlc1',
		'level_rogue5_sv-5_dlc1',
		'level_rogue5_sv-6_dlc1'
	],
	[
		'level_rogue5_sv-1-b_dlc1',
		'level_rogue5_sv-3-b_dlc1',
		'level_rogue5_sv-5-b_dlc1',
		'level_rogue5_sv-6-b_dlc1'
	],
	['level_rogue5_sv-7_dlc1', 'level_rogue5_sv-8_dlc1', 'level_rogue5_sv-10_dlc1'],
	['level_rogue5_sv-7-b_dlc1', 'level_rogue5_sv-8-b_dlc1', 'level_rogue5_sv-10-b_dlc1'],
	['level_rogue5_sv-9_dlc1', 'level_rogue5_sv-4_dlc1']
] as const;
