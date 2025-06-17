import {Injectable} from '@angular/core';
import {LoginResponseDto} from '../dto/login-response.dto';
import {LoginRequestDto} from '../dto/login-request.dto';
import {PasswordNotEqualError} from '../error/password-not-equal.error';
import {v4 as randomUUID} from 'uuid';
import {AuthRepository} from './auth.repository';

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

        return {
            accessToken: accessToken,
            refreshToken: refreshToken
        };
    }

    override async refresh(): Promise<LoginResponseDto> {
        const accessToken = randomUUID();
        const newRefreshToken = randomUUID();

        return {
            accessToken: accessToken,
            refreshToken: newRefreshToken
        };
    }

    override async logout() {
        return;
    }
}
