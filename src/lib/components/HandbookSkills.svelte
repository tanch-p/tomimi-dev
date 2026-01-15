<script lang="ts">
	import type { Enemy, Language } from '$lib/types';
	import translations from '$lib/translations.json';
	import RangeParser from './RangeParser.svelte';
	import Remark from './Remark.svelte';

	interface Props {
		enemy: Enemy;
		skills: any;
		language: Language;
		statusImmuneList: any;
		formIndex: any;
		mapConfig: any;
	}

	let {
		enemy,
		skills,
		language,
		statusImmuneList,
		formIndex,
		mapConfig
	}: Props = $props();
</script>

{#if skills.length > 0}
	<p class="bg-[#383838] px-3.5 py-0.5 text-[#a2a5a5] font-bold">
		{translations[language].skill}
	</p>
	<ul class="list-disc pl-4">
		{#each skills as skill}
			<div class="flex gap-x-2.5">
				<Remark
					entity={enemy}
					{formIndex}
					{skill}
					{language}
					mode={'skill'}
					{statusImmuneList}
					{mapConfig}
				/>
				<!-- {#if skill.rangeId}
						<div
							class="flex flex-col items-center justify-center min-w-[72px] h-max min-h-[60px] p-2 pb-1 bg-[#161616] bg-opacity-80 rounded"
						>
							<div class="flex items-center h-full">
								<RangeParser rangeId={skill.rangeId} size="small" />
							</div>
							<p class="mt-1 text-xs">{translations[language].effect_range}</p>
						</div>
					{/if} -->
			</div>
		{/each}
	</ul>
{/if}
