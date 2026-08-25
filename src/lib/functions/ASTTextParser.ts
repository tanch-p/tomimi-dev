export type TaggedTextNode = TaggedTextTagNode | TaggedTextNodeText;

export interface TaggedTextRootNode {
	type: 'root';
	children: TaggedTextNode[];
}

export interface TaggedTextTagNode {
	type: 'tag';
	name: string;
	children: TaggedTextNode[];
}

export interface TaggedTextNodeText {
	type: 'text';
	value: string;
}

export function parseTaggedText(input: string): TaggedTextRootNode {
	const root: TaggedTextRootNode = {
		type: 'root',
		children: []
	};
	const stack: Array<TaggedTextRootNode | TaggedTextTagNode> = [root];
	let cursor = 0;
	let textStart = 0;

	while (cursor < input.length) {
		const tagStart = input.indexOf('<', cursor);
		if (tagStart === -1) {
			break;
		}
		cursor = tagStart;

		if (input.startsWith('</>', cursor)) {
			appendTextNode(stack[stack.length - 1].children, input.slice(textStart, cursor));
			if (stack.length === 1) {
				throw new Error('Unexpected closing tag "</>" with no open tag to close.');
			}
			stack.pop();
			cursor += 3;
			textStart = cursor;
			continue;
		}

		const tagEnd = input.indexOf('>', cursor + 1);
		if (tagEnd === -1) {
			throw new Error(`Unterminated tag starting at index ${cursor}.`);
		}

		const tagName = input.slice(cursor + 1, tagEnd);
		if (!tagName || tagName.includes('<')) {
			throw new Error(`Invalid tag name "${tagName}" at index ${cursor}.`);
		}
		if (tagName.startsWith('/')) {
			throw new Error(`Invalid closing tag syntax "<${tagName}>". Use "</>" instead.`);
		}

		const currentNode = stack[stack.length - 1];
		appendTextNode(currentNode.children, input.slice(textStart, cursor));
		const node: TaggedTextTagNode = {
			type: 'tag',
			name: tagName,
			children: []
		};
		currentNode.children.push(node);
		stack.push(node);
		cursor = tagEnd + 1;
		textStart = cursor;
	}

	appendTextNode(stack[stack.length - 1].children, input.slice(textStart));

	if (stack.length > 1) {
		const unclosedTags = stack
			.slice(1)
			.map((node) => ('name' in node ? node.name : 'root'))
			.join(', ');
		throw new Error(`Unclosed tag(s): ${unclosedTags}`);
	}

	return root;
}

export function renderTaggedTextAsHtml(ast: TaggedTextRootNode): string {
	return `<div>${renderTaggedTextNodes(ast.children)}</div>`;
}

export function parseTaggedTextToHtml(input: string): string {
	return renderTaggedTextAsHtml(parseTaggedText(input));
}

function renderTaggedTextNodes(nodes: TaggedTextNode[]): string {
	return nodes
		.map((node) => {
			if (node.type === 'text') {
				return escapeHtmlText(node.value);
			}

			return `<div class="${escapeHtmlAttribute(node.name)}">${renderTaggedTextNodes(
				node.children
			)}</div>`;
		})
		.join('');
}

function appendTextNode(children: TaggedTextNode[], value: string): void {
	if (value.length === 0) {
		return;
	}

	const previousNode = children[children.length - 1];
	if (previousNode?.type === 'text') {
		previousNode.value += value;
		return;
	}

	children.push({
		type: 'text',
		value
	});
}

function escapeHtmlText(value: string): string {
	return value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
}

function escapeHtmlAttribute(value: string): string {
	return escapeHtmlText(value).replaceAll('"', '&quot;').replaceAll("'", '&#39;');
}
