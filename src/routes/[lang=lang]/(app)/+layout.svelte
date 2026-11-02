<script lang="ts">
	import { page } from '$app/state';
	import Header from './Header.svelte';
	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();

	let language = $derived(page.params.lang);
</script>

<div
	class="bg-neutral-100 text-neutral-800 scheme-light dark:bg-neutral-800 dark:text-near-white dark:scheme-dark"
>
	<Header {language} />

	<main
		class={`bg-neutral-100 dark:bg-neutral-800 min-h-screen text-neutral-800 dark:text-near-white ${language === 'zh' ? 'font-ch' : ''}`}
	>
		{@render children?.()}
	</main>

	<footer></footer>
</div>

<style>
	.font-ch {
		font-family:
			Noto Sans CJK SC,
			system-ui,
			-apple-system,
			BlinkMacSystemFont,
			Microsoft Yahei,
			SimSun,
			sans-serif;
	}
</style>
