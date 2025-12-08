import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { GiftList } from "../../components/gift-list/gift-list";
import { GiftService } from '../../services/gifs.service';
import { Gif } from '../../interfaces/gif.interface';

@Component({
  selector: 'app-search-page',
  imports: [GiftList],
  templateUrl: './search-page.html',
})
export default class SearchPage {
  gifService = inject(GiftService);
  gifs = signal<Gif[]>([])

  onSearch(query: string) {
    this.gifService.searchGifs(query).subscribe((resp) => {
      this.gifs.set(resp);
    })
  }

 }
