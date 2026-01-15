<script lang="ts">
	import { page } from '$app/state';
	import Header from './Header.svelte';
	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();

	let language = $derived(page.params.lang);
</script>

<div>
	<Header {language} />

	<main class={`bg-neutral-800 min-h-screen text-near-white ${language === 'zh' ? 'font-ch' : ''}`}>
		{@render children?.()}
	</main>

	<footer></footer>
</div>

<style>
	.font-ch {
		font-family: Noto Sans CJK SC, system-ui, -apple-system, BlinkMacSystemFont, Microsoft Yahei,
			SimSun, sans-serif;
	}
</style>
