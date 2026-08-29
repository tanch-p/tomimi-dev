const FORMAT_VERSION = 1;

export const TOPICS = ['ro1', 'ro2', 'ro3', 'ro4', 'ro5', 'ro6'] as const;

export type Topic = (typeof TOPICS)[number];

export const topicToId = (topic: Topic): number => TOPICS.indexOf(topic);

export const idToTopic = (id: number): Topic | undefined => TOPICS[id];

export type UserRunStateRelic = {
	id: string;
	count?: number;
};

export type UserRunState = {
	topic: Topic;
	relics: UserRunStateRelic[];
	diff?: number;
	variation?: string;
	gold?: number;
	floor?: number;
	configIndex?: number;
};

const isTopic = (topic: string): topic is Topic => (TOPICS as readonly string[]).includes(topic);

/*
 * 这些数组是编码 URL 格式的一部分。URL 发布后，请勿重新排序或删除已有条目；
 * 如需新增遗物，请追加到数组末尾。每个主题都有自己独立的 ID 空间。
 */
/*
 * These arrays are part of the encoded URL format. Do not reorder or remove
 * entries after URLs have been published; append new relics instead. Each
 * topic has its own ID space.
 */
const RELIC_IDS: Partial<Record<Topic, readonly string[]>> = {
	ro6: [
		'rogue_6_relic_artifact_5',
		'rogue_6_relic_fight_25',
		'rogue_6_relic_final_3',
		'rogue_6_relic_fight_30',
		'rogue_6_relic_cargo_12',
		'rogue_6_relic_cargo_11',
		'rogue_6_relic_fight_26',
		'rogue_6_relic_legacy_84',
		'rogue_6_relic_legacy_85',
		'rogue_6_relic_legacy_86',
		'rogue_6_relic_legacy_87',
		'rogue_6_relic_legacy_88',
		'rogue_6_relic_legacy_56',
		'rogue_6_start_3',
		'rogue_6_start_4'
	]
};

const RELIC_TO_ID: Partial<Record<Topic, ReadonlyMap<string, number>>> = {
	ro6: new Map(RELIC_IDS.ro6?.map((relic, id) => [relic, id]))
};

// 变化项 ID 按主题分别定义，并且对于已发布的 URL 必须保持稳定。新增条目时请追加到末尾，
// 不要重新排序或删除现有条目。
// Variation IDs are topic-specific and stable for published URLs. Append new
// entries instead of reordering or removing existing ones.
const VARIATION_IDS: Partial<Record<Topic, readonly string[]>> = {
	ro6: ['rogue_6_weather_1', 'rogue_6_weather_2', 'rogue_6_variation_7']
};

const VARIATION_TO_ID: Partial<Record<Topic, ReadonlyMap<string, number>>> = {
	ro6: new Map(VARIATION_IDS.ro6?.map((variation, id) => [variation, id]))
};

// 每个可选字段在编码后的 flags VarInt 中占用一个位。某个位被设置后，表示该字段的值
// 会出现在后续载荷中；通过组合这些位掩码，可以用一个数字表示任意可选字段组合。
// Each optional field owns one bit in the encoded flags VarInt. Setting a bit means
// that field's value is present later in the payload; combining the masks lets one
// number describe any combination of optional fields.
const FLAG_VARIATION = 1 << 0; // 0001
const FLAG_DIFF = 1 << 1; // 0010
const FLAG_GOLD = 1 << 2; // 0100
const FLAG_FLOOR = 1 << 3; // 1000
const FLAG_CONFIG_INDEX = 1 << 4; // 10000

type Fields = Record<string, string>;

type EncodedRelic = {
	relicId: number;
	hasStack: boolean;
	stacks: number;
};

function writeVarint(bytes: number[], value: number): void {
	if (!Number.isSafeInteger(value) || value < 0) {
		throw new Error(`Invalid VarInt value: ${value}`);
	}

	do {
		let byte = value % 128;
		value = Math.floor(value / 128);

		if (value > 0) {
			byte |= 0x80;
		}

		bytes.push(byte);
	} while (value > 0);
}

