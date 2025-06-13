import {Component, inject, signal} from '@angular/core';
import {FormControl, FormGroup, FormGroupDirective, NgForm, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '../../service/auth.service';
import {Router} from '@angular/router';

// Angular Material Modules
import {MatCardModule} from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {ErrorStateMatcher} from '@angular/material/core';
import {MatIcon} from '@angular/material/icon';

@Component({
    selector: 'app-login-form',
    imports: [
        ReactiveFormsModule,
        CommonModule,
        ReactiveFormsModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        NgOptimizedImage,
        MatIcon,
    ],
    providers: [

        Router,
        AuthService
    ],
    templateUrl: './login-form.html',
    styleUrl: './login-form.css'
})
export class LoginForm {
    loginForm = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required])
    });

    authService = inject(AuthService);
    router = inject(Router);

    matcher: ErrorStateMatcher = {
        isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
            const isSubmitted = form && form.submitted;
            return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
        }
    };

    hide = signal(true);

    showPassword(event: MouseEvent) {
        event.stopPropagation();
        this.hide.set(!this.hide());
    }

    async hangleLogin() {
        if (this.loginForm.invalid) {
            return;
        }

        await this.authService.login(
            this.loginForm.value.email!!,
            this.loginForm.value.password!!
        );

        this.router.navigate(['/']).then(() => {
            console.log('logged in');
        });
    }
}
