import {Injectable} from '@angular/core';
import {NoSuchClaimError} from '../error/no-such-claim.error';
import {JwtService} from './jwt.service';

@Injectable({
    providedIn: 'root'
})
export class MockJwtService extends JwtService {
    getClaim<T>(token: string, key: string): T {
        switch (key) {
            case 'email':
                return 'test@test.com' as T;
            case 'role':
                return 'USER' as T;
            case 'exp':
                return Date.now() + 1000 as T;
            default:
                throw new NoSuchClaimError();
        }
    }
}
