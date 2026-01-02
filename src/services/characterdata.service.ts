import { Injectable } from '@angular/core';
import { Character } from '../models/character.model';
import { Race } from '../models/race.model';
import { skipLast } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CharacterDataService {

  character: Character = {
    name: '',
    level: 0,
    class: '',
    race: '',
    background: '',
    stats: [
      { name: 'Strength', value: 8, modifier: -1, skills: [ {name: 'Athletics', value: 8, modifier: -1, isProficient: false}]},
      { name: 'Dexterity', value: 8, modifier: -1, skills: [{name: 'Acrobatics', value: 8, modifier: -1, isProficient: false}, {name: 'Stealth', value: 8, modifier: -1, isProficient: false} ,{ name: 'Sleight of Hand', value: 8, modifier: -1, isProficient: false}]},
      { name: 'Constitution', value: 8, modifier: -1, skills: []},
      { name: 'Wisdom', value: 8, modifier: -1, skills: [{name: 'Insight', value: 8, modifier: -1, isProficient: false}, {name: 'Perception', value: 8, modifier: -1, isProficient: false} ,{ name: 'Animal Handling', value: 8, modifier: -1, isProficient: false}, { name: 'Medicine', value: 8, modifier: -1, isProficient: false}, { name: 'Survival', value: 8, modifier:-1, isProficient: false}]} ,
      { name:'Intelligence', value : 8 ,modifier : -1 ,skills : [{name:'Nature' ,value : 8 ,modifier : -1, isProficient: false}, {name:'Arcana' ,value : 8 ,modifier : -1, isProficient: false} ,{ name:'Investigation' ,value : 8 ,modifier : -1, isProficient: false}, { name:'History' ,value : 8 ,modifier : -1, isProficient: false}, { name:'Religion' ,value : 8 ,modifier : -1, isProficient: false}]},
      { name:'Charisma' ,value : 8 ,modifier : -1,skills:[{name:'Persuasion' ,value : 8 ,modifier :-1, isProficient: false},{name:'Intimidation' ,value : 8 ,modifier :-1, isProficient: false} ,{ name:'Deception' ,value : 8 ,modifier :-1, isProficient: false}, {name:'Performance' ,value : 8 ,modifier :-1, isProficient: false}]}
    ],
    proficiencies: [],
  };

  getCharacter(): Character {
    return this.character;
  }

  updateCharacter(update: Partial<Character>) {
    Object.assign(this.character, update);
  }}
