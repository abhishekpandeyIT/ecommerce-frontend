import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  isLoading = false;
  socialLoginLoading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      rememberMe: [false]
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) return;

    this.isLoading = true;
    const { email, password, rememberMe } = this.loginForm.value;

    this.authService.login(email, password).subscribe({
      next: (res: any) => {
        localStorage.setItem('token', res.token);
        if (rememberMe) {
          localStorage.setItem('rememberMe', 'true');
        }
        this.router.navigate(['/products']);
        this.isLoading = false;
      },
      error: (err) => {
        this.snackBar.open(
          err.error?.message || 'Login failed', 
          'Close', 
          { duration: 5000 }
        );
        this.isLoading = false;
      }
    });
  }

  socialLogin(provider: any): void {
    this.socialLoginLoading = true;
    this.authService.socialLogin(provider).then(
      (res: any) => {
        localStorage.setItem('token', res.token);
        this.router.navigate(['/products']);
      },
      (err:any) => {
        this.snackBar.open(
          err.message || 'Social login failed', 
          'Close', 
          { duration: 5000 }
        );
        this.socialLoginLoading = false;
      }
    );
  }
}