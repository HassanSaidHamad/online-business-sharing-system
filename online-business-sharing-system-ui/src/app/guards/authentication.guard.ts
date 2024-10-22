import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { ToastService } from '../services/toast.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationGuard implements CanActivate {
  constructor(
    private authenticationService: AuthenticationService,
    private toastService: ToastService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    return this.isUserLoggenIn();
  }

  public isUserLoggenIn(): boolean {
    if (this.authenticationService.isUserLoggedIn()) {
      return true;
    } else {
      this.router.navigateByUrl('/');
      this.toastService.toastError('You need to log in to access this page');

      return false;
    }
  }
}
