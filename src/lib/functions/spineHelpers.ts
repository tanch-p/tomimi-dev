import * as spine from '$lib/spine';
import spineMetaData from '$lib/data/spine/spine_meta_data.json';

export const getSpineMetaData = (key, skel) => {
	if (!skel) return;

	let width = Math.min(100, skel.data.width * 0.3);
	let height = Math.min(110, skel.data.height * 0.3);
	switch (key) {
		case 'enemy_2068_skzirn':
			height = 65;
			break;
		case 'enemy_2066_skzlcp':
		case 'enemy_2064_skzwdd':
			height = 110;
			break;
		case 'enemy_2089_skzjkl':
			height = 130;
			break;
	}
	if(Number.isNaN(width)) width = 50;
	if(Number.isNaN(height)) height = 50;
	return { width, height };
};

export const getSpineAnimations = (key: string, skelData: spine.SkeletonData) => {
	if (!skelData) return;

	// a set of states for each enemy form index, ignore hover/prisoner for now
	// only deal with a handful of boss enemies with multiforms

	if (key === '') {
		console.log(skelData);
	}

	if (spineMetaData[key]) {
		// console.log(skelData.animations);
		return spineMetaData[key].anim;
	}
	const idleAnim = getIdleAnimName(key, skelData);
	const defaultAnim = getDefaultAnimName(key, skelData);
	const moveAnim = getMoveAnimName(key, skelData);

	const animations = { Idle: idleAnim, Move: moveAnim, Default: defaultAnim };
	const otherAnims = getOtherAnims(key, skelData);
	return [{ ...animations, ...otherAnims }];
};

function getOtherAnims(key: string, skelData: spine.SkeletonData) {
	const anims = {};
	if (skelData.findAnimation('Start')) {
		anims['Start'] = 'Start';
	}
	return anims;
}

export function getDefaultAnimName(key: string, skelData: spine.SkeletonData) {
	if (!skelData) return;

	if (skelData.findAnimation('Default')) {
		return 'Default';
	}
	switch (key) {
		case 'enemy_2025_syufo':
			return 'Default_01';
		case 'enemy_2097_skzfdd':
		case 'enemy_2098_skzftx':
			return 'C1_Default';
	}
}

export function getIdleAnimName(key: string, skelData: spine.SkeletonData) {
	if (!skelData) return;

	if (skelData.findAnimation('Idle')) {
		return 'Idle';
	}
	if (skelData.findAnimation('Idile')) {
		return 'Idile';
	}
	switch (key) {
		case 'enemy_1118_lidbox':
		case 'enemy_1118_lidbox_2':
		case 'enemy_1121_lifbos':
		case 'enemy_1121_lifbos_2':
			return 'Idle_grey';
		case 'enemy_1024_mortar':
		case 'enemy_1024_mortar_2':
		case 'enemy_1082_soticn':
		case 'enemy_1082_soticn_2':
		case 'enemy_1327_cbrokt':
		case 'enemy_1327_cbrokt_2':
		case 'enemy_1412_mmjump':
		case 'enemy_1412_mmjump_2':
		case 'enemy_1425_lrcmra':
		case 'enemy_1425_lrcmra_2':
		case 'enemy_1506_patrt':
		case 'enemy_2013_csbot':
		case 'enemy_1405_boomer':
		case 'enemy_1405_boomer_2':
			return 'Idle_1';

		case 'enemy_1158_divman':
		case 'enemy_1158_divman_2':
		case 'enemy_1171_durokt':
		case 'enemy_1171_durokt_2':
		case 'enemy_2014_csicer':
			return 'Idle01';

		case 'enemy_2070_skzfbx':
			return 'Idle1';

		case 'enemy_2025_syufo':
			return 'Idle_01';
		case 'enemy_10047_shrknt':
		case 'enemy_10047_shrknt_2':
			return '1_Idle';
		case 'enemy_10057_cjstel':
		case 'enemy_10058_cjfrog':
		case 'enemy_10058_cjfrog_2':
			return 'Idle_a';
		case 'enemy_1143_merrpg':
		case 'enemy_1143_merrpg_2':
		case 'enemy_1271_nhkodo':
		case 'enemy_1271_nhkodo_2':
		case 'enemy_1314_wdnjd':
		case 'enemy_1314_wdnjd_2':
		case 'enemy_1316_wdpjd':
		case 'enemy_1315_wdyjd':
		case 'enemy_1315_wdyjd_2':
		case 'enemy_1316_wdpjd_2':
		case 'trap_086_larva':
		case 'enemy_10045_parrot':
		case 'enemy_2108_dypryg':
		case 'enemy_2109_dypry2':
			return 'Idle_A';
		case 'enemy_1388_wingnt':
		case 'trap_226_dychss':
		case 'enemy_2105_dyrnge':
		case 'enemy_2110_dyyrzf':
		case 'enemy_2111_dyyrz2':
		case 'enemy_2112_dyhlgy':
		case 'enemy_2113_dyhlg2':
		case 'enemy_2114_dylbgg':
		case 'enemy_2115_dylbg2':
		case 'enemy_10127_rkmbst':
			return 'A_Idle';

		case 'enemy_1418_mmkonm':
		case 'enemy_1418_mmkonm_2':
			return 'Idle_b';
		case 'enemy_2120_dywqgs':
			return 'B_Idle';
		case 'enemy_1135_redman':
		case 'enemy_1135_redman_2':
		case 'enemy_2089_skzjkl':
			return 'C_Idle';

		case 'enemy_1516_jakill':
		case 'enemy_2037_sygirl':
		case 'enemy_2081_skztxs':
		case 'enemy_2082_skzdd':
		case 'trap_762_skztxy':
			return 'C1_Idle';

		case 'enemy_1384_winfrz':
			return 'C1_Idle';

		case 'enemy_1267_nhpbr':
		case 'enemy_1267_nhpbr_2':
		case 'enemy_10123_uareap':
			return 'F_Idle';
	}
	return 'Default';
}

