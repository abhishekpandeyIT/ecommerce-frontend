import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage: string = '';
  socialLoginLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      rememberMe: [false]
    });
  }

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/products']);
    }
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password, rememberMe } = this.loginForm.value;
      
      this.authService.login(email, password).subscribe(
        (res: any) => {
          localStorage.setItem('token', res.token);
          if (rememberMe) {
            localStorage.setItem('rememberMe', 'true');
          }
          this.router.navigate(['/products']);
        },
        err => {
          this.errorMessage = err.error.message || 'Login failed';
        }
      );
    }
  }

  socialLogin(provider: string) {
    this.socialLoginLoading = true;
    this.authService.socialLogin(provider as any).then(
      (res: any) => {
        localStorage.setItem('token', res.token);
        this.router.navigate(['/products']);
      },
      (err:any) => {
        this.errorMessage = err.message || 'Social login failed';
        this.socialLoginLoading = false;
      }
    );
  }
}