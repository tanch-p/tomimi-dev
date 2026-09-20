<script lang="ts">
	import rangeTable from '$lib/data/range_table.json';
	interface Props {
		rangeId: any;
		size?: string;
		extend?: number;
	}

	let { rangeId, size = 'normal', extend = 0 }: Props = $props();

	let sqSize = $derived(size === 'small' ? 12 : 26);

	function extendGrids(grids, extend) {
		if (extend === 0) {
			return grids;
		}
		let newGrids = [...grids];
		const lastColOfRow = {};
		for (const { row, col } of grids) {
			if (!lastColOfRow[row]) {
				lastColOfRow[row] = col;
			} else {
				if (col > lastColOfRow[row]) lastColOfRow[row] = col;
			}
		}
		if (extend < 0) {
			const adjustedLastCols = Object.keys(lastColOfRow).reduce((acc, curr) => {
				acc[curr] = lastColOfRow[curr] + extend;
				return acc;
			}, {});
			newGrids = grids.reduce((acc, { row, col }) => {
				if (col <= adjustedLastCols[row]) {
					acc.push({ row, col });
				}
				return acc;
			}, []);
		} else {
			for (let i = 0; i < extend; i++) {
				for (const row in lastColOfRow) {
					newGrids.push({ row, col: lastColOfRow[row] + i + 1 });
				}
			}
		}
		return newGrids;
	}
	let grids = $derived(extendGrids(rangeTable?.[rangeId]?.grids, extend));
	let geometry = $derived.by(() => {
		let noCenter = false;
		let minRow = 0;
		let maxRow = 0;
		let minCol = 0;
		let maxCol = 0;
		if (grids) {
			noCenter = true;
			for (const { row, col } of grids) {
				if (row === 0 && col === 0) noCenter = false;
				if (row > maxRow) maxRow = row;
				if (row < minRow) minRow = row;
				if (col > maxCol) maxCol = col;
				if (col < minCol) minCol = col;
			}
		}
		return {
			noCenter,
			minRow,
			maxRow,
			minCol,
			width: sqSize + (maxCol - minCol) * sqSize,
			height: sqSize + (maxRow - minRow) * sqSize
		};
	});
	let { noCenter, minRow, maxRow, minCol, width, height } = $derived(geometry);
</script>

{#if grids}
	<svg {width} {height} viewBox="0 0 {width} {height}">
		{#each grids as grid}
			{@const { row, col } = grid}
			{@const newRow = row - minRow}
			{@const newCol = col - minCol}
			{#if row === 0 && col === 0}
				<use
					xlink:href={size === 'small' ? '#sq-white' : '#sq-blue'}
					x={newCol * sqSize}
					y={newRow * sqSize}
				/>
			{:else}
				<use
					xlink:href={size === 'small' ? '#sq-outline-sm' : '#sq-outline'}
					x={newCol * sqSize}
					y={newRow * sqSize}
				/>
			{/if}
		{/each}
		{#if noCenter}
			<use
				xlink:href={size === 'small' ? '#sq-white' : '#sq-blue'}
				x={0}
				y={((maxRow - minRow) / 2) * sqSize}
			/>
		{/if}
	</svg>
{:else}
	<p>{rangeId} not found!</p>
{/if}
