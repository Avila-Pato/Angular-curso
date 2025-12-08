import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { GiftList } from "../../components/gift-list/gift-list";
import { GiftService } from '../../services/gifs.service';
import { Gif } from '../../interfaces/gif.interface';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-page',
  imports: [GiftList, FormsModule],
  templateUrl: './search-page.html',
})
export default class SearchPage {
  gifService = inject(GiftService);
  gifs = signal<Gif[]>([])
  searchQuery = signal<string>('')

  onSearch() {
    const query = this.searchQuery();
    if (!query.trim()) return;

    this.gifService.searchGifs(query).subscribe((resp) => {
      this.gifs.set(resp);
    })
  }

 }
