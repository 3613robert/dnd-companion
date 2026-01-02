import { Component, CUSTOM_ELEMENTS_SCHEMA, EnvironmentInjector, inject, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import {
  IonButton, IonButtons, IonHeader, IonToolbar, IonTitle, IonContent,
  IonItem, IonList, IonSelect, IonSelectOption, IonIcon,
  IonGrid, IonRow, IonCol
} from '@ionic/angular/standalone';

import { addIcons } from 'ionicons';
import {
  triangle, ellipse, square, heart, diamond, dice,
  clipboard, checkmarkDone, statsChart, checkmark, storefront, bag, menu, save, saveOutline, saveSharp, checkmarkDoneCircleOutline
  } from 'ionicons/icons';

import races from 'src/races.json';
import classes from 'src/index.json';
import classTextJson from 'src/assets/class/classtext.json';
import raceTextJson from 'src/assets/race/race.json';
import backgroundsJson from 'src/assets/backgrounds/backgrounds.json';
import backgroundTextJson from 'src/assets/backgrounds/backgroundstext.json';
import { CharacterDataService } from 'src/services/characterdata.service';
import { Character } from 'src/models/character.model';
import { startWith } from 'rxjs';

/* ------------------------------------------------ */
/* TYPES                                            */
/* ------------------------------------------------ */

type CreationStep =
  | 'menu'
  | 'name'
  | 'class'
  | 'race'
  | 'backgrounds'
  | 'stats'
  | 'summary';

type Stat = {
  name: string;
  value: number;
};


/* ------------------------------------------------ */
/* COMPONENT                                        */
/* ------------------------------------------------ */

@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  imports: [
    CommonModule,
    FormsModule,
    IonButton, IonButtons, IonHeader, IonToolbar, IonTitle, IonContent,
    IonItem, IonList, IonSelect, IonSelectOption, IonIcon,
    IonGrid, IonRow, IonCol
  ],
})

export class Tab4Page {
  public environmentInjector = inject(EnvironmentInjector);
  character: Character;

 constructor(
  private router: Router,
  private characterDataService: CharacterDataService) {
    addIcons({
      triangle, ellipse, square, heart, diamond, dice,
      clipboard, checkmark, checkmarkDone, statsChart, storefront, bag, menu, save, saveOutline, saveSharp, checkmarkDoneCircleOutline})
    this.character = this.characterDataService.getCharacter();
      }
    
     
  /* ------------------------------------------------ */
  /* STATE                                            */
  /* ------------------------------------------------ */

  currentStep: CreationStep = 'menu';

  /* ------------------------------------------------ */
  /* CHARACTER                                        */
  /* ------------------------------------------------ */
  selectedName = '';
  selectedLevel = 0;
  profBonus = 2;
  /* ------------------------------------------------ */
  /* CLASS                                            */
  /* ------------------------------------------------ */

  classKeys: string[] = Object.keys(classes);
  classText: string[] = Object.values(classTextJson);

  classData: Record<string, { src: string; text: string }> = {};

  selectedClass = '';
  classIndex = 0;

  /* ------------------------------------------------ */
  /* RACE                                             */
  /* ------------------------------------------------ */

  raceNames: string[] = (races as any).race
    .filter((r: any) => r.source === 'XPHB')
    .map((r: any) => r.name)
    .sort();

  raceText: string[] = Object.values(raceTextJson);
  raceData: Record<string, { src: string; text: string }> = {};

  selectedRace = '';
  raceIndex = 0;

  /* ------------------------------------------------ */
  /* BACKGROUND                                       */
  /* ------------------------------------------------ */

  backgroundNames: string[] = (backgroundsJson as any).background
    .filter((b: any) => b.source === 'XPHB')
    .map((b: any) => b.name)
    .sort();
  
  backgroundProficiencies: string[] = (backgroundsJson as any).background
    .filter((b:any) => b.source === 'XPHB')
    .map((b: any) => Object.keys(b.skillProficiencies[0] ));
    
  backgroundText: string[] = Object.values(backgroundTextJson);
  backgroundData: Record<string, { src: string; text: string; proficiencies: string}> = {};

  selectedBackground = '';
  backgroundIndex = 0;

  /* Background ability choices */
  bgAbilityChoices: Record<string, string[]> = {
    Acolyte: ['Wisdom', 'Intelligence', 'Charisma'],
    Artisan: ['Strength', 'Dexterity', 'Intelligence'],
    Charlatan: ['Dexterity', 'Constitution', 'Charisma'],
    Criminal: ['Dexterity', 'Constitution', 'Intelligence'],
    Entertainer: ['Strength', 'Dexterity', 'Charisma'],
    Farmer: ['Strength', 'Constitution', 'Wisdom'],
    Guard: ['Strength', 'Intelligence', 'Wisdom'],
    Guide: ['Dexterity', 'Constitution', 'Wisdom'],
    Hermit: ['Constitution', 'Wisdom', 'Charisma'],
    Merchant: ['Constitution', 'Intelligence', 'Charisma'],
    Noble: ['Strength', 'Intelligence', 'Charisma'],
    Sage: ['Constitution', 'Intelligence', 'Wisdom'],
    Sailor: ['Strength', 'Dexterity', 'Wisdom'],
    Scribe: ['Dexterity', 'Intelligence', 'Wisdom'],
    Soldier: ['Strength', 'Dexterity', 'Constitution'],
    Wayfarer: ['Dexterity', 'Wisdom', 'Charisma'],
  };

  selectedFirstBgStat = '';
  selectedSecondBgStat = '';

  get remainingBgStats(): string[] {
    return this.bgAbilityChoices[this.selectedBackground]?.filter(
      stat => stat !== this.selectedFirstBgStat
    ) ?? [];
  }

  selectedBackgroundProf = [ ];

