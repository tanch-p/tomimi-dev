import { describe, expect, it } from 'vitest';
import {
	parseTaggedText,
	parseTaggedTextToHtml,
	renderTaggedTextAsHtml
} from '$lib/functions/ASTTextParser';

describe('ASTTextParser', () => {
	it('renders the provided sample into nested div markup', () => {
		const input =
			'攻击范围<@ba.vup>扩大</>，攻击时攻击力提升至<@ba.vup>180%</>\\n<ba.overdrive>过载</>：主动关闭时发射剩余全部弹药攻击随机敌人\\n<@ba.rem>技能拥有<@ba.vup>10</>枚弹药，可随时主动关闭</>';

		expect(parseTaggedTextToHtml(input)).toBe(
			'<div>攻击范围<div class="@ba.vup">扩大</div>，攻击时攻击力提升至<div class="@ba.vup">180%</div>\\n<div class="ba.overdrive">过载</div>：主动关闭时发射剩余全部弹药攻击随机敌人\\n<div class="@ba.rem">技能拥有<div class="@ba.vup">10</div>枚弹药，可随时主动关闭</div></div>'
		);
	});

	it('renders the yao healing example into nested div markup', () => {
		const input =
			'友方单位受到遥的治疗效果时，对周围<@ba.vup>3</>名敌人造成相当于治疗量<@ba.vup>200%</>的法术伤害\\n<@ba.rem>第二次及以后使用时攻击力<@ba.vup>+40%</>，且持续时间无限</>';

		expect(parseTaggedTextToHtml(input)).toBe(
			'<div>友方单位受到遥的治疗效果时，对周围<div class="@ba.vup">3</div>名敌人造成相当于治疗量<div class="@ba.vup">200%</div>的法术伤害\\n<div class="@ba.rem">第二次及以后使用时攻击力<div class="@ba.vup">+40%</div>，且持续时间无限</div></div>'
		);
	});

	it('builds an AST that preserves nested tag structure', () => {
		const ast = parseTaggedText('<outer>a<inner>b</>c</>');

		expect(ast).toStrictEqual({
			type: 'root',
			children: [
				{
					type: 'tag',
					name: 'outer',
					children: [
						{
							type: 'text',
							value: 'a'
						},
						{
							type: 'tag',
							name: 'inner',
							children: [
								{
									type: 'text',
									value: 'b'
								}
							]
						},
						{
							type: 'text',
							value: 'c'
						}
					]
				}
			]
		});
	});

	it('escapes text content while preserving actual newlines', () => {
		const ast = parseTaggedText('A & B\n<tag>"quoted" > value</>');

		expect(renderTaggedTextAsHtml(ast)).toBe(
			'<div>A &amp; B\n<div class="tag">"quoted" &gt; value</div></div>'
		);
	});

	it('throws on an unmatched closing tag', () => {
		expect(() => parseTaggedText('text</>')).toThrow(
			'Unexpected closing tag "</>" with no open tag to close.'
		);
	});

	it('throws on unclosed tags', () => {
		expect(() => parseTaggedText('<a>text')).toThrow('Unclosed tag(s): a');
	});
});
