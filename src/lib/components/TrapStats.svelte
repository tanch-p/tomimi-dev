<script lang="ts">
	import type { Language, Trap } from '$lib/types';
	import { charaAssets } from '$lib/data/chara/chara_assets';
	import { page } from '$app/state';
	import translations from '$lib/translations.json';
	interface Props {
		trap: Trap;
	}

	let { trap }: Props = $props();

	let language: Language = $derived(page.data.language);
	

	let statKeys = $derived(['hp', 'blockCnt', 'atk', 'aspd', 'def', 'res']);
</script>

<div>
	<div class="grid grid-cols-2 2 gap-x-2 gap-y-1.5 w-full h-min text-sm">
		{#each statKeys as statKey}
			<div class="grid grid-cols-[14px_1fr] gap-x-1 pl-1 pr-1.5 py-0.5 bg-[#161616] bg-opacity-80">
				<img src={charaAssets[statKey]} width="14px" height="14px" alt="" class="mt-[3px]" />
				<div>
					<span
						class="text-[#858585] font-semibold whitespace-nowrap {language === 'en' &&
						['aspd', 'eleDmgRes'].includes(statKey)
							? 'text-xs'
							: ''}"
					>
						{translations[language].table_headers[statKey]}
					</span>
					<p data-id="{statKey}-value" class="text-near-white">
						{trap.stats[statKey] ?? '0'}
					</p>
				</div>
			</div>
		{/each}
	</div>
	{#if trap.tauntLevel !== 0}
		<p class="text-[#858585] font-semibold mt-1.5 text-sm">
			{translations[language].table_headers.tauntLevel}:
			<span class="text-near-white">{trap.tauntLevel}</span>
		</p>
	{/if}
</div>