function readVarint(bytes: Uint8Array, offset: number): { value: number; offset: number } {
	let value = 0;
	let multiplier = 1;

	while (offset < bytes.length) {
		const byte = bytes[offset++];
		value += (byte & 0x7f) * multiplier;

		if (!Number.isSafeInteger(value)) {
			throw new Error('VarInt is too large');
		}

		if ((byte & 0x80) === 0) {
			return { value, offset };
		}

		multiplier *= 128;

		if (!Number.isSafeInteger(multiplier)) {
			throw new Error('VarInt is too large');
		}
	}

	throw new Error('Unexpected end of compressed data');
}

function bytesToBase64Url(bytes: number[]): string {
	if (typeof Buffer !== 'undefined') {
		return Buffer.from(bytes).toString('base64url');
	}

	let binary = '';

	for (const byte of bytes) {
		binary += String.fromCharCode(byte);
	}

	return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
}

function base64UrlToBytes(input: string): Uint8Array {
	if (typeof Buffer !== 'undefined') {
		return Uint8Array.from(Buffer.from(input, 'base64url'));
	}

	const base64 = input
		.replace(/-/g, '+')
		.replace(/_/g, '/')
		.padEnd(Math.ceil(input.length / 4) * 4, '=');
	const binary = atob(base64);

	return Uint8Array.from(binary, (character) => character.charCodeAt(0));
}

function parseFields(input: string): Fields {
	const fields: Fields = {};

	for (const part of input.split(',')) {
		const separator = part.indexOf('=');

		if (separator === -1) {
			continue;
		}

		fields[part.slice(0, separator)] = part.slice(separator + 1);
	}

	return fields;
}

function parseNonNegativeInteger(name: string, value: string): number {
	const number = Number(value);

	if (!Number.isSafeInteger(number) || number < 0) {
		throw new Error(`Invalid ${name}: ${value}`);
	}

	return number;
}

function parseOptionalNonNegativeInteger(name: string, value: string): number | null {
	const number = Number(value);

	if (!Number.isSafeInteger(number)) {
		throw new Error(`Invalid ${name}: ${value}`);
	}

	return number < 0 ? null : number;
}

