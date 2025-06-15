import {inject, Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {AuthService} from '../../feature/auth/service/auth.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    authService = inject(AuthService);
    router = inject(Router);

    async canActivate(_route: ActivatedRouteSnapshot, _state: RouterStateSnapshot): Promise<boolean | UrlTree> {
        if (this.authService.getCredentials()) {
            console.log('got credentials');

            if (this.authService.isLoggedIn()) {
                console.log('credentials are valid');
                return true;
            }

            try {
                await this.authService.refresh();
                console.log('credentials refreshed');
                return true;
            } catch (error) {
                console.log('Refresh credentials error');
                return this.router.createUrlTree(['/login']);
            }
        }

        console.log('no credentials found');
        return this.router.createUrlTree(['/login']);
    }
}
