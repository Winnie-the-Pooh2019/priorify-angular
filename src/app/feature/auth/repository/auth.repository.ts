import {LoginRequestDto} from '../dto/login-request.dto';
import {LoginResponseDto} from '../dto/login-response.dto';

export abstract class AuthRepository {
    abstract login(loginRequest: LoginRequestDto): Promise<LoginResponseDto>;
}
