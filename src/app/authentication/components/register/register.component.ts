import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/authService.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registrationForm: FormGroup;
  hide = true;

  constructor(private fb: FormBuilder ,private router : Router ,private authService : AuthService) {
    this.registrationForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, {
      validator: this.mustMatch('password', 'confirmPassword')
    });
  }

  ngOnInit() {
  }

  // Getter for form controls

  get name() {
    return this.registrationForm.get('name');
  }

  get email() {
    return this.registrationForm.get('email');
  }

  get password() {
    return this.registrationForm.get('password');
  }

  get confirmPassword() {
    return this.registrationForm.get('confirmPassword');
  }

  mustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors['mustMatch']) {
        return;
      }

      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }


  onSubmit() {
    if (this.registrationForm.valid) {
      console.log(this.registrationForm.value);

      const { name, email, password } = this.registrationForm.value;

      this.authService.register(name, email, password).subscribe(
        () => {
          // Registration successful, navigate contacts
          this.router.navigate(['/contacts']);
        },
        error => {
          // Handle registration errors
          console.error('Registration error:', error);
        }
      );

    }else {
      let errorMessage = '';
      if (this.name?.errors) {
        errorMessage += 'Name is invalid. ';
      }

      if (this.email?.errors) {
        errorMessage += 'Email is invalid. ';
      }
      if (this.password?.errors) {
        errorMessage += 'Password is invalid. ';
      }
      if (this.confirmPassword?.errors) {
        errorMessage += 'Confirm Password is invalid or does not match. ';
      }

      this.router.navigate(['authentication/error'], { queryParams: { message: errorMessage } });
    }
  }


  navigateToLogin(){
    this.router.navigate(['authentication/login']);
  }
}
