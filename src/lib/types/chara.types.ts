export type SortOption = {
    key: string;
    subKey: string | null;
    suffix: string | null;
    order: -1 | 0 | 1;
    priority: number | null;
};

export type Character = {
  id: string;
  appellation: string;
  name: string;
  desc: string;
  release_time: number;
  tags: string[];
  blackboard: BlackboardEntry[];
  powers: string[];
  position: string;
  isSpChar: boolean;
  rarity: string;
  profession: string;
  subProfessionId: string;
  stats: Stats;
  potential: Potential[];
  favorData: FavorData;
  tokens: unknown[];
  skills: Skill[];
  talents: Talent[];
  uniequip: UniEquip[];
};

type Stats = {
  rangeId: string;
  level: number;
  hp: number;
  atk: number;
  def: number;
  res: number;
  cost: number;
  blockCnt: number;
  aspd: number;
  respawnTime: number;
};

type Potential = {
  desc: string;
  attribute: Record<string, number>;
};

type FavorData = {
  hp: number;
  atk: number;
};

type Skill = {
  skillId: string;
  name: string;
  skillType: string;
  durationType: string;
  spType: string;
  levels: SkillLevel[];
  tags: string[];
  blackboard: BlackboardEntry[];
};

type SkillLevel = {
  rangeId: string | null;
  desc: string;
  spData: SpData;
  duration: number;
};

type SpData = {
  maxChargeTime: number;
  spCost: number;
  initSp: number;
  increment: number;
};

type BlackboardEntry = {
  key: string;
  value?: number;
  targets?: number;
  duration?: number;
  target_air?: boolean;
  order?: string;
};

type Talent = {
  prefabKey: string;
  name: string;
  desc: string;
  rangeId: string | null;
  tags: string[];
  blackboard: BlackboardEntry[];
};

type UniEquip = {
  uniEquipId: string;
  name: string;
  typeIcon: string;
  combatData: CombatData | null;
};

type CombatData = {
  phases: Phase[];
  tags: string[];
  blackboard: BlackboardEntry[];
};

type Phase = {
  parts: Part[];
  attributeBlackboard: BlackboardEntry[];
  tokenAttributeBlackboard: Record<string, unknown>;
};

type Part = {
  resKey: string | null;
  target: string;
  isToken: boolean;
  addDesc?: string | null;
  overrideDesc?: string;
  name?: string;
  displayRangeId?: boolean;
  rangeId?: string | null;
  talentIndex?: number;
  upgradeDesc?: string;
};