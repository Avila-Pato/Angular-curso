import { Component, inject, signal } from '@angular/core';

import { CommonModule } from '@angular/common';
import { Character } from '../../types/character.interface';
import {  CharacterAppFinal } from "../dragonball/character-add/character-app";
import { DragonSuperballList } from '../dragonball/character-list/dragonball-list';
import { DragonBallService } from '../../services/dragonball.service';




@Component({
  imports: [CommonModule, DragonSuperballList, CharacterAppFinal],
  templateUrl: './dragonball-super.html',
})
export class DragonSuperball {

  // Injeccion de dependencias
  public dragonballService = inject(DragonBallService);
  
  
  // characters = signal<Character[]>([
  //   { id: 1, name: 'Goku', power: 950 },
  //   { id: 2, name: 'Vegeta', power: 750 },
  //   { id: 3, name: 'Piccolo', power: 500 },
  //   { id: 3, name: 'Krillin', power: 400 },
  // ])
  // addCharacter = (character: Character) => {
  //   this.characters.update(
  //     list => [...list, character]
  //   )
  // }

}
