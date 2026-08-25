import { describe, expect, it } from 'vitest';
import { getTooltipHtml, renderTextLine } from '$lib/functions/textParser';

describe('textParser', () => {
	it('renders a term as a lightweight tooltip trigger', () => {
		const html = renderTextLine('<ba.buffres>Status Resistance</>', 'en');

		expect(html).toContain('data-term="ba.buffres"');
		expect(html).toContain('Status Resistance');
		expect(html).not.toContain('data-term="ba.stun"');
	});

	it('renders a term description only when it is requested', () => {
		const html = getTooltipHtml('ba.buffres', 'en');

		expect(html).toContain('Status Resistance');
		expect(html).toContain('data-term="ba.stun"');
		expect(html).not.toContain('tooltiptext');
	});
});
