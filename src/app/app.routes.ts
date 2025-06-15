import {Routes} from '@angular/router';
import {AuthGuard} from './core/guard/auth.guard';
import {LoginForm} from './feature/auth/component/login-form/login-form';
import {LayoutComponent} from './shared/components/layout/layout.component';

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
                loadComponent: () => import('./feature/user/dashboard/component/dashboard.component')
                    .then(m => m.DashboardComponent)
            },
            {
                path: 'data',
                loadComponent: () => import('./feature/user/data/component/data.component')
                    .then(m => m.DataComponent)
            },
            {
                path: 'topic-analysis',
                loadComponent: () => import('./feature/user/topic/component/topic.component')
                    .then(m => m.TopicComponent)
            },
            {
                path: 'financial-analysis',
                loadComponent: () => import('./feature/user/financial/component/financial.component')
                    .then(m => m.FinancialComponent)
            },
            {
                path: 'settings',
                loadComponent: () => import('./feature/user/settings/component/settings.component')
                    .then(m => m.SettingsComponent)
            }
        ]
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
