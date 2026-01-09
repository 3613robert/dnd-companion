import { Component, CUSTOM_ELEMENTS_SCHEMA, EnvironmentInjector, inject, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { Character } from 'src/models/character.model';
import { CharacterState } from '../services/character-state';
import { CharacterStorageService } from '../services/character-storage';
import { CharacterDataService } from 'src/services/characterdata.service';
import classSpellNameJson from 'src/assets/spells/spellsource.json'
import spellNameJson from 'src/assets/spells/spellsXPHB.json'
import {Spell} from 'src/models/spell.model'
import { IonButton, IonButtons, IonHeader, IonToolbar, IonTitle, IonContent,
         IonItem, IonList, IonSelect, IonSelectOption, IonIcon,
         IonGrid, IonRow, IonCol, IonSearchbar} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  add, triangle, ellipse, square, heart, diamond, dice,
  clipboard, checkmarkDone, statsChart, checkmark, storefront, bag, menu, save, saveOutline, saveSharp, checkmarkDoneCircleOutline,
  thumbsUpSharp
  } from 'ionicons/icons';
import { key } from 'localforage';

/* -------------------------------------------------*/
/* Types                 */
/* -------------------------------------------------*/


  type SortableSpellKey = keyof Pick<Spell, 
    'name'|'level'| 'school' | 'concentration'>;

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
    IonGrid, IonRow, IonCol, IonSearchbar],
})

export class Tab3Page {
  character!: Character;
  characters: Character[] = [];
  spells: Spell[] = [];
  results: Spell[] = [];
  sortProperty: SortableSpellKey | null = null;
  sortDirection: 'asc' | 'desc' = 'asc';


  constructor(
  private router:Router,
  private route: ActivatedRoute,
  private characterDataService: CharacterDataService,
  private characterStorage: CharacterStorageService,
  private characterState: CharacterState) {  
    this.character = this.characterDataService.getCharacter();
    addIcons({
          add, triangle, ellipse, square, heart, diamond, dice,
          clipboard, checkmark, checkmarkDone, statsChart, storefront, bag, menu, save, saveOutline, saveSharp, checkmarkDoneCircleOutline})
  }


/* -------------------------------------------------*/
/* CHARACTER SAVE AND LOAD                          */
/* -------------------------------------------------*/

  loadCharacterView = false;

  loadScreen() {
    
  }
  
  async save() {
    this.character.id ??= crypto.randomUUID();
    this.character.createdAt ??= Date.now();
    this.character.updatedAt = Date.now();
    await this.characterStorage.saveCharacter(this.character);
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
  goToLoad() {
    this.router.navigate(['/tabs/tab4'], {
      queryParams: { view: 'load' }
    });
  }
    values = "";
  /* ------------------------------------------------ */
  /* PARSERS                                          */
  /* ------------------------------------------------ */

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

parseClasses(classList: any[]): string[] {
  const result: string[] = [];

  for (const cls of classList) {
    if (typeof cls.name === 'string') {
      result.push(cls.name);
    }
  }

  return result;
}


  /* ------------------------------------------------ */
  /* BUILD SPELLS LIST                                */
  /* ------------------------------------------------ */
  classSpellName:string[][] = [];

  BuildclassSpellName() {
    this.classSpellName = Object.values(classSpellNameJson.XPHB).map(
      value => this.parseClasses(value.class)
    );
  }


  isConcentration(duration: any[]): boolean {
    if (!Array.isArray(duration)) return false;

    return duration.some(d => d.concentration === true);
  }

  BuildSpells() {
    this.spells = spellNameJson.spells.map((s, index) => ({
      id: index.toString(),
      name: s.name,
      level: s.level,
      school: s.school,
      concentration: this.isConcentration(s.duration),
      class: this.classSpellName[index], // string[]      
      components: this.parseComponents(s.components),
      description: this.parseEntries(s.entries), 
      range_area: s.range?.type ?? '',
      attack_save: s.range?.type ?? s.savingThrow ?? '',
      duration: Array.isArray(s.duration) ? s.duration.join(', ') : s.duration,
      casting_time: s.time?.[0]
        ? `${s.time[0].number} ${s.time[0].unit}`
        : '',
    }));
  }


  /* ------------------------------------------------ */
  /* ADD SPELLS TO CHARACTER                          */
  /* ------------------------------------------------ */

  addSpell(spell: Spell) {
    const exists = this.character.spells.some(s => s.id === spell.id);
    if (!exists) {
      this.character.spells.push(spell);
    }
    this.save();
  }

  removeSpell(spell: Spell) {
    const exists = this.character.spells.some(s => s.id === spell.id);
    const index = this.character.spells.indexOf(spell)
    if (exists) {
      this.character.spells.splice(index, 1);
    }
    console.log(this.character.spells)
  }

  spellInList(spell: Spell) {
    const exists = this.character.spells.some(s => s.id === spell.id);
    if (exists) {
      return true;
    } else {return false}
  }


  /* ------------------------------------------------ */
  /* SEARCH FUNCTION                                  */
  /* ------------------------------------------------ */

  handleInput(event: Event) {
    const target = event.target as HTMLIonSearchbarElement;
    const query = target.value?.toLowerCase().trim() || '';
    if (query === "") {
      this.results = [];
    } else {
    this.results = this.spells.filter(spell =>
      spell.name.toLowerCase().includes(query)
    );}
  }

  sortSpellList(property: SortableSpellKey) {
    if (this.sortProperty === property) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortProperty = property;
      this.sortDirection = 'asc';
    }

    this.spells.sort((a, b) => {
      const valueA = a[property];
      const valueB = b[property];

      let result = 0;

      if (typeof valueA === 'string' && typeof valueB === 'string') {
        result = valueA.localeCompare(valueB);
      } else if (typeof valueA === 'number' && typeof valueB === 'number') {
        result = valueA - valueB;
      } else if (typeof valueA === 'boolean' && typeof valueB === 'boolean') {
        result = Number(valueA) - Number(valueB);
      }

      return this.sortDirection === 'asc' ? result : -result;
    });
  }

 ngOnInit() {
  this.BuildclassSpellName() 
  this.BuildSpells()
  this.characterState.character$.subscribe(character => {
    if (character) {
    this.character = character;
  }
}); 
 }
}
     