import { Injectable } from '@angular/core';
import {LoginService} from "../login/login.service";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";

@Injectable()
export class AdminGuardService implements CanActivate {

  constructor(private loginService: LoginService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.loginService.user.isadmin === 1) {
      return true;
    }
    else {
      this.router.navigate(['/login']);
      return false;
    }
  }

}
