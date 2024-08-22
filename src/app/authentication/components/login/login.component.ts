import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/authService.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  hide = true;

  constructor(private fb: FormBuilder ,private router : Router, private authService:AuthService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit() {
  }

  // Getter for form controls
  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }


  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

      this.authService.login(email, password).subscribe(
        () => {
          // Login successful, navigate to a different page or show success message
          this.router.navigate(['/contacts']);
        },
        error => {
          // Handle login errors
          this.router.navigate(['error'], { queryParams: { message: error } });
          console.error('Login error:', error);
        }
      );
    }else {
      let errorMessage = '';

      if (this.email?.errors) {
        errorMessage += 'Email is invalid. ';
      }
      if (this.password?.errors) {
        errorMessage += 'Password is invalid. ';
      }

      this.router.navigate(['authentication/error'], { queryParams: { message: errorMessage } });
    }
  }


  navigateToRegister(){
    this.router.navigate(['authentication/register']);
  }
}
