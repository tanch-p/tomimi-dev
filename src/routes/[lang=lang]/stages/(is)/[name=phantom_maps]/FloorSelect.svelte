<script lang="ts">
	import { selectedFloor } from './stores.js';
	let floors = new Array(6);
</script>

<div class="w-[70%] mx-auto py-3 mt-4">
	<div class="grid grid-cols-6 ">
		{#each floors as n, i}
			<button
				onclick={() => selectedFloor.set(i + 1)}
				class={`py-2 px-2 ${$selectedFloor === i + 1 ? 'bg-gray-500' : ''}`}
				type="button"
			>
				{i + 1}
			</button>
		{/each}
	</div>
</div>
