<script lang="ts">
	import type { Language } from '$lib/types';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { browser, dev } from '$app/environment';
	import { page } from '$app/state';

	let language:Language = $state('en');
	let redirectTime = 10000;
	let timer = redirectTime / 1000;
	onMount(() => {
		if (browser && !dev) {
			const browerLang = window.navigator.language;
			if (browerLang.match(/ja|ja/i)) {
				language = 'ja';
			} else if (browerLang.includes('zh')) {
				language = 'zh';
			}
			setTimeout(async () => {
				await goto(`/${language}`);
			}, redirectTime);
		}
	});
	const message = page.error?.message;

	const infoText = {
		zh: '如果无法访问关卡页面，请尝试更新浏览器或使用其他浏览器，如Firefox/Chrome。',
		ja: 'このエラーが続く場合は、ブラウザを更新するか、Firefox/Chromeなどの別のブラウザをお試しください。',
		en: 'If this error persists, please kindly try updating your browser or another browser like Firefox/Chrome or inform me on discord xiiao#0613'
	};
</script>

<svelte:head>
	<title>404 / tomimi.dev</title>
</svelte:head>

<div class="bg-neutral-800 min-h-screen flex items-center">
	<div class="max-w-7xl mx-auto">
		<p class="text-center text-near-white px-4">
			{#if message === 'Not Found'}
				The page you requested could not be found
			{:else}
				An unexpected error occured while loading the page. 
			{/if}
			<br /><br/>
			{infoText[language]}
			<br /><br />
			You will be redirected to the homepage in {timer} seconds...<br />
			If you are not redirected please click
			<a data-sveltekit-reload class="text-blue-500" href={`/${language}`}>here</a>
		</p>
	</div>
</div>
