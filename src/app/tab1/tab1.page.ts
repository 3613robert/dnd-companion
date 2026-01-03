import { Component, CUSTOM_ELEMENTS_SCHEMA, EnvironmentInjector, inject } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonMenu, IonButtons, IonButton, IonSelectOption, IonSelect} from '@ionic/angular/standalone';
import { triangle, ellipse, square, heart, diamond, dice, clipboard, statsChart, storefrontSharp, storefront, bag, menu, keyOutline, keySharp} from 'ionicons/icons';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {IonCol, IonGrid, IonRow} from '@ionic/angular/standalone';
import { NgForOf, NgIf } from '@angular/common';
import { CharacterDataService } from 'src/services/characterdata.service';
import { Character } from 'src/models/character.model';
import { CharacterStorageService } from '../services/character-storage';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [NgIf, NgForOf, IonSelect, IonSelectOption, IonButton, IonButtons,  IonHeader, IonToolbar, IonTitle, IonContent, ExploreContainerComponent, IonMenu, IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonGrid, IonCol, IonRow],

})
export class Tab1Page {
  public environmentInjector = inject(EnvironmentInjector)
  character!: Character; 
  characters: Character[] = [];

  constructor(
    private characterDataService: CharacterDataService,
    private characterStorage: CharacterStorageService) {
    addIcons({ triangle, ellipse, square, heart, diamond, dice, clipboard, statsChart, storefront, bag, menu})
    this.character = this.characterDataService.getCharacter();
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
    this.character = structuredClone(loaded);
  }
}

    
/* ------------------------------------------------ */
/* DiceRoller Logic                                 */
/* ------------------------------------------------ */
showDiceList = false;

//---Available Dice Types--- // 
diceList = [20, 12, 10, 8, 6, 4]

diceResult: Record<string, number[]> = {};

//--- Roll Dice Function ---//
rollDice(type: number) {
  const rolls = this.selectedAmount[type];
  const sides = type;

  if (!rolls || !sides) {
    return};

      // ensure array exists
  this.diceResult[type] ??= [];

     // reset previous rolls (optional)
  this.diceResult[type] = [];
    // perform rolls
  for (let i = 0; i < rolls; i++) {
    this.diceResult[type].push(
      Math.floor(Math.random() * sides) + 1
    );
  }
}


    // Selected Amount of Dice 
selectedAmount: Record<string, number> = {
  4: 0,
  6: 0,
  8: 0,
  10: 0,
  12: 0,
  20: 0
};

// --- Update Selected Amount --- //
onDiceAmountChange(event:any) {
  const value = event.detail.value;
  for(let face in this.selectedAmount) {
      if (event.target.classList.contains(`D${face}`)) {
    this.selectedAmount[face] = value
  }
  }

}

/* ------------------------------------------------ */
/* Toolbar Buttons                                  */
/* ------------------------------------------------ */
openUaDnd() {
    open('https://5e.tools/');
  };
openMenu() {
    open('https://www.dndbeyond.com/sources/dnd/ua');
  };

openClassGuide() {
    const linkInfo = this.character.class.toLowerCase();
    open('https://5e.tools/classes.html#' + linkInfo + '_xphb');
  };  

toggleDice() {
  this.showDiceList = !this.showDiceList;
}

toggleCharView() {
  this.showCharOverview = !this.showCharOverview;
  this.toggleProficiencies();
  console.log(this.character.stats)
};

/* ------------------------------------------------ */
/* Character Overview                               */
/* ------------------------------------------------ */
proficiencyBonus = 2;

showPlus(skill:string, stat:number, x:number) {
  if(this.character.stats[stat].skills[x].modifier > 0) {
    return '+';
  } else return "";
}

showCharOverview = false;



toggleProficiencies() {
  Object.entries(this.character.stats).forEach(([key, value]) => {
    value.skills.forEach(skill => {
      if (this.character.proficiencies.includes(skill.name.toLowerCase())) {
        skill.isProficient = true;
      } else {
        skill.isProficient = false;
      }
    });  
  }); 
}

statData: Record<string, { src: string}> = {};

/* ------------------------------------------------ */
/* INIT DATA MAPS                                   */
/* ------------------------------------------------ */

ngOnInit() {
  Object.entries(this.character.stats).forEach(([key, value]) => {
          this.statData[value.name] = {
            src: `/assets/stats/${value.name}.png`,
          };
        }
  );
  this.toggleProficiencies();
} 
} 
