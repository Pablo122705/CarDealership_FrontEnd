import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticatedValue = false;
  private user: any = null;
  private apiUrl = 'https://3000/login'; 

  constructor(private http: HttpClient) {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.user = JSON.parse(storedUser);
      this.isAuthenticatedValue = true;
    }
  }

  isAuthenticated(): boolean {
    return this.isAuthenticatedValue;
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated();
  }

  login(credentials: { username: string; password: string }): Observable<any> {
    return this.http.post(this.apiUrl, credentials).pipe(
      tap((response: any) => {
        if (response.success) {
          this.isAuthenticatedValue = true;
          this.user = response.user;
          localStorage.setItem('user', JSON.stringify(response.user));
          localStorage.setItem('token', response.token);
        }
      })
    );
  }

  logout() {
    this.isAuthenticatedValue = false;
    this.user = null;
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  }
}

