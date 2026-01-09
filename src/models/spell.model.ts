export interface classSpellList{
    class:string;
}

export interface Spell{
    id: string;
    name: string;
    level: number;
    school:string;
    concentration:boolean;
    class: string[];
    components:string[];
    description:string[];
    range_area:string;
    attack_save:string;
    duration:string;
    casting_time:string;   
}
