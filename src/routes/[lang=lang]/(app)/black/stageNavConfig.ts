import type { StageGroup } from '$lib/components/StageNav/stageNavTypes';

export type { StageGroup };

export const normalStageGroups: readonly StageGroup[] = [
	{
		label: 1,
		rows: [['level_rogue6_1-1', 'level_rogue6_1-2', 'level_rogue6_1-3', 'level_rogue6_1-4']]
	},
	{
		label: 2,
		rows: [
			['level_rogue6_2-1', 'level_rogue6_2-2', 'level_rogue6_2-3', 'level_rogue6_2-4'],
			['level_rogue6_2-5']
		]
	},
	{
		label: 3,
		rows: [
			['level_rogue6_3-1', 'level_rogue6_3-2', 'level_rogue6_3-3', 'level_rogue6_3-4'],
			['level_rogue6_3-5', 'level_rogue6_3-6']
		]
	},
	{
		label: 4,
		rows: [
			['level_rogue6_4-1', 'level_rogue6_4-2', 'level_rogue6_4-3', 'level_rogue6_4-4'],
			['level_rogue6_4-5', 'level_rogue6_4-6', 'level_rogue6_4-7']
		]
	},
	{
		label: 5,
		rows: [
			['level_rogue6_5-1', 'level_rogue6_5-2', 'level_rogue6_5-3', 'level_rogue6_5-4'],
			['level_rogue6_5-5', 'level_rogue6_5-6', 'level_rogue6_5-7']
		]
	},
	{
		label: 6,
		rows: [['level_rogue6_6-1', 'level_rogue6_6-2']]
	},
	{
		label: '?',
		rows: [['level_rogue6_t-12']]
	}
];

export const bossStageGroups: readonly StageGroup[] = [
	{
		label: 3,
		rows: [
			['level_rogue6_b-1', 'level_rogue6_b-2', 'level_rogue6_b-3'],
			['level_rogue6_b-1-b', 'level_rogue6_b-2-b', 'level_rogue6_b-3-b']
		]
	},
	{
		label: 5,
		rows: [
			['level_rogue6_b-4', 'level_rogue6_b-5'],
			['level_rogue6_b-4-b', '']
		]
	},
	{ label: 6, rows: [['level_rogue6_b-6']] }
];

export const encounterRows = [
	['level_rogue6_t-1', 'level_rogue6_t-2', 'level_rogue6_t-3', 'level_rogue6_t-4'],
	['level_rogue6_c-5', 'level_rogue6_c-6', 'level_rogue6_c-7'],
	['level_rogue6_t-5']
] as const;

export const shopRows = [['level_rogue6_t-6', 'level_rogue6_t-7']] as const;
export const duelRows = [['level_rogue6_d-1', 'level_rogue6_d-2']] as const;
export const savageRows = [['level_rogue6_t-8', 'level_rogue6_t-9']] as const;
export const savageBattleRows = [['level_rogue6_t-10', 'level_rogue6_t-11']] as const;
export const chaseStageGroups: readonly StageGroup[] = [
	{
		label: 1,
		rows: [['level_rogue6_c-1', 'level_rogue6_c-1-b', 'level_rogue6_c-1-c']]
	},
	{
		label: 2,
		rows: [['level_rogue6_c-2', 'level_rogue6_c-3', 'level_rogue6_c-4']]
	},
	{
		label: 4,
		rows: [['level_rogue6_c-5', 'level_rogue6_c-6', 'level_rogue6_c-7']]
	}
];
