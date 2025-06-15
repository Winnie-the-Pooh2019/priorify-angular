import {Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import {Router, RouterLink, RouterOutlet} from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import {MatIconButton} from '@angular/material/button';

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
        MatIconButton
    ],
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {
    router = inject(Router);

    isCollapsed = false;

    toggleSidenav() {
        this.isCollapsed = !this.isCollapsed;
    }

    user = {
        name: 'John',
        surname: 'Doe',
        photoUrl: 'https://via.placeholder.com/40'
    };

    menuItems = [
        { label: 'Dashboard', icon: 'dashboard', route: '/dashboard' },
        { label: 'Data', icon: 'description', route: '/data' },
        { label: 'Topic Analysis', icon: 'analytics', route: '/topic-analysis' },
        { label: 'Financial Analysis', icon: 'trending_up', route: '/financial-analysis' },
        { label: 'Settings', icon: 'settings', route: '/settings' }
    ];

    logout() {
        console.log('Logout clicked');
    }
}
