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

  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
  });

  showPassword: boolean = false;
  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
  flag: boolean = false;
  loginError: boolean = false;
  submitForm(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

      this.authService.loginForm(email, password).subscribe({
        next: (response) => {
          if (response && response.length > 0) {
            const user = response[0];
            console.log('User Saved Successfully', user);
            this.router.navigate(['/home']);
            localStorage.setItem('userToken', JSON.stringify(user.id));
            this.loginError = false;
          } else {
            this.loginError = true;
          }
        },
        error: (err) => {
          console.error('Login failed', err);
        },
      });
    } else {
      this.flag = true;
      this.loginForm.markAllAsTouched();
    }
  }
}
