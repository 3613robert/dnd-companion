import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Character } from 'src/models/character.model';

@Injectable({
  providedIn: 'root',
})
export class CharacterState {

  private characterSubject = new BehaviorSubject<Character | null>(null);
  character$ = this.characterSubject.asObservable();

  get character(): Character | null {
    return this.characterSubject.value;
  }

  setCharacter(character: Character) {
    this.characterSubject.next(character);
  }

  clear() {
    this.characterSubject.next(null);
  }
}
