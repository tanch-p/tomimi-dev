<script lang="ts">
	let { resolution, freezeDuration, fValues } = $props();
</script>

<div class="flex w-max">
	{#each fValues as { key, value, counter }, index}
		<div class="flex flex-col">
			<div
				class={`flex items-center justify-center h-[24px] border-r border-black text-sm font-bold ${
					key === "frz"
						? "bg-[#34c2e6]"
						: key === "f0"
						? "bg-[#fdfc01]"
						: key === "f1"
						? "bg-[#f8cc47]"
						: "bg-[#f28b00] "
				}`}
				style={`width: ${value * resolution}px;`}
			>
				{value}
			</div>
			{#if key === "frz"}
				<p class="text-right">{counter + freezeDuration}</p>
			{/if}
		</div>
	{/each}
</div>
