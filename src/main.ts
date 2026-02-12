import {registerLocaleData} from "@angular/common";
import localeSk from "@angular/common/locales/sk";
import { LOCALE_ID, provideZoneChangeDetection } from "@angular/core";
import { bootstrapApplication } from '@angular/platform-browser';

import { AppComponent } from './app/app.component';

registerLocaleData(localeSk);

bootstrapApplication(AppComponent, {
  providers: [
    provideZoneChangeDetection(),
    { provide: LOCALE_ID, useValue: 'sk-SK' }
  ]
}).catch((err) => console.error(err));
