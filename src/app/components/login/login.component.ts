import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.loginForm = this.fb.group({
      email: [''],
      password: ['']
    });
  }

  login() {
    const loginData = this.loginForm.value;
    this.authService.login(loginData).subscribe(
      (response) => {
        console.log('Login successful', response);
        // Handle successful login (e.g., redirect to dashboard)
      },
      (error) => {
        console.error('Login failed', error);
        // Handle login error
      }
    );
  }
}
