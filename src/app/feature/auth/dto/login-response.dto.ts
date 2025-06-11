import {Expose} from 'class-transformer';

export interface LoginResponseDto {
    access_token: string;
    refresh_token?: string;
    token_type: string;
}
