import { Component, input } from '@angular/core';

import { CommonModule } from '@angular/common';
import { Character } from '../../../types/character.interface';




@Component({
  selector: 'dragonball-character-list',
  imports: [CommonModule],
  templateUrl: './dragonball-list.html',
})
export class DragonSuperballList {
  listname = input.required<string>();
  characters = input.required<Character[]>();
}
