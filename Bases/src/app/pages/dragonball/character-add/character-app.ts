import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, output, signal } from '@angular/core';
import { Character } from '../../../types/character.interface';

@Component({
  selector: 'componnent-character-add',
  imports: [CommonModule],
  templateUrl: './character-app.html',
})
export class CharacterAppFinal {
  name = signal('');
  power = signal(0);

  // EVENTOS PARA DISPARAR ENTRE COMPONENTES

  newCharacter = output<Character>();

  characters = signal<Character[]>([
    { id: 1, name: 'Goku', power: 950 },
    // { id: 2, name: 'Vegeta', power: 750 },
    // { id: 3, name: 'Piccolo', power: 500 },
    // { id: 3, name: 'Krillin', power: 400 },
  ]);

  AddCharacter() {
    const newCharacter: Character = {
      id: this.characters().length + 1,
      name: this.name(),
      power: this.power(),
    };
    this.characters.update((chars) => [...chars, newCharacter]);

    this.newCharacter.emit(newCharacter); // EMITIR EVENTO
    this.resetFields();
  }
  resetFields() {
    this.name.set('');
    this.power.set(0);
  }
}
