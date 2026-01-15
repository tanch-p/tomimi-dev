<script lang="ts">
	import type { Language } from '$lib/types';
	import translations from '$lib/translations.json';
	interface Props {
		statusImmuneList: any;
		language: Language;
		mode: 'handbook' | 'table';
	}

	let { statusImmuneList, language, mode }: Props = $props();

	let statusImmuneTexts = $derived(translations[language].status_immune);
</script>

{#if statusImmuneList.length > 0}
	{#if mode === 'handbook'}
		<p class="bg-[#383838] px-3.5 py-0.5 text-[#a2a5a5] font-bold">
			{translations[language].handbook_immune}
		</p>
		<div class="flex flex-wrap gap-1.5 my-1">
			{#each statusImmuneList as status}
				<p class="rounded-md bg-neutral-700 px-1.5 text-sm">
					{language === 'en' ? '' : statusImmuneTexts.pre}{translations[language][
						status
					]}{statusImmuneTexts.post}
				</p>
			{/each}
		</div>
	{:else}
		<div>
			{statusImmuneTexts.pre}{#each statusImmuneList as status, index}<span
					>{translations[language][
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
