import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatNativeDateModule, MAT_DATE_FORMATS, provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelect, MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideAnimationsAsync(),
    provideNativeDateAdapter(),
    { provide: MAT_DATE_FORMATS, useValue: MAT_DATE_FORMATS }
  ]
};
