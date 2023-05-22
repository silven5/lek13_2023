import { enableProdMode, importProvidersFrom, isDevMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';
// Для роботи з камерою
import { defineCustomElements } from '@ionic/pwa-elements/loader';
// Для PWA
import { ServiceWorkerModule } from '@angular/service-worker';
if (environment.production) {
  enableProdMode();
}
// Для PWA
importProvidersFrom(ServiceWorkerModule.register('ngsw-worker.js', {
  enabled: !isDevMode(),
  // Register the ServiceWorker as soon as the application is stable
  // or after 30 seconds (whichever comes first).
  registrationStrategy: 'registerWhenStable:30000'
})),
  bootstrapApplication(AppComponent, {
    providers: [
      { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
      importProvidersFrom(IonicModule.forRoot({})),
      provideRouter(routes),
    ],
  });
// Call the loader
defineCustomElements(window);