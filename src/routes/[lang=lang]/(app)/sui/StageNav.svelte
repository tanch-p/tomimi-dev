<script lang="ts">
	import type { Language } from '$lib/types';
	import StageNavButton from './StageNavButton.svelte';
	import combat_ops from '$lib/images/is/sui/node_battle.webp';
	import boss from '$lib/images/is/sui/boss_focus.webp';
	import encounter from '$lib/images/is/sui/node_inv.webp';
	import translations from '$lib/translations.json';
	import duelIcon from '$lib/images/is/sui/node_duel.webp';
	import shop from '$lib/images/is/sui/node_shop.webp';
	import candleIcon from '$lib/images/is/sui/node_stashed_recruit.webp';
	import portal from '$lib/images/is/sui/node_spZone.webp';
	import StageNavRow from '$lib/components/StageNavRow.svelte';
	import dlc1Portal from '$lib/images/is/sui/node_spZone_1.webp';

	export let language: Language;

	let allNormalStages = [
		[
			'level_rogue5_1-1',
			'level_rogue5_1-2',
			'level_rogue5_1-3',
			'level_rogue5_1-4',
			'level_rogue5_1-5',
			'level_rogue5_1-6'
		],
		[
			'level_rogue5_2-1',
			'level_rogue5_2-2',
			'level_rogue5_2-3',
			'level_rogue5_2-4',
			'level_rogue5_2-5',
			'level_rogue5_2-6'
		],
		[
			'level_rogue5_3-1',
			'level_rogue5_3-2',
			'level_rogue5_3-3',
			'level_rogue5_3-4',
			'level_rogue5_3-5',
			'level_rogue5_3-6'
		],
		[
			'level_rogue5_4-1',
			'level_rogue5_4-2',
			'level_rogue5_4-3',
			'level_rogue5_4-4',
			'level_rogue5_4-5',
			'level_rogue5_4-6',
			'level_rogue5_4-7'
		],
		[
			'level_rogue5_5-1',
			'level_rogue5_5-2',
			'level_rogue5_5-3',
			'level_rogue5_5-4',
			'level_rogue5_5-5',
			'level_rogue5_5-6',
			'level_rogue5_5-7'
		]
	];

	let floor6n_1 = ['level_rogue5_6-1', 'level_rogue5_6-2'];
	let floor6n_2 = ['level_rogue5_7-1', 'level_rogue5_7-2'];
	let floor3t = ['level_rogue5_b-1', 'level_rogue5_b-2', 'level_rogue5_b-3'];
	let floor3b = ['level_rogue5_b-1-b', 'level_rogue5_b-2-b', 'level_rogue5_b-3-b'];
	let floor5b = ['level_rogue5_b-4', 'level_rogue5_b-5'];
	let floor5bAlt = ['level_rogue5_b-4-b', 'level_rogue5_b-5-b'];
	let floor6b = ['level_rogue5_b-6', 'level_rogue5_b-7'];
		let floor7b = ['level_rogue5_b-9-a', 'level_rogue5_b-10'];
	let du = ['level_rogue5_t-1', 'level_rogue5_t-2', 'level_rogue5_t-3', 'level_rogue5_t-4'];
	let encount1 = ['level_rogue5_t-5', 'level_rogue5_t-6', 'level_rogue5_t-7', 'level_rogue5_t-8'];
	let encount2 = [
		'level_rogue5_t-9-a',
		'level_rogue5_t-9-b',
		'level_rogue5_t-9-c',
		'level_rogue5_t-10'
	];
	let shopStages = ['level_rogue5_ev-1', 'level_rogue5_ev-2'];

	let duel = ['level_rogue5_d-1', 'level_rogue5_d-2'];
	let duel_dlc1 = ['level_rogue5_d-3', 'level_rogue5_d-4'];
	let candleRow1 = ['level_rogue5_fs-1', 'level_rogue5_fs-2', 'level_rogue5_fs-3'];
	let candleRow1Alt = ['level_rogue5_fs-1b', 'level_rogue5_fs-2b', 'level_rogue5_fs-3b'];
	let candleRow2 = ['level_rogue5_fs-4', 'level_rogue5_fs-5'];
	let candleRow2Alt = ['level_rogue5_fs-4b', 'level_rogue5_fs-5b'];
	let candleSP = ['level_rogue5_dv-5'];
	let svRow1 = ['level_rogue5_sv-1', 'level_rogue5_sv-3', 'level_rogue5_sv-5', 'level_rogue5_sv-6'];
	let svRow1Alt = [
		'level_rogue5_sv-1-b',
		'level_rogue5_sv-3-b',
		'level_rogue5_sv-5-b',
		'level_rogue5_sv-6-b'
	];
	let svRow2 = ['level_rogue5_sv-7', 'level_rogue5_sv-8', 'level_rogue5_sv-10'];
	let svRow2Alt = ['level_rogue5_sv-7-b', 'level_rogue5_sv-8-b', 'level_rogue5_sv-10-b'];
	let sv2 = ['level_rogue5_sv-2', 'level_rogue5_sv-2-b', 'level_rogue5_sv-2-c'];
	let sv9 = ['level_rogue5_sv-9', 'level_rogue5_sv-9-b', 'level_rogue5_sv-9-c'];
	let sv4 = ['level_rogue5_sv-4'];
	let sv_dlc1 = ['level_rogue5_sv-11', 'level_rogue5_sv-12'];
	let sv_dlc2 = ['level_rogue5_sv-13', 'level_rogue5_sv-14', 'level_rogue5_sv-15'];
	//max per row = 4

	let dlc1_svRow1 = [
		'level_rogue5_sv-1_dlc1',
		'level_rogue5_sv-3_dlc1',
		'level_rogue5_sv-5_dlc1',
		'level_rogue5_sv-6_dlc1'
	];
	let dlc1_svRow1Alt = [
		'level_rogue5_sv-1-b_dlc1',
		'level_rogue5_sv-3-b_dlc1',
		'level_rogue5_sv-5-b_dlc1',
		'level_rogue5_sv-6-b_dlc1'
	];
	let dlc1_svRow2 = ['level_rogue5_sv-7_dlc1', 'level_rogue5_sv-8_dlc1', 'level_rogue5_sv-10_dlc1'];
	let dlc1_svRow2Alt = [
		'level_rogue5_sv-7-b_dlc1',
		'level_rogue5_sv-8-b_dlc1',
		'level_rogue5_sv-10-b_dlc1'
	];
	let dlc1_svRow3 = ['level_rogue5_sv-9_dlc1', 'level_rogue5_sv-4_dlc1'];
