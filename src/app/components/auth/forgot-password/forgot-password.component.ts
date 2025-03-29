import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {
  forgotForm: FormGroup;
  isLoading = false;
  emailSent = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.forgotForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit(): void {
    if (this.forgotForm.invalid) return;

    this.isLoading = true;
    const email = this.forgotForm.value.email;

    this.authService.forgotPassword(email).subscribe({
      next: () => {
        this.emailSent = true;
        this.isLoading = false;
        this.snackBar.open('Password reset email sent successfully', 'Close', {
          duration: 5000
        });
      },
      error: (err) => {
        this.isLoading = false;
        this.snackBar.open(
          err.error?.message || 'Failed to send reset email', 
          'Close', 
          { duration: 5000 }
        );
      }
    });
  }

  backToLogin(): void {
    this.router.navigate(['/login']);
  }
}