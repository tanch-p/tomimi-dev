<!-- @migration-task Error while migrating Svelte code: `<tr>` cannot be a child of `<table>`. `<table>` only allows these children: `<caption>`, `<colgroup>`, `<tbody>`, `<thead>`, `<tfoot>`, `<style>`, `<script>`, `<template>`. The browser will 'repair' the HTML (by moving, removing, or inserting elements) which breaks Svelte's assumptions about the structure of your components.
https://svelte.dev/e/node_invalid_placement -->
<script lang="ts">
	import type { Language } from '$lib/types';
	import aegir1 from '$lib/images/is/mizuki/aegir_1.webp';
	import aegir2 from '$lib/images/is/mizuki/aegir_2.webp';
	import aegir3 from '$lib/images/is/mizuki/aegir_3.webp';
	import aegir4 from '$lib/images/is/mizuki/aegir_4.webp';
	import aegir5 from '$lib/images/is/mizuki/aegir_5.webp';
	import aegir6 from '$lib/images/is/mizuki/aegir_6.webp';
	import aegirQn from '$lib/images/is/mizuki/aegir_qn.webp';
	import knt from '$lib/images/is/mizuki/knt_100px.webp';
	import bossIcon from '$lib/images/is/boss_icon.webp';

	export let language: Language;
	import StageNavButton from './StageNavButton.svelte';

	let floor1t = ['蓄水池', '虫群横行', '射手部队', '共生'];
	let floor1b = ['互助'];

	let floor2t = ['无声呼号', '海神的信者', '病症'];
	let floor2b = ['回溯', '征兆', '饥渴'];

	let floor3t = ['除暴安良', '原始部落', '精酿杀手', '大君遗脉'];
	let floor3b = ['据险固守', '巢穴', '漩涡', '瞻前顾后'];
	let floor3boss = ['永恒安息', '分离与统一', '纠错'];
	let floor3boss2 = ['永恒愤怒', '异体同心', '订正'];

	let floor4t = ['地下天途', '火之骄子', '领地意识', '海窟沙暴'];
	let floor4b = ['溟痕乐园', '狩猎场', '崇敬深海', '铳与秩序'];

	let floor5t = ['机械之灾', '教徒居所', '失控', '吹笛人的号召'];
	let floor5bb = ['好梦在何方', '育生池', '蔓延', '余烬方阵'];

	let floorEX = ['荒地群猎', '寒灾之咒', '险路勿近'];
	let floor5b = ['认知即重担', '“命运的宠儿”'];

	let floor6 = ['水火相容', '深度认知'];
	let floor6b = ['大群所向', '人之光辉'];

	let du1 = ['犹豫不决', '监工现场', '拳拳到肉', '抱头狗窜'];
	let du2 = ['鸭本运作'];

	let sp1 = ['真相', '狂信如火', '“喜”从箱来'];
	let sp2 = ['竭泽而渔', '图穷匕见'];
</script>

