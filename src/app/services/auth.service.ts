import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
// import { AuthRequest, AuthResponse, User } from '../models/auth';
import { AuthRequest} from '../models/AuthRequest ';
import { AuthResponse } from '../models/AuthResponse ';
import { User } from '../models/User';
import { environment } from '../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  login(credentials: AuthRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/login`, credentials);
  }

  register(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/register`, user, { responseType: 'text' });
  }

  // Store token in local storage
  saveToken(token: string): void {
    localStorage.setItem('jwtToken', token);
  }

  // Retrieve token from local storage
  getToken(): string | null {
    return localStorage.getItem('jwtToken');
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    const token = this.getToken();
    return !!token;
  }

  // Logout user and clear token
  logout(): void {
    localStorage.removeItem('jwtToken');
  }
}