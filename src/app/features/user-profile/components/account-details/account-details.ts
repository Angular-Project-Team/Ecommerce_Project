import { Component } from '@angular/core';
import { UserService } from '../../../../core/services/user-service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import { Router } from '@angular/router';
import { User } from '../../../../core/models/user.model';
import { inject, signal } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-account-details',
  imports: [FontAwesomeModule, ReactiveFormsModule],
  templateUrl: './account-details.html',
  styleUrls: ['./account-details.css'],
})
export class AccountDetails {
  faEye = faEye;
  faEyeSlash = faEyeSlash;

  showCurrentPassword = false;
  showNewPassword = false;
  showConfirmPassword = false;

  showDetailsSuccess = signal(false);
  showPasswordSuccess = signal(false);
  passwordError = signal<string | null>(null);

  userService: UserService = inject(UserService);
  userId: number = 1;
  user = signal<User | null>(null);
  router: Router = inject(Router);

  userDetailsForm = new FormGroup({
    firstName: new FormControl('', [Validators.required, Validators.minLength(2)]),
    lastName: new FormControl('', [Validators.required, Validators.minLength(2)]),
    phoneNumber: new FormControl('', [Validators.required, Validators.pattern(/^\+?[0-9\s\-\(\)]{10,}$/)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    city: new FormControl('', [Validators.required]),
    streetAddress: new FormControl('', [Validators.required]),
    fullAddress: new FormControl(''),
    zipCode: new FormControl('', [Validators.pattern(/^[0-9]{5}(-[0-9]{4})?$/)]),
  });

  userPasswordForm = new FormGroup({
    currentPassword: new FormControl('', [Validators.required]),
    newPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
    ]),
    confirmPassword: new FormControl('', [Validators.required]),
  }, { validators: this.passwordMatchValidator });

  passwordMatchValidator(group: AbstractControl): ValidationErrors | null {
    const newPassword = group.get('newPassword')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return newPassword === confirmPassword ? null : { passwordMismatch: true };
  }

  ngOnInit(): void {
    this.userService.getUserById(this.userId).subscribe({
      next: (user) => {
        this.user.set(user as User);
        this.userDetailsForm.patchValue({
          firstName: this.user()?.firstName,
          lastName: this.user()?.lastName,
          phoneNumber: this.user()?.phoneNumber,
          email: this.user()?.email,
          city: this.user()?.address.city,
          streetAddress: this.user()?.address.streetAddress,
          fullAddress: this.user()?.address.fullAddress,
          zipCode: this.user()?.address.zipCode,
        });
        this.markEmptyFieldsAsTouched();
      },
      error: (err) => {
        console.error('Error fetching user:', err);
      }
    });
  }

  private markEmptyFieldsAsTouched(): void {
    Object.keys(this.userDetailsForm.controls).forEach(key => {
      const control = this.userDetailsForm.get(key);
      if (control && (!control.value || control.value === '') && control.hasError('required')) {
        control.markAsTouched();
      }
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const control = this.userDetailsForm.get(fieldName);
    return !!(control && control.invalid && control.touched);
  }

  getErrorMessage(fieldName: string): string {
    const control = this.userDetailsForm.get(fieldName);
    if (!control || !control.errors) return '';

    if (control.hasError('required')) return 'This field is required';
    if (control.hasError('email')) return 'Please enter a valid email';
    if (control.hasError('minlength')) {
      const minLength = control.errors['minlength'].requiredLength;
      return `Minimum ${minLength} characters required`;
    }
    if (control.hasError('pattern')) {
      if (fieldName === 'phoneNumber') return 'Please enter a valid phone number';
      if (fieldName === 'zipCode') return 'Please enter a valid ZIP code (e.g., 12345)';
    }
    return 'Invalid input';
  }

  isPasswordFieldInvalid(fieldName: string): boolean {
    const control = this.userPasswordForm.get(fieldName);
    return !!(control && control.invalid && control.touched);
  }

  getPasswordErrorMessage(fieldName: string): string {
    const control = this.userPasswordForm.get(fieldName);
    if (!control || !control.errors) return '';

    if (control.hasError('required')) return 'This field is required';
    if (control.hasError('minlength')) return 'Password must be at least 8 characters';
    if (control.hasError('pattern')) {
      return 'Password must contain uppercase, lowercase, number, and special character (@$!%*?&)';
    }
    return 'Invalid input';
  }

  getPasswordStrength(): { label: string; color: string; width: string } {
    const password = this.userPasswordForm.get('newPassword')?.value || '';
    if (password.length === 0) return { label: '', color: '', width: '0%' };
    
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[@$!%*?&]/.test(password)) strength++;

    if (strength <= 2) return { label: 'Weak', color: 'bg-red-500', width: '33%' };
    if (strength <= 4) return { label: 'Medium', color: 'bg-yellow-500', width: '66%' };
    return { label: 'Strong', color: 'bg-green-500', width: '100%' };
  }

  hasPasswordMismatch(): boolean {
    return this.userPasswordForm.hasError('passwordMismatch') && 
           this.userPasswordForm.get('confirmPassword')?.touched === true;
  }

  updateUserDetails() {
    this.userDetailsForm.markAllAsTouched();
    this.showDetailsSuccess.set(false);

    if (this.userDetailsForm.valid) {
      const formValue = this.userDetailsForm.value;
      const updatedUser = {
        firstName: formValue.firstName,
        lastName: formValue.lastName,
        phoneNumber: formValue.phoneNumber,
        email: formValue.email,
        address: {
          city: formValue.city,
          streetAddress: formValue.streetAddress,
          fullAddress: formValue.fullAddress || '',
          zipCode: formValue.zipCode || ''
        }
      };
      this.userService.updateUserData(this.userId, updatedUser).subscribe({
        next: (response) => {
          this.showDetailsSuccess.set(true);
          setTimeout(() => this.showDetailsSuccess.set(false), 5000);
        },
        error: (err) => {
          console.error('Error updating user details:', err);
        }
      });
    }
  }

  updatePassword() {
    this.userPasswordForm.markAllAsTouched();
    this.showPasswordSuccess.set(false);
    this.passwordError.set(null);

    if (this.userPasswordForm.valid) {
      const currentPassword = this.userPasswordForm.get('currentPassword')?.value;
      const newPassword = this.userPasswordForm.get('newPassword')?.value;

      if (this.user()?.password !== currentPassword) {
        this.passwordError.set('Current password is incorrect');
        return;
      }

      if (currentPassword === newPassword) {
        this.passwordError.set('New password must be different from current password');
        return;
      }

      this.userService.updateUserData(this.userId, { password: newPassword }).subscribe({
        next: () => {
          const currentUser = this.user();
          if (currentUser && newPassword) {
            this.user.set({ ...currentUser, password: newPassword });
          }
          this.showPasswordSuccess.set(true);
          this.userPasswordForm.reset();
          setTimeout(() => this.showPasswordSuccess.set(false), 5000);
        },
        error: (err) => {
          console.error('Error updating password:', err);
          this.passwordError.set('Failed to update password. Please try again.');
        }
      });
    }
  }


  toggleCurrentPasswordVisibility() {
    this.showCurrentPassword = !this.showCurrentPassword;
  }
  toggleNewPasswordVisibility() {
    this.showNewPassword = !this.showNewPassword;
  }
  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }
}
