import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { auth } from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;

  constructor(
    private fireAuth: AngularFireAuth,
    private http: HttpClient,
    private router: Router
  ) { }

  // Email/password login
  login(email: string, password: string) {
    return this.http.post(`${this.apiUrl}/auth/login`, { email, password });
  }

  // Register new user
  register(userData: any) {
    return this.http.post(`${this.apiUrl}/auth/register`, userData);
  }

  // Firebase social login
  socialLogin(provider: 'google' | 'facebook' | 'twitter') {
    let authProvider;
    
    switch(provider) {
      case 'google': authProvider = new auth.GoogleAuthProvider(); break;
      case 'facebook': authProvider = new auth.FacebookAuthProvider(); break;
      case 'twitter': authProvider = new auth.TwitterAuthProvider(); break;
    }

    return this.fireAuth.signInWithPopup(authProvider)
      .then((result) => {
        return this.http.post(`${this.apiUrl}/auth/firebase`, { 
          idToken: (result.user as any).za 
        }).toPromise();
      });
  }

  // Admin login
  adminLogin(email: string, password: string) {
    if (email === 'admin@admin.com' && password === 'admin003') {
      localStorage.setItem('admin', 'true');
      return Promise.resolve(true);
    }
    return Promise.reject('Invalid admin credentials');
  }

  // Check if user is logged in
  isLoggedIn() {
    return localStorage.getItem('token') !== null;
  }

  // Check if admin is logged in
  isAdminLoggedIn() {
    return localStorage.getItem('admin') !== null;
  }

  // Logout
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('admin');
    this.router.navigate(['/login']);
  }
}