import {ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {AuthRepository} from './feature/auth/repository/auth.repository';
import {MockAuthRepository} from './feature/auth/repository/mock-auth.repository';

export const appConfig: ApplicationConfig = {
    providers: [
        {
            provide: AuthRepository,
            useClass: MockAuthRepository
        },
        provideBrowserGlobalErrorListeners(),
        provideZonelessChangeDetection(),
        provideRouter(routes)
    ]
};
