<script lang="ts">
	import type { Language, RogueTopic } from '$lib/types';
	import TitleBlock from './TitleBlock.svelte';
	import translations from '$lib/translations.json';

	export let language: Language, rogueTopic: RogueTopic;
</script>

<TitleBlock title={translations[language].resource}>
	<ul class="list-disc list-inside">
		{#if language === 'en'}
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
		{#if rogueTopic === 'rogue_yan'}
			<li>
				<a
					href={'https://docs.qq.com/sheet/DSnJQZ3V2akZWRHpz?tab=BB08J2'}
					class="text-blue-400 hover:text-blue-300 pr-2"
					target="_blank"
					rel="noopener noreferrer"
				>
					藏品档案
				</a>
				※施工中，若想参与此项目或反馈问题，可以点击<a
					class="text-blue-400 hover:text-blue-300"
					target="_blank"
					rel="noopener noreferrer"
					href="https://docs.qq.com/sheet/DQmR5VEVxdmdaRFNJ?tab=BB08J2">这里</a
				>
			</li>
		{/if}
		{#if rogueTopic === 'rogue_skz'}
			<li>
				<a
					href={'https://docs.qq.com/sheet/DSmlZSFBTZlJaTHZB?tab=ss0p98'}
					class="text-blue-400 hover:text-blue-300 pr-2"
					target="_blank"
					rel="noopener noreferrer"
				>
					藏品档案
				</a>
				※施工中，若想参与此项目或反馈问题，可以点击<a
					class="text-blue-400 hover:text-blue-300"
					target="_blank"
					rel="noopener noreferrer"
					href="https://docs.qq.com/sheet/DQmR5VEVxdmdaRFNJ?tab=BB08J2">这里</a
				>
			</li>
		{/if}
	</ul>
</TitleBlock>
