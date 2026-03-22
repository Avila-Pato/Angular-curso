import { Injectable, signal } from '@angular/core';

export type AvaibleLocales = 'es-CL' | 'en-AU';


@Injectable({providedIn: 'root'})
export class LocaleService {
    private currentLocale = signal<AvaibleLocales>('es-CL');

    constructor() {
        this.currentLocale.set(
            localStorage.getItem('locale') as AvaibleLocales ?? 'es-CL'
        )
    }

    get getLocale() {
        return this.currentLocale();
    }

    changeLocal(locale: AvaibleLocales) {
        localStorage.setItem('locale', locale);
        this.currentLocale.set(locale);
        window.location.reload();
    }
}