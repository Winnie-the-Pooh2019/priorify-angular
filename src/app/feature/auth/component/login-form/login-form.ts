import {Component, inject} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '../../service/auth.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-login-form',
    imports: [
        ReactiveFormsModule
    ],
    providers: [
        Router,
        AuthService
    ],
    templateUrl: './login-form.html',
    styleUrl: './login-form.scss'
})
export class LoginForm {
    loginForm = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required])
    });

    authService = inject(AuthService);
    router = inject(Router);

    async hangleLogin() {
        await this.authService.login(
            this.loginForm.value.email!!,
            this.loginForm.value.password!!
        );

        this.router.navigate(['/']);
    }
}
