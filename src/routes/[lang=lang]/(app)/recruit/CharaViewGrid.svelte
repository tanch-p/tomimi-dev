<script lang="ts">
	import { selectedChara, moduleIndex, sortOptions, secFilters } from './stores';
	import { charaAssets } from '$lib/data/chara/chara_assets';
	import { getPrioritySortValues } from '$lib/functions/chara/charaHelpers';
	let { chara } = $props();

	let equip = $derived(chara.activeModuleIndex && chara.uniequip?.[chara.activeModuleIndex]);

	let values = $derived(getPrioritySortValues(chara, $sortOptions, $secFilters));

	const handleClick = (chara) => {
		selectedChara.set(chara);
		moduleIndex.set(chara.activeModuleIndex);
	};
</script>

<button
	onclick={() => handleClick(chara)}
	class="relative select-none border border-gray-600 border-opacity-50"
>
	<div class="relative">
		<div class="absolute top-0 left-0 bg-[#1f1f1f]">
			<img
				src={charaAssets[chara.profession]}
				alt={chara.profession}
				width="26"
				loading="lazy"
				decoding="async"
			/>
		</div>
		{#if values?.length > 0}
			<div
				class="absolute bottom-0 w-full gradient-dark bg-opacity-50 pl-3 pt-3 truncate text-left"
			>
				{#each values as value, i}
					{#if i > 0}
						&nbsp;<span class="text-[#c9c9c9] text-sm">/</span>
					{/if}
					<span class={i > 0 ? 'text-[#c9c9c9] text-sm' : ''}>{value}</span>
				{/each}
			</div>
		{:else}
			<img
				src={charaAssets[chara.rarity]}
				alt={chara.rarity}
				class="absolute bottom-0 right-0 h-[20px]"
			/>
		{/if}

		{#if equip}
			{@const typeIcon = equip.typeIcon.toLowerCase()}
			<div
				class="absolute -right-1 -top-1 w-[40px] h-[40px] bg-center bg-cover"
				style="background-image: url(/images/color_equip_icons/{typeIcon}.webp);"
			></div>
		{/if}
		<img
			src={`/images/chara_icons/${chara.id}.webp`}
			width="100"
			height="100"
			alt={chara.name}
		/>
	</div>
</button>

<style>
	.gradient-dark {
		background: linear-gradient(to top, #1f1f1f, transparent);
	}
</style>
