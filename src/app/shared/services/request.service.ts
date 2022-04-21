import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserForRegistration } from '../../interfaces/user-for-registration.model';
import { RegistrationResponse } from '../../interfaces/registration-response.model';
import { UserForAuthentication } from 'src/app/interfaces/user-for-authentication';
import { AuthResponse } from 'src/app/interfaces/auth-response';
import { environment } from 'src/environments/environment';
import { Review } from 'src/app/interfaces/review';
import { ReviewResponse } from 'src/app/interfaces/review-response';
import { Subject } from 'rxjs';

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

  public getUser(id: string) {
    return this._http.get(this._url + 'user/GetUser?id=' + id);
  }

  public getData(route: string) {
    console.log(this._url + route);
    return this._http.get(this._url + route);
  }

  public saveReview(review: ReviewResponse, isInsert: boolean) {
    return isInsert === true ? this.insertReview(review) : this.updateReview(review);
  }

  private insertReview(review: ReviewResponse) {
    return this._http.post(this._url + 'review/SaveReview', review);
  }

  private updateReview(review: ReviewResponse) {
    return this._http.post(this._url + 'review/UpdateReview', review);
  }

  public getReviews() {
    return this._http.get(this._url + 'review/GetReviews');
  }

  public getReviewsByBookId(id: string) {
    return this._http.get(this._url + 'review/GetReviewsByBookId?id=' + id);
  }

  public getReviewsByUserId(id: string) {
    return this._http.get(this._url + 'review/GetReviewsByUserId?id=' + id);
  }
}
