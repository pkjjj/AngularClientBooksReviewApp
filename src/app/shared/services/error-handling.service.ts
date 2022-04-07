import { HttpErrorResponse, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlingService {

  constructor(private _router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req)
    .pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = this.handleError(error);
        return throwError(errorMessage);
      })
    )
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 404) {
      return this.handleNotFound(error);
    }
    else if (error.status === 400) {
      return this.handleBadRequest(error);
    }
    else if (error.status === 401) {
      return this.handleUnauthorized(error);
    }
    return null;
  }

  private handleUnauthorized(error: HttpErrorResponse) {
    if (this._router.url === '/login') {
      return 'Authenitcation failed. Wrong Username or Password';
    }
    else {
      this._router.navigate(['/login'], { queryParams: { returnUrl: this._router.url } });
      return error.message;
    }
  }

  private handleNotFound(error: HttpErrorResponse) {
    this._router.navigate(['/404']);
    return error.message;
  }

  private handleBadRequest(error: HttpErrorResponse) {
    if (this._router.url === '/registration') {
      let message = '';
      const values = Object.values(error.error.errors);
      values.map((m: string) => {
         message += m + '<br>';
      })

      return message.slice(0, -4);
    }
    else {
      return error.error ?? error.message;
    }
  }
}
