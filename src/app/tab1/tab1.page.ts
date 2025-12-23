import { Component, CUSTOM_ELEMENTS_SCHEMA, EnvironmentInjector, inject } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonMenu, IonButtons, IonButton} from '@ionic/angular/standalone';
import { triangle, ellipse, square, heart, diamond, dice, clipboard, statsChart, storefrontSharp, storefront, bag, menu} from 'ionicons/icons';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {IonCol, IonGrid, IonRow} from '@ionic/angular/standalone';
import d20 from `src/assets/dice/D20.jpg`

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [IonButton, IonButtons,  IonHeader, IonToolbar, IonTitle, IonContent, ExploreContainerComponent, IonMenu, IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonGrid, IonCol, IonRow],
})
export class Tab1Page {
  public environmentInjector = inject(EnvironmentInjector);
  constructor() {
    addIcons({ D20, triangle, ellipse, square, heart, diamond, dice, clipboard, statsChart, storefront, bag, menu});
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

diceResult = [0, 0, 0, 0, 0, 0];

rollDice(type:number, string:number) {
  this.diceResult[string] = Math.floor(Math.random() * Number(type)) + 1;
};

showDiceList = false;

toggleDice() {
  this.showDiceList = !this.showDiceList;
}

showCharOverview = false;

toggleCharView() {
  this.showCharOverview = !this.showCharOverview;
}

}
