import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../services/authService';
import { Router } from '@angular/router';
import { NgClass } from '@angular/common';
@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  showPassword: boolean = false;
  loginError: boolean = false;

  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
  });

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
  submitForm(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

      this.authService.loginForm(email, password).subscribe({
        next: (response) => {
          if (response && response.length > 0) {
            const user = response[0];
            if (user.email === email && user.password === password)
              console.log('User Saved Successfully', user);
            localStorage.setItem('userToken', JSON.stringify(user.id));
            this.loginError = false;
            this.router.navigate(['/home']);
          } else {
            this.loginError = true;
            console.log('login faild');
          }
        },
        error: (err) => {
          this.loginError = true;
          console.error('Login failed', err);
        },
      });
    } else {
      this.loginError = true;
      this.loginForm.markAllAsTouched();
    }
  }
}