function getMoveAnimName(key: string, skelData: spine.SkeletonData) {
	if (skelData.findAnimation('Move')) {
		return 'Move';
	}
	switch (key) {
		case 'enemy_1118_lidbox':
		case 'enemy_1118_lidbox_2':
		case 'enemy_1121_lifbos':
		case 'enemy_1121_lifbos_2':
			return 'Move_grey';

		case 'enemy_1002_nsabr':
		case 'enemy_1000_gopro':
		case 'enemy_1000_gopro_2':
		case 'enemy_1000_gopro_3':
		case 'enemy_1029_shdsbr':
		case 'enemy_1064_snsbr':
		case 'enemy_1065_snwolf':
		case 'enemy_1077_sotihd':
		case 'enemy_1077_sotihd_2':
		case 'enemy_1087_ltwolf':
		case 'enemy_1087_ltwolf_2':
		case 'enemy_1165_duhond':
		case 'enemy_1165_duhond_2':
			return 'Run_Loop';

		case 'enemy_1327_cbrokt':
		case 'enemy_1327_cbrokt_2':
		case 'enemy_1412_mmjump':
		case 'enemy_1412_mmjump_2':
		case 'enemy_1425_lrcmra':
		case 'enemy_1425_lrcmra_2':
		case 'enemy_1506_patrt':
		case 'enemy_10046_pshark':
		case 'enemy_1405_boomer':
		case 'enemy_1405_boomer_2':
			return 'Move_1';

		case 'enemy_1158_divman':
		case 'enemy_1158_divman_2':
		case 'enemy_1171_durokt':
		case 'enemy_1171_durokt_2':
		case 'enemy_2014_csicer':
			return 'Move01';

		case 'enemy_1500_skulsr':
		case 'enemy_2004_balloon':
		case 'enemy_2025_syufo':
			return 'Move_01';

		case 'enemy_2070_skzfbx':
		case 'enemy_2084_skzcan':
			return 'Move1';
		case 'enemy_10047_shrknt':
		case 'enemy_10047_shrknt_2':
			return '1_Move';
		case 'enemy_1388_wingnt':
		case 'enemy_2092_skzamy':
		case 'enemy_2105_dyrnge':
		case 'enemy_10127_rkmbst':
			return 'A_Move';
		case 'enemy_10058_cjfrog':
		case 'enemy_10058_cjfrog_2':
			return 'Move_a';
		case 'enemy_1143_merrpg':
		case 'enemy_1143_merrpg_2':
		case 'enemy_1271_nhkodo':
		case 'enemy_1271_nhkodo_2':
		case 'enemy_2055_smlead':
		case 'enemy_1314_wdnjd':
		case 'enemy_1314_wdnjd_2':
		case 'enemy_1316_wdpjd':
		case 'enemy_1315_wdyjd':
		case 'enemy_1315_wdyjd_2':
		case 'enemy_1316_wdpjd_2':
		case 'enemy_10045_parrot':
		case 'enemy_2108_dypryg':
		case 'enemy_2109_dypry2':
			return 'Move_A';

		case 'enemy_1418_mmkonm':
		case 'enemy_1418_mmkonm_2':
			return 'Move_b';
		case 'enemy_2110_dyyrzf':
		case 'enemy_2111_dyyrz2':
		case 'enemy_2112_dyhlgy':
		case 'enemy_2113_dyhlg2':
		case 'enemy_2114_dylbgg':
		case 'enemy_2115_dylbg2':
		case 'enemy_2120_dywqgs':
			return 'B_Move';
		case 'enemy_1135_redman':
		case 'enemy_1135_redman_2':
		case 'enemy_2089_skzjkl':
			return 'C_Move';

		case 'enemy_1516_jakill':
		case 'enemy_2037_sygirl':
			return 'C1_Move';

		case 'enemy_1384_winfrz':
			return 'C2_Move';

		case 'enemy_1267_nhpbr':
		case 'enemy_1267_nhpbr_2':
		case 'enemy_10123_uareap':
			return 'F_Move';

		default:
			return 'Move_Loop';
	}
}
export function getAnimDuration(skelData: spine.SkeletonData, animName) {
	if (!skelData) return;
	return skelData.animations.find((ele) => ele.name === animName)?.duration || 0;
}

export function getSkillAnimName(skel, enemyKey, skillKey) {
	if (!skel) return;
	if (skel.state.hasAnimation('Skill_Loop')) {
		return 'Skill_Loop';
	}
	switch (skillKey) {
		case 'mzk_extra_summon':
			return 'Skill_1_Loop';
		default:
			break;
	}
}
