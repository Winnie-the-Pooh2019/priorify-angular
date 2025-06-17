import {Injectable} from '@angular/core';
import {JwtService} from './jwt.service';
import {jwtDecode} from 'jwt-decode';
import {NoSuchClaimError} from '../error/no-such-claim.error';

type JwtPayload = {
    [key: string]: any;
};

@Injectable({
    providedIn: 'root'
})
export class PriorJwtService extends JwtService {
    //todo test this
    getClaim<T>(token: string, key: string): T {
        const allClaims = jwtDecode<JwtPayload>(token);

        if (!(key in allClaims)) {
            throw new NoSuchClaimError();
        }

        return (allClaims[key] as T);
    }
}
