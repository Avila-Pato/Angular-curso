import { HttpClient } from '@angular/common/http';
import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { environmnet } from '@environments/environment';
import type { GiphyResponse } from '../interfaces/giphy.interfaces';
import { Gif } from '../interfaces/gif.interface';
import { GifMapper } from 'src/app/mapper/gif.mapper';
import { map, of, tap } from 'rxjs';


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
    trendingGifsLoading = signal(false);
    private trendingPage = signal(0);

    // Creando una propiedad reactiva que se recalculla automaitamnte cuando
    // se cambien los datos dependiendo de trendingGifst
    trendingGifGroup = computed<Gif[][]>(() => {
        const groups = [];

        // Recorre el array de trendingGifst de 3 en 3
        // significa que enc ada iteracion saltan 3 posiciones 
        // con slice(i, i + 3) toma un subrray de 3 lementos a partir del i
        // agregandolo a groups ejemplo [0,1,2], [3,4,5], [6,7,8]
        for(let i = 0; i < this.trendingGifst().length; i += 3) {
            groups.push(this.trendingGifst().slice(i, i + 3));
        }

        return groups
    })

    searchHistory = signal<Record<string, Gif[]>>(loadFromLocalStorage());
    searchHistoryKeys = computed(() => Object.keys(this.searchHistory()));

    constructor() {
        // Removed initial load - will be called from trending page ngOnInit
    }

    resetTrendingGifts() {
        this.trendingGifst.set([]);
        this.trendingPage.set(0);
        this.trendingGifsLoading.set(false);
    }
    
    saveGifsToLocalStorage = effect(() => {
        const historyString = JSON.stringify(this.searchHistory());
        localStorage.setItem(GIF_KEY, historyString);
    });

    // Peticion HTTP
    
    loadTrendingGifts() { 

        if(this.trendingGifsLoading()) return;

        this.trendingGifsLoading.set(true);


    this.http.get<GiphyResponse>(`${ environmnet.gitphyUrl }/gifs/trending`, {
        params: {
            api_key: environmnet.keyApiGifts,
            limit: '20',
            offset: this.trendingPage() * 20
        }
    }).subscribe((res) => {
        const gifts = GifMapper.mapGiphyItemsToGiveArray(res.data);
        this.trendingGifst.update( currentGifs => [...currentGifs, ...gifts]);
        this.trendingPage.update( page => page + 1);
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