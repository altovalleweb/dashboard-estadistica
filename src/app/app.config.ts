import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeEsAr from '@angular/common/locales/es-AR';
import { provideHttpClient, withFetch } from '@angular/common/http';

// Registrar los datos de localización
registerLocaleData(localeEsAr);
export const appConfig: ApplicationConfig = {
  providers: [
     { provide: LOCALE_ID, useValue: 'es-AR' },
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideHttpClient(withFetch()),
    provideRouter(routes), provideClientHydration(withEventReplay())
  ]
};
