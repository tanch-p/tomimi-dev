<script lang="ts">
	interface Props {
		src: string;
		alt: string;
		type?: 'long' | 'square';
		adjustSize?: boolean;
		includeLabelColumn?: boolean;
		label?: string | number | undefined;
		labelRowspan?: number;
	}

	let {
		src,
		alt,
		type = 'long',
		adjustSize = false,
		includeLabelColumn = true,
		label = undefined,
		labelRowspan = 1
	}: Props = $props();
</script>

<tr>
	{#if includeLabelColumn}
		{#if label !== undefined}
			<td colspan="2" rowspan={labelRowspan}>{label}</td>
		{:else}
			<th colspan="2" class="empty"></th>
		{/if}
	{/if}

	<th colspan="24">
		<div class="flex items-center justify-center select-none pointer-events-none">
			<img
				{src}
				{alt}
				class:scale-200={adjustSize}
				width={type === 'square' ? 60 : 120}
				height={type === 'square' ? 60 : undefined}
				loading="lazy"
				decoding="async"
			/>
		</div>
	</th>
</tr>
