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
  value = output<string>();
 }
