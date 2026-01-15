<script lang="ts">
	import type { Language } from '$lib/types';
	import StageNavButton from './StageNavButton.svelte';
	import combat_ops from '$lib/images/is/sarkaz/node_battle.webp';
	import boss from '$lib/images/is/sarkaz/boss_2.webp';
	import boss_big from '$lib/images/is/sarkaz/boss_icon.webp';
	import encounter from '$lib/images/is/sarkaz/node_inv.webp';
	import translations from '$lib/translations.json';
	import duelIcon from '$lib/images/is/sarkaz/node_duel.webp';
	import shop from '$lib/images/is/sarkaz/node_shop.webp';

	interface Props {
		language: Language;
	}

	let { language }: Props = $props();

	let allNormalStages = [
		['坏邻居', '公害', '安全检查', '夺路而跳','冰川期'],
		['见闻峰会', '拆东补西', '排风口', '炉工志愿队', '有序清场', '卡兹瀑布','丛林密布'],
		['大棋一盘', '血脉之辩', '遮天蔽日', '劳作的清晨', '溃乱魔典', '盲盒商场', '火力小队','机动队'],
		[
			'年代断层',
			'朽败考察',
			'飞越大水坑',
			'猩红甬道',
			'现代战争法则',
			'假想对冲',
			'幽灵城',
			'神出鬼没',
			'混沌',
			'争议频发'
		],
		[
			'寄人城池下',
			'计划耕种',
			'巫咒同盟',
			'通道封锁',
			'无罪净土',
			'浮空城接舷战',
			'残损学院',
			'建制',
			'莱茵卫士'
		]
	];

	let floor6n_1 = ['谋求共识', '神圣的渴求'];
	let floor6n_2 = ['洞天福地', '“外道”'];
	let floor3t = ['守望的河水', '卫士不语功', '存亡之战'];
	let floor3b = ['或然面纱', '奉献', '斩首'];
	let floor3c = ['离歌的庭院', '赴敌者', '王冠之下'];
	let floor4b = ['时光凯旋'];
	let floor5b = ['紧急授课', '朝谒'];
	let floor5bd = ['思维矫正', '魂灵朝谒'];
	let floor6b = ['圣城', '授法'];
	let floor67 = ['不容拒绝']
	let floorUnknown = ['「」']
	let du = ['失败的试胆', '信号灯', '劫虚济实', '鸭速公路'];
	let sp = ['战场侧面', '继承', '玩具的报复'];
	let sp2 = ['物权纠纷', '叙事要约'];
	let duel = ['以血还血', '善恶同道', '石心双子', '轻舟共渡'];
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
								<StageNavButton {stageName} {language} />
							</td>
						{/each}
					{:else if rowSpan === 2}
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
				{#if rowSpan === 3}
					{@const midRowStages = stages.slice(4, 7)}
					{@const btmRowStages = stages.slice(7)}
					<tr>
						{#each midRowStages as stageName}
							<td colspan={Math.floor(24 / midRowStages.length)}>
								<StageNavButton {stageName} {language} />
							</td>
						{/each}
					</tr>
					<tr>
						{#each btmRowStages as stageName}
							<td colspan={Math.floor(24 / btmRowStages.length)}>
								<StageNavButton {stageName} {language} />
							</td>
						{/each}
					</tr>
				{:else if rowSpan === 2}
					{@const btmRowStages = stages.slice(4)}
					<tr>
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
					</tr>
				{/if}
			{/each}
			<tr>
				<td colspan="2" rowspan="2">
					{6}
				</td>
				{#each floor6n_1 as stageName}
					<td colspan={Math.floor(24 / floor6n_1.length)}>
						<StageNavButton {stageName} {language} />
					</td>
				{/each}
			</tr>
			<tr>
				{#each floor6n_2 as stageName}
					<td colspan={Math.floor(24 / floor6n_2.length)}>
						<StageNavButton {stageName} {language} />
					</td>
				{/each}
			</tr>
			<!-- boss -->
			<tr>
				<th colspan="2" class="empty"></th>
				<th colspan="24">
					<div class="flex justify-center items-center">
						<img
							src={boss}
							alt={translations[language].boss_ops}
							width="160px"
							loading="lazy"
							decoding="async"
						/>
					</div>
				</th>
			</tr>
			<tr>
				<td colspan="2" rowspan="3">
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
				{#each floor3c as stageName}
					<td colspan={Math.floor(24 / floor3c.length)}>
						<StageNavButton {stageName} {language} />
					</td>
				{/each}
			</tr>
			<tr>
				<th colspan="2" rowspan="2" class="empty">?</th>
				{#each floor4b as stageName}
					<td colspan={Math.floor(24 / floor4b.length)}>
						<StageNavButton {stageName} {language} />
					</td>
				{/each}
			</tr>
			<tr>
				{#each floorUnknown as stageName}
					<td colspan={Math.floor(24 / floorUnknown.length)}>
						<StageNavButton {stageName} {language} />
					</td>
				{/each}
			</tr>
			<tr>
				<th colspan="2" class="empty"></th>
				<th colspan="24">
					<div class="flex justify-center items-center">
						<img
							src={boss_big}
							alt={translations[language].boss_ops}
							width="160px"
							loading="lazy"
							decoding="async"
						/>
					</div>
				</th>
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
				{#each floor5bd as stageName}
					<td colspan={Math.floor(24 / floor5b.length)}>
						<StageNavButton {stageName} {language} />
					</td>
				{/each}
			</tr>
			<tr>
				<td colspan="2" rowspan="1">
					{6}
				</td>
				{#each floor6b as stageName}
					<td colspan={Math.floor(24 / floor6b.length)}>
						<StageNavButton {stageName} {language} />
					</td>
				{/each}
			</tr>
			<tr>
				<td colspan="2" rowspan="1">
					{"6/7"}
				</td>
				{#each floor67 as stageName}
					<td colspan={Math.floor(24 / floor67.length)}>
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
							alt={translations[language].encounter}
							width="120px"
							loading="lazy"
							decoding="async"
						/>
					</div>
				</th>
			</tr>
			<tr>
				<td colspan="2" rowspan="6"> ? </td>
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
			<tr>
				{#each sp2 as stageName}
					<td colspan={Math.floor(24 / sp2.length)}>
						<StageNavButton {stageName} {language} />
					</td>
				{/each}
			</tr>
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
			<tr>
				{#each duel as stageName}
					<td colspan={Math.floor(24 / duel.length)}>
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
