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

/**
 * Guardia de ruta que protege las rutas de acceso a usuarios autenticados.
 * Redirige a la página de la cuenta si el usuario está autenticado.
 */
@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  /**
   * Verifica si el usuario está autenticado.
   * Si el usuario está autenticado, redirige a la página de la cuenta y devuelve false.
   * De lo contrario, devuelve true.
   * @param {ActivatedRouteSnapshot} route - La ruta que se está activando.
   * @param {RouterStateSnapshot} state - El estado actual del enrutador.
   * @returns Un valor booleano o un UrlTree.
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
