<script lang="ts">
	import type { Language } from '$lib/types';
	import TitleBlock from './TitleBlock.svelte';
	import translations from '$lib/translations.json';

	export let language: Language;

	const resourceText = {
		zh: `集批宝典`,
		ja: 'ほかのバグについては、こちらのドキュメント（中国語）をご参照ください。',
		en: 'For more bugs, please refer to this doc (in Chinese)'
	};
</script>

<TitleBlock title={translations[language].resource}>
	<ul class="list-disc list-inside">
        {#if language === "en"}
        <li>
			<a
				href={'https://is-central.github.io/introduction/'}
				class="text-blue-400 hover:text-blue-300"
				target="_blank"
				rel="noopener noreferrer"
			>
				IS Central
			</a>
		</li>
        {/if}
		<li>
			<a
				href={'https://docs.qq.com/sheet/DQkhoWVpEcUF2T3FV?tab=BB08J2'}
				class="text-blue-400 hover:text-blue-300"
				target="_blank"
				rel="noopener noreferrer"
			>
				集批宝典
			</a>
			【{translations[language].author}：<a
				href="https://space.bilibili.com/111063246"
				class="text-blue-400 hover:text-blue-300"
				target="_blank"
				rel="noopener noreferrer">哲三</a
			>】
		</li>
	</ul>
</TitleBlock>
