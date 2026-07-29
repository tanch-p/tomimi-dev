<script lang="ts">
	export let src: string;
	export let alt: string;
	export let type: 'long' | 'square' = 'long';
	export let adjustSize = false;
	export let includeLabelColumn = true;
	export let label: string | number | undefined = undefined;
	export let labelRowspan = 1;
</script>

<tr>
	{#if includeLabelColumn}
		{#if label !== undefined}
			<td colspan="2" rowspan={labelRowspan}>{label}</td>
		{:else}
			<th colspan="2" class="empty" />
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
