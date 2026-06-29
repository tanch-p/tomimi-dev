<script lang="ts">
	import { getTranslations } from '$lib/functions/languageHelpers';
	import type { Language } from '$lib/types';
	export let statusImmuneList, language: Language, mode: 'handbook' | 'table';

	$: statusImmuneTexts = getTranslations(language).status_immune;
</script>

{#if statusImmuneList.length > 0}
	{#if mode === 'handbook'}
		<p class="bg-[#383838] px-3.5 py-0.5 text-[#a2a5a5] font-bold">
			{getTranslations(language).handbook_immune}
		</p>
		<div class="flex flex-wrap gap-1.5 my-1">
			{#each statusImmuneList as status}
				<p class="rounded-md bg-neutral-700 px-1.5 text-sm">
					{language === 'en' ? '' : statusImmuneTexts.pre}{getTranslations(language)[
						status
					]}{statusImmuneTexts.post}
				</p>
			{/each}
		</div>
	{:else}
		<div>
			{statusImmuneTexts.pre}{#each statusImmuneList as status, index}<span
					>{getTranslations(language)[
						status
					]}{#if statusImmuneList.length > 1 && index !== statusImmuneList.length - 1}{statusImmuneTexts.separator}{/if}</span
				>{/each}{statusImmuneTexts.post}
		</div>
	{/if}
{/if}

<style>
	div {
		padding: 6px 0px;
	}
</style>
