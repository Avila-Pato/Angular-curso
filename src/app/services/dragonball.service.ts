import { Injectable, signal } from '@angular/core';
import { Character } from '../types/character.interface';

@Injectable({ providedIn: 'root' })
export class DragonBallService {
  
    characters = signal<Character[]>([
      { id: 1, name: 'Goku', power: 950 },
      { id: 2, name: 'Vegeta', power: 750 },
      { id: 3, name: 'Piccolo', power: 500 },
      { id: 3, name: 'Krillin', power: 400 },
    ]);

    
     addCharacter = (character: Character) => {
      this.characters.update((list: Character[]) => [...list, character]);
    };
  }
