import { describe, expect, it } from 'vitest';
import { updateOtherBuffsList } from '$lib/functions/buffHelpers';

interface TestBuff {
	key: string;
	exclusiveGroup?: string;
	activeTargets: { key: string; count: number }[];
	maxCount: number;
}

const createStore = (initialValue: TestBuff[]) => {
	let value = initialValue;
	return {
		get value() {
			return value;
		},
		update(updater: (current: TestBuff[]) => TestBuff[]) {
			value = updater(value);
		}
	};
};

describe('updateOtherBuffsList', () => {
	it('allows only one buff from an exclusive group on the same target', () => {
		const store = createStore([
			{
				key: 'normal',
				exclusiveGroup: 'possessed',
				activeTargets: [
					{ key: 'enemy-a', count: 1 },
					{ key: 'enemy-b', count: 1 }
				],
				maxCount: 1
			},
			{
				key: 'berserk',
				exclusiveGroup: 'possessed',
				activeTargets: [],
				maxCount: 1
			}
		]);

		updateOtherBuffsList(store, 'berserk', 'enemy-a');

		expect(store.value[0].activeTargets).toEqual([
			{ key: 'enemy-a', count: 0 },
			{ key: 'enemy-b', count: 1 }
		]);
		expect(store.value[1].activeTargets).toEqual([{ key: 'enemy-a', count: 1 }]);
	});

	it('does not alter buffs outside the exclusive group', () => {
		const store = createStore([
			{
				key: 'normal',
				exclusiveGroup: 'possessed',
				activeTargets: [],
				maxCount: 1
			},
			{
				key: 'unrelated',
				activeTargets: [{ key: 'enemy-a', count: 1 }],
				maxCount: 1
			}
		]);

		updateOtherBuffsList(store, 'normal', 'enemy-a');

		expect(store.value[1].activeTargets).toEqual([{ key: 'enemy-a', count: 1 }]);
	});
});
