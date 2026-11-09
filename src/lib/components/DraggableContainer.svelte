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
		overflow.left = element.scrollLeft > 1;
		overflow.right = element.scrollLeft < maxScrollLeft - 1;
	}
	function scrollToActiveChild(element: HTMLDivElement) {
		const activeChild = element.querySelector('.active');
		if (activeChild) {
			activeChild.scrollIntoView({
				block: 'nearest', // vertical alignment
				inline: 'nearest' // horizontal alignment
			});
		}
	}

	onMount(() => {
		const slider = createSlider(container);
		scrollToActiveChild(container);
		getHorizontalOverflow(container);
		const resizeObserver = new ResizeObserver(() => getHorizontalOverflow(container));
		resizeObserver.observe(container);
		for (const child of container.children) {
			resizeObserver.observe(child);
		}
		return () => {
			slider();
			resizeObserver.disconnect();
		};
	});
</script>

<div class="relative min-w-0">
	{#if showArrows && overflow.left}
		<button
			type="button"
			aria-label="Scroll left"
			class="absolute right-[99%] top-1/3 z-10 -translate-y-1/2 flex h-8 w-6 items-center justify-center rounded hover:bg-neutral-500/20"
			onclick={() => container.scrollBy({ left: -100, behavior: 'smooth' })}
		>
			<Icon name="left-chevron" className="w-6 h-6" />
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
		<button
			type="button"
			aria-label="Scroll right"
			class="absolute left-[99%] top-1/3 z-10 -translate-y-1/2 flex h-8 w-6 items-center justify-center rounded hover:bg-neutral-500/20"
			onclick={() => container.scrollBy({ left: 100, behavior: 'smooth' })}
		>
			<Icon name="left-chevron" className="w-6 h-6 rotate-180" />
		</button>
	{/if}
</div>
