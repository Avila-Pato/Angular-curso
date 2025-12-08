import {  Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { GiftService } from '../../services/gifs.service';
import { GiftList } from "../../components/gift-list/gift-list";

@Component({
  selector: 'app-gif-history',
  imports: [GiftList],
  templateUrl: './gif-history.html',
})
export default class GifHistory { 

  gifService = inject(GiftService)

  query = toSignal(
    inject(ActivatedRoute).params.pipe(
      map(params => params['query'])
    )
  )
  gifsByKey = computed(() => {
    return this.gifService.getHistoryGifs(this.query());
  })
    
}
