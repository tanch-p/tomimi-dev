<script lang="ts">
	import { getTranslations } from '$lib/functions/languageHelpers';
	import type { Language, RogueTopic } from '$lib/types';
	import TitleBlock from './TitleBlock.svelte';

	export let language: Language, rogueTopic: RogueTopic;
</script>

<TitleBlock title={getTranslations(language).resource}>
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
			【{getTranslations(language).author}：<a
				href="https://space.bilibili.com/111063246"
				class="text-blue-400 hover:text-blue-300"
				target="_blank"
				rel="noopener noreferrer">哲三</a
			>】
		</li>
		{#if rogueTopic === 'rogue_black'}
			<li>
				<a
					href={'https://www.lubiao.wiki/tools/blackstream-route'}
					class="text-blue-400 hover:text-blue-300 pr-2"
					target="_blank"
					rel="noopener noreferrer"
				>
					黑流树海地图规划 (路标wiki)
				</a>
			</li>
			<li>
				<a
					href={'https://arkrog.com/tool/blackflowmap'}
					class="text-blue-400 hover:text-blue-300 pr-2"
					target="_blank"
					rel="noopener noreferrer"
				>
					黑流树海地图笔记（影语集）
				</a>
			</li>
		{/if}
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
