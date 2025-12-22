import { Component, CUSTOM_ELEMENTS_SCHEMA, EnvironmentInjector, inject, NO_ERRORS_SCHEMA } from '@angular/core';
import { IonItem, IonList, IonSelect, IonSelectOption, IonHeader, IonToolbar, IonTitle, IonContent, IonMenu, IonButtons, IonButton} from '@ionic/angular/standalone';
import { triangle, ellipse, square, heart, diamond, dice, clipboard, statsChart, storefrontSharp, storefront, bag, menu, key, wifiSharp, add, compassSharp, close} from 'ionicons/icons';
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
import textrace from 'src/assets/race/race.json'
import backgrounds from 'src/assets/backgrounds/backgrounds.json'
import textbackground from 'src/assets/backgrounds/backgroundstext.json'

type Stat = {
  name: string;
  value: number;
};

type Character = {
  name: string;
  class: string;
  race: string;
  background: string;
  stats: Stat[];
  proficiencies: string[];
};

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
  | 'backgrounds'
  | 'stats'
  | 'summary';

type Background = {
  name: string;
  source?: string;
  [key:string]: unknown;
}

type Race = {
  name: string;
  source?: string;
  [key:string]: unknown;
};

type BackgroundsJson = {
  _meta?: unknown;
  background: Background[]; 
}

type bgAbilitiesChoices = {
  [key:string]: unknown;

}
type RacesJson = {
  _meta?: unknown;
  race: Race[];
};

type ClassName = {
  [key:string]: unknown;
}

