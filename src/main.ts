import { LOCALE_ID, provideZoneChangeDetection } from "@angular/core";
import { bootstrapApplication } from '@angular/platform-browser';

import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, {
  providers: [
    provideZoneChangeDetection(),
    { provide: LOCALE_ID, useValue: 'en-US' }
  ]
}).catch((err) => console.error(err));
