<script lang="ts">
	let { resolution, fValues, moduleLevel } = $props();

	function reducer(acc, curr) {
		return acc + curr.value;
	}
	function getStunTimings(fValues, stunDuration) {
		let acc = [];
		let blankStart = 0;
		let blankStop = 2;
		let stunStart = 0;
		let stunStop = 0;
		let durationToNextStun = 0;
		for (let i = 0; i < fValues.length - 2; i++) {
			if (fValues[i + 2].key === 'frz') {
				if (stunStart !== blankStart) {
					stunStop = i;
					if (blankStart === 0) {
						acc.push({
							key: 'blank',
							value: fValues.slice(blankStart, stunStart).reduce(reducer, 0)
						});
						acc.push({
							key: 'stun',
							value: fValues.slice(stunStart, stunStop).reduce(reducer, 0) + stunDuration
						});
					} else if (durationToNextStun > stunDuration) {
						acc.push({
							key: 'blank',
							value: durationToNextStun - stunDuration
						});
						acc.push({
							key: 'stun',
							value: fValues.slice(stunStart, stunStop).reduce(reducer, 0) + stunDuration
						});
					} else {
						acc.push({
							key: 'stun',
							value: fValues.slice(stunStart, stunStop).reduce(reducer, 0) + stunDuration
						});
					}

					stunStart = i + 3;
					blankStart = i + 3;
				}
			} else if (fValues[i + 2].key === 'f2') {
				if (stunStart === blankStart) {
					stunStart = i + 2;
					blankStop = i + 2;
					durationToNextStun = fValues.slice(stunStop, stunStart).reduce(reducer, 0);
					if (blankStart !== 0 && durationToNextStun < stunDuration) {
						acc.push({ key: 'minus', value: stunDuration - durationToNextStun });
					}
				}
			}
		}
		for (let i = 0; i < acc.length; i++) {
			if (acc[i].key === 'minus') {
				acc[i - 1].value -= acc[i].value;
			}
		}
		acc = acc.filter((ele) => ele.key !== 'minus');

		let newAcc = [];
		let stunBlockStart = -1;
		for (let i = 0; i < acc.length; i++) {
			if (acc[i].key === 'blank') {
				if (stunBlockStart !== -1) {
					newAcc.push({ key: 'stun', value: acc.slice(stunBlockStart, i).reduce(reducer, 0) });
				}
				newAcc.push(acc[i]);
				stunBlockStart = -1;
			} else if (stunBlockStart === -1) {
				stunBlockStart = i;
			}
		}
		if (stunBlockStart !== -1) {
			newAcc.push({ key: 'stun', value: acc.slice(stunBlockStart, acc.length).reduce(reducer, 0) });
		}
		return newAcc;
	}
	let stunDuration = $derived(moduleLevel >= 2 ? 4 * 30 : 3 * 30);
	let stunTimings = $derived(getStunTimings(fValues, stunDuration));
</script>

<div class="flex w-max">
	{#each stunTimings as { key, value }}
		<div class="flex flex-col">
			<div
				class={`flex items-center justify-center h-[24px] border-black text-sm font-bold ${
					key === 'blank' ? '' : 'bg-[#8d2828] border-r text-near-white'
				}`}
				style={`width: ${value * resolution}px;`}
			>
				{value}
			</div>
		</div>
	{/each}
</div>
