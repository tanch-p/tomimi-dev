<script lang="ts">
	interface Props {
		title?: string;
		size?: string;
		className?: string;
		titleIcon?: string;
		children?: import('svelte').Snippet;
	}

	let {
		title = 'title',
		size = 'large',
		className = '',
		titleIcon = '',
		children
	}: Props = $props();
</script>

<div class="sm:px-6 {className}">
	<div class="flex justify-between items-center px-2 sm:px-0">
		<div class="flex items-center gap-x-3">
			<h2 class={`${size === 'subheading' ? 'text-subheading' : 'text-3xl'}`}>{title}</h2>
			{#if titleIcon}
				<img src={titleIcon} width="40" height="40" loading="lazy" alt={''} />
			{/if}
		</div>
	</div>
	<hr class="border-gray-500 my-1" />
	{#if children}{@render children()}{:else}No children given{/if}
</div>
