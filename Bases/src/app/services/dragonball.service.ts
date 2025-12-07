import { effect, Injectable, signal } from '@angular/core';
import { Character } from '../types/character.interface';


//LinkedSignal - Cargar del LocalStorage // Fuera de  DragonBallService porque no es necesario 
const loadFromLocalStorage = (): Character[] => {
    const characters = localStorage.getItem('characters');

    return characters ? JSON.parse(characters) : [];
}



@Injectable({ providedIn: 'root' })
export class DragonBallService {
  
    characters = signal<Character[]>(loadFromLocalStorage());

    

    // Efectos  para guardar en el localStorage solamente para grabar en el localStorage
    saveToLocalStorage = effect(() => {
      localStorage.setItem('characters', JSON.stringify(this.characters()));
    })


     addCharacter = (character: Character) => {
      this.characters.update((list: Character[]) => [...list, character]);
    };
  }
