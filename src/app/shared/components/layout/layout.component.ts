import {Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Router, RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {AuthService} from '../../../feature/auth/service/auth.service';

interface MenuItem {
    label: string;
    icon: string;
    route: string;
    isSelected: boolean;
}

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
        RouterLinkActive,
    ],
    providers: [
        AuthService
    ],
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {
    router = inject(Router);
    authService = inject(AuthService);

    isCollapsed = false;

    user = {
        name: 'Надежда',
        surname: 'Шамеева',
        photoUrl: 'https://via.placeholder.com/40'
    };

    menuItems: MenuItem[] = [
        {label: 'Дашборд', icon: 'dashboard', route: '/dashboard', isSelected: false},
        {label: 'Данные', icon: 'description', route: '/data', isSelected: false},
        {label: 'Анализ тем', icon: 'analytics', route: '/topic-analysis', isSelected: false},
        {label: 'Финансовый анализ', icon: 'trending_up', route: '/financial-analysis', isSelected: false},
        {label: 'Настройки', icon: 'settings', route: '/settings', isSelected: false}
    ];

    toggleSidebar() {
        this.isCollapsed = !this.isCollapsed;
    }

    clickMenuItem(item: MenuItem) {
        for (const menuItem of this.menuItems) {
            menuItem.isSelected = menuItem === item;
        }
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
