<script lang="ts">
	import type { Language } from '$lib/types';
	import translations from '$lib/translations.json';
	import TogglePanel from '$lib/components/TogglePanel.svelte';
	import fragments from '$lib/data/is/sarkaz/fragments.json';
	import rogue_4_fragment_F_03 from '$lib/images/is/sarkaz/rogue_4_fragment_F_03.webp';
	import rogue_4_fragment_F_05 from '$lib/images/is/sarkaz/rogue_4_fragment_F_05.webp';
	import rogue_4_fragment_F_22 from '$lib/images/is/sarkaz/rogue_4_fragment_F_22.webp';
	import rogue_4_fragment_F_02 from '$lib/images/is/sarkaz/rogue_4_fragment_F_02.webp';
	import rogue_4_fragment_F_14 from '$lib/images/is/sarkaz/rogue_4_fragment_F_14.webp';
	import rogue_4_fragment_F_13 from '$lib/images/is/sarkaz/rogue_4_fragment_F_13.webp';
	import rogue_4_fragment_F_11 from '$lib/images/is/sarkaz/rogue_4_fragment_F_11.webp';
	import rogue_4_fragment_F_16 from '$lib/images/is/sarkaz/rogue_4_fragment_F_16.webp';
	import rogue_4_fragment_F_18 from '$lib/images/is/sarkaz/rogue_4_fragment_F_18.webp';
	import rogue_4_fragment_F_01 from '$lib/images/is/sarkaz/rogue_4_fragment_F_01.webp';
	import rogue_4_fragment_F_04 from '$lib/images/is/sarkaz/rogue_4_fragment_F_04.webp';
	import rogue_4_fragment_F_06 from '$lib/images/is/sarkaz/rogue_4_fragment_F_06.webp';
	import rogue_4_fragment_F_07 from '$lib/images/is/sarkaz/rogue_4_fragment_F_07.webp';
	import rogue_4_fragment_F_08 from '$lib/images/is/sarkaz/rogue_4_fragment_F_08.webp';
	import rogue_4_fragment_F_09 from '$lib/images/is/sarkaz/rogue_4_fragment_F_09.webp';
	import rogue_4_fragment_F_10 from '$lib/images/is/sarkaz/rogue_4_fragment_F_10.webp';
	import rogue_4_fragment_F_12 from '$lib/images/is/sarkaz/rogue_4_fragment_F_12.webp';
	import rogue_4_fragment_F_15 from '$lib/images/is/sarkaz/rogue_4_fragment_F_15.webp';
	import rogue_4_fragment_F_17 from '$lib/images/is/sarkaz/rogue_4_fragment_F_17.webp';
	import rogue_4_fragment_F_19 from '$lib/images/is/sarkaz/rogue_4_fragment_F_19.webp';
	import rogue_4_fragment_F_20 from '$lib/images/is/sarkaz/rogue_4_fragment_F_20.webp';
	import rogue_4_fragment_F_21 from '$lib/images/is/sarkaz/rogue_4_fragment_F_21.webp';
	import rogue_4_fragment_F_23 from '$lib/images/is/sarkaz/rogue_4_fragment_F_23.webp';
	import rogue_4_fragment_F_24 from '$lib/images/is/sarkaz/rogue_4_fragment_F_24.webp';
	import rogue_4_fragment_F_27 from '$lib/images/is/sarkaz/rogue_4_fragment_F_27.webp';
	import rogue_4_fragment_F_28 from '$lib/images/is/sarkaz/rogue_4_fragment_F_28.webp';
	import TextParser from '$lib/components/TextParser.svelte';

	const lookup = {
		rogue_4_fragment_F_03: rogue_4_fragment_F_03,
		rogue_4_fragment_F_05: rogue_4_fragment_F_05,
		rogue_4_fragment_F_22: rogue_4_fragment_F_22,
		rogue_4_fragment_F_02: rogue_4_fragment_F_02,
		rogue_4_fragment_F_14: rogue_4_fragment_F_14,
		rogue_4_fragment_F_13: rogue_4_fragment_F_13,
		rogue_4_fragment_F_11: rogue_4_fragment_F_11,
		rogue_4_fragment_F_16: rogue_4_fragment_F_16,
		rogue_4_fragment_F_18: rogue_4_fragment_F_18,
		rogue_4_fragment_F_01: rogue_4_fragment_F_01,
		rogue_4_fragment_F_04: rogue_4_fragment_F_04,
		rogue_4_fragment_F_06: rogue_4_fragment_F_06,
		rogue_4_fragment_F_07: rogue_4_fragment_F_07,
		rogue_4_fragment_F_08: rogue_4_fragment_F_08,
		rogue_4_fragment_F_09: rogue_4_fragment_F_09,
		rogue_4_fragment_F_10: rogue_4_fragment_F_10,
		rogue_4_fragment_F_12: rogue_4_fragment_F_12,
		rogue_4_fragment_F_15: rogue_4_fragment_F_15,
		rogue_4_fragment_F_17: rogue_4_fragment_F_17,
		rogue_4_fragment_F_19: rogue_4_fragment_F_19,
		rogue_4_fragment_F_20: rogue_4_fragment_F_20,
		rogue_4_fragment_F_21: rogue_4_fragment_F_21,
		rogue_4_fragment_F_27: rogue_4_fragment_F_27,
		rogue_4_fragment_F_28: rogue_4_fragment_F_28,
		rogue_4_fragment_F_23:rogue_4_fragment_F_23,
		rogue_4_fragment_F_24:rogue_4_fragment_F_24
	};

	interface Props {
		language: Language;
	}

	let { language }: Props = $props();
</script>

<TogglePanel title={translations[language].skz_fragment_combine_list} isOpen={false}>
	{#each fragments as fragment}
		{#if fragment.fragments}
			{@const fragment1 = fragments.find((ele) => ele.id === fragment.fragments[0])}
			{@const fragment2 = fragments.find((ele) => ele.id === fragment.fragments[1])}
			<div class="p-3 mb-1.5">
				<div class="flex items-center gap-4 text-center">
					<div class="flex">
						<div class="flex flex-col gap-y-0.5 shrink-0">
							<img
								src={lookup[fragment.iconId]}
								alt={fragment[`name_${language}`] || fragment['name_zh']}
								width="100"
								height="100"
							/>
							{fragment[`name_${language}`] || fragment['name_zh']}
						</div>
					</div>
					<span class="text-5xl ml-2">=</span>
					<div class="flex flex-col gap-y-0.5">
						<img
							src={lookup[fragment1.iconId]}
							alt={fragment1[`name_${language}`] || fragment1['name_zh']}
							width="75"
							height="75"
						/>
						{fragment1[`name_${language}`] || fragment1['name_zh']}
					</div>
					<span class="text-5xl">+</span>
					<div class="flex flex-col gap-y-0.5">
						<img
							src={lookup[fragment2.iconId]}
							alt={fragment2[`name_${language}`] || fragment2['name_zh']}
							width="75"
							height="75"
						/>
						{fragment2[`name_${language}`] || fragment2['name_zh']}
					</div>
				</div>
				<TextParser
					className="pl-3 mt-1.5"
					line={fragment[`tooltip_${language}`] || fragment['tooltip_zh']}
				/>
			</div>
		{/if}
	{/each}
</TogglePanel>
