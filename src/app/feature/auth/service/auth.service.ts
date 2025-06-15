import {inject, Injectable} from '@angular/core';
import {AuthRepository} from '../repository/auth.repository';
import {StorageService} from '../../../core/data/storage/storage.service';
import {UserCredentials} from '../model/user-credentials';
import {NoRefreshTokenError} from '../error/no-refresh-token.error';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private authRepository = inject(AuthRepository);
    private storageService = inject(StorageService);

    async login(email: string, password: string): Promise<UserCredentials> {
        const loginResponse = await this.authRepository.login({email, password});

        this.setCredentials(
            loginResponse.accessToken,
            loginResponse.refreshToken,
            loginResponse.expiresIn
        );

        return this.getCredentials()!!;
    }

    async refresh(): Promise<UserCredentials> {
        const refreshToken = this.getCredentials()?.refreshToken

        if (refreshToken) {
            const loginResponse = await this.authRepository.refresh({refreshToken});

            this.setCredentials(
                loginResponse.accessToken,
                loginResponse.refreshToken,
                loginResponse.expiresIn
            );

            return this.getCredentials()!!;
        }

        throw new NoRefreshTokenError();
    }

    async logout() {
        try {
            await this.authRepository.logout();
        } catch (error) {
            console.error('Backend logout error:', error);
        } finally {
            this.removeCredentials();
        }
    }


    isLoggedIn(): boolean {
        const credentials = this.getCredentials();

        if (!credentials) {
            return false;
        }

        return Date.now() < credentials.issuedAt + credentials.expiresIn;
    }

    private setCredentials(accessToken: string, refreshToken: string, expiresIn: number) {
        const userCredentials: UserCredentials = {
            accessToken: accessToken,
            refreshToken: refreshToken,
            issuedAt: Date.now(),
            expiresIn: expiresIn * 1000
        };

        this.storageService.setItem('credentials', userCredentials);
    }

    getCredentials(): UserCredentials | null {
        return this.storageService.getItem('credentials');
    }

    private removeCredentials() {
        this.storageService.removeItem('credentials');
    }

    getAccessToken(): string | null {
        const credentials = this.getCredentials();

        if (!credentials) {
            return null;
        }

        return credentials.accessToken;
    }

    getRefreshToken(): string | null {
        const credentials = this.getCredentials();

        if (!credentials) {
            return null;
        }

        return credentials.refreshToken;
    }
}