type raceName = {
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



// --- Backgrounds ----
  backgroundNames = (backgrounds as BackgroundsJson).background
    .filter(r => r.source === 'XPHB')
    .map(r => r.name)
    .sort();

  backgroundText = Object.values(textbackground);
  backgroundKeys = Object.keys(this.backgroundNames);
  backgroundListDetail = this.backgroundNames.map(cls => ({[cls]: {src: `/assets/backgrounds/${cls}.webp`, text: 'textinput', stats: "statsinput", feature: "featureinput"}}))
  selectedBackground?: string;
  backgroundName?: keyof typeof this.selectedBackground;
  bgAbilitiesChoice?: keyof typeof this.selectedBackground;

  background_name=  "";
  currentBackgroundText = ""; 
  backgroundIndex = 5;
  bgStatIndex = 1;
  
  get selectedBackgroundData() {
    return this.backgroundListDetail[this.backgroundIndex];
  }

  bgAbilityChoices = {"Acolyte": ["Wisdom", "Intelligence", "Charisma"], 
    "Artisan": ["Strength", "Dexterity", "Intelligence"], 
    "Charlatan": ["Dexterity", "Constitution", "Charisma"], 
    "Criminal": ["Dexterity", "Constitution", "Intelligence"], 
    "Entertainer": ["Strength", "Dexterity", "Charisma"], 
    "Farmer": ["Strength", "Constitution", "Wisdom"], 
    "Guard": ["Strength", "Intelligence", "Wisdom"], 
    "Guide": ["Dexterity", "Constitution", "Wisdom"], 
    "Hermit": ["Constitution", "Wisdom", "Charisma"], 
    "Merchant": ["Constitution", "Intelligence", "Charisma"], 
    "Noble": ["Strength", "Intelligence", "Charisma"], 
    "Sage": ["Constitution", "Intelligence", "Wisdom"], 
    "Sailor": ["Strength", "Dexterity", "Wisdom"], 
    "Scribe": ["Dexterity", "Intelligence", "Wisdom"], 
    "Soldier": ["Strength", "Dexterity", "Constitution"], 
    "Wayfarer": ["Dexterity", "Wisdom", "Charisma"]}

  bgAbilityValues = Object.values(this.bgAbilityChoices)
  bgAbilitiesChoices = ["", "", ""];
  bgAbilitiesChoicesRemaining = ["", ""]
  selectedFirstBgStat?: keyof typeof this.bgAbilitiesChoice;
  selectedSecondBgStat?: keyof typeof this.bgAbilitiesChoicesRemaining;
  firstBgStat = "";
  secondBgStat = "";

//  --- Race ---
  raceNames = (races as RacesJson).race
    .filter(r => r.source === 'XPHB') // optional
    .map(r => r.name)
    .sort();

  raceText = Object.values(textrace)
  raceKeys = Object.keys(this.raceNames)
  raceListDetail = this.raceNames.map(cls =>({[cls]: {src: `/assets/race/${cls}.png`, text: "text input", features: "features input"}}))

  selectedRace?: string;
  RaceName?: keyof typeof this.selectedRace;

  race_name = ""; 
  currentRaceText = "";
  raceIndex = 5;   
  get selectedRaceData() {
    return this.raceListDetail[this.raceIndex];
  }

  //  --- Class -----

  selectedClass?: string;
  ClassName?: keyof typeof this.selectedClass;


  classText = Object.values(text);
  classKeys = Object.keys(cclass);
  ClassListDetail = this.classKeys.map(cls => ({[cls]: {src: `/assets/class/${cls}.png` , text: "text input", abilities: "ability input" }
}))
  char_url = "";
  char_name= "";
  classIndex = 5;
  currentClassText = "";


  get selectedClassData() {
    return this.ClassListDetail[this.classIndex];
  }

// --- Character ----
  character: Character = {
    name: '',
    class: '',
    race: '',
    background: '',
    stats: [
      { name: 'Strength', value: 8 },
      { name: 'Dexterity', value: 8 },
      { name: 'Constitution', value: 8 },
      { name: 'Wisdom', value: 8 },
      { name: 'Intelligence', value: 8 },
      { name: 'Charisma', value: 8 },
    ],
    proficiencies: [],
  };

  characterKeys = Object.keys(this.character);
  characterValues = Object.values(this.character);
  
// --- Stats ----

  stats = [
    { name: 'Strength', value: 8 },
    { name: 'Dexterity', value: 8 },
    { name: 'Constitution', value: 8 },
    { name: 'Wisdom', value: 8 },
    { name: 'Intelligence', value: 8 },
    { name: 'Charisma', value: 8 },
  ];

  totalPoints = 27;

  modifierStat(score: number): number {
    if (score >= 8 && score < 10) return -1;
    if (score >= 10 && score < 12) return 0;
    if (score >= 12 && score < 14) return 1;
    if (score >= 14 && score < 16) return 2;
    if (score >= 16 && score < 18) return 3;
    if (score >=18 && score <20) return 4;
    if (score >= 20) return 5;
    return 0;
  }

  showModifier(): number {
    
  }

  pointCost(score: number): number {
    if (score <= 13) return score - 8;
    if (score === 14) return 7;
    if (score === 15) return 9;
    return 0;
  }

  usedPoints(): number {
    return this.character.stats.reduce(
      (sum, stat) => sum + this.pointCost(stat.value),
      0
    );
  }

  canIncrease(stat: Stat): boolean {
    if (stat.value >= 15) return false;
    return this.usedPoints() + this.pointCost(stat.value + 1) - this.pointCost(stat.value) <= this.totalPoints;
  }

  canDecrease(stat: any): boolean {
    return stat.value > 8;
  }

  increase(stat: Stat) {
    if (this.canIncrease(stat)) stat.value++;
  }

  decrease(stat: Stat) {
    if (this.canDecrease(stat)) stat.value--;
  }
  
  addBg(fstat: string, sstat: string) {
    for (const stat of this.character.stats) {
      if (stat.name === fstat) stat.value += 2;
      if (stat.name === sstat) stat.value += 1;
    }
  }



  // -- Character Creation ----

  startCharacterCreation() {
    this.currentStep = 'class';
  }

  goToRace() {
    this.currentStep = 'race';
  }

  goToBackground() {
    this.currentStep = 'backgrounds';
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

//  ---- Functions -----

onClassChange(event: any) {
  const value = event.detail.value as string;

  this.classIndex = this.classKeys.indexOf(value);
  this.char_name = value;
  this.currentClassText = this.classText[this.classIndex];
  this.character['class'] = value;
  console.log(this.character);
}

onRaceChange(event: any) {
  const value = event.detail.value as string;

  this.raceIndex = this.raceNames.indexOf(value);
  this.race_name = value;
  this.currentRaceText = this.raceText[this.raceIndex];
  this.character['race'] = value;
  console.log(this.character);
}
onBackgroundChange(event: any) {
  const value = event.detail.value as string;
  this.backgroundIndex = this.backgroundNames.indexOf(value);
  this.background_name = value;
  this.currentBackgroundText = this.backgroundText[this.backgroundIndex];
  this.character['background'] = value;  
  this.onbgStatChange(event);
  console.log(this.bgAbilitiesChoices);
}

onbgStatChange(event: any) {
  const value = event.detail.value as string;
  const choiceIndex  = this.bgAbilitiesChoices.indexOf(value);
  const abilityChoice = this.bgAbilityValues[this.backgroundIndex];
  this.bgStatIndex = choiceIndex;
  this.bgAbilitiesChoices = abilityChoice;
  this.bgAbilitiesChoicesRemaining = this.bgAbilitiesChoices.filter(item => item !== this.bgAbilitiesChoices[this.bgStatIndex])
  this.firstBgStat = value;
  console.log(value)
}

onSecondBgStatChange(event: any){
  const value = event.detail.value as string;
  this.secondBgStat = value;
  console.log(value)
}

onStatsFinal() {
  this.addBg(this.firstBgStat, this.secondBgStat);
  const stats = this.stats
  this.character['stats'] = stats;
  this.goToSummary();
}
}
