export interface SkillStat {
    name: string;
    value: number;
    modifier: number;
}

export interface CharacterStat {
  name: string;
  value: number;
  modifier: number;
  skills: SkillStat[];
}

export interface Character {
  name: string;
  class: string;
  race: string;
  background: string;
  stats: CharacterStat[];
  proficiencies: string[];
}
