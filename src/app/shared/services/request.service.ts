import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserForRegistration } from '../../interfaces/user-for-registration.model';
import { RegistrationResponse } from '../../interfaces/registration-response.model';
import { UserForAuthentication } from 'src/app/interfaces/user-for-authentication';
import { AuthResponse } from 'src/app/interfaces/auth-response';
import { environment } from 'src/environments/environment';
import { Review } from 'src/app/interfaces/review';

@Injectable()

export class RequestService {

  private _url = environment.url;

  public constructor(private _http: HttpClient) {
  }

  public registerUser(user: UserForRegistration) {
    return this._http.post<RegistrationResponse>(this._url + 'account/Registration', user);
  }

  public loginUser(user: UserForAuthentication) {
    return this._http.post<AuthResponse>(this._url + 'account/Login', user);
  }

  public getData(route: string) {
    console.log(this._url + route);
    return this._http.get(this._url + route);
  }

  public setReview(review: Review) {
    return this._http.post(this._url + 'review/SaveReview', review);
  }
}
