import { AuthService } from './../services/authService';
import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [RouterLink, ReactiveFormsModule, NgClass],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  registerForm: FormGroup = new FormGroup(
    {
      fName: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
        Validators.pattern(/^[a-zA-Z\s\u0600-\u06FF]+$/),
      ]),
      lName: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
        Validators.pattern(/^[a-zA-Z\s\u0600-\u06FF]+$/),
      ]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      phone: new FormControl(null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
      confirmPassword: new FormControl(null, Validators.required),
    },
    { validators: this.confirmPassword },
  );

  flag: boolean = false;

  showPassword: boolean = false;
  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  submitForm(): void {
    if (this.registerForm.valid) {
      const { email, phone } = this.registerForm.value;
      this.registerForm.get('email')?.setErrors(null);
      this.registerForm.get('phone')?.setErrors(null);
      this.authService.checkUserExists(email, phone).subscribe({
        next: (users) => {
          if (users.length > 0) {
            const emailTaken = users.some((u) => u.email === email);
            const phoneTaken = users.some((u) => u.phone === phone);

            if (emailTaken) {
              this.registerForm.get('email')?.setErrors({ emailExists: true });
            }
            if (phoneTaken) {
              this.registerForm.get('phone')?.setErrors({ phoneExists: true });
            }

            this.registerForm.markAllAsTouched();
          } else {
            const { confirmPassword, ...userData } = this.registerForm.value;

            this.authService.registerForm(userData).subscribe({
              next: (response) => {
                console.log('User Saved Successfully', response);
                this.router.navigate(['/login']);
              },
            });
          }
        },
      });
    } else {
      this.flag = true;
      this.registerForm.markAllAsTouched();
    }
  }

  confirmPassword(group: AbstractControl) {
    return group.get('password')?.value === group.get('confirmPassword')?.value
      ? null
      : { misMatch: true };
  }
}
