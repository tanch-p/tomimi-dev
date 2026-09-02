import type { RogueTopic } from '$lib/types';

export const getEliteColors = (rogueTopic: string) => {
	switch (rogueTopic) {
		case 'rogue_sami':
			return ['bg-[#544a8a]', 'bg-[#8f3033]'];
		case 'rogue_mizuki':
		case 'rogue_black':
			return ['bg-[#5645a4]', 'bg-[#92344e]'];
		case 'rogue_phantom':
			return ['bg-[#dea41b]', 'bg-[#cb710c]'];
		case 'rogue_skz':
			return ['bg-[#5a4b90]', 'bg-[#cb3220]'];
		case 'rogue_yan':
			return ['bg-[#9d6bd4]', 'bg-[#c44256]'];
	}
	return [];
};

const STAGES_WITH_ELITE_IMG = [
	'ro1_e_4_8',
	'ro3_e_3_2',
	'ro3_e_4_2',
	'ro3_e_5_2',
	'ro4_e_2_2',
	'ro4_e_3_2',
	'ro4_e_3_5',
	'ro4_e_5_8'
];

export const getStageImg = (id: string, eliteMode: boolean) => {
	if (id.includes('_b_')) {
		return id;
	}
	if (id.includes('_t_')) {
		id = id.replace('_e', '');
	}
	if (
		!(eliteMode && STAGES_WITH_ELITE_IMG.includes(id)) &&
		!id.includes('ev') &&
		!id.includes('duel')
	) {
		id = id.replace('e', 'n');
	}
	return id;
};

export function getStageType(levelId: string, rogueTopic: RogueTopic) {
	if (levelId.includes('_b-')) {
		return 'BATTLE_BOSS';
	}
	if (levelId.includes('_sv-')) {
		return 'BATTLE_SKY';
	}
	return '';
}
