import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.registerForm = this.fb.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      password: ['']
    });
  }

  register() {
    const registerData = this.registerForm.value;
    this.authService.register(registerData).subscribe(
      (response) => {
        console.log('Registration successful', response);
        // Handle successful registration (e.g., redirect to login)
      },
      (error) => {
        console.error('Registration failed', error);
        // Handle registration error
      }
    );
  }
}
