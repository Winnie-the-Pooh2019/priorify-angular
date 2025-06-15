import {inject, Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AuthService} from '../../feature/auth/service/auth.service';

@Injectable({
    providedIn: 'root'
})
export class GuestGuard implements CanActivate {
    private authService = inject(AuthService);
    private router = inject(Router);

    async canActivate(_route: ActivatedRouteSnapshot, _state: RouterStateSnapshot) {
        const credentials = this.authService.getCredentials();

        if (!credentials) {
            return true;
        }

        if (this.authService.isLoggedIn()) {
            console.log('User is already logged in, redirecting to dashboard');
            return this.router.createUrlTree(['']);
        }

        try {
            await this.authService.refresh();
            console.log('Token refreshed, user is logged in, redirecting to dashboard');
            return this.router.createUrlTree(['']);
        } catch (error) {
            console.log('Token refresh failed, allowing access to login');
            return true;
        }
    }
}
