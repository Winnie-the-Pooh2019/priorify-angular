import {Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Router, RouterLink, RouterOutlet} from '@angular/router';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatButton, MatIconButton} from '@angular/material/button';
import {AuthService} from '../../../feature/auth/service/auth.service';

@Component({
    selector: 'app-layout',
    standalone: true,
    imports: [
        CommonModule,
        RouterOutlet,
        RouterLink,
        MatSidenavModule,
        MatIconModule,
        MatListModule,
        MatIconButton,
        MatButton
    ],
    providers: [
        AuthService
    ],
    templateUrl: './lay.component.html',
    styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {
    router = inject(Router);
    authService = inject(AuthService);

    isCollapsed = false;

    user = {
        name: 'John',
        surname: 'Doe',
        photoUrl: 'https://via.placeholder.com/40'
    };

    menuItems = [
        {label: 'Dashboard', icon: 'dashboard', route: '/dashboard'},
        {label: 'Data', icon: 'description', route: '/data'},
        {label: 'Topic Analysis', icon: 'analytics', route: '/topic-analysis'},
        {label: 'Financial Analysisssssssssssssssssss', icon: 'trending_up', route: '/financial-analysis'},
        {label: 'Settings', icon: 'settings', route: '/settings'}
    ];

    toggleSidebar() {
        this.isCollapsed = !this.isCollapsed;
    }

    async logout() {
        console.log('Logout clicked');

        try {
            await this.authService.logout();
        } catch (e) {
        }

        await this.router.navigate(['login']);
    }
}
