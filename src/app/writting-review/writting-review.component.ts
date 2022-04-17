import { Component, Input, OnInit } from '@angular/core';
import { Book } from '../interfaces/book';
import { Review } from '../interfaces/review';
import { ReviewResponse } from '../interfaces/review-response';
import { User } from '../interfaces/user';
import { AuthenticationService } from '../shared/services/authentication.service';
import { RequestService } from '../shared/services/request.service';
import { ReviewsService } from '../shared/services/reviews.service';

@Component({
  selector: 'app-writting-review',
  templateUrl: './writting-review.component.html',
  styleUrls: ['./writting-review.component.css']
})
export class WrittingReviewComponent {

  @Input() public book: Book;
  public userText: string;
  public showSuccessWindow = false;
  public showError = false
  public errorMessages: string;

  constructor(private _requestService: RequestService, private _authService: AuthenticationService,
    private _reviewsService: ReviewsService) { }

  public checkOnAuthentication() {
    if (!this._authService.isUserAuthenticated()) {
      console.log("not auth")
      this._authService.logout();
    }
    else {
      return;
    }
  }

  public sendReview() {

    this.checkOnAuthentication();

    const review: ReviewResponse = {
      userToken: localStorage.getItem("token"),
      bookId: this.book.id,
      description: this.userText,
      created: new Date(),
    }

    this._requestService.setReview(review)
    .subscribe(_ => {
      this._requestService.getReviews()
        .subscribe((reviews: Review[]) => {
          this._reviewsService.updateReviews(reviews);
        })
      this.showSuccessWindow = true;
    },
    error => {
      this.errorMessages = error;
      this.showError = true;
    })
  }
}