</script>

<div class="max-w-6xl mx-auto">
	<table class="text-xs sm:text-base">
		<tbody>
			<tr>
				<th colspan="2" class="empty" />
				<th colspan="24">
					<div class="flex justify-center items-center">
						<img
							src={combat_ops}
							alt={translations[language].combat_ops}
							width="120px"
							loading="lazy"
							decoding="async"
						/>
					</div>
				</th>
			</tr>
			{#each allNormalStages as stages, i}
				{@const rowSpan = stages.length > 8 ? 3 : stages.length <= 4 ? 1 : 2}
				<tr>
					<td colspan="2" rowspan={rowSpan}>
						{i + 1}
					</td>
					{#if rowSpan === 3}
						{@const topRowStages = stages.slice(0, 4)}
						{#each topRowStages as stageName}
							<td colspan={Math.floor(24 / topRowStages.length)}>
								<StageNavButton levelId={stageName} {language} />
							</td>
						{/each}
					{:else if rowSpan === 2}
						{@const topRowStages = stages.slice(0, 4)}
						{#each topRowStages as stageName}
							<td colspan={Math.floor(24 / topRowStages.length)}>
								<StageNavButton levelId={stageName} {language} />
							</td>
						{/each}
					{:else}
						{#each stages as stageName}
							<td colspan={Math.floor(24 / stages.length)}>
								<StageNavButton levelId={stageName} {language} />
							</td>
						{/each}
					{/if}
				</tr>
				{#if rowSpan === 3}
					{@const midRowStages = stages.slice(4, 7)}
					{@const btmRowStages = stages.slice(7)}
					<tr>
						{#each midRowStages as stageName}
							<td colspan={Math.floor(24 / midRowStages.length)}>
								<StageNavButton levelId={stageName} {language} />
							</td>
						{/each}
					</tr>
					<tr>
						{#each btmRowStages as stageName}
							<td colspan={Math.floor(24 / btmRowStages.length)}>
								<StageNavButton levelId={stageName} {language} />
							</td>
						{/each}
					</tr>
				{:else if rowSpan === 2}
					{@const btmRowStages = stages.slice(4)}
					<tr>
						{#if btmRowStages.length >= 3}
							{#each btmRowStages as stageName}
								<td colspan={Math.floor(24 / btmRowStages.length)}>
									<StageNavButton levelId={stageName} {language} />
								</td>
							{/each}
						{:else}
							{#each btmRowStages as stageName}
								<td colspan={Math.floor(24 / btmRowStages.length)}>
									<StageNavButton levelId={stageName} {language} />
								</td>
							{/each}
						{/if}
					</tr>
				{/if}
			{/each}
			<tr>
				<td colspan="2" rowspan="2">
					{6}
				</td>
				{#each floor6n_1 as stageName}
					<td colspan={Math.floor(24 / floor6n_1.length)}>
						<StageNavButton levelId={stageName} {language} />
					</td>
				{/each}
			</tr>
			<tr>
				{#each floor6n_2 as stageName}
					<td colspan={Math.floor(24 / floor6n_2.length)}>
						<StageNavButton levelId={stageName} {language} />
					</td>
				{/each}
			</tr>
			<!-- boss -->
			<tr>
				<th colspan="2" class="empty" />
				<th colspan="24">
					<div class="flex justify-center items-center">
						<img
							src={boss}
							alt={translations[language].boss_ops}
							width="120px"
							loading="lazy"
							decoding="async"
						/>
					</div>
				</th>
			</tr>
			<tr>
				<td colspan="2" rowspan="2">
					{3}
				</td>
				{#each floor3t as stageName}
					<td colspan={Math.floor(24 / floor3t.length)}>
						<StageNavButton levelId={stageName} {language} />
					</td>
				{/each}
			</tr>
			<tr>
				{#each floor3b as stageName}
					<td colspan={Math.floor(24 / floor3b.length)}>
						<StageNavButton levelId={stageName} {language} />
					</td>
				{/each}
			</tr>
			<tr>
				<td colspan="2" rowspan="2">
					{5}
				</td>
				{#each floor5b as stageName}
					<td colspan={Math.floor(24 / floor5b.length)}>
						<StageNavButton levelId={stageName} {language} />
					</td>
				{/each}
			</tr>
			<tr>
				{#each floor5bAlt as stageName}
					<td colspan={Math.floor(24 / floor5bAlt.length)}>
						<StageNavButton levelId={stageName} {language} />
					</td>
				{/each}
			</tr>
			<tr>
				<td colspan="2" rowspan="1"> 6 </td>
				{#each floor6b as stageName}
					<td colspan={Math.floor(24 / floor6b.length)}>
						<StageNavButton levelId={stageName} {language} />
					</td>
				{/each}
			</tr>
			<tr>
				<td colspan="2" rowspan="1"> ? </td>
				<td colspan={24}>
					<StageNavButton levelId={'level_rogue5_b-8'} {language} />
				</td>
			</tr>
			<tr>
				<td colspan="2" rowspan="1"> 6/7 </td>
				{#each floor7b as stageName}
					<td colspan={Math.floor(24 / floor7b.length)}>
						<StageNavButton levelId={stageName} {language} />
					</td>
				{/each}
			</tr>

			<!-- encounter -->

			<tr>
				<th colspan="2" class="empty" />
				<th colspan="24">
					<div class="flex justify-center items-center">
						<img
							src={encounter}
							alt={translations[language].encounter}
							width="120px"
							loading="lazy"
							decoding="async"
						/>
					</div>
				</th>
			</tr>
			<tr>
				<td colspan="2" rowspan="24"> ? </td>
				{#each du as stageName}
					<td colspan={Math.floor(24 / du.length)}>
						<StageNavButton levelId={stageName} {language} />
					</td>
				{/each}
			</tr>
			<StageNavRow items={encount1} {language} />
			<StageNavRow items={encount2} {language} />
			<tr>
				<th colspan="24">
					<div class="flex justify-center items-center">
						<img
							src={shop}
							alt={translations[language].shop}
							width="120px"
							loading="lazy"
							decoding="async"
						/>
					</div>
				</th>
			</tr>
			<StageNavRow items={shopStages} {language} />
			<tr>
				<th colspan="24">
					<div class="flex justify-center items-center">
						<img
							src={candleIcon}
							alt={translations[language].sui_candle}
							width="120px"
							loading="lazy"
							decoding="async"
						/>
					</div>
				</th>
			</tr>
			<StageNavRow items={candleRow1} {language} />
			<StageNavRow items={candleRow1Alt} {language} />
			<StageNavRow items={candleRow2} {language} />
			<StageNavRow items={candleRow2Alt} {language} />
			<StageNavRow items={candleSP} {language} />
			<tr>
				<th colspan="24">
					<div class="flex justify-center items-center">
						<img
							src={duelIcon}
							alt={translations[language].duel}
							width="120px"
							loading="lazy"
							decoding="async"
						/>
					</div>
				</th>
			</tr>
			<StageNavRow items={duel} {language} />
			<StageNavRow items={duel_dlc1} {language} />
			<tr>
				<th colspan="24">
					<div class="flex justify-center items-center">
						<img
							src={portal}
							alt={translations[language].sui_portal}
							width="120px"
							loading="lazy"
							decoding="async"
						/>
					</div>
				</th>
			</tr>
			<StageNavRow items={svRow1} {language} />
			<StageNavRow items={svRow1Alt} {language} />
			<StageNavRow items={svRow2} {language} />
			<StageNavRow items={svRow2Alt} {language} />
			<StageNavRow items={sv2} {language} />
			<StageNavRow items={sv9} {language} />
			<StageNavRow items={sv_dlc1} {language} />
			<StageNavRow items={sv_dlc2} {language} />
			<StageNavRow items={sv4} {language} />
			<tr>
				<td colspan="2" rowspan="23"> 6 </td>
				<th colspan="24">
					<div class="flex justify-center items-center">
						<img
							src={dlc1Portal}
							alt={translations[language].sui_portal}
							width="120px"
							loading="lazy"
							decoding="async"
						/>
					</div>
				</th>
			</tr>
			<StageNavRow items={dlc1_svRow1} {language} />
			<StageNavRow items={dlc1_svRow1Alt} {language} />
			<StageNavRow items={dlc1_svRow2} {language} />
			<StageNavRow items={dlc1_svRow2Alt} {language} />
			<StageNavRow items={dlc1_svRow3} {language} />
		</tbody>
	</table>
</div>

<style>
	table {
		color: #f2f2f2;
		text-align: center;
		table-layout: fixed;
		width: 100%;
	}

	th.empty {
		border-width: 1px 0 1px 1px;
	}

	th {
		border-width: 1px 1px 1px 0;
		border-color: gray;
		padding: 6px 0;
	}

	td {
		border-width: 1px;
		border-color: gray;
	}
</style>
