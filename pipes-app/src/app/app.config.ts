import { ApplicationConfig, LOCALE_ID, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

import localeEs from '@angular/common/locales/es-CL';
import localesEn from '@angular/common/locales/en-AU';

import { registerLocaleData } from '@angular/common';
import { LocaleService } from '../services/locale.service';

registerLocaleData(localeEs);
registerLocaleData(localesEn);

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),

    {
      provide: LOCALE_ID,
      // useValue: 'es-CL'

      deps: [LocaleService],
      useFactory: (localeService: LocaleService) => localeService.getLocale

    }
  ]
};
