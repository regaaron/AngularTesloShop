import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { LoggingInterceptor } from './shared/components/interceptors/logging.interceptor';
import { AuthInterceptor } from './auth/interceptors/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes,withHashLocation()),
    provideHttpClient(
      withFetch(),
      withInterceptors([AuthInterceptor])
    ),
    
  ]
};
