<script lang="ts">
	interface Props {
		title?: string;
		size?: string;
		className?: string;
		titleIcon?: string;
		description?: string;
		children?: import('svelte').Snippet;
	}

	let {
		title = 'title',
		size = 'large',
		className = '',
		titleIcon = '',
		description = '',
		children
	}: Props = $props();
</script>

<div class="sm:px-6 {className}">
	<div class="px-2 md:px-0">
		<div class="flex items-center gap-x-3">
			<h2 class={`${size === 'subheading' ? 'text-subheading' : 'text-3xl'}`}>{title}</h2>
			{#if titleIcon}
				<img src={titleIcon} width="40" height="40" loading="lazy" alt={''} />
			{/if}
		</div>
		{#if description}
			<p class="text-xs md:text-sm text-gray-400">{description}</p>
		{/if}
	</div>
	<hr class="border-gray-500 my-1" />
	{#if children}{@render children()}{:else}No children given{/if}
</div>