  get bgProficiency() {
      return this.backgroundProficiencies[this.backgroundIndex]
    } 

  get aOrAn() {
    if (this.selectedBackground.startsWith("A") || this.selectedBackground.startsWith("I") || this.selectedBackground.startsWith("U") || this.selectedBackground.startsWith("E") || this.selectedBackground.startsWith("Y") ){
      return 'an'
    } else return 'a'
  }

  /* ------------------------------------------------ */
  /* POINT BUY                                        */
  /* ------------------------------------------------ */

  totalPoints = 27;

  modifierStat(score: number): number {
    if (score >=0 && score < 2) return -5;
    if (score >=2 && score < 4) return -4;
    if (score >=4 && score < 6) return -3;
    if (score >=6 && score < 8) return -2;
    if (score >= 8 && score < 10) return -1;
    if (score >= 10 && score < 12) return +0;
    if (score >= 12 && score < 14) return +1;
    if (score >= 14 && score < 16) return +2;
    if (score >= 16 && score < 18) return +3;
    if (score >=18 && score <20) return +4;
    if (score >= 20) return +5;
    return 0;
  }

  showModifier() {
    for(let i = 0; i < this.character.stats.length; i++){
      const modifierStat = this.modifierStat(this.character.stats[i].value);
      this.character.stats[i].modifier = modifierStat
    }
  }

  showSkillModifier() {
    for(let i=0; i< this.character.stats.length; i++) {
      for(let skill in this.character.stats[i].skills){
        this.character.stats[i].skills[skill].value =  this.character.stats[i].value;
        if(this.character.stats[i].skills[skill].name.toLowerCase() === this.character.proficiencies[0].toLowerCase() || this.character.stats[i].skills[skill].name.toLowerCase() === this.character.proficiencies[1].toLowerCase()) {
          this.character.stats[i].skills[skill].value += this.profBonus;
        } else {
          this.character.stats[i].skills[skill].value = this.character.stats[i].skills[skill].value;
         }
        const skillModifier = this.modifierStat(this.character.stats[i].skills[skill].value);
        this.character.stats[i].skills[skill].modifier = skillModifier;
      }
    }
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
    return (
      this.usedPoints() +
      this.pointCost(stat.value + 1) -
      this.pointCost(stat.value)
    ) <= this.totalPoints;
  }

  canDecrease(stat: Stat): boolean {
    return stat.value > 8;
  }

  increase(stat: Stat) {
    if (this.canIncrease(stat)) stat.value++;
  }

  decrease(stat: Stat) {
    if (this.canDecrease(stat)) stat.value--;
  }

  /* ------------------------------------------------ */
  /* APPLY BACKGROUND BONUS                            */
  /* ------------------------------------------------ */

  applyBackgroundBonus() {
    for (const stat of this.character.stats) {
      if (stat.name === this.selectedFirstBgStat) stat.value += 2;
      if (stat.name === this.selectedSecondBgStat) stat.value += 1;
    }
  }


  /* ------------------------------------------------ */
  /* NAVIGATION                                       */
  /* ------------------------------------------------ */

  startCharacterCreation() {
    this.router.navigate(['/tabs/tab4']).then(() => {
      this.currentStep = 'name';
    });
  }
  goToName() { this.currentStep = 'name'; } 
  goToClass() { this.currentStep = 'class'; }
  goToRace() { this.currentStep = 'race'; }
  goToBackground() { this.currentStep = 'backgrounds'; }
  goToStats() { this.currentStep = 'stats'; }
  goToSummary() { this.currentStep = 'summary'; }

  /* ------------------------------------------------ */
  /* EVENT HANDLERS                                   */
  /* ------------------------------------------------ */
  onNameChange(event: any) {
    if (event.key === "Enter") {  
      const value = (event.target as HTMLInputElement).value;
      this.selectedName = value;
      this.character.name = value;
      console.log(this.character.name);
    };
  }

  onLevelChange(event: any) {
    const value = event.detail.value;
    this.selectedLevel = value;
    console.log(this.selectedLevel);
    this.character.level = value;}   

  onClassChange(event: any) {
    const value = event.detail.value;
    this.selectedClass = value;
    this.classIndex = this.classKeys.indexOf(value);
    this.character.class = value;
  }

  onRaceChange(event: any) {
    const value = event.detail.value;
    this.selectedRace = value;
    this.raceIndex = this.raceNames.indexOf(value);
    this.character.race = value;
  }

  onBackgroundChange(event: any) {
    const value = event.detail.value;
    this.selectedBackground = value;
    this.backgroundIndex = this.backgroundNames.indexOf(value);
    this.character.background = value;
    this.selectedFirstBgStat = '';
    this.selectedSecondBgStat = '';
    this.character.proficiencies[0] = this.backgroundProficiencies[this.backgroundIndex][0];
    this.character.proficiencies[1] = this.backgroundProficiencies[this.backgroundIndex][1];
  }

  finalizeStats() {
    this.applyBackgroundBonus();
    this.showModifier();
    this.showSkillModifier();
    this.goToSummary();
    
  }

  /* ------------------------------------------------ */
  /* INIT DATA MAPS                                   */
  /* ------------------------------------------------ */

  ngOnInit() {
    for (const cls of this.classKeys) {
      this.classData[cls] = {
        src: `/assets/class/${cls}.png`,
        text: 'Class description here',
      };
    }

    for (const race of this.raceNames) {
      this.raceData[race] = {
        src: `/assets/race/${race}.png`,
        text: 'Race description here',
      };
    }

    for (const bg of this.backgroundNames) {
      this.backgroundData[bg] = {
        src: `/assets/backgrounds/${bg}.webp`,
        text: 'Background description here',
        proficiencies: "proficiencies here",
     };
    }
  }
}
