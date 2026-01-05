export interface classSpellList{
    class:string;
}

export interface Spells{
    name: string;
    level: number;
    school:string;
    concentration:boolean;
    components:string[];
    description:string[];
    range_area:string;
    attack_save:string;
    duration:string;
    casting_time:string;
    
}
