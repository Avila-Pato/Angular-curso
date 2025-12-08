import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environmnet } from '@environments/environment';
import type { GiphyResponse } from '../interfaces/giphy.interfaces';
import { Gif } from '../interfaces/gif.interface';
import { GifMapper } from 'src/app/mapper/gif.mapper';
import { map, tap } from 'rxjs';

@Injectable({providedIn: 'root'})

export class GiftService {
    private http = inject(HttpClient);

    // Almacenar trending gifs

    trendingGifst = signal<Gif[]>([]);
    trendingGifsLoading = signal(true);

    constructor() {
        this.loadTrendingGifts();
    }
    

    // Peticion HTTP
    
    loadTrendingGifts() { 
    this.http.get<GiphyResponse>(`${ environmnet.gitphyUrl }/gifs/trending`, {
        params: {
            api_key: environmnet.keyApiGifts,
            limit: '20'
        }
    }).subscribe((res) => {
        const gifts = GifMapper.mapGiphyItemsToGiveArray(res.data);
        this.trendingGifst.set(gifts);
        this.trendingGifsLoading.set(false);
    });
}

searchGifs(query: string) {

    return this.http.get<GiphyResponse>(`${ environmnet.gitphyUrl }/gifs/search`, {
        params: {
            api_key: environmnet.keyApiGifts,
            limit: '20',
            q: query
        }
    }).pipe(
        map(({ data }) => data),
        map((items) => GifMapper.mapGiphyItemsToGiveArray(items)),

        // TODO PARA MANEJAR EL HISTORIAL
    )
    
    
    // .subscribe((res) => {
    //     const gifts = GifMapper.mapGiphyItemsToGiveArray(res.data);
    //     this.trendingGifst.set(gifts);
    //     console.log(gifts);
    // });

    
}
}