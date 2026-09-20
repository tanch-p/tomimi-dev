import { describe, it, expect } from 'vitest';
import enemyDB from '../lib/data/enemy/enemy_database.json' with { type: 'json' };
import enemySkills from '../lib/data/enemy/enemy_skills.json' with { type: 'json' };
import trapsDB from '../lib/data/trap/traps.json' with { type: 'json' };
import trapSkills from '../lib/data/trap/traps_skills.json' with { type: 'json' };

describe('Skill key check', () => {
	it('enemy skills', () => {
		const undefinedKeyList: [string, string][] = [];

		for (const [key, enemy] of Object.entries(enemyDB)) {
			for (const stats of enemy['stats']) {
				for (const skill of stats['traits']) {
					if (!enemySkills[skill.key]) {
						undefinedKeyList.push([key, skill.key]);
					}
				}
				for (const form of stats['special']) {
					for (const skill of form) {
						if (!enemySkills[skill.key]) {
							undefinedKeyList.push([key, skill.key]);
						}
					}
				}
			}
		}
		console.log(undefinedKeyList);
		expect(undefinedKeyList.length).toBe(0);
	});
	it('trap skills', () => {
		const undefinedKeyList: [string, string][] = [];

		for (const [key, trap] of Object.entries(trapsDB)) {
			const skills = [
				...trap['skills'],
				...trap['talents'],
				...trap['special'].flatMap((ele) => ele)
			];
			for (const skillKey of skills) {
				if (!trapSkills[skillKey]) {
					undefinedKeyList.push([key, skillKey]);
				}
			}
		}
		console.log(undefinedKeyList);
		expect(undefinedKeyList.length).toBe(0);
	});
});
