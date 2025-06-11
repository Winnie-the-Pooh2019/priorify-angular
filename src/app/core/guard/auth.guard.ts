import {inject, Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {AuthService} from '../../feature/auth/service/auth.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    authService = inject(AuthService);
    router = inject(Router);

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): boolean | UrlTree {
        if (this.authService.getAccessToken() !== '') {
            return true;
        }

        return this.router.createUrlTree(['/login'], {
            queryParams: { returnUrl: state.url }
        });
    }
}
