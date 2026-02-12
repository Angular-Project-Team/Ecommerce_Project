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
  imports: [ReactiveFormsModule, NgClass],
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
    if (this.registerForm.invalid) {
      this.flag = true;
      this.registerForm.markAllAsTouched();
      return;
    }

    const { email, phone } = this.registerForm.value;

    this.authService.checkUserExists(email, phone).subscribe({
      next: (users) => {
        const emailTaken = users.find((u) => u.email === email);
        const phoneTaken = users.find((u) => u.phone === phone);

        if (emailTaken || phoneTaken) {
          if (emailTaken) {
            this.registerForm.get('email')?.setErrors({ emailExists: true });
          }
          if (phoneTaken) {
            this.registerForm.get('phone')?.setErrors({ phoneExists: true });
          }
          this.flag = true;
        } else {
          const { confirmPassword, ...userData } = this.registerForm.value;
          this.authService.registerForm(userData).subscribe({
            next: (response) => {
              console.log('User Saved Successfully', response);
              this.router.navigate(['/login']);
            },
            error: (err) => {
              console.error('Registration failed', err);
            },
          });
        }

        // if (users.length > 0) {
        //   if (emailTaken) {
        //     this.registerForm.get('email')?.setErrors({ emailExists: true });
        //   }
        //   if (phoneTaken) {
        //     this.registerForm.get('phone')?.setErrors({ phoneExists: true });
        //   }

        //   this.registerForm.markAllAsTouched();
        // } else {
        //   const { confirmPassword, ...userData } = this.registerForm.value;

        //   this.authService.registerForm(userData).subscribe({
        //     next: (response) => {
        //       console.log('User Saved Successfully', response);
        //       this.router.navigate(['/login']);
        //     },
        //   });
        // }
      },
      error: (err) => {
        console.error('Error checking user existence', err);
      },
    });
  }

  confirmPassword(group: AbstractControl) {
    return group.get('password')?.value === group.get('confirmPassword')?.value
      ? null
      : { misMatch: true };
  }
}
