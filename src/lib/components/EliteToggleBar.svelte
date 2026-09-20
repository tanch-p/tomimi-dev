<script lang="ts">
	interface Props {
		stageId: string;
		eliteMode: any;
		combatOpsColor: any;
		eliteOpsColor: any;
		getEliteIcon: any;
		iconCombat: any;
		rogueTopic: any;
		idPrefix?: string;
	}

	let {
		stageId,
		eliteMode,
		combatOpsColor,
		eliteOpsColor,
		getEliteIcon,
		iconCombat,
		rogueTopic,
		idPrefix = ''
	}: Props = $props();
</script>

<div class="grid grid-cols-2 font-bold text-lg text-gray-700 select-none">
	<button
		id={idPrefix ? `${idPrefix}-normal-toggle` : 'normal-toggle'}
		class={`flex justify-center items-center py-1 ${combatOpsColor} ${
			!$eliteMode ? 'text-gray-900' : 'opacity-30'
		}`}
		onclick={() => eliteMode.set(false)}
	>
		<img
			src={iconCombat}
			width="50px"
			decoding="async"
			loading="lazy"
			alt="combat ops"
			class:scale-200={rogueTopic === 'rogue_black'}
			class="select-none"
		/>
	</button>
	<button
		id={idPrefix ? `${idPrefix}-elite-toggle` : 'elite-toggle'}
		class={`flex justify-center items-center ${eliteOpsColor} ${
			$eliteMode ? 'text-black' : 'opacity-30'
		}`}
		onclick={() => eliteMode.set(true)}
	>
		<img
			src={getEliteIcon(stageId)}
			width="50px"
			decoding="async"
			loading="lazy"
			alt="elite ops"
			class="select-none"
			class:scale-200={rogueTopic === 'rogue_black'}
		/>
	</button>
</div>
