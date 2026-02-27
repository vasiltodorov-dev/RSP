// src/app/core/services/auth.service.ts
import { Injectable, signal, computed, inject } from '@angular/core'; // Signals live here!
import { HttpClient } from '@angular/common/http'; // HttpClient stays here
import { tap } from 'rxjs';
import { jwtDecode } from 'jwt-decode'; 
import { User } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private readonly AUTH_URL = 'http://localhost:3000/auth';

  // 1. The Signal: Holds User ID, Email, and Role
  currentUser = signal<User | null>(null);

  // 2. Computed Signal: A shortcut for templates to check if logged in
  // Usage in HTML: @if (authService.isLoggedIn()) { ... }
  isLoggedIn = computed(() => !!this.currentUser());

  constructor() {
    // 3. The "Auto-Login" Logic
    // When the app first starts, check if a token exists in the browser
    const token = localStorage.getItem('access_token');
    if (token) {
      try {
        const decodedUser = jwtDecode<User>(token);
        this.currentUser.set(decodedUser); // Put the user back in the "State"
      } catch (e) {
        this.logout(); // If token is garbled/invalid, clear it
      }
    }
  }

  login(credentials: { email: string; password: string }) {
    return this.http.post<{ access_token: string }>(`${this.AUTH_URL}/login`, credentials)
      .pipe(
        tap(res => {
          // A. Save token to disk
          localStorage.setItem('access_token', res.access_token);
          
          // B. Decode the token to get user info (id, email, role)
          const decodedUser = jwtDecode<User>(res.access_token);
          
          // C. Update the signal (The UI will react to this!)
          this.currentUser.set(decodedUser);
        })
      );
  }

  logout() {
    localStorage.removeItem('access_token');
    this.currentUser.set(null);
    // You could also trigger a router navigate to /login here
  }
}