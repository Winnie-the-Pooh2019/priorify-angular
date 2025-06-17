import { Component } from '@angular/core';
import {MatIcon} from '@angular/material/icon';
import {Card} from './card/card';
import {NgStyle} from '@angular/common';

interface SocialCard {
    id: number;
    title: string;
    subtitle: string;
    links: { name: string; url: string; icon: string }[];
}

@Component({
  selector: 'user-dashboard-component',
    imports: [
        MatIcon,
        Card,
        NgStyle,
    ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
    cards: SocialCard[] = [
        {
            id: 1,
            title: 'Сбор: Кемерово',
            subtitle: 'Статус: успех',
            links: [
                { name: 'VK', url: 'russianknights', icon: 'facebook' },
                { name: 'VK', url: 'countryballs_re', icon: 'twitter' },
                { name: 'VK', url: 'incident_42', icon: 'linkedin' }
            ]
        },
        {
            id: 2,
            title: 'Сбор: Прокопьевск',
            subtitle: 'Статус: в работе',
            links: [
                { name: 'Telegram', url: 'overhearprk', icon: 'send' },
                { name: 'Instagram', url: 'prkp_online', icon: 'photo_camera' }
            ]
        }
    ];

    showPanels = true;

    togglePanels() {
        this.showPanels = !this.showPanels;
    }

    removeCard(id: number) {
        this.cards = this.cards.filter(card => card.id !== id);
    }
}
