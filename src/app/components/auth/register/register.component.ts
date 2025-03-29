import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatLabel } from '@angular/material/input';
import { MatSpinner } from '@angular/material/progress-spinner';
import { TruncatePipe } from '../../cart/truncate.pipe';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  imports: [ReactiveFormsModule, MatCardModule,MatIcon,MatSpinner, CommonModule, MatLabel, TruncatePipe]

})
export class RegisterComponent {
  registerForm: FormGroup;
  isLoading = false;
  hidePassword = true;
  passwordStrength = 0;
  strengthColor = 'red';
  strengthLabel = 'Weak';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      phone: ['', [Validators.pattern(/^[0-9]{10,15}$/)]],
      acceptTerms: [false, Validators.requiredTrue]
    }, { validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  onSubmit(): void {
    if (this.registerForm.invalid) return;

    this.isLoading = true;
    const { name, email, password, phone } = this.registerForm.value;

    this.authService.register({ name, email, password, phone }).subscribe({
      next: (user) => {
        this.snackBar.open('Registration successful! Please login', 'Close', {
          duration: 5000
        });
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.snackBar.open(
          err.error?.message || 'Registration failed', 
          'Close', 
          { duration: 5000 }
        );
        this.isLoading = false;
      }
    });
  }

  get f() {
    return this.registerForm.controls;
  }
}