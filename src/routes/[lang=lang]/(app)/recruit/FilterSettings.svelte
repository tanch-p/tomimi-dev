<script lang="ts">
	import type { Language } from "$lib/types/types";
	import translations from "$lib/translations.json";
	import { filterMode } from "./shared.svelte";
	import { setLocalStorage } from "$lib/functions/lib";

	interface Props {
		language: Language;
	}

	let { language }: Props = $props();

	const updateFilterMode = (val) => {
		filterMode.value = val;
		setLocalStorage("filterMode", val);
	};
</script>

<div class="bg-near-white rounded-md p-3 md:p-4 text-almost-black">
	<h2 class="border-b border-[#e5e7eb] text-center pb-1 md:pb-2">
		{translations[language].settings}
	</h2>
	<div
		class="flex flex-col md:grid grid-cols-[100px_1fr] gap-2 md:gap-y-3 pt-3"
	>
		<p class="md:py-1.25">{translations[language].filter_mode}</p>
		<div class="flex flex-wrap gap-2">
			{#each ["OR", "AND", "AND_STRICT"] as value}
				<button
					class="filter-btn"
					class:active={filterMode.value === value}
					onclick={() => updateFilterMode(value)}
				>
					{value}
				</button>
			{/each}
		</div>
	</div>
	<div class="mt-4 max-w-125">
		{#if filterMode.value === "OR"}
			<p class="text-lg">OR - {translations[language].general_search}</p>
			<p>
				{#if language === "en"}
					Queries by whether operator's talent/module/skill is able to fulfill <span
						class="text-red-600">ANY</span
					> of the options selected.
				{:else if language === "zh"}
					查询干员的天赋/模组/技能是否能满足所选的<span class="text-red-600"
						>任何</span
					>选项。
				{:else}
					オペレーターの素質/モジュール/スキルが、選択されたオプションの<span
						class="text-red-600">いずれか</span
					>を満たすことができるかどうかを照会します。{/if}
			</p>
		{:else if filterMode.value === "AND"}
			<p class="text-lg">AND - {translations[language].specific_search}</p>
			<p class="">
				{#if language === "en"}
					Queries by whether operator's talent/module + <span
						class="text-[#508407]">ALL skills</span
					>
					is able to fulfill <span class="text-red-600">ALL</span> of the options
					(Excluding Basic Options) selected.
				{:else if language === "zh"}
					查询干员的天赋/模组和<span class="text-[#508407]">全部技能</span
					>加起来是否能满足所选的<span class="text-red-600">所有</span>选项。
				{:else}
					オペレーターの素質/モジュールと<span class="text-[#508407]"
						>全スキル</span
					>の組み合わせが選択された<span class="text-red-600">すべて</span
					>のオプションを満たすことができるかどうかを照会します。
				{/if}
			</p>
		{:else}
			<p class="text-lg">
				AND (STRICT) - {translations[language].specific_search_strict}
			</p>
			<p class="">
				{#if language === "en"}
					Queries by whether operator is able to fulfill <span
						class="text-red-600">ALL</span
					>
					of the options (Excluding Basic Options) selected. If
					<span class="text-blue-600">Movespeed Debuff</span>/<span
						class="text-yellow-600">Stun</span
					>
					options are selected, will return operators whose talent/module +
					<span class="text-[#508407]">1 skill</span>
					combined can both lower enemies' Movespeed and stun enemies.<br /> Eg.
					Mostima, Mudrock
					<br />
					<br />
					This mode will filter through skills separately (As you can only equip 1
					skill in battle). Example: If you have selected Block Count 5 and Push/Pull
					Options, Gavial the Invincible, whose S3 increases her Block Count to 5
					and S2 allows her to pull enemy units, is unable to fulfill both options
					at the same time.
				{:else if language === "zh"}
					查询干员是否能满足所选的<span class="text-red-600">所有</span
					>选项。如果选择了<span class="text-blue-600">降低移动速度</span>/<span
						class="text-yellow-600">晕眩</span
					>选项，则将返回天赋/模组+<span class="text-[#508407]">一个技能</span
					>结合后既能降低敌人移动速度又能使敌人晕眩的干员。
					<br />例：莫斯提马，泥岩
					<br />
					<br
					/>注：筛选会把技能分开起来计算（因为作战时只能带一个技能）。像Logos一样才华横溢的干员，在这个模式下如果选择了<span
						class="text-blue-800">斩杀</span
					>和<span class="text-blue-800">降低敌人弹速</span>，因为<span
						class="text-blue-800">斩杀</span
					>来自一技能，而<span class="text-blue-800">降低敌人弹速</span
					>来自三技能，不能同时满足全部选项。
				{:else}
					選択された<span class="text-red-600">すべて</span
					>のオプションを満たすことができるかどうかを照会します。
					<span class="text-blue-600">移動速度低下</span>/<span
						class="text-yellow-600">スタン</span
					>のオプションが選択されている場合、オペレーターの素質/モジュールと<span
						class="text-[#508407]">スキル1個</span
					>の組み合わせで照合し、移動速度低下とスタンの両方が可能なオペレーターを返します。<br
					/>
					例：モスティマ、マドロック
					<br />
					<br />
					この検索モードでは、スキルを個別に扱っている（バトルでは1つのスキルしか装備できないため）。例：
					ブロック数5と引き寄せ・突き飛ばしのオプションを選択した場合、S3でブロック数を5にし、S2で敵ユニットを引き寄せる百錬ガヴィルは、同時に両方のオプションを満たすことができない。
				{/if}
			</p>
		{/if}
	</div>
</div>
