import { Component, CUSTOM_ELEMENTS_SCHEMA, EnvironmentInjector, inject, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { Character } from 'src/models/character.model';
import { CharacterState } from '../services/character-state';
import { CharacterStorageService } from '../services/character-storage';
import { CharacterDataService } from 'src/services/characterdata.service';
import {XPHB} from 'src/assets/spells/spellsource.json'
import spellNameJson from 'src/assets/spells/spellsXPHB.json'
import {Spells} from 'src/models/spells.model'
import {
  IonButton, IonButtons, IonHeader, IonToolbar, IonTitle, IonContent,
  IonItem, IonList, IonSelect, IonSelectOption, IonIcon,
  IonGrid, IonRow, IonCol, IonSearchbar
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  imports: [
    CommonModule,
    FormsModule,
    IonButton, IonButtons, IonHeader, IonToolbar, IonTitle, IonContent,
    IonItem, IonList, IonSelect, IonSelectOption, IonIcon,
    IonGrid, IonRow, IonCol, IonSearchbar
  ],
})

export class Tab3Page {
  character!: Character;
  characters: Character[] = [];
  spells: Spells[] = [];
  results: Spells[] = [];
  
  constructor(
  private characterDataService: CharacterDataService,
  private characterStorage: CharacterStorageService,
  private characterState: CharacterState) {  
    this.character = this.characterDataService.getCharacter()
  }


/* -------------------------------------------------*/
/* CHARACTER SAVE AND LOAD                          */
/* -------------------------------------------------*/
loadCharacterView = false;

async save() {
  this.character.id ??= crypto.randomUUID();
  this.character.createdAt ??= Date.now();
  this.character.updatedAt = Date.now();
  await this.characterStorage.saveCharacter(this.character);
  console.log('Character saved:', this.character.id);
}

async loadAll() {
  this.characters = await this.characterStorage.loadAllCharacters();
}

async loadCharacter(id: string) {
  const loaded = await this.characterStorage.loadCharacter(id);
  if (loaded) {
    const clone = structuredClone(loaded);
    this.character = clone;
    this.characterState.setCharacter(clone);
  }
}
    values = "";
  /* ------------------------------------------------ */
  /* SPELLS                                        */
  /* ------------------------------------------------ */
  classSpellName:object[] = [];

  BuildclassSpellName() { Object.entries(XPHB).forEach(([key, value]) => {
    this.values = key
    this.classSpellName.push([{[key]:value.class}])})

    
  }

  parseComponents(components: any): string[] {
  const result: string[] = [];

  if (components.v) result.push('V');
  if (components.s) result.push('S');
  if (components.m) result.push(`M (${components.m})`);

  return result;
}

parseEntries(entries: any[]): string[] {
  const result: string[] = [];

  for (const entry of entries) {
    if (typeof entry === 'string') {
      result.push(entry);
    } else if (entry.type === 'list' && entry.items) {
      result.push(...entry.items);
    }
  }

  return result;
}
isConcentration(duration: any[]): boolean {
  if (!Array.isArray(duration)) return false;

  return duration.some(d => d.concentration === true);
}

BuildSpells() {
  for (const s of spellNameJson.spells) {
    this.spells.push({
      name: s.name,
      level: s.level,
      school: s.school,
      concentration: this.isConcentration(s.duration),

      components: this.parseComponents(s.components),
      description: this.parseEntries(s.entries),

      range_area: s.range.type ?? '',
      attack_save: s.range.type ?? s.savingThrow ?? '',
      duration: Array.isArray(s.duration) ? s.duration.join(', ') : s.duration,
      casting_time: s.time?.[0] ? (s.time[0].number + ' ' + s.time[0].unit) : '',
    }) ?? []
    };
  }

  /* ------------------------------------------------ */
  /* SEARCH FUNCTION                                  */
  /* ------------------------------------------------ */
  searching = false;



handleInput(event: Event) {
  const target = event.target as HTMLIonSearchbarElement;
  const query = target.value?.toLowerCase() || '';
  console.log(this.classSpellName);
  if (query === "") {
    this.results = [];
  } else {
  this.results = this.spells.filter(spell =>
    spell.name.toLowerCase().includes(query)
  );}
}

 ngOnInit() {
  this.BuildSpells()
  this.BuildclassSpellName() 

 }
}
     