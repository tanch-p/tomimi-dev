<script lang="ts">
	import { onMount } from 'svelte';
	interface Props {
		mobile?: import('svelte').Snippet;
		pc?: import('svelte').Snippet;
	}

	let { mobile, pc }: Props = $props();

	let layout = $state();
	onMount(() => {
		const mql = window.matchMedia('(max-width:768px)');
		layout = mql.matches ? 'mobile' : 'pc';
		mql.addEventListener('change', screenTest);
		return () => {
			mql.removeEventListener('change', screenTest);
		};
	});

	function screenTest(e: MediaQueryListEvent) {
		//matches: Boolean
		layout = e.matches ? 'mobile' : 'pc';
	}
</script>

{#if layout === 'mobile'}
	{@render mobile?.()}
{:else if layout === 'pc'}
	{@render pc?.()}
{:else}
	<div class="min-h-screen"></div>
{/if}
