import {inject, Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {AuthService} from '../../feature/auth/service/auth.service';
import {RefreshCredentialsError} from '../../feature/auth/error/refresh-credentials.error';

@Injectable({
    providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {
    private authService = inject(AuthService);

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const authToken = this.authService.getAccessToken();

        const authReq = authToken
            ? req.clone({
                setHeaders: {
                    Authorization: `Bearer ${authToken}`
                }
            })
            : req;

        return next.handle(authReq).pipe(
            catchError(error => {
                if (error.status === 401) {
                    this.authService.refresh()
                        .then(credentials => {
                            const authToken = credentials.accessToken;

                            return next.handle(req.clone({
                                setHeaders: {
                                    Authorization: `Bearer ${authToken}`
                                }
                            }));
                        })
                        .catch(() => {
                            throw new RefreshCredentialsError();
                        });
                }

                return throwError(() => error);
            })
        );
    }
}
