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
    class: '',
    race: '',
    background: '',
    stats: [
      { name: 'Strength', value: 8, modifier: -1, skills: [ {name: 'Athletics', value: 8, modifier: -1}]},
      { name: 'Dexterity', value: 8, modifier: -1, skills: [{name: 'Acrobatics', value: 8, modifier: -1}, {name: 'Stealth', value: 8, modifier: -1} ,{ name: 'Sleight of Hand', value: 8, modifier: -1}]},
      { name: 'Constitution', value: 8, modifier: -1, skills: []},
      { name: 'Wisdom', value: 8, modifier: -1, skills: [{name: 'Insight', value: 8, modifier: -1}, {name: 'Perception', value: 8, modifier: -1} ,{ name: 'Animal Handling', value: 8, modifier: -1}, { name: 'Medicine', value: 8, modifier: -1}, { name: 'Survival', value: 8, modifier: -1}]} ,
      { name: 'Intelligence', value: 8, modifier: -1, skills: [{name: 'Nature', value: 8, modifier: -1}, {name: 'Arcana', value: 8, modifier: -1} ,{ name: 'Investigation', value: 8, modifier: -1}, { name: 'History', value: 8, modifier: -1}, { name: 'Religion', value: 8, modifier: -1}]},
      { name: 'Charisma', value: 8, modifier: -1, skills:[{name: 'Persuasion', value: 8, modifier: -1}, {name: 'Intimidation', value: 8, modifier: -1} ,{ name: 'Deception', value: 8, modifier: -1}, {name: 'Performance', value: 8, modifier: -1}]},
    ],
    proficiencies: [],
  };

  getCharacter(): Character {
    return this.character;
  }

  updateCharacter(update: Partial<Character>) {
    Object.assign(this.character, update);
  }}
