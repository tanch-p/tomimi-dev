<script lang="ts">
	import type { Language } from '$lib/types';
	import type { PageData } from './$types';
	import translations from '$lib/translations.json';
	import kofiBadge from '$lib/images/kofi_badge_beige.png';
	import afdian from '$lib/images/afdian.jpg';

	interface Props {
		data: PageData;
		language: Language;
	}

	let { data, language = $bindable() }: Props = $props();
	run(() => {
		language = data.language;
	});

	const sponsors = ['瓦楞纸', 'Yannick', 'Somebody', 'ithy', 'fafa', '复恐匆匆', 'sunlazy','银河Aquila','辰伊光','爱发电用户_DyPR','火心子',"所谓之人","爱发电用户_84EC","凶兽咆哮","阿谛亚","爱发电用户_116dc"].sort();
</script>

<svelte:head>
	<title>{translations[language].donate_text}</title>
	<meta name="description" content={translations[language].title_post} />
	<meta property="og:description" content={translations[language].title_post} />
</svelte:head>

<div class="max-w-xl mx-auto py-24 px-2">
	<p class="font-semibold text-lg">{translations[language].donate_text}</p>

	<p class="mt-4">
		{{
			zh: '喜欢这个网页的话，考虑支持一下作者买个咖啡给我助力吧！',
			ja: 'このサイトが気に入ったら、作者にコーヒーをおごることで応援してください！',
			en: 'Consider supporting me with some coffee if you like this website!'
		}[language]}
	</p>
	<div
		class="flex flex-[1_1_50%] flex-wrap md:flex-nowrap gap-6 mt-6 mx-auto max-w-[280px] md:max-w-full"
	>
		<a
			href="https://afdian.com/a/tomimi"
			target="_blank"
			rel="noopener noreferrer"
			class="hover:brightness-75 h-max rounded-3xl overflow-hidden"
		>
			<img src={afdian} width="100%" height="100%" alt="afdian" />
		</a>
		<a
			href="https://ko-fi.com/tartarchan"
			target="_blank"
			rel="noopener noreferrer"
			class="hover:brightness-75 h-max"
		>
			<img src={kofiBadge} width="100%" height="100%" alt="kofi" />
		</a>
	</div>
	<p class="font-semibold text-lg mt-8">❤️ {translations[language].donate_thanklist} ❤️</p>
	<div class="flex flex-wrap gap-x-3 gap-y-1.5 mt-1.5">
		{#each sponsors as name}
			<span>{name}</span>
		{/each}
	</div>
</div>

<style>
	td {
		padding: 2px 0;
		border-width: 1px 0;
	}
</style>
