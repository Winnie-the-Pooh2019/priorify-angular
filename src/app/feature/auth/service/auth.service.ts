import {inject} from '@angular/core';
import {AuthRepository} from '../repository/auth.repository';
import {MockAuthRepository} from '../repository/mock-auth.repository';
import {StorageService} from '../../../shared/services/storage.service';

export class AuthService {
    constructor(private authRepository: AuthRepository) {
    }

    async login(email: string, password: string) {
        const loginResponse = await this.authRepository.login({email, password});

        this.storageService.setItem('access_token', loginResponse.access_token);
        this.storageService.setItem('refresh_token', loginResponse.refresh_token);
        this.storageService.setItem('token_type', loginResponse.token_type);
    }
}
