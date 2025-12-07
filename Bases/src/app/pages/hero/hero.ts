import { UpperCasePipe } from '@angular/common';
import { Component, computed, signal } from '@angular/core';

@Component({
  selector: 'app-hero',
  imports: [UpperCasePipe],
  templateUrl: './hero.html',
})
export class Hero {
  name = signal('Ironman');
  age = signal(45);

  HeroDescription = computed(() => {
    return `${this.name()} - ${this.age()}`;
  });



  changeHero() {
    this.name.set('Spiderman');
    this.age.set(30);
  }
  changeAge() {
    this.age.set(this.age() + 1);
  }
  resetForm() {
    this.name.set('Ironman');
    this.age.set(45);
  }
}
