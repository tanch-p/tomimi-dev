<script lang="ts">
	import type { Language } from '$lib/types';
	import TitleBlock from './TitleBlock.svelte';
	import translations from '$lib/translations.json';

	export let list, docLink, language: Language;

	const moreBugs = {
		zh: `想查看更多或反馈bug，可以在这里查看`,
		ja: 'ほかのバグについては、こちらのドキュメント（中国語）をご参照ください。',
		en: 'For more bugs, please refer to this doc (in Chinese)'
	};
</script>

<TitleBlock title={translations[language].buglist}>
	{#if docLink}
		<p class="mb-4">
			<span>{moreBugs[language]}</span>
			<a
				href={docLink}
				class="text-blue-400 hover:text-blue-300"
				target="_blank"
				rel="noopener noreferrer"
			>
				qq文件
			</a>
		</p>
	{/if}
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
								rel="noopener noreferrer"
							>
								{item.video}
							</a>
						{/if}
					</li>
				{/if}
			{/each}
		</ul>
	{/if}
</TitleBlock>
