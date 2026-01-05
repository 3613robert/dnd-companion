import { Spells} from "./spells.model";

export interface SkillStat {
    name: string;
    value: number;
    modifier: number;
    isProficient?: boolean;
}

export interface CharacterStat {
  name: string;
  value: number;
  modifier: number;
  skills: SkillStat[];
}

export interface Character {
  id: string;
  name: string;
  level: number;
  class: string;
  race: string;
  background: string;
  stats: CharacterStat[];
  proficiencies: string[];
  spells: Spells;
  createdAt: number;
  updatedAt: number;
}
