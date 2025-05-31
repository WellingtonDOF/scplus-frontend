import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http'; // Importe aqui
import { routes } from './app.routes';
import { provideNgxMask } from 'ngx-mask'; 
import { authInterceptor } from './interceptors/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])), //esse interceptor adiciona o token de autenticação a todas as requisições HTTP
    provideNgxMask(), 
  ]
};
