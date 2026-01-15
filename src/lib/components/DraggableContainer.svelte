<script lang="ts">
	import { createSlider } from '$lib/functions/slider';
	import Icon from '$lib/components/Icon.svelte';
	import { onMount } from 'svelte';

	interface Props {
		className?: string;
		showArrows?: boolean;
		children?: import('svelte').Snippet;
	}

	let { className = '', showArrows = false, children }: Props = $props();

	let container: HTMLDivElement = $state();
	let overflow = $state({
		left: false,
		right: false
	});

	function getHorizontalOverflow(element: HTMLDivElement) {
		const maxScrollLeft = element.scrollWidth - element.clientWidth;
		if (element.scrollLeft > 0) {
			overflow.left = true;
			overflow.right = false;
		}
		if (element.scrollLeft < maxScrollLeft) {
			overflow.right = true;
			overflow.left = false;
		}
	}
	function scrollToActiveChild(element: HTMLDivElement) {
		if (!container) return;
		const activeChild = container.querySelector('.active');
		if (activeChild) {
			activeChild.scrollIntoView({
				block: 'nearest', // vertical alignment
				inline: 'nearest' // horizontal alignment
			});
		}
	}

	onMount(() => {
		const slider = createSlider(container);
		getHorizontalOverflow(container);
		scrollToActiveChild(container);
		return () => slider();
	});
</script>

<div class="relative min-w-0">
	{#if showArrows && overflow.left}
		<button
			class="absolute left-0 top-1/3"
			onclick={() => container.scrollBy({ left: -100, behavior: 'smooth' })}
		>
			<Icon name="left-chevron" className="w-6 h-6 mr-1.5" />
		</button>
	{/if}
	<div
		bind:this={container}
		onscroll={() => getHorizontalOverflow(container)}
		class="draggable-container-wrapper overflow-x-auto overflow-y-visible h-full {className}"
	>
		{@render children?.()}
	</div>
	{#if showArrows && overflow.right}
		<button class="absolute right-0 top-1/3" onclick={() => container.scrollBy({ left: 100, behavior: 'smooth' })}>
			<Icon name="left-chevron" className="w-6 h-6 ml-2.5 rotate-180" />
		</button>
	{/if}
</div>
