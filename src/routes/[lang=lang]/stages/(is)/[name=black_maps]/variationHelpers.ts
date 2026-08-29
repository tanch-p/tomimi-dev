import variation7 from '$lib/images/is/black/variation_7.webp';

export const goldVariation = {
	id: 'rogue_6_variation_7',
	name_zh: '“源石之城”',
	name_ja: '',
	name_en: '',
	iconId: 'rogue_6_variation_7',
	tooltip_zh:
		'完成节点后获得获得10源石锭，每拥有的1点源石锭为敌方提供1层攻击力+0.4%与生命值+1%的增益（最多叠加至100层）',
	tooltip_ja: '',
	tooltip_en: ''
};

export function createGoldVariationEffect(goldAmount: number) {
	return {
		...goldVariation,
		src: variation7,
		level: 0,
		effects: [
			{
				targets: ['ALL'],
				mods: [
					{ key: 'hp', value: 1 + 0.01 * goldAmount, mode: 'mul', order: 'initial' },
					{ key: 'atk', value: 1 + 0.004 * goldAmount, mode: 'mul', order: 'initial' }
				]
			}
		]
	};
}
