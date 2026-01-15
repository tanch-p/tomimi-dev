<script lang="ts">
	import type { Enemy, Language } from '$lib/types';
	import translations from '$lib/translations.json';
	import hpIcon from '$lib/images/is/icon_sort_hp.webp';
	import atkIcon from '$lib/images/is/icon_sort_atk.webp';
	import defIcon from '$lib/images/is/icon_sort_def.webp';
	import resIcon from '$lib/images/is/icon_sort_res_def.webp';
	import aspdIcon from '$lib/images/is/aspd.webp';
	import msIcon from '$lib/images/is/movespeed.webp';
	import eleDmgResIcon from '$lib/images/is/ele_dmg_res.webp';
	import eleResIcon from '$lib/images/is/ele_res.webp';
	import Tooltip from './Tooltip.svelte';

	interface Props {
		enemy: Enemy;
		language: Language;
		formIndex: number;
		mode?: string;
	}

	let {
		enemy,
		language,
		formIndex,
		mode = 'mobile'
	}: Props = $props();

	const statKeyIcons = {
		hp: hpIcon,
		atk: atkIcon,
		def: defIcon,
		res: resIcon,
		ms: msIcon,
		aspd: aspdIcon,
		epDamageResistance: eleDmgResIcon,
		epResistance: eleResIcon
	};

	const statKeys =
		mode === 'mobile'
			? ['hp', 'ms', 'atk', 'aspd', 'def', 'epResistance', 'res', 'epDamageResistance']
			: ['hp', 'atk', 'aspd', 'epResistance', 'ms', 'def', 'res', 'epDamageResistance'];
</script>

<div>
	<div
		class="grid gap-2 text-sm {mode === 'mobile' ? 'grid-cols-2 w-full ' : 'grid-cols-4 w-max'} "
	>
		{#each statKeys as statKey}
			<div
				class={`flex flex-col bg-[#161616] bg-opacity-80 px-1 ${
					language === 'en' ? '' : 'whitespace-nowrap'
				}`}
			>
				<div class="grid grid-cols-[14px_1fr] items-center gap-x-1">
					<img src={statKeyIcons[statKey]} width="14px" height="14px" alt="" class="" />
					<span
						class="text-[#858585] font-semibold {language === 'en' &&
						['aspd', 'epDamageResistance'].includes(statKey)
							? 'text-xs leading-[20px]'
							: ''}"
					>
						{translations[language].table_headers[statKey]}
					</span>
				</div>
				<p data-id="{statKey}-value" class="text-near-white px-[18px]">
					{enemy.forms[formIndex].stats[statKey] ?? '0'}
				</p>
			</div>
		{/each}
	</div>
	<p class="text-[#858585] font-semibold mt-1.5 text-sm">
		{translations[language].table_headers.range}:
		<span data-id="range-value" class="text-near-white">
			{enemy.forms[formIndex].stats.range <= 0 ? '0' : enemy.forms[formIndex].stats.range}
		</span>
	</p>
	{#if enemy.forms[formIndex].stats.dmgRes}
		<div class="group relative text-[#858585] font-semibold mt-1.5 text-sm">
			{translations[language].table_headers.e_hp}: &#9432;
			<Tooltip text={translations[language].tooltip_ehp} position="top" />
			<span data-id="range-value" class="text-near-white">
				{Math.round(enemy.forms[formIndex].stats.hp / (1 - enemy.forms[formIndex].stats.dmgRes))}
			</span>
		</div>
	{/if}
</div>
