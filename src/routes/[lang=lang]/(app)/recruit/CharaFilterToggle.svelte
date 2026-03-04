<script lang="ts">
	import { slide } from 'svelte/transition';
	import Icon from '$lib/components/Icon.svelte';

	interface Props {
		title?: string;
		isOpen?: boolean;
		id?: string;
		className?: string;
		titleClassName?: string;
		innerClassName?: string;
		triangle?: import('svelte').Snippet;
		children?: import('svelte').Snippet;
		selected?: import('svelte').Snippet;
	}

	let {
		title = 'title',
		isOpen = $bindable(false),
		id = '',
		className = '',
		titleClassName = '',
		innerClassName = '',
		triangle,
		children,
		selected
	}: Props = $props();

	const toggle = () => (isOpen = !isOpen);
</script>

<div class="relative {className}">
	<button {id} class="block w-full relative p-3 hover:cursor-pointer {titleClassName}" onclick={toggle}>
		<p class={`text-center`}>{title}</p>
		<Icon
			name={isOpen ? 'icon-minus' : 'icon-plus'}
			className="absolute z-1 right-2 top-[50%] -translate-y-[50%] w-4 h-4"
		/>
	</button>
	{@render triangle?.()}
	{#if isOpen}
		<div transition:slide={{ duration: 300 }} class="relative {innerClassName}">
			{#if children}{@render children()}{:else}No children given{/if}
		</div>
	{:else}
		<div transition:slide={{ duration: 300 }}>
			{@render selected?.()}
		</div>
	{/if}
</div>
