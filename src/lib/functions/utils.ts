import type { Language, MapConfig } from "$lib/types";
import stageNameOverwriteTable from "$lib/data/stages/stage_name_overwrite_table.json";

export function getStagePaths(
	mapConfig: MapConfig,
	language: Language,
	pathName: string
) {
	if (!mapConfig) {
		return {
			pathEN: pathName.replace(language, "en"),
			pathJA: pathName.replace(language, "ja"),
			pathZH: pathName.replace(language, "zh"),
		};
	}
	let pathEN, pathJA, pathZH;
	if (mapConfig.levelId === "level_rogue4_b-9") {
		pathEN = `/en/stages/ro4_b_9`;
		pathJA = `/ja/stages/ro4_b_9`;
		pathZH = `/zh/stages/ro4_b_9`;
	} else if (stageNameOverwriteTable[mapConfig.levelId]) {
		const info = stageNameOverwriteTable[mapConfig.levelId];
		pathEN = `/en/stages/${code}_${info["name_en"] || info["name_zh"]}`;
		pathJA = `/ja/stages/${code}_${info["name_ja"] || info["name_zh"]}`;
		pathZH = `/zh/stages/${code}_${info["name_zh"]}`;
	} else {
		pathEN = `/en/stages/${code}_${name_en || name_zh}`;
		pathJA = `/ja/stages/${code}_${name_ja || name_zh}`;
		pathZH = `/zh/stages/${code}_${name_zh}`;
	}

	return { pathEN, pathJA, pathZH };
}
