import {LoginRequestDto} from '../dto/login-request.dto';
import {LoginResponseDto} from '../dto/login-response.dto';
import {Injectable} from '@angular/core';
import {MockAuthRepository} from './mock-auth.repository';
import {RefreshRequestDto} from '../dto/refresh-request.dto';

export abstract class AuthRepository {
    abstract login(loginRequest: LoginRequestDto): Promise<LoginResponseDto>;

    abstract refresh(refreshRequestDto: RefreshRequestDto): Promise<LoginResponseDto>;

    abstract logout(): Promise<void>;
}
