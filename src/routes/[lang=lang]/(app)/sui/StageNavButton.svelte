<script lang="ts">
	import type { Language } from '$lib/types';
	import ro5 from '$lib/data/stages/ro5.json';
	import { page } from '$app/stores';

	export let levelId: string, language: Language;

	const stagesToHide = [
		'level_rogue5_b-4-b',
		'level_rogue5_b-5-b',
		'level_rogue5_b-7',
		'level_rogue5_d-3',
		'level_rogue5_d-4',
		'level_rogue5_sv-11',
		'level_rogue5_sv-12',
		'level_rogue5_sv-1_dlc1',
		'level_rogue5_sv-1-b_dlc1',
		'level_rogue5_sv-3_dlc1',
		'level_rogue5_sv-3-b_dlc1',
		'level_rogue5_sv-4_dlc1',
		'level_rogue5_sv-5_dlc1',
		'level_rogue5_sv-5-b_dlc1',
		'level_rogue5_sv-6_dlc1',
		'level_rogue5_sv-6-b_dlc1',
		'level_rogue5_sv-7_dlc1',
		'level_rogue5_sv-7-b_dlc1',
		'level_rogue5_sv-8_dlc1',
		'level_rogue5_sv-8-b_dlc1',
		'level_rogue5_sv-9_dlc1',
		'level_rogue5_sv-10_dlc1',
		'level_rogue5_sv-10-b_dlc1',
		'level_rogue5_1-5',
		'level_rogue5_1-6',
		'level_rogue5_2-5',
		'level_rogue5_2-6',
		'level_rogue5_7-1',
		'level_rogue5_7-2'
	];

	$: currentLevel = $page?.data?.mapConfig?.levelId;
	const stageInfo = ro5[levelId];
	if (!stageInfo) {
		throw new Error(`${levelId} is not found!`);
	}
	$: name = stageInfo[`name_${language}`] || stageInfo['name_zh'];
	$: stageUrl = stageInfo.code + '_' + name;
</script>

<a href={`/${language}/stages/${stageUrl}`}>
	<div
		class:active={levelId === currentLevel}
		class={`hover:text-sky-400 hover:bg-[#343434] py-1.5 px-1 md:h-full hover:cursor-pointer ${
			language !== 'zh' && stagesToHide.includes(levelId) ? 'text-neutral-800' : ''
		}`}
	>
		{name.replaceAll('_', ' ')}
	</div>
</a>

<style>
	div.active {
		background-color: #4e4c49;
		color: #38bdf8;
	}
</style>
