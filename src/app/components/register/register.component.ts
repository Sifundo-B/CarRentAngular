import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
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
      (response: any) => {
        Swal.fire({
          icon: 'success',
          title: 'Registration Successful',
          text: 'You have registered successfully. Logging in...',
        });

        // Auto-login after successful registration
        const loginData = { email: registerData.email, password: registerData.password };
        this.authService.login(loginData).subscribe(
          (loginResponse) => {
            this.authService.saveToken(loginResponse.token);
            Swal.fire({
              icon: 'success',
              title: 'Login Successful',
              text: 'You have been logged in successfully!',
              timer: 1500,
              showConfirmButton: false
            });
            this.router.navigate(['/']);
          },
          (loginError) => {
            Swal.fire({
              icon: 'error',
              title: 'Login Failed',
              text: 'Failed to log in after registration. Please try to log in manually.',
            });
          }
        );
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Registration Failed',
          text: 'There was an issue with your registration. Please try again.',
        });
      }
    );
  }
}
