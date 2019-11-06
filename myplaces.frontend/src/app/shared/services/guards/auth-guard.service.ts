import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  jwt: JwtHelperService;

  constructor(public router: Router) {
    this.jwt = new JwtHelperService();
  }
  /**
   * @description check if user is logged in
   */
  canActivate(): boolean {
    if (this.jwt.isTokenExpired(localStorage.getItem('token'))) {
      this.router.navigate(['login'])
      return false;
    }
    return true;
  }
}
