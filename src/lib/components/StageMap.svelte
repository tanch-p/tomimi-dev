<script lang="ts">
	import type { Language, RogueTopic } from '$lib/types';
	import translations from '$lib/translations.json';
	import SpEnemy from '$lib/components/SpEnemy.svelte';
	import skz_calamity from '$lib/images/is/sarkaz/skz_calamity.webp';
	import unknown from '$lib/images/is/skz_unknown.webp';
	import { getStageImg } from '$lib/functions/lib';
	export let mapConfig, rogueTopic: RogueTopic, language: Language, eliteMode;

	let index = 0;

	const stagesWithMultipleImgs = ['level_rogue4_4-1'];
	const stagesWithRNG = [
		'level_rogue4_1-3',
		'level_rogue4_2-1',
		'level_rogue4_2-3',
		'level_rogue4_2-4',
		'level_rogue4_2-5',
		'level_rogue4_2-7',
		'level_rogue4_3-3',
		'level_rogue4_3-4',
		'level_rogue4_3-6',
		'level_rogue4_4-3',
		'level_rogue4_4-6',
		'level_rogue4_5-4',
		'level_rogue4_t-1'
	];
	const stagesWithoutCalamity = ['level_rogue4_b-8', 'level_rogue4_b-9'];
	const multipleImgLookup = {
		'level_rogue4_4-1': [
			{ key: 'a', img: '/images/stages/level_ro4_n_4_1_a.webp' },
			{ key: 'b', img: '/images/stages/level_ro4_n_4_1_b.webp' }
		]
	};
</script>

<div class="sm:px-6">
	<p class="px-2 sm:px-0 text-subheading mt-4">{translations[language].map}</p>
	<hr class="border-gray-500 mt-1" />
	<div class="max-w-[600px] w-full mx-auto px-3 sm:px-0 mt-3">
		{#if stagesWithMultipleImgs.includes(mapConfig?.levelId)}
			<div
				class="grid grid-flow-col auto-cols-fr font-bold text-lg text-near-white text-center select-none divide-x divide-gray-500 py-1"
			>
				{#each multipleImgLookup[mapConfig?.levelId] as { key }, i}
					<button class={index === i ? '' : 'text-gray-400'} on:click={() => (index = i)}
						>{key}</button
					>
				{/each}
			</div>
			<img
				src={multipleImgLookup[mapConfig?.levelId][index].img}
				width="600"
				height="338px"
				alt={mapConfig?.levelId + '_' + multipleImgLookup[mapConfig?.levelId][index].key}
				loading="lazy"
			/>
		{:else}
			<img
				src="/images/stages/level_{getStageImg(mapConfig?.id, eliteMode)}.webp"
				width="600"
				height="338px"
				alt={mapConfig?.levelId}
				loading="lazy"
			/>
		{/if}

		{#if rogueTopic === 'rogue_skz' && !stagesWithoutCalamity.includes(mapConfig?.levelId)}
			<div class="flex flex-wrap gap-x-4 gap-y-1.5 mt-1.5">
				<div class="flex">
					<img src={skz_calamity} width="24px" height="24px" alt="calamity" />
					<p>{translations[language].skz_calamity}</p>
				</div>
				{#if stagesWithRNG.includes(mapConfig?.levelId)}
					<div class="flex">
						<div class="rounded-full bg-[#f14c4c]">
							<img src={unknown} width="24px" height="24px" alt="?" />
						</div>
						<p class="ml-1">{translations[language].stageinfo_random}</p>
					</div>
				{/if}
			</div>
		{/if}
	</div>
	<div class="w-screen sm:w-full">
		{#if mapConfig?.sp_enemy}
			<SpEnemy spEnemyInfo={mapConfig?.sp_enemy} {language} />
		{/if}
	</div>
</div>
