import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}
/**
 * If the user is logged in, navigate to the account page and return false. Otherwise, return true
 * @param {ActivatedRouteSnapshot} route - ActivatedRouteSnapshot - The route that is being activated.
 * @param {RouterStateSnapshot} state - RouterStateSnapshot - The current router state
 * @returns A boolean value.
 */
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.authService.isLoggedIn) {
      this.router.navigate(['/account']);
      return false;
    } else {
      return true;
    }
  }
}
