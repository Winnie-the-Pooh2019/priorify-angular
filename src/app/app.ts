import {Component, input, output, Pipe, PipeTransform} from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

// @Component({
//   selector: 'app-root',
//   imports: [RouterOutlet],
//   templateUrl: './app.html',
//   styleUrl: './app.scss'
// })
// export class App {
//   protected title = 'priorify-angular';
// }

import {Routes} from '@angular/router';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {CurrencyPipe, DatePipe, DecimalPipe, UpperCasePipe} from '@angular/common';
import {LoginForm} from './feature/auth/component/login-form/login-form';

@Component({
    selector: 'app-home',
    template: `
        <div>Home Page</div>
    `,
})
export class Home {
}

@Component({
    selector: 'app-user',
    template: `
        <label for="framework">
            {{username}}\'s Favourite Framework:
            <input id="framework" type="text" [(ngModel)]="favouriteFramework"/>
        </label>
        <button (click)="showFramework()">Show Framework</button>
    `,
    imports: [FormsModule]
})
export class User {
    username = 'youngTech';
    favouriteFramework = '';

    showFramework() {
        alert(this.favouriteFramework);
    }
}

@Pipe({
    name: 'star'
})
export class StarPipe implements PipeTransform {
    transform(value: any): any {
        return `⭐️ ${value} ⭐️`
    }
}

@Pipe({
    name: 'reverse'
})
export class ReversePipe implements PipeTransform {
    transform(value: string): string {
        let reverse = '';

        for (let i = value.length - 1; i >= 0; i--) {
            reverse += value[i];
        }

        return reverse;
    }
}

@Component({
    selector: 'app-root',
    template: `

        <router-outlet/>
    `,
    imports: [RouterOutlet],
})
export class App {
}
