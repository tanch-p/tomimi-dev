// tiles: [tile_type,heightType,mask,blackboard]
// 0 is path, 1 is wall

const getWeights = (tileName, passableMask) => {
	if (passableMask === 1) {
		return Number.POSITIVE_INFINITY;
	}
	switch (tileName) {
		case 'tile_hole':
			return 1000000;

		default:
			return 0;
	}
};

export const generateMaze = (map, tiles) => {
	return map.reduce((acc, curr) => {
		const row = [];
		for (const index of curr) {
			const tileName = tiles[index][0];
			const passableMask = tiles[index][2];
			row.push(getWeights(tileName, passableMask));
		}
		acc.push(row);
		return acc;
	}, []);
};
