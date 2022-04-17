import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Review } from 'src/app/interfaces/review';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {

  private _subject = new Subject<Review[]>();

  public constructor() {
  }

  public updateReviews(reviews: Review[]) {
    this._subject.next(reviews);
  }

  public getUpdatedReviews() {
    return this._subject.asObservable();
  }
}
