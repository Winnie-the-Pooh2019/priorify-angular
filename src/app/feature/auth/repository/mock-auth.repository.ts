import {Injectable} from '@angular/core';
import {LoginResponseDto} from '../dto/login-response.dto';
import {LoginRequestDto} from '../dto/login-request.dto';
import {PasswordNotEqualError} from '../error/password-not-equal.error';
import { v4 as randomUUID } from 'uuid';

interface UserDao {
    email: string,
    password: string
}

@Injectable({
    providedIn: 'root'
})
export class MockAuthRepository {
    private userCollection: Array<UserDao> = [
        {
            email: 'test@test.com',
            password: 'test'
        }
    ]

    async login({email, password}: LoginRequestDto): Promise<LoginResponseDto> {
        const localUser = this.userCollection
            .find(u => u.email === email);

        if (!localUser || localUser.password !== password)
            throw new PasswordNotEqualError();

        const accessToken = randomUUID();
        const refreshToken = randomUUID();

        return {
            access_token: accessToken,
            refresh_token: refreshToken,
            token_type: 'Bearer'
        };
    }
}
