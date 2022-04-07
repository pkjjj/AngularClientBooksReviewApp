import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private _authChangeSub = new Subject<boolean>()
  public authChanged = this._authChangeSub.asObservable();

  constructor(private _jwtHelper: JwtHelperService, private _router: Router) { }

  public logout() {
    localStorage.removeItem("token");
    this.sendAuthStateChangeNotification(false);
    this._router.navigate(['/login']);
  }

  public sendAuthStateChangeNotification(isAuthenticated: boolean) {
    this._authChangeSub.next(isAuthenticated);
  }

  public isUserAuthenticated() {
    const token = localStorage.getItem("token");

    return token && !this._jwtHelper.isTokenExpired(token);
  }

  public isUserAdmin() {
    // check undefined
    const token = localStorage.getItem("token");
    const decodedToken = this._jwtHelper.decodeToken(token);
    const role = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']

    return role === 'Administrator';
  }

}
