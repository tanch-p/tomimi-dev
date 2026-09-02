import { writable, derived } from 'svelte/store';
import difficultyModsList from '$lib/data/is/sarkaz/difficulty_mods_sarkaz.json';
import { browser } from '$app/environment';
import { cookiesEnabled } from '../../../../stores';
import { compileSpecialMods } from '$lib/functions/statHelpers';
import { consolidateOtherMods } from '$lib/functions/buffHelpers';

let storedDifficulty = 0;
if (browser && cookiesEnabled) {
	storedDifficulty = parseInt(localStorage.getItem('skz_difficulty') ?? '0');
}
export const selectedRelics = writable([]);
export const difficulty = writable(storedDifficulty);
export const difficultyMode = writable('normal'); //normal | deepseek
export const actualDifficulty = derived(
	[difficulty, difficultyMode],
	([$difficulty, $difficultyMode]) => ($difficultyMode === 'deepseek' ? 0 : $difficulty)
);

export const selectedFloor = writable(1);
const floorDifficultyMods = derived(
	[selectedFloor, difficulty, difficultyMode],
	([$selectedFloor, $difficulty, $difficultyMode]) =>
		$difficultyMode === 'normal'
			? [
					{
						targets: ['ALL'],
						mods: [
							{
								key: 'hp',
								value: (1 + difficultyModsList[$difficulty]?.floorBuff) ** $selectedFloor,
								mode: 'mul'
							},
							{
								key: 'atk',
								value: (1 + difficultyModsList[$difficulty]?.floorBuff) ** $selectedFloor,
								mode: 'mul'
							}
						]
					}
			  ]
			: null
);
export const eliteMode = writable(false);
export const runes = writable(null);
export const allMods = writable(null);
export const disasterEffects = writable([]);
export const otherBuffsList = writable([]);
const otherMods = derived([otherBuffsList], ([$otherBuffsList]) =>
	consolidateOtherMods($otherBuffsList)
);
// 语奇终无
const deepSeekMods = derived([selectedFloor], ([$selectedFloor]) => [
	{
		targets: ['ALL'],
		mods: [
			{
				key: 'hp',
				value: (1 - 0.75) * 2 ** $selectedFloor,
				mode: 'mul'
			},
			{
				key: 'atk',
				value: (1 - 0.75) * 2 ** $selectedFloor,
				mode: 'mul'
			},
			{
				key: 'def',
				value: (1 - 0.5) * 1.2 ** $selectedFloor,
				mode: 'mul'
			}
		]
	}
]);
const difficultyMods = derived(
	[difficulty, difficultyMode, deepSeekMods],
	([$difficulty, $difficultyMode, $deepSeekMods]) =>
		$difficultyMode === 'normal'
			? difficultyModsList
					.map((ele) => {
						if (ele.difficulty <= $difficulty && ele.effects.length > 0) {
							return ele.effects;
						}
					})
					.filter(Boolean)
			: [$deepSeekMods]
);

export const noobHelp = derived([difficulty], ([$difficulty]) => {
	const lowDiffHP = [0.8, 0.85, 0.9];
	if ($difficulty <= 2) {
		return [
			{
				targets: ['ALL'],
				mods: [
					{
						key: 'hp',
						value: lowDiffHP[$difficulty],
						mode: 'mul'
					}
				]
			}
		];
	}
	return null;
});

export const statMods = derived(
	[
		selectedRelics,
		floorDifficultyMods,
		eliteMode,
		runes,
		disasterEffects,
		difficultyMods,
		otherMods,
		noobHelp,
		allMods
	],
	([
		$selectedRelics,
		$floorDifficultyMods,
		$eliteMode,
		$runes,
		$disasterEffects,
		$difficultyMods,
		$otherMods,
		$noobHelp,
		$allMods
	]) => {
		const relicMods = $selectedRelics.map((relic) => {
			return {
				key: relic.id,
				mods: [relic.effects]
			};
		});
		return {
			runes: { key: $eliteMode ? 'elite_ops' : 'combat_ops', mods: [$runes, $allMods] },
			diff: { key: 'difficulty', mods: $difficultyMods, stackType: 'mul' },
			others: [
				{ key: 'floor_diff', mods: [$floorDifficultyMods] },
				{ key: 'low_diff', mods: [$noobHelp] },
				{
					key: 'sarkaz_disaster',
					mods: $disasterEffects.map((ele) => ele.effects),
					operation: 'times'
				},
				...relicMods,
				...$otherMods
			]
		};
	}
);

export const specialMods = derived(
	[selectedRelics, runes, allMods, difficultyMods, disasterEffects],
	([$selectedRelics, $runes, $allMods, $difficultyMods, $disasterEffects]) =>
		compileSpecialMods(
			$selectedRelics.map((relic) => relic.effects),
			[$runes, $allMods],
			$difficultyMods,
			$disasterEffects.map((ele) => ele.effects)
		)
);
