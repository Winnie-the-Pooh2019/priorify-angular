import {Component, inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Router, RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {AuthService} from '../../../feature/auth/service/auth.service';
import {UserService} from '../../../feature/user/service/user.service';

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
        AuthService,
        UserService
    ],
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
    private router = inject(Router);
    private authService = inject(AuthService);
    private userService = inject(UserService);

    protected user!: User;

    ngOnInit() {
        this.userService.getUserInfo()
            .then(user => {
                this.user = user;
                console.log(`user in layout component: ${JSON.stringify(this.user)}`);
            });
    }

    isCollapsed = false;

    menuItems: MenuItem[] = [
        {label: 'Дашборд', icon: 'dashboard', route: 'dashboard', isSelected: false},
        {label: 'Данные', icon: 'description', route: 'data', isSelected: false},
        {label: 'Анализ тем', icon: 'analytics', route: 'topic-analysis', isSelected: false},
        {label: 'Финансовый анализ', icon: 'trending_up', route: 'financial-analysis', isSelected: false},
        {label: 'Настройки', icon: 'settings', route: 'settings', isSelected: false}
    ];

    toggleSidebar() {
        this.isCollapsed = !this.isCollapsed;
    }

    async logout() {
        console.log('Logout clicked');

        try {
            await this.authService.logout();
            this.userService.logout();
        } catch (e) {
        }

        await this.router.navigate(['login']);
    }
}