/** 将运行状态查询值压缩为带版本号的 Base64URL 字符串。 */
/** Compresses a run-state query value into a versioned Base64URL string. */
export function compress(input: string): string {
	const fields = parseFields(input);

	if (!fields.topic) {
		throw new Error('Missing topic');
	}

	if (!isTopic(fields.topic)) {
		throw new Error(`Unknown topic: ${fields.topic}`);
	}

	const topic = fields.topic;
	const topicId = topicToId(topic);

	for (const field of ['relics', 'diff', 'gold', 'floor']) {
		if (fields[field] == null) {
			throw new Error(`Missing ${field}`);
		}
	}

	const relicLookup = RELIC_TO_ID[topic];
	const relics: EncodedRelic[] = [];

	if (fields.relics !== '') {
		for (const rawRelic of fields.relics.split('|')) {
			const match = rawRelic.match(/^(.*?)(?::(\d+))?$/);

			if (!match) {
				continue;
			}

			const relicId = relicLookup?.get(match[1]);

			// 未知遗物会被有意忽略，使旧版客户端仍可编码较新的状态。
			// Unknown relics are intentionally omitted so old clients can encode newer states.
			if (relicId === undefined) {
				continue;
			}

			const hasStack = match[2] !== undefined;
			const stacks = hasStack ? Number(match[2]) : 1;

			if (!Number.isSafeInteger(stacks) || stacks < 1) {
				continue;
			}

			relics.push({ relicId, hasStack, stacks });
		}
	}

	const diff = parseOptionalNonNegativeInteger('diff', fields.diff);
	const gold = parseOptionalNonNegativeInteger('gold', fields.gold);
	const floor = parseOptionalNonNegativeInteger('floor', fields.floor);

	// configIndex 用于处理名称相同但配置不同的关卡自动跳转，例如“强买强卖”。
	// configIndex is used to handle the automatic navigation of stages with same name but different configurations, such as 强买强卖
	let configIndex =
		fields.configIndex == null
			? null
			: parseOptionalNonNegativeInteger('configIndex', fields.configIndex);

	// 索引 0 表示默认配置，因此无需在载荷中占用空间。
	// Index 0 is the default configuration and does not need to take space in the payload.
	if (configIndex === 0) configIndex = null;

	let variation: number | null = null;

	if (fields.variation != null) {
		variation = VARIATION_TO_ID[topic]?.get(fields.variation) ?? null;

		if (variation === null) {
			throw new Error(`Invalid variation: ${fields.variation}`);
		}
	}

	const bytes: number[] = [];
	writeVarint(bytes, FORMAT_VERSION);
	writeVarint(bytes, topicId);

	let flags = 0;

	if (variation !== null) flags |= FLAG_VARIATION;
	if (diff !== null) flags |= FLAG_DIFF;
	if (gold !== null) flags |= FLAG_GOLD;
	if (floor !== null) flags |= FLAG_FLOOR;
	if (configIndex !== null) flags |= FLAG_CONFIG_INDEX;

	writeVarint(bytes, flags);
	writeVarint(bytes, relics.length);

	for (const relic of relics) {
		writeVarint(bytes, relic.relicId * 2 + (relic.hasStack ? 1 : 0));

		if (relic.hasStack) {
			writeVarint(bytes, relic.stacks);
		}
	}

	if (variation !== null) {
		writeVarint(bytes, variation);
	}

	if (diff !== null) writeVarint(bytes, diff);
	if (gold !== null) writeVarint(bytes, gold);
	if (floor !== null) writeVarint(bytes, floor);
	if (configIndex !== null) writeVarint(bytes, configIndex);

	return bytesToBase64Url(bytes);
}

/** 将压缩后的运行状态值还原为规范化的查询值。 */
/** Restores a compressed run-state value to its canonical query value. */
export function decompress(input: string): string {
	const bytes = base64UrlToBytes(input);
	let offset = 0;

	const read = (): number => {
		const result = readVarint(bytes, offset);
		offset = result.offset;
		return result.value;
	};

	const version = read();

	if (version !== FORMAT_VERSION) {
		throw new Error(`Unsupported format version: ${version}`);
	}

	const topicId = read();
	const topic = idToTopic(topicId);

	if (topic === undefined) {
		throw new Error(`Unknown topic ID: ${topicId}`);
	}

	const flags = read();
	const hasVariation = (flags & FLAG_VARIATION) !== 0;
	const hasDiff = (flags & FLAG_DIFF) !== 0;
	const hasGold = (flags & FLAG_GOLD) !== 0;
	const hasFloor = (flags & FLAG_FLOOR) !== 0;
	const hasConfigIndex = (flags & FLAG_CONFIG_INDEX) !== 0;
	const relicCount = read();
	const relicTable = RELIC_IDS[topic] ?? [];
	const relics: string[] = [];

	for (let index = 0; index < relicCount; index++) {
		const packed = read();
		const hasStack = (packed & 1) === 1;
		const relicId = Math.floor(packed / 2);
		const relicName = relicTable[relicId];

		if (relicName === undefined) {
			throw new Error(`Unknown relic ID ${relicId} for topic ${topic}`);
		}

		if (!hasStack) {
			relics.push(relicName);
			continue;
		}

		const stacks = read();

		if (stacks < 1) {
			throw new Error(`Invalid stack count: ${stacks}`);
		}

		relics.push(`${relicName}:${stacks}`);
	}

	let variation: string | null = null;

	if (hasVariation) {
		const variationId = read();
		variation = VARIATION_IDS[topic]?.[variationId] ?? null;

		if (variation === null) {
			throw new Error(`Unknown variation ID ${variationId} for topic ${topic}`);
		}
	}

	const diff = hasDiff ? read() : null;
	const gold = hasGold ? read() : null;
	const floor = hasFloor ? read() : null;
	const configIndex = hasConfigIndex ? read() : null;

	if (offset !== bytes.length) {
		throw new Error('Unexpected trailing compressed data');
	}

	const parts = [`topic=${topic}`, `relics=${relics.join('|')}`];

	if (diff !== null) {
		parts.push(`diff=${diff}`);
	}

	if (variation !== null) {
		parts.push(`variation=${variation}`);
	}

	if (gold !== null) {
		parts.push(`gold=${gold}`);
	}

	if (floor !== null) {
		parts.push(`floor=${floor}`);
	}

	if (configIndex !== null) {
		parts.push(`configIndex=${configIndex}`);
	}

	return parts.join(',');
}

