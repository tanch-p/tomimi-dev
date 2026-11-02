<script lang="ts">
	import { page } from '$app/state';
	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();

	let language = $derived(page.params.lang);
</script>

<div
	class={`layout bg-neutral-100 text-neutral-800 scheme-light dark:bg-neutral-800 dark:text-near-white dark:scheme-dark ${language === 'zh' ? 'font-ch' : ''}`}
>
	{@render children?.()}
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
