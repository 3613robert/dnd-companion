import { Component, CUSTOM_ELEMENTS_SCHEMA, EnvironmentInjector, inject, NO_ERRORS_SCHEMA } from '@angular/core';
import { IonItem, IonList, IonSelect, IonSelectOption, IonHeader, IonToolbar, IonTitle, IonContent, IonMenu, IonButtons, IonButton} from '@ionic/angular/standalone';
import { triangle, ellipse, square, heart, diamond, dice, clipboard, statsChart, storefrontSharp, storefront, bag, menu, key} from 'ionicons/icons';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {IonCol, IonGrid, IonRow} from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import races from 'src/races.json';
import { SelectCustomEvent, SelectChangeEventDetail } from '@ionic/angular';
import { CommonModule, NgPluralCase } from '@angular/common';
import cclass from 'src/index.json'
import text from 'src/assets/class/classtext.json'

type Class = {
  [key:string]: unknown;
}

type ClassJson = {
  _meta?:unknown;
}

type CreationStep =
  | 'menu'
  | 'class'
  | 'race'
  | 'stats'
  | 'summary';

type Race = {
  name: string;
  source?: string;
  [key:string]: unknown;
};

type RacesJson = {
  _meta?: unknown;
  race: Race[];
};

type CLASS_LIST = {
  src: string;
  text: string;
  abilities: string;
  [key:string]: unknown;
}
type ClassName = {
  [key:string]: unknown;
}


@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  imports: [CommonModule, FormsModule, IonButton, IonButtons,  IonHeader, IonToolbar, IonTitle, IonContent, ExploreContainerComponent, IonMenu, IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonGrid, IonCol, IonRow, IonItem, IonList, IonSelect, IonSelectOption],
})
export class Tab4Page {
  public environmentInjector = inject(EnvironmentInjector);
  constructor() {
    addIcons({ triangle, ellipse, square, heart, diamond, dice, clipboard, statsChart, storefront, bag, menu});
  }

  raceNames = (races as RacesJson).race
    .filter(r => r.source === 'PHB') // optional
    .map(r => r.name)
    .sort();
  
selectedClass?: keyof typeof this.ClassListDetail;
ClassName?: keyof typeof this.selectedClass;


  
  cardSrc?: string;
  classText = Object.values(text);
  classKeys = Object.keys(cclass);
  ClassListDetail = this.classKeys.map(cls => ({[cls]: {src: `/assets/${cls}.png` , text: "text input", abilities: "ability input" }
}))

char_url = "";
char_name= ""; 
classIndex = 5;
currentClassText = "";

get selectedClassData() {
  return this.ClassListDetail[this.classIndex];
}

  character = {
    name: '',
    class: '',
    race: '',
    level: 1,
    stats: {'Strength': '', 'Dexterity': '', "Constitution": '', "Wisdom": "", "Intelligence": "", "Charisma": ""},
    proficiencies: [],
    background: "",
  };

  startCharacterCreation() {
    this.currentStep = 'class';
    console.log(this.selectedClassData)
  }

  goToRace() {
    this.currentStep = 'race';
  }

  goToStats() {
    this.currentStep = 'stats';
  }

  goToSummary() {
    this.currentStep = 'summary';
  }

  backToMenu() {
    this.currentStep = 'menu';
  }

  currentStep: CreationStep = 'menu';

onClassChange(event: SelectCustomEvent<SelectChangeEventDetail<ClassName>>) {
  const value = event.detail.value;
  let namef = value as unknown as string;
  this.classIndex = this.classKeys.indexOf(namef)
  this.char_name = this.selectedClass as string;
  this.currentClassText = this.classText[this.classKeys.indexOf(namef)]
  console.log(this.currentClassText)
  if (!value) return; // bail out if undefined
}

}