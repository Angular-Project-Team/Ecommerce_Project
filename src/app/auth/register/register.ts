import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { min } from 'rxjs';


@Component({
  selector: 'app-register',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  registerForm: FormGroup = new FormGroup(
    {
      fName: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
      ]),
      lName: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
      ]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      phone: new FormControl(null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
      confirmPassword: new FormControl(null, Validators.required),
    },
    { validators: this.confirmPassword },
  );
  flag: boolean = false;
  submitForm(): void {
    // logic
    if (this.registerForm.valid) {
    } else {
      this.flag = true;
    }
  }


  confirmPassword(group: AbstractControl) {
    return group.get('password')?.value === group.get('confirmPassword')?.value
      ? null
      : { misMatch: true };
  }
}





