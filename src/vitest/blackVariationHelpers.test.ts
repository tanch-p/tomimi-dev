import { describe, expect, it } from 'vitest';
import {
	createGoldVariationEffect,
	goldVariation
} from '../routes/[lang=lang]/stages/(is)/[name=black_maps]/variationHelpers';

describe('black variation helpers', () => {
	it('creates the gold variation effect for the supplied gold amount', () => {
		const effect = createGoldVariationEffect(100);

		expect(effect.id).toBe(goldVariation.id);
		expect(effect.effects[0].mods).toEqual([
			{ key: 'hp', value: 2, mode: 'mul', order: 'initial' },
			{ key: 'atk', value: 1.4, mode: 'mul', order: 'initial' }
		]);
	});
});
