import { Component, signal } from '@angular/core';

import { CommonModule } from '@angular/common';


interface Character {
  id: number;
  name: string;
  power: number;
}


@Component({
  selector: 'app-dragonball',
  imports: [CommonModule],
  templateUrl: './dragonball.html',
})
export class Dragonball {
  name = signal("Trunks")
  power = signal(1000)
  
  characters = signal<Character[]>([
    { id: 1, name: 'Goku', power: 950 },
    { id: 2, name: 'Vegeta', power: 750 },
    { id: 3, name: 'Piccolo', power: 500 },
    { id: 3, name: 'Krillin', power: 400 },
  ])

  AddCharacter() {
    const newCharacter: Character = {
      id: this.characters().length + 1,
      name: this.name(),
      power: this.power()
    };
    this.characters.update(chars => [...chars, newCharacter]);
    this.resetFields()
  }
  // limpiar campos
  resetFields() {
    this.name.set('')
    this.power.set(0)
  }
}
