export type StageGroup = {
	label?: string | number;
	rows: readonly (readonly string[])[];
};

export type StageInfo = {
	code: string;
	name_zh: string;
	[key: `name_${string}`]: string | null;
};

export type StageCollection = Record<string, StageInfo>;
