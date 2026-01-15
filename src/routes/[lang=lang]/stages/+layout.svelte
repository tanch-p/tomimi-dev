<script lang="ts">
	import { page } from '$app/state';
	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();

	let language = $derived(page.params.lang);
</script>

<div class={`layout ${language === 'zh' ? 'font-ch' : ''}`}>
	{@render children?.()}
</div>

<style>
	.font-ch {
		font-family: Noto Sans CJK SC, system-ui, -apple-system, BlinkMacSystemFont, Microsoft Yahei,
			SimSun, sans-serif;
	}
</style>
