<script lang="ts">
	import { slide } from 'svelte/transition';
	import Icon from './Icon.svelte';
	import { setLocalStorage } from '$lib/functions/lib';

	interface Props {
		title?: string;
		key?: string;
		isOpen?: boolean;
		size?: string;
		className?: string;
		titleIcon?: string;
		children?: import('svelte').Snippet;
	}

	let {
		title = 'title',
		key = '',
		isOpen = $bindable(false),
		size = 'large',
		className = '',
		titleIcon = '',
		children
	}: Props = $props();

	const toggle = () => {
		isOpen = !isOpen;
		if (key === 'stageSim') {
			setLocalStorage('openStageSim', isOpen ? 1 : 0);
		}
	};
</script>

<div class="sm:px-6 {className}">
	<button class="flex justify-between items-center w-full px-2 sm:px-0" onclick={toggle}>
		<div class="flex items-center gap-x-3">
			<h2 class={`${size === 'subheading' ? 'text-subheading' : 'text-3xl'}`}>{title}</h2>
			{#if titleIcon}
				<img src={titleIcon} width="40" height="40" loading="lazy" alt={''} />
			{/if}
		</div>
		{#if isOpen}
			<Icon name="icon-minus" className="w-6 h-6 sm:w-8 sm:h-8 mt-2" />
		{:else}
			<Icon name="icon-plus" className="w-6 h-6 sm:w-8 sm:h-8 mt-2" />
		{/if}
	</button>
	<hr class="border-gray-500 my-1" />
	{#if isOpen}
		<div transition:slide={{ duration: 300 }}>
			{#if children}{@render children()}{:else}No children given{/if}
		</div>
	{/if}
</div>
