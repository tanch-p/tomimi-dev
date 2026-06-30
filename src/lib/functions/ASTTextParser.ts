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

type TaggedTextToken =
	| {
			type: 'open';
			name: string;
	  }
	| {
			type: 'close';
	  }
	| {
			type: 'text';
			value: string;
	  };

export function parseTaggedText(input: string): TaggedTextRootNode {
	const tokens = tokenizeTaggedText(input);
	const root: TaggedTextRootNode = {
		type: 'root',
		children: []
	};
	const stack: Array<TaggedTextRootNode | TaggedTextTagNode> = [root];

	for (const token of tokens) {
		const currentNode = stack[stack.length - 1];

		switch (token.type) {
			case 'text':
				appendTextNode(currentNode.children, token.value);
				break;
			case 'open': {
				const node: TaggedTextTagNode = {
					type: 'tag',
					name: token.name,
					children: []
				};
				currentNode.children.push(node);
				stack.push(node);
				break;
			}
			case 'close':
				if (stack.length === 1) {
					throw new Error('Unexpected closing tag "</>" with no open tag to close.');
				}
				stack.pop();
				break;
		}
	}

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

function tokenizeTaggedText(input: string): TaggedTextToken[] {
	const tokens: TaggedTextToken[] = [];
	let cursor = 0;

	while (cursor < input.length) {
		if (input.startsWith('</>', cursor)) {
			tokens.push({ type: 'close' });
			cursor += 3;
			continue;
		}

		if (input[cursor] === '<') {
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

			tokens.push({
				type: 'open',
				name: tagName
			});
			cursor = tagEnd + 1;
			continue;
		}

		const nextTagStart = input.indexOf('<', cursor);
		const textEnd = nextTagStart === -1 ? input.length : nextTagStart;
		tokens.push({
			type: 'text',
			value: input.slice(cursor, textEnd)
		});
		cursor = textEnd;
	}

	return tokens;
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
