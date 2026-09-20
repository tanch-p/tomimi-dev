<script lang="ts">
	import Icons from '$lib/components/Icons.svelte';
	import ScrollButtons from '$lib/components/ScrollButtons.svelte';
	import '../app.css';
	import { page } from '$app/state';
	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();
</script>

<ScrollButtons hasBtm={page?.data?.mapConfig} />

<Icons />
{@render children?.()}
