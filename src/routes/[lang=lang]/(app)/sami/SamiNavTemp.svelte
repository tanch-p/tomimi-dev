<script lang="ts">
	import type { Language } from '$lib/types';
	import StageNavButton from './StageNavButton.svelte';
	import combat_ops from '$lib/images/is/sami/sami_combat_ops.webp';
	import boss from '$lib/images/is/sami/sami_boss.webp';
	import encounter from '$lib/images/is/sami/sami_encounter.webp';
	import translations from '$lib/translations.json';

	interface Props {
		language: Language;
	}

	let { language }: Props = $props();

	let allNormalStages = [
		['死囚之夜', '度假村冤魂', '苔手', '待宰的兽群','事不过四'],
		['没有尽头的路', '低空机动', '幽影与鬼魅', '违和', '虫虫别回头','还之彼身'],
		['弄假成真', '饥渴祭坛', '狡兽九窟', '冰海疑影', '咫尺天涯', '思维折断','恃强凌弱'],
		['公司纠葛', '应用测试', '坍缩体的午后', '大迁徙', '以守代攻', '杂音干扰', '禁区','冰凝之所'],
		['乐理之灾', '生人勿近', '混乱的表象', '求敌得敌', '亡者行军', '何处无山海', '本能污染','人造物狂欢节'],
		['霜与沙', '生灵的终点']
	];

	let floor3t = ['利刃所指', '新部族', '自然之怒'];
	let floor3b = ['呼吸', '夺树者', '大地醒转'];
	let floor5b = ['巍峨银凇', '萨米之熵'];
	let floor5b2 = ['深寒造像', '虚无之偶'];
	let floor6b = ['园丁','时光之沙'];
	let floor6b2 = ['哨兵','迈入永恒'];
	let du = ['半吊子之旅', '无中生钱', '豪华车队', '“正义使者”'];
	let sp = ['天途半道', '夙愿将偿', '惩罚', '英雄无名'];
	let sp2 = ['腹背受敌', '长期试用', '自然条款'];
	let sp3 = ['黄沙幻境','亘古仇敌'];
	//max per row = 4
</script>

<div class="max-w-6xl mx-auto">
	<table class="text-xs sm:text-base">
		<tbody>
			<tr>
				<th colspan="2" class="empty"></th>
				<th colspan="24">
					<div class="flex justify-center items-center">
						<img
							src={combat_ops}
							alt={translations[language].combat_ops}
							width="100px"
							loading="lazy"
							decoding="async"
						/>
					</div>
				</th>
			</tr>
			{#each allNormalStages as stages, i}
				{@const rowSpan = stages.length <= 4 ? 1 : 2}
				<tr>
					<td colspan="2" rowspan={rowSpan}>
						{i + 1}
					</td>
					{#if rowSpan === 2}
						{@const topRowStages = stages.slice(0, 4)}
						{#each topRowStages as stageName}
							<td colspan={Math.floor(24 / topRowStages.length)}>
								<StageNavButton {stageName} {language} />
							</td>
						{/each}
					{:else}
						{#each stages as stageName}
							<td colspan={Math.floor(24 / stages.length)}>
								<StageNavButton {stageName} {language} />
							</td>
						{/each}
					{/if}
				</tr>
				{#if rowSpan === 2}
					{@const btmRowStages = stages.slice(4)}
					{#if btmRowStages.length >= 3}
						{#each btmRowStages as stageName}
							<td colspan={Math.floor(24 / btmRowStages.length)}>
								<StageNavButton {stageName} {language} />
							</td>
						{/each}
					{:else}
						{#each btmRowStages as stageName}
							<td colspan={Math.floor(24 / btmRowStages.length)}>
								<StageNavButton {stageName} {language} />
							</td>
						{/each}
					{/if}
				{/if}
			{/each}

			<!-- boss -->
			<tr>
				<th colspan="2" class="empty"></th>
				<th colspan="24">
					<div class="flex justify-center items-center">
						<img
							src={boss}
							alt={translations[language].boss}
							width="160px"
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
						<StageNavButton {stageName} {language} />
					</td>
				{/each}
			</tr>
			<tr>
				{#each floor3b as stageName}
					<td colspan={Math.floor(24 / floor3b.length)}>
						<StageNavButton {stageName} {language} />
					</td>
				{/each}
			</tr>
			<tr>
				<td colspan="2" rowspan="2">
					{5}
				</td>
				{#each floor5b as stageName}
					<td colspan={Math.floor(24 / floor5b.length)}>
						<StageNavButton {stageName} {language} />
					</td>
				{/each}
			</tr>
			<tr>
				{#each floor5b2 as stageName}
					<td colspan={Math.floor(24 / floor5b.length)}>
						<StageNavButton {stageName} {language} />
					</td>
				{/each}
			</tr>
			<tr>
				<td colspan="2"  rowspan="2">
					{6}
				</td>
				{#each floor6b as stageName}
					<td colspan={Math.floor(24 / floor6b.length)}>
						<StageNavButton {stageName} {language} />
					</td>
				{/each}
			</tr>
			<tr>
				{#each floor6b2 as stageName}
					<td colspan={Math.floor(24 / floor6b.length)}>
						<StageNavButton {stageName} {language} />
					</td>
				{/each}
			</tr>

			<!-- encounter -->

			<tr>
				<th colspan="2" class="empty"></th>
				<th colspan="24">
					<div class="flex justify-center items-center">
						<img
							src={encounter}
							alt={translations[language].boss}
							width="100px"
							loading="lazy"
							decoding="async"
						/>
					</div>
				</th>
			</tr>
			<tr>
				<td colspan="2" rowspan="4"> ? </td>
				{#each du as stageName}
					<td colspan={Math.floor(24 / du.length)}>
						<StageNavButton {stageName} {language} />
					</td>
				{/each}
			</tr>
			<tr>
				{#each sp as stageName}
					<td colspan={Math.floor(24 / sp.length)}>
						<StageNavButton {stageName} {language} />
					</td>
				{/each}
			</tr>
			<tr>
				{#each sp2 as stageName}
					<td colspan={Math.floor(24 / sp2.length)}>
						<StageNavButton {stageName} {language} />
					</td>
				{/each}
			</tr>
			<tr>
				{#each sp3 as stageName}
					<td colspan={Math.floor(24 / sp3.length)}>
						<StageNavButton {stageName} {language} />
					</td>
				{/each}
			</tr>
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
