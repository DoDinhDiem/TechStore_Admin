import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from 'src/app/Http/baseUrl';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private userId: string | null = null;

  constructor(private http: HttpClient) {
  }
  signIn(Account: any) {
    return this.http.post<any>(baseUrl + "Account/LoginAdmin", Account)
  }

  storeToken(tokenValue: string) {
    localStorage.setItem('token', tokenValue)
  }

  getToken() {
    return localStorage.getItem('token')
  }

  getRole() {
    return localStorage.getItem('role')
  }
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token')
  }

  setUserId(userId: string): void {
    this.userId =userId ;
  }

  getUserId(): string | null {
    return this.userId;
  }
}
