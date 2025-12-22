import { Injectable } from '@angular/core';
import { CharacterClass } from 'assets/models/characterclass.model';
import { Race } from '../models/race.model';

@Injectable({
  providedIn: 'root'
})
export class CharacterDataService {

  private classes: CharacterClass[] = [];
  private races: Race[] = [];

  constructor() {
    this.initClasses();
    this.initRaces();
  }

  private initClasses() {
    const classNames = ['Barbarian', 'Warlock']; // later auto-load

    this.classes = classNames.map(name =>
      new CharacterClass(
        name,
        `/assets/class/${name}.png`,
        'class description here',
        'abilities here'
      )
    );
  }

  private initRaces() {
    const raceNames = ['Elf', 'Dwarf']; // from json later

    this.races = raceNames.map(name =>
      new Race(
        name,
        `/assets/race/${name}.png`,
        'race description here',
        'features here'
      )
    );
  }

  getClasses(): CharacterClass[] {
    return this.classes;
  }

  getClassByName(name: string): CharacterClass | undefined {
    return this.classes.find(c => c.name === name);
  }

  getRaces(): Race[] {
    return this.races;
  }

  getRaceByName(name: string): Race | undefined {
    return this.races.find(r => r.name === name);
  }
}
