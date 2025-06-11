import {Expose} from 'class-transformer';

export interface LoginResponseDto {
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
}
