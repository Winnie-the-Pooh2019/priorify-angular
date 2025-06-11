import {inject, Injectable} from '@angular/core';
import {AuthRepository} from '../repository/auth.repository';
import {MockAuthRepository} from '../repository/mock-auth.repository';
import {StorageService} from '../../../shared/services/storage.service';
import {UserCredentials} from '../model/user-credentials';

@Injectable()
export class AuthService {
    private authRepository = inject(AuthRepository);
    private storageService = inject(StorageService);

    async login(email: string, password: string) {
        const loginResponse = await this.authRepository.login({email, password});

        this.setCredentials(
            loginResponse.access_token,
            loginResponse.refresh_token,
            loginResponse.token_type
        );
    }

    getAccessToken(): string {
        const credentials = this.getCredentials();

        if (credentials) {
            return credentials.accessToken;
        }

        return '';
    }

    private setCredentials(accessToken: string, refreshToken: string, tokenType: string) {
        const userCredentials: UserCredentials = {
            accessToken: accessToken,
            refreshToken: refreshToken,
            tokenType: tokenType
        };

        this.storageService.setItem('credentials', userCredentials);
    }

    private getCredentials(): UserCredentials | null {
        return this.storageService.getItem('credentials');
    }
}
