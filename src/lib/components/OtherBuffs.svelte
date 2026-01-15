<script lang="ts">
	import type { Language } from '$lib/types';
	import translations from '$lib/translations.json';
	import {
		getApplicableBuffsList,
		getOtherBuffsCount,
		updateOtherBuffsList
	} from '$lib/functions/lib';

	interface Props {
		language: Language;
		otherBuffsList: any;
		entity: any;
		mode?: string;
	}

	let {
		language,
		otherBuffsList,
		entity,
		mode = 'handbook'
	}: Props = $props();

	let applicableBuffsList = $derived(getApplicableBuffsList($otherBuffsList, entity));
</script>

{#if applicableBuffsList?.length > 0}
	<p class="bg-[#383838] px-3.5 py-0.5 text-[#a2a5a5] font-bold {mode === 'table' ? 'hidden' : ''}">
		{translations[language].other_buffs}
	</p>
	<div
		class="justify-items-center gap-y-1.5 py-2 {mode === 'table'
			? 'flex flex-col min-w-[50px]'
			: 'grid grid-cols-3 md:flex md:gap-x-8 md:pl-4'}"
	>
		{#each applicableBuffsList as buff}
			{@const currentCount = getOtherBuffsCount($otherBuffsList, buff.key, entity.key)}
			<button
				id="{entity.key}-buff-{buff.key}"
				class:brightness-50={currentCount === 0}
				class="flex flex-col items-center gap-y-1"
				onclick={() => updateOtherBuffsList(otherBuffsList, buff.key, entity.key)}
			>
				<div class="relative">
					{#if buff.maxCount > 1 && currentCount > 0}
						<p class="absolute right-0 bottom-0 bg-almost-black px-1 text-xs">x{currentCount}</p>
					{/if}
					{#if ['n18_mzk', 'n14_phcs'].includes(buff.key)}
						<div class="relative flex justify-center items-center w-[54px] h-[54px]">
							<div class="absolute n18_mzk"></div>
							<span class="text-sm">{buff.name}</span>
						</div>
					{:else}
						<img
							src={buff.img || `/images/enemy_icons/${buff.key}.webp`}
							alt={buff.name}
							width="60"
							height="60"
						/>
					{/if}
				</div>
				<p class="text-sm {mode === 'table' ? 'hidden' : ''}">
					{buff.name}
				</p>
			</button>
		{/each}
	</div>
{/if}
