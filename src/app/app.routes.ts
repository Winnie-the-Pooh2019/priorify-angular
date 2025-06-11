import {Routes} from '@angular/router';
import {Home, User} from './app';

export const routes: Routes = [
    {
        path: '', component: Home,
    },
    {
        path: 'user',
        component: User
    }
];
