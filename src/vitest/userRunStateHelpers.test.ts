import { describe, expect, it } from 'vitest';
import {
	compress,
	copyRunState,
	decodeUserRunState,
	decompress,
	encodeUserRunState,
	idToTopic,
	topicToId,
	tryDecodeUserRunState
} from '$lib/functions/userRunStateHelpers';

describe('user run state helpers', () => {
	it('round-trips an IS6 state with a variation and relic stacks', () => {
		const state =
			'topic=ro6,relics=rogue_6_relic_artifact_5|rogue_6_relic_fight_30:3|rogue_6_relic_final_3,diff=15,variation=rogue_6_weather_1,gold=100,floor=5';

		expect(compress(state)).toBe('AQUPAwAHAwQAD2QF');
		expect(decompress(compress(state))).toBe(state);
	});

	it('uses zero-based topic IDs', () => {
		expect(topicToId('ro1')).toBe(0);
		expect(topicToId('ro6')).toBe(5);
		expect(idToTopic(0)).toBe('ro1');
		expect(idToTopic(5)).toBe('ro6');
		expect(idToTopic(6)).toBeUndefined();
	});

	it.each(['ro1', 'ro2', 'ro3', 'ro4', 'ro5', 'ro6'])('round-trips the %s topic', (topic) => {
		const state = `topic=${topic},relics=,diff=10,gold=0,floor=1`;

		expect(decompress(compress(state))).toBe(state);
	});

	it('supports an empty relic list', () => {
		const state = 'topic=ro6,relics=,diff=0,gold=0,floor=0';

		expect(decompress(compress(state))).toBe(state);
	});

	it('ignores unknown relics while encoding', () => {
		const state = 'topic=ro6,relics=unknown_relic|rogue_6_relic_final_3,diff=1,gold=2,floor=3';

		expect(decompress(compress(state))).toBe(
			'topic=ro6,relics=rogue_6_relic_final_3,diff=1,gold=2,floor=3'
		);
	});

	it('ignores negative diff, gold, and floor values', () => {
		const state = 'topic=ro6,relics=,diff=-1,gold=-2,floor=-3,configIndex=-4';

		expect(decompress(compress(state))).toBe('topic=ro6,relics=');
	});

	it('round-trips a non-default config index', () => {
		const state = 'topic=ro6,relics=,diff=1,gold=2,floor=3,configIndex=2';
		expect(decompress(compress(state))).toBe(state);
	});

	it('omits the default config index', () => {
		const state = 'topic=ro6,relics=,diff=1,gold=2,floor=3,configIndex=0';
		expect(decompress(compress(state))).toBe('topic=ro6,relics=,diff=1,gold=2,floor=3');
	});

	it('decodes a compressed value into structured run state', () => {
		const encoded = compress(
			'topic=ro6,relics=rogue_6_relic_fight_30:3,diff=15,variation=rogue_6_weather_1,gold=100,floor=5,configIndex=2'
		);

		expect(decodeUserRunState(encoded)).toEqual({
			topic: 'ro6',
			relics: [{ id: 'rogue_6_relic_fight_30', count: 3 }],
			diff: 15,
			variation: 'rogue_6_weather_1',
			gold: 100,
			floor: 5,
			configIndex: 2
		});
	});

	it('encodes structured run state', () => {
		expect(
			encodeUserRunState({
				topic: 'ro6',
				relics: [{ id: 'rogue_6_relic_fight_30', count: 3 }],
				diff: 15,
				variation: 'rogue_6_weather_1',
				gold: 100,
				floor: 5,
				configIndex: 2
			})
		).toBe(
			compress(
				'topic=ro6,relics=rogue_6_relic_fight_30:3,diff=15,variation=rogue_6_weather_1,gold=100,floor=5,configIndex=2'
			)
		);
	});

	it('copies structured run state to the clipboard', async () => {
		const clipboardValue: string[] = [];
		const originalNavigator = globalThis.navigator;
		Object.defineProperty(globalThis, 'navigator', {
			configurable: true,
			value: { clipboard: { writeText: async (value: string) => clipboardValue.push(value) } }
		});

		try {
			await copyRunState({ topic: 'ro6', relics: [], diff: 1, gold: 2, floor: 3 });
			expect(clipboardValue).toEqual([compress('topic=ro6,relics=,diff=1,gold=2,floor=3')]);
		} finally {
			Object.defineProperty(globalThis, 'navigator', {
				configurable: true,
				value: originalNavigator
			});
		}
	});

	it.each(['rogue_6_weather_1', 'rogue_6_weather_2', 'rogue_6_variation_7'])(
		'round-trips the %s variation',
		(variation) => {
			const state = `topic=ro6,relics=,diff=1,variation=${variation},gold=2,floor=3`;
			expect(decompress(compress(state))).toBe(state);
		}
	);

	it('rejects unknown variations', () => {
		expect(() =>
			compress('topic=ro6,relics=,diff=1,variation=rogue_6_variation_99,gold=2,floor=3')
		).toThrow('Invalid variation: rogue_6_variation_99');
	});

	it('returns null for malformed or unexpected-topic run state', () => {
		expect(tryDecodeUserRunState('not-valid', 'ro6')).toBeNull();

		const ro5State = compress('topic=ro5,relics=,diff=1,gold=2,floor=3');
		expect(tryDecodeUserRunState(ro5State, 'ro6')).toBeNull();
	});

	it('rejects missing and invalid required fields', () => {
		expect(() => compress('topic=ro6,relics=,diff=1,gold=2')).toThrow('Missing floor');
		expect(() => compress('topic=ro7,relics=,diff=1,gold=2,floor=3')).toThrow('Unknown topic: ro7');
		expect(() => compress('topic=ro6,relics=,diff=nope,gold=2,floor=3')).toThrow(
			'Invalid diff: nope'
		);
	});

	it('rejects malformed compressed values', () => {
		expect(() => decompress('')).toThrow('Unexpected end of compressed data');
		expect(() => decompress('Ag')).toThrow('Unsupported format version: 2');
	});
});
