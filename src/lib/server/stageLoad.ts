import enemyDatabase from '$lib/data/enemy/enemy_database.json';
import ISStages from '$lib/data/stages/stage_name_lookup_table.json';
import { overwriteBlackboard } from '$lib/functions/skillHelpers';
import { sortEnemies } from '$lib/functions/lib';
import { parseTraps } from '$lib/functions/trapHelpers';
import type { Enemy, Language, MapConfig } from '$lib/types';

type MutableEnemyStats = Record<string, unknown> & {
	traits: Enemy['traits'];
};

type StageEnemyConfig = {
	id: string;
	prefabKey: string;
	level: number;
	overwrittenData?: Record<string, unknown>;
};

type MultiStageData = Record<string, unknown> & {
	data: MapConfig[];
};

const stageIndex = ISStages as unknown as Record<string, { key: string }>;
const enemyTemplates = enemyDatabase as unknown as Record<string, Enemy>;

export const getStageData = async (stageName: string) => {
	const levelId = stageIndex[stageName]?.key;
	if (!levelId) {
		throw new Error(`Unknown stage: ${stageName}`);
	}

	const data = await import(
		`../data/stages/ro_stage_data/level_${levelId.replace('level_', '')}.json`
	);
	return data.default;
};

export const prepareStage = (mapConfig: MapConfig, language: Language) => {
	const enemies = (mapConfig.enemies as unknown as StageEnemyConfig[]).map(
		({ id, prefabKey, level, overwrittenData }) => {
			const enemy = structuredClone(enemyTemplates[prefabKey]);
			const stats = structuredClone(enemy.stats[level]) as unknown as MutableEnemyStats;

			enemy.stageId = id;
			enemy.level = level;
			Object.assign(enemy, { stats });
			if (overwrittenData) {
				enemy.overwritten = true;
				for (const key in overwrittenData) {
					if (key === 'talentBlackboard') {
						overwriteBlackboard(stats, overwrittenData[key]);
					} else if (key === 'levelType') {
						if (overwrittenData[key] === 'NORMAL') {
							enemy.type = enemy.type.filter((type) => !['BOSS', 'ELITE'].includes(type));
						}
					} else {
						stats[key] = overwrittenData[key];
					}
				}
			}
			enemy.traits = stats.traits;
			return enemy;
		}
	);

	const weights: Record<string, number> = {};
	for (const [index, enemy] of enemies.entries()) {
		if (weights[enemy.id] === undefined) {
			weights[enemy.id] = index;
		}
	}
	enemies.sort((a: Enemy, b: Enemy) => weights[a.id] - weights[b.id]);
	if (
		!mapConfig.id.includes('duel') &&
		!mapConfig.id.includes('_t_') &&
		!mapConfig.id.includes('_ev_')
	) {
		enemies.sort(sortEnemies);
	}

	const traps = parseTraps(mapConfig.traps, language);
	return { mapConfig, enemies, traps };
};

export const loadStage = async (stageName: string, language: Language) => {
	const mapConfig = (await getStageData(stageName)) as MapConfig;
	return prepareStage(mapConfig, language);
};

export const loadStageVariants = async (stageName: string, language: Language) => {
	const stageData = (await getStageData(stageName)) as MultiStageData;
	return {
		stageData,
		stages: stageData.data.map((mapConfig: MapConfig) => prepareStage(mapConfig, language))
	};
};
