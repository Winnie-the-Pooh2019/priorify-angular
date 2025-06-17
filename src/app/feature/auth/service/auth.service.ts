import {inject, Injectable} from '@angular/core';
import {AuthRepository} from '../repository/auth.repository';
import {StorageService} from '../../../core/data/storage/storage.service';
import {UserCredentials} from '../../../core/domain/model/user-credentials';
import {NoRefreshTokenError} from '../error/no-refresh-token.error';
import {JwtService} from '../../../core/security/jwt.service';
import {LoginResponseDto} from '../dto/login-response.dto';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private authRepository = inject(AuthRepository);
    private storageService = inject(StorageService);
    private jwtService = inject(JwtService);

    async login(email: string, password: string): Promise<UserCredentials> {
        const loginResponse = await this.authRepository.login({email, password});

        return this.setCredentials(loginResponse);
    }

    async refresh(): Promise<UserCredentials> {
        const refreshToken = this.getCredentials()?.refreshToken

        if (refreshToken) {
            const loginResponse = await this.authRepository.refresh({refreshToken});

            return this.setCredentials(loginResponse);
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

        return Date.now() < credentials.expiresIn;
    }

    private setCredentials(loginResponse: LoginResponseDto) {
        const jwtEmail: string = this.jwtService.getClaim(loginResponse.accessToken, 'email');
        const jwtExpiresIn: number = this.jwtService.getClaim(loginResponse.accessToken, 'exp');
        const jwtRole: string = this.jwtService.getClaim(loginResponse.accessToken, 'role');

        const userCredentials: UserCredentials = {
            email: jwtEmail,
            role: jwtRole,
            accessToken: loginResponse.accessToken,
            refreshToken: loginResponse.refreshToken,
            expiresIn: jwtExpiresIn
        };

        this.storageService.setItem('credentials', userCredentials);

        return userCredentials;
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
