import {Component, input} from '@angular/core';
import {RouterOutlet} from '@angular/router';

// @Component({
//   selector: 'app-root',
//   imports: [RouterOutlet],
//   templateUrl: './app.html',
//   styleUrl: './app.scss'
// })
// export class App {
//   protected title = 'priorify-angular';
// }


@Component({
    selector: 'app-user',
    template: `
        <p>The user's name is {{name()}}</p>
    `,
})
export class User {
    name = input<string>()
}

@Component({
    selector: 'app-root',
    template: `
        <app-user name="Simran"></app-user>`,
    imports: [
        User
    ]
})
export class App {
    message = '';

    onMouseOver() {
        this.message = 'Way to go';
    }
}
