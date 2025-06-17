import {Routes} from '@angular/router';
import {AuthGuard} from './core/guard/auth.guard';
import {LoginForm} from './feature/auth/component/login-form/login-form';
import {LayoutComponent} from './shared/components/layout/layout.component';
import {GuestGuard} from './core/guard/guest.guard';

export const routes: Routes = [
    {
        path: '',
        pathMatch: "full",
        redirectTo: 'dashboard'
    },
    {
        path: '',
        component: LayoutComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: 'dashboard',
                loadComponent: () => import('./feature/user/usecase/dashboard/component/dashboard.component')
                    .then(m => m.DashboardComponent)
            },
            {
                path: 'data',
                loadComponent: () => import('./feature/user/usecase/data/component/data.component')
                    .then(m => m.DataComponent)
            },
            {
                path: 'topic-analysis',
                loadComponent: () => import('./feature/user/usecase/topic/component/topic.component')
                    .then(m => m.TopicComponent)
            },
            {
                path: 'financial-analysis',
                loadComponent: () => import('./feature/user/usecase/financial/component/financial.component')
                    .then(m => m.FinancialComponent)
            },
            {
                path: 'settings',
                loadComponent: () => import('./feature/user/usecase/settings/component/settings.component')
                    .then(m => m.SettingsComponent)
            }
        ]
    },
    {
        path: 'login',
        component: LoginForm,
        canActivate: [GuestGuard]
    },
    {
        path: '**',
        redirectTo: ''
    }
];
