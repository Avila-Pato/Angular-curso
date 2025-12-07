import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-gift-list-item',
  imports: [],
  templateUrl: './gift-list-item.html',
})
export class GiftListItem {
  imageUrl = input.required<string>();
}
