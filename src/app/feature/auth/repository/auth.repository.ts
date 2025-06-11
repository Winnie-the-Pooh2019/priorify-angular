import {LoginRequestDto} from '../dto/login-request.dto';
import {LoginResponseDto} from '../dto/login-response.dto';
import {Injectable} from '@angular/core';
import {MockAuthRepository} from './mock-auth.repository';

@Injectable({
    providedIn: 'root',
    useClass: MockAuthRepository
})
export abstract class AuthRepository {
    abstract login(loginRequest: LoginRequestDto): Promise<LoginResponseDto>;
}
