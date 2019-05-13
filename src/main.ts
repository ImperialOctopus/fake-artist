import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { isNgTemplate } from '@angular/compiler';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

(() => {
  const body = document.body;
  const img = new Image();
  img.src = '/assets/background.jpg';
  img.onload = () => {
    body.style.backgroundImage = 'url(\'/assets/background.jpg\')';
  };
})();
