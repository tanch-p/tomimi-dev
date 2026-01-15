<script lang="ts">
	import { onMount } from 'svelte';

	let dots = $state('.');
	let isVisible = true;

	onMount(() => {
		const intervalId = setInterval(() => {
			if (dots.length === 3) {
				dots = '.';
			} else {
				dots += '.';
			}
		}, 1000);
		return () => clearInterval(intervalId);
	});
</script>

{#if isVisible}
	<div
		class="absolute z-1 inset-0 flex items-center justify-center bg-black bg-opacity-80 select-none"
	>
		<p class="text-2xl text-white">Loading assets{dots}</p>
	</div>
{/if}
