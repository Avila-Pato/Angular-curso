import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-counter',
  imports: [],
  templateUrl: './counter.html',
  styleUrl: './counter.css',
})
export class Counter {
  counter = 0;
  signalCounter = signal(0);

  increment() {
    this.counter++;
    this.signalCounter.update(() => this.counter);
  }

  desecrement() {
    if (this.counter <= 0) {
      return;
    }
    this.counter--;
    this.signalCounter.update(() => this.counter);
  }

  reset() {
    this.counter = 0;
    this.signalCounter.set(this.counter);
  }
 



}
