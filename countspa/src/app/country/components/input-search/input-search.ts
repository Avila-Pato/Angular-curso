import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

@Component({
  selector: 'app-input-search',
  imports: [],
  templateUrl: './input-search.html',
  styleUrl: './input-search.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputSearch {
  placeholder = input<string>("Buscar");
  readonly value = output<string>();
  readonly submit = output<string>();

  onTyping(val: string) {
    this.value.emit(val);
  }

  onSubmit(val: string) {
    this.submit.emit(val);
  }
}
