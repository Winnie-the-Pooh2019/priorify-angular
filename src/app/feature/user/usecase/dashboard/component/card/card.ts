import { Component, Input, Output, EventEmitter } from '@angular/core';
import {
    MatCard,
    MatCardActions,
    MatCardContent,
    MatCardHeader,
    MatCardSubtitle,
    MatCardTitle
} from '@angular/material/card';
import {MatIcon} from '@angular/material/icon';
import {MatButton} from '@angular/material/button';

@Component({
    selector: 'app-card',
    templateUrl: './card.html',
    imports: [
        MatCard,
        MatCardHeader,
        MatCardContent,
        MatIcon,
        MatCardActions,
        MatButton,
        MatCardTitle,
        MatCardSubtitle,
    ],
    styleUrls: ['./card.scss']
})
export class Card {
    @Input() title = '';
    @Input() subtitle = '';
    @Input() links: { name: string; url: string; icon?: string }[] = [];

    @Input() cardClass = '';
    @Input() buttonClass = '';

    @Input() onHide: () => void = () => {};

    @Output() hide = new EventEmitter<void>();

    onHideClick() {
        this.hide.emit();
    }
}
