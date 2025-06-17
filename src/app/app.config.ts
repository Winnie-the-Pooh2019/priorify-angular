import {ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {AuthRepository} from './feature/auth/repository/auth.repository';
import {MockAuthRepository} from './feature/auth/repository/mock-auth.repository';
import {UserRepository} from './feature/user/repository/user.repository';
import {MockUserRepository} from './feature/user/repository/mock-user.repository';
import {JwtService} from './core/security/jwt.service';
import {MockJwtService} from './core/security/mock-jwt.service';

export const appConfig: ApplicationConfig = {
    providers: [
        {
            provide: AuthRepository,
            useClass: MockAuthRepository
        },
        {
            provide: UserRepository,
            useClass: MockUserRepository
        },
        {
            provide: JwtService,
            useClass: MockJwtService
        },
        provideBrowserGlobalErrorListeners(),
        provideZonelessChangeDetection(),
        provideRouter(routes)
    ]
};