/** 将运行状态值解压为结构化对象。 */
/** Decompresses a run-state value into a structured object. */
export function decodeUserRunState(input: string): UserRunState {
	const fields = parseFields(decompress(input));

	if (!fields.topic || !isTopic(fields.topic)) {
		throw new Error(`Unknown topic: ${fields.topic}`);
	}

	if (fields.relics == null) {
		throw new Error('Missing relics');
	}

	const relics = fields.relics
		? fields.relics.split('|').map((value) => {
				const match = value.match(/^(.*?)(?::(\d+))?$/);

				if (!match) {
					throw new Error(`Invalid relic: ${value}`);
				}

				const count =
					match[2] === undefined ? undefined : parseNonNegativeInteger('count', match[2]);
				return { id: match[1], ...(count === undefined ? {} : { count }) };
		  })
		: [];

	const parseOptionalField = (
		name: 'diff' | 'gold' | 'floor' | 'configIndex'
	): number | undefined => {
		return fields[name] === undefined ? undefined : parseNonNegativeInteger(name, fields[name]);
	};

	return {
		topic: fields.topic,
		relics,
		diff: parseOptionalField('diff'),
		variation: fields.variation,
		gold: parseOptionalField('gold'),
		floor: parseOptionalField('floor'),
		configIndex: parseOptionalField('configIndex')
	};
}

/** 当运行状态值缺失、格式错误或主题不符合预期时返回 null。 */
/** Returns null for absent, malformed, or unexpected-topic run-state values. */
export function tryDecodeUserRunState(
	input: string | null,
	expectedTopic?: Topic
): UserRunState | null {
	if (!input) return null;

	try {
		const state = decodeUserRunState(input);
		return expectedTopic === undefined || state.topic === expectedTopic ? state : null;
	} catch {
		return null;
	}
}

/** 将结构化运行状态编码为用于剪贴板或查询参数的压缩值。 */
/** Encodes a structured run state into its compressed clipboard/query value. */
export function encodeUserRunState(state: UserRunState): string {
	const relics = state.relics.map(
		({ id, count }) => `${id}${count === undefined ? '' : `:${count}`}`
	);
	const parts = [`topic=${state.topic}`, `relics=${relics.join('|')}`, `diff=${state.diff ?? -1}`];

	if (state.variation) {
		parts.push(`variation=${state.variation}`);
	}

	parts.push(`gold=${state.gold ?? -1}`, `floor=${state.floor ?? -1}`);

	if (state.configIndex !== undefined && state.configIndex !== 0) {
		parts.push(`configIndex=${state.configIndex}`);
	}

	return compress(parts.join(','));
}

/** 将结构化运行状态编码，并把压缩后的值复制到剪贴板。 */
/** Encodes a structured run state and copies the compressed value to the clipboard. */
export async function copyRunState(state: UserRunState): Promise<void> {
	await navigator.clipboard.writeText(encodeUserRunState(state));
}
