import { Injectable } from '@angular/core';
import localforage from 'localforage';
import { Character } from 'src/models/character.model';

@Injectable({
  providedIn: 'root',
})
export class CharacterStorageService {

  private store = localforage.createInstance({
    name: 'dnd-character-app',
    storeName: 'characters',
  });

  async saveCharacter(character: Character): Promise<void> {
    await this.store.setItem(character.id, character);
  }

  async loadCharacter(id: string): Promise<Character | null> {
    return await this.store.getItem<Character>(id);
  }

  async deleteCharacter(id: string): Promise<void> {
    await this.store.removeItem(id);
  }

  async loadAllCharacters(): Promise<Character[]> {
    const characters: Character[] = [];

    await this.store.iterate<Character, void>((value) => {
      characters.push(value);
    });

    return characters;
  }
}
