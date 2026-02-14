import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../core/models/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly httpClient = inject(HttpClient);

  private readonly baseUrl = 'http://localhost:3000/users';

  registerForm(userData: User): Observable<any> {
    return this.httpClient.post(this.baseUrl, userData);
  }
  checkUserExists(email: string, phone: string): Observable<User[]> {
    return this.httpClient.get<User[]>(this.baseUrl);
  }

  loginForm(email: string, password: string): Observable<User[]> {
    return this.httpClient.get<User[]>(`${this.baseUrl}?email=${email}&password=${password}`);
  }
  generateFakeToken(userId: string): string {
    return btoa(`user-session-${userId}-${Date.now()}`); // is a simple base64 encoded string containing user ID and timestamp
  }

  // This method is not used in the current implementation but can be useful for future enhancements
  getUserIdFromToken(token: string): string {
    try {
      const decoded = atob(token); // Decodes the base64 token
      return decoded.split('-')[2]; // Extracts the user ID from the decoded token
    } catch {
      return '';
    }
  }
}
