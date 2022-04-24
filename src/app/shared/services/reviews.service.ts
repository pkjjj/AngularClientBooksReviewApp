import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ProfileReview } from 'src/app/interfaces/profile-review';
import { Review } from 'src/app/interfaces/review';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {

  public reviews: ProfileReview[];
  private _subject = new Subject();

  public constructor() {
  }

  public updateReviews<TData>(reviews: TData) {
    this._subject.next(reviews);
  }

  public getUpdatedReviews() {
    return this._subject.asObservable();
  }

  public changeReviewsByDateFilter(reviews: Object[]) {
    this.reviews = reviews as ProfileReview[];
  }
}
