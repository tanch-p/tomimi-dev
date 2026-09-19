import { expect, test } from 'vitest';
import { obstacleEventStore } from '$lib/components/StageSimulator/stores/obstacleEvents';

test('obstacle event store records a shareable placement and its removal in order', () => {
	obstacleEventStore.reset('level_test');
	const placementId = obstacleEventStore.recordPlacement(
		1.25,
		{ row: 2, col: 3 },
		'trap_001_crate'
	);
	obstacleEventStore.recordRemoval(4.75, { row: 2, col: 3 }, 'trap_001_crate', placementId);

	const snapshot = obstacleEventStore.getSnapshot();
	expect(snapshot).toStrictEqual({
		version: 1,
		levelId: 'level_test',
		events: [
			{
				action: 'place',
				time: 1.25,
				position: { row: 2, col: 3 },
				trapKey: 'trap_001_crate',
				placementId: 'obstacle-1'
			},
			{
				action: 'remove',
				time: 4.75,
				position: { row: 2, col: 3 },
				trapKey: 'trap_001_crate',
				placementId: 'obstacle-1'
			}
		]
	});
	expect(JSON.parse(obstacleEventStore.serialize())).toStrictEqual(snapshot);
});

test('reset clears events and restarts deterministic placement IDs', () => {
	obstacleEventStore.reset('level_first');
	obstacleEventStore.recordPlacement(1, { row: 0, col: 0 }, 'trap_001_crate');

	obstacleEventStore.reset('level_second');
	const placementId = obstacleEventStore.recordPlacement(2, { row: 1, col: 1 }, 'trap_001_crate');

	expect(placementId).toBe('obstacle-1');
	expect(obstacleEventStore.getSnapshot().levelId).toBe('level_second');
	expect(obstacleEventStore.getSnapshot().events).toHaveLength(1);
});

test('recording after a backward seek discards events from the abandoned future', () => {
	obstacleEventStore.reset('level_branch');
	obstacleEventStore.recordPlacement(100, { row: 1, col: 1 }, 'trap_001_crate');
	obstacleEventStore.recordPlacement(300, { row: 2, col: 2 }, 'trap_001_crate');
	obstacleEventStore.recordRemoval(350, { row: 2, col: 2 }, 'trap_001_crate', 'obstacle-2');

	const branchedPlacementId = obstacleEventStore.recordPlacement(
		200,
		{ row: 3, col: 3 },
		'trap_001_crate'
	);

	expect(branchedPlacementId).toBe('obstacle-3');
	expect(obstacleEventStore.getSnapshot().events).toStrictEqual([
		{
			action: 'place',
			time: 100,
			position: { row: 1, col: 1 },
			trapKey: 'trap_001_crate',
			placementId: 'obstacle-1'
		},
		{
			action: 'place',
			time: 200,
			position: { row: 3, col: 3 },
			trapKey: 'trap_001_crate',
			placementId: 'obstacle-3'
		}
	]);
});
