import {Routes} from '@angular/router';
import {Home} from './app';
import {AuthGuard} from './core/guard/auth.guard';
import {LoginForm} from './feature/auth/component/login-form/login-form';

export const routes: Routes = [
    {
        path: '',
        component: Home,
        canActivate: [AuthGuard]
    },
    {
        path: 'login',
        component: LoginForm
    },
    {
        path: '**',
        redirectTo: ''
    }
];