<div class="max-w-4xl mx-auto">
	<table class="text-sm sm:text-base">
		<tr class="floor1">
			<td rowspan="2" class="corner" colspan="4">
				<img src={aegir1} width="30px" alt="1" class="mt-2 sm:mt-3 ml-0.5 sm:ml-2" />
			</td>
			{#each floor1t as stageName}
				<td colspan={Math.floor(60 / floor1t.length)}>
					<StageNavButton {stageName} {language} />
				</td>
			{/each}
			<td rowspan="2" class="corner" colspan="4" />
		</tr>
		<tr class="floor1">
			{#each floor1b as stageName}
				<td colspan={Math.floor(60 / floor1b.length)}>
					<StageNavButton {stageName} {language} />
				</td>
			{/each}
		</tr>
		<tr class="floor2">
			<td rowspan="2" class="corner" colspan="4">
				<img src={aegir2} width="30px" alt="2" class="mt-2 sm:mt-3 ml-0.5 sm:ml-2" />
			</td>
			{#each floor2t as stageName}
				<td colspan={Math.floor(60 / floor2t.length)}>
					<StageNavButton {stageName} {language} />
				</td>
			{/each}
			<td rowspan="2" class="corner" colspan="4" />
		</tr>
		<tr class="floor2">
			{#each floor2b as stageName}
				<td colspan={Math.floor(60 / floor2b.length)}>
					<StageNavButton {stageName} {language} />
				</td>
			{/each}
		</tr>
		<tr class="floor3">
			<td rowspan="2" class="corner" colspan="4">
				<img src={aegir3} width="30px" alt="3" class="mt-2 sm:mt-3 ml-0.5 sm:ml-2" />
			</td>
			{#each floor3t as stageName}
				<td colspan={Math.floor(60 / floor3t.length)}>
					<StageNavButton {stageName} {language} />
				</td>
			{/each}
			<td rowspan="4" class="corner" colspan="4" />
		</tr>
		<tr class="floor3">
			{#each floor3b as stageName}
				<td colspan={Math.floor(60 / floor3b.length)}>
					<StageNavButton {stageName} {language} />
				</td>
			{/each}
		</tr>
		<tr class="floor3">
			<td rowspan="2" class="corner" colspan="4">
				<img src={bossIcon} width="40px" alt="boss" class="mt-2.5 sm:mt-1 ml-0.5 sm:ml-1.5" />
			</td>
			{#each floor3boss as stageName}
				<td colspan={Math.floor(60 / floor3boss.length)}>
					<StageNavButton {stageName} {language} />
				</td>
			{/each}
		</tr>
		<tr class="floor3">
			{#each floor3boss2 as stageName}
				<td colspan={Math.floor(60 / floor3boss2.length)}>
					<StageNavButton {stageName} {language} />
				</td>
			{/each}
		</tr>
		<tr class="floor4">
			<td rowspan="2" class="corner" colspan="4">
				<img src={aegir4} width="30px" alt="4" class="mt-2 sm:mt-3 ml-0.5 sm:ml-2" />
			</td>
			{#each floor4t as stageName}
				<td colspan={Math.floor(60 / floor4t.length)}>
					<StageNavButton {stageName} {language} />
				</td>
			{/each}
			<td rowspan="2" class="corner" colspan="4" />
		</tr>
		<tr class="floor4">
			{#each floor4b as stageName}
				<td colspan={Math.floor(60 / floor4b.length)}>
					<StageNavButton {stageName} {language} />
				</td>
			{/each}
		</tr>
		<tr class="floor5">
			<td rowspan="2" class="corner" colspan="4">
				<img src={aegir5} width="30px" alt="5" class="mt-2 sm:mt-3 ml-0.5 sm:ml-2" />
			</td>
			{#each floor5t as stageName}
				<td colspan={Math.floor(60 / floor5t.length)}>
					<StageNavButton {stageName} {language} />
				</td>
			{/each}
			<td rowspan="3" class="corner" colspan="4" />
		</tr>
		<tr class="floor5">
			{#each floor5bb as stageName}
				<td colspan={Math.floor(60 / floor5bb.length)}>
					<StageNavButton {stageName} {language} />
				</td>
			{/each}
		</tr>
		<tr class="floor5">
			<td rowspan="1" colspan="4">
				<img src={bossIcon} width="40px" alt="boss" class="ml-0.5 sm:ml-1.5" />
			</td>
			{#each floor5b as stageName}
				<td colspan={Math.floor(60 / floor5b.length)}>
					<StageNavButton {stageName} {language} />
				</td>
			{/each}
		</tr>
		<tr class="floor6">
			<td rowspan="1" colspan="4">
				<img src={aegir6} width="30px" alt="6" class="ml-0.5 sm:ml-2" />
			</td>
			{#each floor6 as stageName}
				<td colspan={Math.floor(60 / floor6.length)}>
					<StageNavButton {stageName} {language} />
				</td>
			{/each}
			<td rowspan="2" class="corner" colspan="4" />
		</tr>
		<tr class="floor6">
			<td rowspan="1" colspan="4">
				<img src={bossIcon} width="40px" alt="boss" class="ml-0.5 sm:ml-1.5" />
			</td>
			{#each floor6b as stageName}
				<td colspan={Math.floor(60 / floor6b.length)}>
					<StageNavButton {stageName} {language} />
				</td>
			{/each}
		</tr>
		<tr class="floorEX">
			<td colspan="4">
				<img src={aegirQn} width="30px" alt="?" class="ml-0.5 sm:ml-2 py-1 sm:py-1.5" />
			</td>
			{#each floorEX as stageName}
				<td colspan={Math.floor(60 / floorEX.length)}>
					<StageNavButton {stageName} {language} />
				</td>
			{/each}
			<td class="corner" colspan="4" />
		</tr>
		<tr class="floorSP">
			<td class="corner" colspan="4" />
			{#each du1 as stageName}
				<td colspan={Math.floor(60 / du1.length)}>
					<StageNavButton {stageName} {language} />
				</td>
			{/each}
			<td class="corner" colspan="4" />
		</tr>
		<tr class="floorSP">
			<td class="corner" colspan="4" />
			{#each du2 as stageName}
				<td colspan={Math.floor(60 / du2.length)}>
					<StageNavButton {stageName} {language} />
				</td>
			{/each}
			<td class="corner" colspan="4" />
		</tr>
		<tr class="floorSP">
			<td class="corner" colspan="4" />
			{#each sp1 as stageName}
				<td colspan={Math.floor(60 / sp1.length)}>
					<StageNavButton {stageName} {language} />
				</td>
			{/each}
			<td class="corner" colspan="4" />
		</tr>
		<tr class="floorSP">
			<td class="corner" colspan="4">
				<img src={knt} width="40px" alt="?" class="mt-0.5 ml-0.5 sm:ml-2 py-1 sm:py-1.5" />
			</td>
			{#each sp2 as stageName}
				<td colspan={Math.floor(60 / sp2.length)}>
					<StageNavButton {stageName} {language} />
				</td>
			{/each}
			<td class="corner" colspan="4" />
		</tr>
	</table>
</div>

<style>
	table {
		color: #f2f2f2;
		text-align: center;
		table-layout: fixed;
		width: 100%;
	}

	td.corner {
		vertical-align: top;
	}

	.floor1 {
		background-color: #3572ac;
	}
	.floor2 {
		background-color: #366896;
	}
	.floor3 {
		background-color: #285b7b;
	}
	.floor4 {
		background-color: #1e476d;
	}
	.floor5 {
		background-color: #0f2a51;
	}
	.floor6 {
		background-color: #030d1a;
	}
	.floorEX {
		background-color: #033a3a;
	}
	.floorSP {
		background-color: #404750;
	}
</style>
