import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AccountService } from '../pages/service/account.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(
    private router: Router,
    private jwtHelper: JwtHelperService,
    private accountService: AccountService
  ) { }

  canActivate(route: any): boolean {
    const token = localStorage.getItem('token');

    if (token && !this.jwtHelper.isTokenExpired(token)) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      const userId = decodedToken?.UserId;
      const userRoles = decodedToken['role'];
      const requiredRole = route.data['requiredRole'];
      this.accountService.setUserId(userId);


      if (userRoles && (userRoles.includes(requiredRole) || userRoles.includes('Admin'))) {
        return true;
      } else {
        alert("Bạn chưa đăng nhập! Hãy đăng nhập để tiếp tục");
        return false;
      }
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
