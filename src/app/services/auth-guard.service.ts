import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivateChild,
  CanLoad,
  Route,
  Router
} from '@angular/router';

import { AuthService } from './auth.service';

import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate, CanActivateChild, CanLoad {

  currentUser: User;

  constructor(private authService: AuthService,private router:Router) {
    this.authService.currentUser.subscribe(user => {
      this.currentUser = user
    })
  }

  check(route, _state?: RouterStateSnapshot) {
    if (!this.currentUser){
      this.router.navigateByUrl('login')
    }
      if (this.currentUser) {

        if (route.data.allowUserType.includes(this.currentUser['userType']))

          return true;
      }
    return false;
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    return this.check(route, state);
  };

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.check(route, state);
  };

  canLoad(route: Route): boolean {

    return this.check(route);
  }
}
