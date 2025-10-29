<script lang="ts">
	import type { Language } from '$lib/types';
	import TitleBlock from './TitleBlock.svelte';
	import translations from '$lib/translations.json';

	export let list, language: Language;
</script>

<TitleBlock title={translations[language].buglist}>
	{#if list.length > 0}
		<ul class="list-disc list-inside">
			{#each list as item}
				{#if item.desc[language]}
					<li class="my-1.5">
						{item.desc[language]}
						{#if item.video}
							<a
								class="text-blue-400 hover:text-blue-300"
								href="https://www.bilibili.com/video/{item.video}/"
								target="_blank"
								rel="noopener noreferrer">{item.video}</a
							>
						{/if}
					</li>
				{/if}
			{/each}
		</ul>
	{/if}
</TitleBlock>
