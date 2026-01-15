<script lang="ts">
	import type { Language, MapConfig, Trap } from '$lib/types';
	import { page } from '$app/state';
	import translations from '$lib/translations.json';
	import StatusImmune from './StatusImmune.svelte';
	import TrapStats from './TrapStats.svelte';
	import RangeParser from './RangeParser.svelte';
	import TrapAbilities from './TrapAbilities.svelte';
	import OtherBuffs from './OtherBuffs.svelte';

	interface Props {
		trap: Trap;
		otherBuffsList: any;
		specialMods: any;
		mapConfig: MapConfig;
	}

	let {
		trap,
		otherBuffsList,
		specialMods,
		mapConfig
	}: Props = $props();
	let language: Language = $derived(page.data.language);
	
</script>

<div
	id={trap.key}
	class="scroll-mt-16 p-2 bg-neutral-900 bg-opacity-40 sm:max-w-[500px] w-full mx-auto"
>
	<div class="relative pt-3">
		<div class="flex items-center">
			{#if trap.overwritten}
				<p class="text-xs text-center bg-[#981313] py-0.5 w-7">Sp.</p>
			{/if}
			<p class="ml-1 font-semibold">{trap.name}</p>
		</div>
	</div>
	<div class="grid grid-cols-[minmax(75px,auto)_1fr] gap-x-1.5 mt-1">
		<div class="space-y-2.5 max-[390px]:w-[75px]">
			<img
				class="select-none"
				src={`/images/chara_icons/${trap.key}.webp`}
				height="95px"
				width="95px"
				decoding="async"
				loading="lazy"
				alt={trap.name}
			/>
			<!-- <div class="flex flex-wrap items-center bg-almost-black px-1.5">
				<div class="flex items-center gap-x-1 py-1 max-[390px]:text-sm">
					<p>Enemy</p>
				</div>
			</div> -->
			{#if trap.stats.rangeId}
				<div
					class="flex flex-col items-center max-w-[90px] w-full mx-auto p-2 pb-1 bg-[#161616] bg-opacity-80 rounded h-max"
				>
					<div class="flex items-center">
						<RangeParser rangeId={trap.stats.rangeId} size="small" />
					</div>
					<p class="mt-1 text-xs">{translations[language].attack_range}</p>
				</div>
			{/if}
		</div>
		<TrapStats {trap} />
	</div>
	<div class="mt-3">
		{#if trap.key === 'trap_760_skztzs'}
			<OtherBuffs {otherBuffsList} {language} entity={trap} />
		{/if}
		<TrapAbilities {trap} {specialMods} {mapConfig}/>
		<StatusImmune statusImmuneList={trap.status_immune} {language} mode="handbook" />
	</div>
</div>
