import { HttpClient } from '@angular/common/http';
import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { environmnet } from '@environments/environment';
import type { GiphyResponse } from '../interfaces/giphy.interfaces';
import { Gif } from '../interfaces/gif.interface';
import { GifMapper } from 'src/app/mapper/gif.mapper';
import { map, tap } from 'rxjs';


const GIF_KEY = 'gifs';

const loadFromLocalStorage = () => {
    const gifsFromLocalStorage = localStorage.getItem(GIF_KEY) ?? '{}';
    const gifs = JSON.parse(gifsFromLocalStorage);
    return gifs
}

@Injectable({providedIn: 'root'})

export class GiftService {
    private http = inject(HttpClient);

    // Almacenar trending gifs

    trendingGifst = signal<Gif[]>([]);
    trendingGifsLoading = signal(true);

    searchHistory = signal<Record<string, Gif[]>>(loadFromLocalStorage());
    searchHistoryKeys = computed(() => Object.keys(this.searchHistory()));

    constructor() {
        this.loadTrendingGifts();
    }
    
    saveGifsToLocalStorage = effect(() => {
        const historyString = JSON.stringify(this.searchHistory());
        localStorage.setItem(GIF_KEY, historyString);
    });

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

        // TODO PARA MANEJAR EL HISTORIAL efectos seccundarios
        tap( items => {
            this.searchHistory.update(history => ({
                ...history,
                [query.toLowerCase()]: items
            }))
        })

    )
    
    
    // .subscribe((res) => {
    //     const gifts = GifMapper.mapGiphyItemsToGiveArray(res.data);
    //     this.trendingGifst.set(gifts);
    //     console.log(gifts);
    // });

    
}

getHistoryGifs(query: string | undefined) {
    if (!query) return [];
    return this.searchHistory()[query.toLowerCase()] ?? [];
}
}