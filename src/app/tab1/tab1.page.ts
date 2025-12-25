import { Component, CUSTOM_ELEMENTS_SCHEMA, EnvironmentInjector, inject } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonMenu, IonButtons, IonButton, IonSelectOption, IonSelect} from '@ionic/angular/standalone';
import { triangle, ellipse, square, heart, diamond, dice, clipboard, statsChart, storefrontSharp, storefront, bag, menu, keyOutline} from 'ionicons/icons';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {IonCol, IonGrid, IonRow} from '@ionic/angular/standalone';
import { NgForOf, NgIf } from '@angular/common';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [NgIf, NgForOf, IonSelect, IonSelectOption, IonButton, IonButtons,  IonHeader, IonToolbar, IonTitle, IonContent, ExploreContainerComponent, IonMenu, IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonGrid, IonCol, IonRow],
})
export class Tab1Page {
  public environmentInjector = inject(EnvironmentInjector);
  constructor() {
    addIcons({ triangle, ellipse, square, heart, diamond, dice, clipboard, statsChart, storefront, bag, menu});
  }

scoresList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

stats = ["Strength", "Dexterity", "Constitution", "Wisdom", "Intelligence", "Charisma"];

skills: Record<string, string[]> = {
  Strength: ['Athletics'],
  Dexterity: ['Acrobatics','Stealth','Sleight of Hand'],
  Wisdom: ['Insight','Perception','Animal Handling', 'Medicine', 'Survival'],
  Intelligence: ['Nature','Arcana','Investigation','History', 'Religion'],
  Charisma : ['Persuasion','Intimidation','Deception','Performance']
};

Stat() {return this.stats};

scoreModArray = {1: -5, 2: -4, 3: -4, 4: -3, 5: -3, 6:-2, 7: -2, 8:-1, 9: -1, 10: 0, 11: 0, 12: 1, 13: 1, 14: 2, 15: 2, 16: 3, 17: 3, 18: 4, 19: 4, 20:5}

mod() {
  return console.log(this.scoreModArray[12])}

openUaDnd() {
    open('https://5e.tools/');
  };
  openMenu() {
    open('https://www.dndbeyond.com/sources/dnd/ua');
  };
showCharacterOverview(){
  console.log('hi')
  };

diceList = [20, 12, 10, 8, 6, 4]
diceResult: Record<string, number[]> = {};

rollDice(type: number) {
  const rolls = this.selectedAmount[type];
  console.log(rolls)
  const sides = type;

  if (!rolls || !sides) {
    return};

  // ensure array exists
  this.diceResult[type] ??= [];

  // reset previous rolls (optional)
  this.diceResult[type] = [];

  for (let i = 0; i < rolls; i++) {
    this.diceResult[type].push(
      Math.floor(Math.random() * sides) + 1
    );
  }
}

showDiceList = false;

toggleDice() {
  this.showDiceList = !this.showDiceList;
}

showCharOverview = false;

toggleCharView() {
  this.showCharOverview = !this.showCharOverview;
};

counter(i: number) {
    return new Array(i);
}

selectedAmount: Record<string, number> = {
  4: 0,
  6: 0,
  8: 0,
  10: 0,
  12: 0,
  20: 0
};


onDiceAmountChange(event:any) {
  const value = event.detail.value;
  for(let face in this.selectedAmount) {
      console.log(face)
      if (event.target.classList.contains(`D${face}`)) {
    this.selectedAmount[face] = value
    console.log(this.selectedAmount[face])
  }
  }

}

}
