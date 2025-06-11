import {Injectable} from '@angular/core';
import {LoginResponseDto} from '../dto/login-response.dto';
import {LoginRequestDto} from '../dto/login-request.dto';
import {PasswordNotEqualError} from '../error/password-not-equal.error';
import {v4 as randomUUID} from 'uuid';
import {AuthRepository} from './auth.repository';
import {RefreshRequestDto} from '../dto/refresh-request.dto';

interface UserDao {
    email: string,
    password: string
}

@Injectable({
    providedIn: 'root'
})
export class MockAuthRepository extends AuthRepository {
    private userCollection: Array<UserDao> = [
        {
            email: 'test@test.com',
            password: 'test'
        }
    ]

    override async login({email, password}: LoginRequestDto): Promise<LoginResponseDto> {
        const localUser = this.userCollection
            .find(u => u.email === email);

        if (!localUser || localUser.password !== password)
            throw new PasswordNotEqualError();

        const accessToken = randomUUID();
        const refreshToken = randomUUID();
        const expiresIn = 900;

        return {
            accessToken: accessToken,
            refreshToken: refreshToken,
            expiresIn: expiresIn
        };
    }

    override async refresh({refreshToken}: RefreshRequestDto): Promise<LoginResponseDto> {
        const accessToken = randomUUID();
        const newRefreshToken = randomUUID();
        const expiresIn = 900;

        return {
            accessToken: accessToken,
            refreshToken: newRefreshToken,
            expiresIn: expiresIn
        };
    }

    override async logout() {
        return;
    }
}
