import { describe, it, expect } from 'vitest';
import { generateWaveTimeline } from '$lib/functions/waveHelpers';
import ro3_b6 from '../lib/data/stages/ro_stage_data/level_rogue3_b-6.json' assert { type: 'json' };
import ro5_b5b from '../lib/data/stages/ro_stage_data/level_rogue5_b-5-b.json' assert { type: 'json' };

const expectedResults = {
	rogue3_b6: {
		timeline: [
			{
				preDelay: 0,
				postDelay: 0,
				maxTimeWaitingForNextWave: -1,
				timeline: [
					{
						t: 0,
						actions: [
							{
								key: 'enemy_2056_smedzi',
								actionType: 'SPAWN'
							},
							{
								key: 'enemy_2056_smedzi',
								actionType: 'DISPLAY_ENEMY_INFO'
							}
						]
					},
					{
						t: 13,
						actions: [
							{
								key: 'enemy_2045_smdrn',
								actionType: 'SPAWN'
							},
							{
								key: 'enemy_2045_smdrn',
								actionType: 'SPAWN'
							}
						]
					},
					{
						t: 16,
						actions: [
							{
								key: 'enemy_2045_smdrn',
								actionType: 'SPAWN'
							},
							{
								key: 'enemy_2045_smdrn',
								actionType: 'SPAWN'
							}
						]
					},
					{
						t: 19,
						actions: [
							{
								key: 'enemy_2045_smdrn',
								actionType: 'SPAWN'
							},
							{
								key: 'enemy_2045_smdrn',
								actionType: 'SPAWN'
							}
						]
					},
					{
						t: 38,
						actions: [
							{
								key: 'enemy_2043_smsbr',
								actionType: 'SPAWN'
							}
						]
					},
					{
						t: 41,
						actions: [
							{
								key: 'enemy_2043_smsbr',
								actionType: 'SPAWN'
							}
						]
					},
					{
						t: 46,
						actions: [
							{
								key: 'enemy_2043_smsbr',
								actionType: 'SPAWN'
							}
						]
					},
					{
						t: 49,
						actions: [
							{
								key: 'enemy_2043_smsbr',
								actionType: 'SPAWN'
							}
						]
					},
					{
						t: 61,
						actions: [
							{
								key: 'enemy_2043_smsbr',
								actionType: 'SPAWN'
							}
						]
					},
					{
						t: 64,
						actions: [
							{
								key: 'enemy_2043_smsbr',
								actionType: 'SPAWN'
							}
						]
					},
					{
						t: 66,
						actions: [
							{
								key: 'enemy_2043_smsbr',
								actionType: 'SPAWN'
							}
						]
					},
					{
						t: 69,
						actions: [
							{
								key: 'enemy_2043_smsbr',
								actionType: 'SPAWN'
							}
						]
					},
					{
						t: 77,
						actions: [
							{
								key: 'enemy_2044_smwiz',
								actionType: 'SPAWN'
							}
						]
					},
					{
						t: 80,
						actions: [
							{
								key: 'enemy_2044_smwiz',
								actionType: 'SPAWN'
							}
						]
					},
					{
						t: 92,
						actions: [
							{
								key: 'enemy_2043_smsbr',
								actionType: 'SPAWN'
							},
							{
								key: 'enemy_2043_smsbr',
								actionType: 'SPAWN'
							}
						]
					},
					{
						t: 96,
						actions: [
							{
								key: 'enemy_2043_smsbr',
								actionType: 'SPAWN'
							},
							{
								key: 'enemy_2043_smsbr',
								actionType: 'SPAWN'
							}
						]
					},
					{
						t: 106,
						actions: [
							{
								key: 'enemy_2044_smwiz',
								actionType: 'SPAWN'
							}
						]
					},
					{
						t: 109,
						actions: [
							{
								key: 'enemy_2044_smwiz',
								actionType: 'SPAWN'
							}
						]
					},
					{
						t: 119,
						actions: [
							{
								key: 'enemy_2045_smdrn',
								actionType: 'SPAWN'
							},
							{
								key: 'enemy_2045_smdrn',
								actionType: 'SPAWN'
							}
						]
					},
					{
						t: 122,
						actions: [
							{
								key: 'enemy_2045_smdrn',
								actionType: 'SPAWN'
							},
							{
								key: 'enemy_2045_smdrn',
								actionType: 'SPAWN'
							}
						]
					},
					{
						t: 125,
						actions: [
							{
								key: 'enemy_2045_smdrn',
								actionType: 'SPAWN'
							},
							{
								key: 'enemy_2045_smdrn',
								actionType: 'SPAWN'
							}
						]
					},
					{
						t: 144,
						actions: [
							{
								key: 'enemy_1329_cbshld_2',
								actionType: 'SPAWN'
							}
						]
					},
					{
						t: 148,
						actions: [
							{
								key: 'enemy_1113_empace_2',
								actionType: 'SPAWN'
							}
						]
					},
					{
						t: 149,
						actions: [
							{
								key: 'enemy_1329_cbshld_2',
								actionType: 'SPAWN'
							}
						]
					},
					{
						t: 154,
						actions: [
							{
								key: 'enemy_1329_cbshld_2',
								actionType: 'SPAWN'
							}
						]
					},
					{
						t: 155,
						actions: [
							{
								key: 'enemy_1113_empace_2',
								actionType: 'SPAWN'
							}
						]
					},
					{
						t: 175,
						actions: [
							{
								key: 'enemy_2043_smsbr',
								actionType: 'SPAWN'
							}
						]
					},
					{
						t: 177,
						actions: [
							{
								key: 'enemy_2043_smsbr',
								actionType: 'SPAWN'
							}
						]
					},
					{
						t: 179,
						actions: [
							{
								key: 'enemy_2043_smsbr',
								actionType: 'SPAWN'
							}
						]
					},
					{
						t: 181,
						actions: [
							{
								key: 'enemy_2043_smsbr',
								actionType: 'SPAWN'
							}
						]
					},
					{
						t: 185,
						actions: [
							{
								key: 'enemy_2044_smwiz',
								actionType: 'SPAWN'
							}
						]
					},
					{
						t: 188,
						actions: [
							{
								key: 'enemy_2044_smwiz',
								actionType: 'SPAWN'
							}
						]
					},
					{
						t: 200,
						actions: [
							{
								key: 'enemy_2043_smsbr',
								actionType: 'SPAWN'
							}
						]
					},
					{
						t: 202,
						actions: [
							{
								key: 'enemy_2043_smsbr',
								actionType: 'SPAWN'
							}
						]
					},
					{
						t: 204,
						actions: [
							{
								key: 'enemy_2043_smsbr',
								actionType: 'SPAWN'
							}
						]
					},
					{
						t: 206,
						actions: [
							{
								key: 'enemy_2043_smsbr',
								actionType: 'SPAWN'
							}
						]
					},
					{
						t: 210,
						actions: [
							{
								key: 'enemy_2044_smwiz',
								actionType: 'SPAWN'
							}
						]
					},
					{
						t: 213,
						actions: [
							{
								key: 'enemy_2044_smwiz',
								actionType: 'SPAWN'
							}
						]
					},
					{
						t: 236,
						actions: [
							{
								key: 'enemy_1329_cbshld_2',
								actionType: 'SPAWN'
							}
						]
					},
					{
						t: 240,
						actions: [
							{
								key: 'enemy_1113_empace_2',
								actionType: 'SPAWN'
							}
						]
					},
					{
						t: 241,
						actions: [
							{
								key: 'enemy_1329_cbshld_2',
								actionType: 'SPAWN'
							}
						]
					},
					{
						t: 246,
						actions: [
							{
								key: 'enemy_1329_cbshld_2',
								actionType: 'SPAWN'
							}
						]
					},
					{
						t: 247,
						actions: [
							{
								key: 'enemy_1113_empace_2',
								actionType: 'SPAWN'
							}
						]
					}
				]
			},
			{
				preDelay: 0,
				postDelay: 0,
				maxTimeWaitingForNextWave: -1,
				timeline: [
					{
						t: 0,
						actions: [
							{
								key: 'enemy_2045_smdrn',
								actionType: 'SPAWN'
							},
							{
								key: 'enemy_2045_smdrn',
								actionType: 'SPAWN'
							}
						]
					},
					{
						t: 3,
						actions: [
							{
								key: 'enemy_2045_smdrn',
								actionType: 'SPAWN'
							},
							{
								key: 'enemy_2045_smdrn',
								actionType: 'SPAWN'
							}
						]
					},
					{
						t: 6,
						actions: [
							{
								key: 'enemy_2045_smdrn',
								actionType: 'SPAWN'
							},
							{
								key: 'enemy_2045_smdrn',
								actionType: 'SPAWN'
							}
						]
					},
					{
						t: 22,
						actions: [
							{
								key: 'enemy_2043_smsbr',
								actionType: 'SPAWN'
							}
						]
					},
					{
						t: 24,
						actions: [
							{
								key: 'enemy_2043_smsbr',
								actionType: 'SPAWN'
							}
						]
					},
					{
						t: 26,
						actions: [
							{
								key: 'enemy_2043_smsbr',
								actionType: 'SPAWN'
							}
						]
					},
					{
						t: 28,
						actions: [
							{
								key: 'enemy_2043_smsbr',
								actionType: 'SPAWN'
							}
						]
					},
					{
						t: 29,
						actions: [
							{
								key: 'enemy_2044_smwiz',
								actionType: 'SPAWN'
							}
						]
					},
					{
						t: 31,
						actions: [
							{
								key: 'enemy_2044_smwiz',
								actionType: 'SPAWN'
							}
						]
					},
					{
						t: 32,
						actions: [
							{
								key: 'enemy_2043_smsbr',
								actionType: 'SPAWN'
							}
						]
					},
					{
						t: 34,
						actions: [
							{
								key: 'enemy_2043_smsbr',
								actionType: 'SPAWN'
							}
						]
					},
					{
						t: 36,
						actions: [
							{
								key: 'enemy_2043_smsbr',
								actionType: 'SPAWN'
							}
						]
					},
					{
						t: 37,
						actions: [
							{
								key: 'enemy_2044_smwiz',
								actionType: 'SPAWN'
							}
						]
					},
					{
						t: 38,
						actions: [
							{
								key: 'enemy_2043_smsbr',
								actionType: 'SPAWN'
							}
						]
					},
					{
						t: 39,
						actions: [
							{
								key: 'enemy_2044_smwiz',
								actionType: 'SPAWN'
							}
						]
					},
					{
						t: 62,
						actions: [
							{
								key: 'enemy_1329_cbshld_2',
								actionType: 'SPAWN'
							}
						]
					},
					{
						t: 66,
						actions: [
							{
								key: 'enemy_1113_empace_2',
								actionType: 'SPAWN'
							}
						]
					},
					{
						t: 67,
						actions: [
							{
								key: 'enemy_1329_cbshld_2',
								actionType: 'SPAWN'
							}
						]
					},
					{
						t: 72,
						actions: [
							{
								key: 'enemy_1329_cbshld_2',
								actionType: 'SPAWN'
							}
						]
					},
					{
						t: 73,
						actions: [
							{
								key: 'enemy_1113_empace_2',
								actionType: 'SPAWN'
							}
						]
					},
					{
						t: 76,
						actions: [
							{
								key: 'enemy_1113_empace_2',
								actionType: 'SPAWN'
							}
						]
					},
					{
						t: 77,
						actions: [
							{
								key: 'enemy_1329_cbshld_2',
								actionType: 'SPAWN'
							}
						]
					},
					{
						t: 94,
						actions: [
							{
								key: 'enemy_1136_redace_2',
								actionType: 'SPAWN'
							},
							{
								key: 'enemy_1330_cbrush_2',
								actionType: 'SPAWN'
							}
						]
					},
					{
						t: 99,
						actions: [
							{
								key: 'enemy_1136_redace_2',
								actionType: 'SPAWN'
							}
						]
					},
					{
						t: 114,
						actions: [
							{
								key: 'enemy_2045_smdrn',
								actionType: 'SPAWN'
							},
							{
								key: 'enemy_2045_smdrn',
								actionType: 'SPAWN'
							}
						]
					},
					{
						t: 117,
						actions: [
							{
								key: 'enemy_2045_smdrn',
								actionType: 'SPAWN'
							},
							{
								key: 'enemy_2045_smdrn',
								actionType: 'SPAWN'
							}
						]
					},
					{
						t: 120,
						actions: [
							{
								key: 'enemy_2045_smdrn',
								actionType: 'SPAWN'
							},
							{
								key: 'enemy_2045_smdrn',
								actionType: 'SPAWN'
							}
						]
					},
					{
						t: 136,
						actions: [
							{
								key: 'enemy_2043_smsbr',
								actionType: 'SPAWN'
							}
						]
					},
					{
						t: 138,
						actions: [
							{
								key: 'enemy_2043_smsbr',
								actionType: 'SPAWN'
							}
						]
					},
					{
						t: 140,
						actions: [
							{
								key: 'enemy_2043_smsbr',
								actionType: 'SPAWN'
							}
						]
					},
					{
						t: 142,
						actions: [
							{
								key: 'enemy_2043_smsbr',
								actionType: 'SPAWN'
							}
						]
					},
					{
						t: 143,
						actions: [
							{
								key: 'enemy_2044_smwiz',
								actionType: 'SPAWN'
							}
						]
					},
					{
						t: 145,
						actions: [
							{
								key: 'enemy_2044_smwiz',
								actionType: 'SPAWN'
							}
						]
					},
					{
						t: 146,
						actions: [
							{
								key: 'enemy_2043_smsbr',
								actionType: 'SPAWN'
							}
						]
					},
					{
						t: 148,
						actions: [
							{
								key: 'enemy_2043_smsbr',
								actionType: 'SPAWN'
							}
						]
					},
					{
						t: 150,
						actions: [
							{
								key: 'enemy_2043_smsbr',
								actionType: 'SPAWN'
							}
						]
					},
					{
						t: 151,
						actions: [
							{
								key: 'enemy_2044_smwiz',
								actionType: 'SPAWN'
							}
						]
					},
					{
						t: 152,
						actions: [
							{
								key: 'enemy_2043_smsbr',
								actionType: 'SPAWN'
							}
						]
					},
					{
						t: 153,
						actions: [
							{
								key: 'enemy_2044_smwiz',
								actionType: 'SPAWN'
							}
						]
					},
					{
						t: 176,
						actions: [
							{
								key: 'enemy_1329_cbshld_2',
								actionType: 'SPAWN'
							}
						]
					},
					{
						t: 180,
						actions: [
							{
								key: 'enemy_1113_empace_2',
								actionType: 'SPAWN'
							}
						]
					},
					{
						t: 181,
						actions: [
							{
								key: 'enemy_1329_cbshld_2',
								actionType: 'SPAWN'
							}
						]
					},
					{
						t: 186,
						actions: [
							{
								key: 'enemy_1329_cbshld_2',
								actionType: 'SPAWN'
							}
						]
					},
					{
						t: 187,
						actions: [
							{
								key: 'enemy_1113_empace_2',
								actionType: 'SPAWN'
							}
						]
					},
					{
						t: 190,
						actions: [
							{
								key: 'enemy_1113_empace_2',
								actionType: 'SPAWN'
							}
						]
					},
					{
						t: 205,
						actions: [
							{
								key: 'enemy_1136_redace_2',
								actionType: 'SPAWN'
							},
							{
								key: 'enemy_1330_cbrush_2',
								actionType: 'SPAWN'
							}
						]
					},
					{
						t: 210,
						actions: [
							{
								key: 'enemy_1136_redace_2',
								actionType: 'SPAWN'
							}
						]
					}
				]
			}
		],
		count: 106
	},
	rogue5_b5b: {
		timeline: [
			{
				preDelay: 0,
				postDelay: 0,
				maxTimeWaitingForNextWave: -1,
				timeline: [
					{
						t: 0,
						actions: [
							{
								key: 'enemy_2119_dyshhj',
								actionType: 'SPAWN'
							},
							{
								key: 'enemy_1392_dhshld_2',
								actionType: 'SPAWN'
							},
							{
								key: 'enemy_1392_dhshld_2',
								actionType: 'SPAWN'
							},
							{
								key: 'enemy_1392_dhshld_2',
								actionType: 'SPAWN'
							},
							{
								key: 'enemy_1392_dhshld_2',
								actionType: 'SPAWN'
							},
							{
								key: 'enemy_1392_dhshld_2',
								actionType: 'SPAWN'
							},
							{
								key: 'enemy_1392_dhshld_2',
								actionType: 'SPAWN'
							},
							{
								key: 'enemy_1392_dhshld_2',
								actionType: 'SPAWN'
							},
							{
								key: 'enemy_1392_dhshld_2',
								actionType: 'SPAWN'
							}
						]
					},
					{
						t: 3,
						actions: [
							{
								key: 'enemy_2119_dyshhj',
								actionType: 'DISPLAY_ENEMY_INFO'
							}
						]
					},
					{
						t: 6,
						actions: [
							{
								key: 'enemy_1390_dhsbr_2',
								actionType: 'SPAWN'
							}
						]
					},
					{
						t: 16,
						actions: [
							{
								key: 'enemy_1390_dhsbr_2',
								actionType: 'SPAWN'
							}
						]
					},
					{
						t: 28,
						actions: [
							{
								key: 'enemy_1390_dhsbr_2',
								actionType: 'SPAWN'
							}
						]
					},
					{
						t: 30,
						actions: [
							{
								key: 'enemy_1390_dhsbr_2',
								actionType: 'SPAWN'
							}
						]
					},
					{
						t: 31,
						actions: [
							{
								key: 'enemy_1390_dhsbr_2',
								actionType: 'SPAWN'
							}
						]
					},
					{
						t: 32,
						actions: [
							{
								key: 'enemy_1390_dhsbr_2',
								actionType: 'SPAWN'
							}
						]
					},
					{
						t: 33,
						actions: [
							{
								key: 'enemy_1390_dhsbr_2',
								actionType: 'SPAWN'
							}
						]
					},
					{
						t: 35,
						actions: [
							{
								key: 'enemy_1390_dhsbr_2',
								actionType: 'SPAWN'
							}
						]
					},
					{
						t: 50,
						actions: [
							{
								key: 'enemy_1392_dhshld_2',
								actionType: 'SPAWN'
							},
							{
								key: 'enemy_1392_dhshld_2',
								actionType: 'SPAWN'
							}
						]
					},
					{
						t: 60,
						actions: [
							{
								key: 'enemy_1392_dhshld_2',
								actionType: 'SPAWN'
							},
							{
								key: 'enemy_1392_dhshld_2',
								actionType: 'SPAWN'
							}
						]
					},
					{
						t: 65,
						actions: [
							{
								key: 'enemy_1392_dhshld_2',
								actionType: 'SPAWN'
							},
							{
								key: 'enemy_1392_dhshld_2',
								actionType: 'SPAWN'
							}
						]
					},
					{
						t: 70,
						actions: [
							{
								key: 'enemy_1299_ymkilr_2',
								actionType: 'SPAWN'
							}
						]
					},
					{
						t: 71.799999,
						actions: [
							{
								key: 'enemy_1299_ymkilr_2',
								actionType: 'SPAWN'
							}
						]
					}
				]
			},
			{
				preDelay: 0,
				postDelay: 0,
				maxTimeWaitingForNextWave: 30,
				timeline: [
					{
						t: 3,
						actions: [
							{
								key: 'enemy_1393_dhele_2',
								actionType: 'SPAWN'
							}
						]
					},
					{
						t: 10,
						actions: [
							{
								key: 'enemy_1390_dhsbr_2',
								actionType: 'SPAWN'
							},
							{
								key: 'enemy_1390_dhsbr_2',
								actionType: 'SPAWN'
							}
						]
					},
					{
						t: 12,
						actions: [
							{
								key: 'enemy_1390_dhsbr_2',
								actionType: 'SPAWN'
							},
							{
								key: 'enemy_1390_dhsbr_2',
								actionType: 'SPAWN'
							}
						]
					},
					{
						t: 14,
						actions: [
							{
								key: 'enemy_1390_dhsbr_2',
								actionType: 'SPAWN'
							},
							{
								key: 'enemy_1390_dhsbr_2',
								actionType: 'SPAWN'
							}
						]
					},
					{
						t: 27,
						actions: [
							{
								key: 'enemy_2105_dyrnge',
								actionType: 'SPAWN'
							}
						]
					},
					{
						t: 30.3,
						actions: [
							{
								key: 'enemy_2105_dyrnge',
								actionType: 'SPAWN'
							}
						]
					},
					{
						t: 39,
						actions: [
							{
								key: 'enemy_1299_ymkilr_2',
								actionType: 'SPAWN'
							}
						]
					},
					{
						t: 40.799999,
						actions: [
							{
								key: 'enemy_1299_ymkilr_2',
								actionType: 'SPAWN'
							}
						]
					},
					{
						t: 49,
						actions: [
							{
								key: 'enemy_1299_ymkilr_2',
								actionType: 'SPAWN'
							}
						]
					},
					{
						t: 50.799999,
						actions: [
							{
								key: 'enemy_1299_ymkilr_2',
								actionType: 'SPAWN'
							}
						]
					},
					{
						t: 59,
						actions: [
							{
								key: 'enemy_1299_ymkilr_2',
								actionType: 'SPAWN'
							}
						]
					},
					{
						t: 60.799999,
						actions: [
							{
								key: 'enemy_1299_ymkilr_2',
								actionType: 'SPAWN'
							}
						]
					},
					{
						t: 73.799999,
						actions: [
							{
								key: 'enemy_1393_dhele_2',
								actionType: 'SPAWN'
							}
						]
					},
					{
						t: 76.799999,
						actions: [
							{
								key: 'enemy_1390_dhsbr_2',
								actionType: 'SPAWN'
							},
							{
								key: 'enemy_1390_dhsbr_2',
								actionType: 'SPAWN'
							}
						]
					},
					{
						t: 78.799999,
						actions: [
							{
								key: 'enemy_1390_dhsbr_2',
								actionType: 'SPAWN'
							},
							{
								key: 'enemy_1390_dhsbr_2',
								actionType: 'SPAWN'
							}
						]
					},
					{
						t: 80.799999,
						actions: [
							{
								key: 'enemy_1390_dhsbr_2',
								actionType: 'SPAWN'
							},
							{
								key: 'enemy_1390_dhsbr_2',
								actionType: 'SPAWN'
							}
						]
					},
					{
						t: 90.799999,
						actions: [
							{
								key: 'enemy_1390_dhsbr_2',
								actionType: 'SPAWN'
							},
							{
								key: 'enemy_1390_dhsbr_2',
								actionType: 'SPAWN'
							}
						]
					},
					{
						t: 92.799999,
						actions: [
							{
								key: 'enemy_1390_dhsbr_2',
								actionType: 'SPAWN'
							},
							{
								key: 'enemy_1390_dhsbr_2',
								actionType: 'SPAWN'
							}
						]
					},
					{
						t: 94.799999,
						actions: [
							{
								key: 'enemy_1390_dhsbr_2',
								actionType: 'SPAWN'
							},
							{
								key: 'enemy_1390_dhsbr_2',
								actionType: 'SPAWN'
							}
						]
					}
				]
			},
			{
				preDelay: 0,
				postDelay: 0,
				maxTimeWaitingForNextWave: 30,
				timeline: [
					{
						t: 0,
						actions: [
							{
								key: 'trap_222_rgdysm',
								actionType: 'ACTIVATE_PREDEFINED'
							},
							{
								key: 'trap_222_rgdysm',
								actionType: 'ACTIVATE_PREDEFINED'
							}
						]
					},
					{
						t: 3,
						actions: [
							{
								key: 'enemy_1205_sfpin_2',
								actionType: 'PREVIEW_CURSOR'
							},
							{
								key: 'enemy_1205_sfpin_2',
								actionType: 'PREVIEW_CURSOR'
							},
							{
								key: 'enemy_1205_sfpin_2',
								actionType: 'PREVIEW_CURSOR'
							},
							{
								key: 'enemy_1205_sfpin_2',
								actionType: 'PREVIEW_CURSOR'
							}
						]
					},
					{
						t: 16,
						actions: [
							{
								key: 'enemy_2105_dyrnge',
								actionType: 'SPAWN'
							},
							{
								key: 'enemy_1393_dhele_2',
								actionType: 'SPAWN'
							}
						]
					},
					{
						t: 19.3,
						actions: [
							{
								key: 'enemy_2105_dyrnge',
								actionType: 'SPAWN'
							}
						]
					},
					{
						t: 23,
						actions: [
							{
								key: 'enemy_1392_dhshld_2',
								actionType: 'SPAWN'
							},
							{
								key: 'enemy_1392_dhshld_2',
								actionType: 'SPAWN'
							}
						]
					},
					{
						t: 26,
						actions: [
							{
								key: 'enemy_1393_dhele_2',
								actionType: 'SPAWN'
							}
						]
					},
					{
						t: 31,
						actions: [
							{
								key: 'enemy_2105_dyrnge',
								actionType: 'SPAWN'
							}
						]
					},
					{
						t: 34.3,
						actions: [
							{
								key: 'enemy_2105_dyrnge',
								actionType: 'SPAWN'
							}
						]
					},
					{
						t: 38,
						actions: [
							{
								key: 'enemy_1207_sfji_2',
								actionType: 'SPAWN'
							}
						]
					},
					{
						t: 39.5,
						actions: [
							{
								key: 'enemy_1207_sfji_2',
								actionType: 'SPAWN'
							}
						]
					},
					{
						t: 52.5,
						actions: [
							{
								key: 'enemy_1207_sfji_2',
								actionType: 'SPAWN'
							},
							{
								key: 'enemy_1207_sfji_2',
								actionType: 'SPAWN'
							}
						]
					},
					{
						t: 72.5,
						actions: [
							{
								key: 'enemy_1207_sfji_2',
								actionType: 'SPAWN'
							},
							{
								key: 'enemy_1207_sfji_2',
								actionType: 'SPAWN'
							}
						]
					},
					{
						t: 82.5,
						actions: [
							{
								key: 'enemy_1207_sfji_2',
								actionType: 'SPAWN'
							},
							{
								key: 'enemy_1207_sfji_2',
								actionType: 'SPAWN'
							}
						]
					},
					{
						t: 95.5,
						actions: [
							{
								key: 'enemy_1392_dhshld_2',
								actionType: 'SPAWN'
							},
							{
								key: 'enemy_1392_dhshld_2',
								actionType: 'SPAWN'
							}
						]
					},
					{
						t: 98.5,
						actions: [
							{
								key: 'enemy_1392_dhshld_2',
								actionType: 'SPAWN'
							},
							{
								key: 'enemy_1392_dhshld_2',
								actionType: 'SPAWN'
							}
						]
					},
					{
						t: 101.5,
						actions: [
							{
								key: 'enemy_1392_dhshld_2',
								actionType: 'SPAWN'
							},
							{
								key: 'enemy_1392_dhshld_2',
								actionType: 'SPAWN'
							}
						]
					}
				]
			}
		]
	}
};

describe('test wave timeline generation', () => {
	it('rogue3_b-6', () => {
		const { waves, count } = generateWaveTimeline(ro3_b6, [], 'random', false, [], null);
		expect(count).toBe(expectedResults.rogue3_b6.count);
		expect(waves).toEqual(expectedResults.rogue3_b6.timeline);
	});
	it('rogue5_b-5-b', () => {
		const { waves } = generateWaveTimeline(ro3_b6, [], 'random', false, [], null);
		expect(waves).toEqual(expectedResults.rogue3_b6.timeline);
	});
});
