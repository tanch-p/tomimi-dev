<script lang="ts">
	import type { Contracts } from '$lib/functions/recalRune';
	import type { Writable } from 'svelte/store';
	import { updateContracts } from '$lib/functions/recalRune';

	let { contracts }: { contracts: Writable<Contracts | null> } = $props();
</script>

<div class="bg-[#1f1f1f] text-near-white md:min-w-[750px] h-full">
	<div class="grid grid-cols-[32px_1fr]">
		<div class="flex justify-center bg-[#82000e] py-2.5">
			<img
				src="/images/recalrune/deco_rune_type_essential.webp"
				alt="base"
				width="23"
				class="h-min"
			/>
		</div>
		<div class="tags-container flex flex-wrap items-start py-0.5 pl-3 min-h-[120px]">
			<div class="flex items-center">
				<div class="relative left-[8px]">
					<img src="/images/recalrune/group_head_fixed.webp" alt="fixed" width="72" />
				</div>
				{#each $contracts?.base.nullGroup ?? [] as item}
					<div
						class:selected={item.selected}
						class="rune-container relative h-min"
						id={item.runeId}
					>
						<div class="rune-bg">
							<img src="/images/recalrune/bkg_rune_item_can_select.webp" alt="rune_bg" width="72" />
						</div>
						<div class="rune-img absolute inset-0 flex items-center justify-center z-[1]">
							<img src="/images/recalrune/fixed_rune_icon.webp" alt={item.runeId} width="48" />
						</div>
					</div>
				{/each}
			</div>
			{#each Object.entries($contracts?.base.exclusiveGroups ?? {}) as [groupId, items]}
				<div class="exclusive-group flex items-center">
					<div class="relative left-[8px]">
						<img src="/images/recalrune/group_head_exclusive.webp" alt="OR" width="72" />
					</div>
					<div class="relative flex items-center">
						<div class="absolute w-[90%] h-[20px] bg-[#484848]"></div>
						{#each items as item}
							{@const otherSelected = !item.selected && items.some((rune) => rune.selected)}
							<button
								type="button"
								aria-label={item.runeId}
								aria-pressed={item.selected}
								class:selected={item.selected}
								class:other-selected={otherSelected}
								class="rune-container relative h-min"
								id={item.runeId}
								onclick={() =>
									contracts.update((v) => updateContracts(v, 'base', groupId, item.runeId))}
							>
								<div class="rune-bg">
									<img
										src="/images/recalrune/bkg_rune_item_can_select.webp"
										alt="rune_bg"
										width="72"
									/>
								</div>
								<div class="rune-img absolute inset-0 flex items-center justify-center z-[1]">
									<img
										src="/images/recalrune/{item.runeIcon}.webp"
										alt={item.runeId}
										class="w-[40px] h-[40px] object-contain"
									/>
								</div>
							</button>
						{/each}
					</div>
				</div>
			{/each}
		</div>
	</div>
	<div class="grid grid-cols-[32px_1fr] mt-6">
		<div class="bg-[#82000e] py-2.5 pl-1">
			<img
				src="/images/recalrune/deco_rune_type_not_essential.webp"
				alt="others"
				width="28"
				class="h-min"
			/>
		</div>
		<div class="tags-container flex flex-wrap items-start py-0.5 pl-3 min-h-[120px]">
			<div class="flex items-center">
				{#each $contracts?.others.nullGroup ?? [] as item}
					<button
						type="button"
						aria-label={item.runeId}
						aria-pressed={item.selected}
						class:selected={item.selected}
						class="rune-container relative h-min"
						id={item.runeId}
						onclick={() => contracts.update((v) => updateContracts(v, 'others', null, item.runeId))}
					>
						<div class="rune-bg">
							<img src="/images/recalrune/bkg_rune_item_can_select.webp" alt="rune_bg" width="72" />
						</div>
						<div class="rune-img absolute inset-0 flex items-center justify-center z-[1]">
							<img
								src="/images/recalrune/{item.runeIcon}.webp"
								alt={item.runeId}
								class="w-[40px] h-[40px] object-contain"
							/>
						</div>
						<span
							class="absolute z-[2] right-[8px] bottom-[8px] rounded bg-[#242424] px-1.5 py-0.5 text-sm leading-none"
						>
							{item.score}
						</span>
					</button>
				{/each}
			</div>
			{#each Object.entries($contracts?.others.exclusiveGroups ?? {}) as [groupId, items]}
				<div class="exclusive-group flex items-center">
					{#if items.length > 1}
						<div class="relative left-[8px]">
							<img src="/images/recalrune/group_head_exclusive.webp" alt="OR" width="72" />
						</div>
					{/if}
					<div class="relative flex items-center">
						<div class="absolute w-[90%] h-[20px] bg-[#484848]"></div>
						{#each items as item}
							{@const otherSelected = !item.selected && items.some((rune) => rune.selected)}
							<button
								type="button"
								aria-label={item.runeId}
								aria-pressed={item.selected}
								class:selected={item.selected}
								class:other-selected={otherSelected}
								class="rune-container relative h-min"
								id={item.runeId}
								onclick={() =>
									contracts.update((v) => updateContracts(v, 'others', groupId, item.runeId))}
							>
								<div class="rune-bg">
									<img
										src="/images/recalrune/bkg_rune_item_can_select.webp"
										alt="rune_bg"
										width="72"
									/>
								</div>
								<div class="rune-img absolute inset-0 flex items-center justify-center z-[1]">
									<img
										src="/images/recalrune/{item.runeIcon}.webp"
										alt={item.runeId}
										class="w-[40px] h-[40px] object-contain"
									/>
								</div>
								<span
									class="absolute z-[2] right-[8px] bottom-[8px] rounded bg-[#242424] px-1.5 py-0.5 text-sm leading-none"
								>
									{item.score}
								</span>
							</button>
						{/each}
					</div>
				</div>
			{/each}
		</div>
	</div>
</div>

<style>
	.rune-container.selected .rune-bg > img {
		filter: drop-shadow(0 0 4px #7e2735) brightness(2);
	}
	.rune-container.selected .rune-img > img {
		filter: invert(1);
	}
	.rune-container:not(.selected):hover .rune-bg > img {
		filter: brightness(1.4);
	}
	.rune-container.other-selected {
		filter: brightness(0.75);
	}
	.tags-container {
		background: linear-gradient(90deg, #514f52 0, #1f1f1f 35%);
	}
</style>
