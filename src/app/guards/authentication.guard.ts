import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../shared/services/authentication.service';
import { RequestService } from '../shared/services/request.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {

  constructor(private _authenticationService: AuthenticationService, private _router: Router) {}

  canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot) {
    if (this._authenticationService.isUserAuthenticated()) {
      return true;
    }

    this._router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }

}
