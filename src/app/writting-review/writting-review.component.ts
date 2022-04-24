import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Book } from '../interfaces/book';
import { ProfileReview } from '../interfaces/profile-review';
import { Review } from '../interfaces/review';
import { ReviewForFullBookInfo } from '../interfaces/review-for-full-book-info';
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
export class WrittingReviewComponent implements OnChanges {

  @Input() public review: ProfileReview;
  @Input() public bookId: string;
  public showSuccessWindow = false;
  public showError = false;
  public errorMessages: string;
  public userTextForInsert: string;
  public hasError: boolean;

  constructor(private _requestService: RequestService, private _authService: AuthenticationService,
    private _reviewsService: ReviewsService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.review) {
      this.userTextForInsert = this.review.description;
    }
  }

  public sendReview() {

    if (this.isValid()) {

      const review: ReviewResponse = {
        userToken: localStorage.getItem("token"),
        bookId: this.bookId,
        description: this.userTextForInsert,
        created: new Date(),
      }

      this.SaveReview(review, true);
    }
  }

  public updateReview() {

    if (this.isValid()) {

      const review: ReviewResponse = {
        id: this.review.id,
        userToken: localStorage.getItem("token"),
        bookId: this.review.bookId,
        description: this.userTextForInsert,
        created: new Date(),
      }

      this.SaveReview(review, false);
    }
  }

  public isEmpty(text: string = "") {
    if (!text) {
      this.hasError = true;
    }
    else {
      this.hasError = false;
    }

    return this.hasError;
  }


  public checkOnAuthentication() {
    return this._authService.checkOnAuthentication();
  }

  private isValid() {
    return this.checkOnAuthentication() && !this.isEmpty(this.userTextForInsert);
  }

  private SaveReview(review: ReviewResponse, isInsert: boolean) {
    console.log("save review")
    this._requestService.saveReview(review, isInsert)
      .subscribe(_ => {
        const userId = this._authService.getUserIdFromToken();

        if (isInsert) {
          this._requestService.getReviewsByBookId(this.bookId)
          .subscribe((reviews: ReviewForFullBookInfo[]) => {
            this._reviewsService.updateReviews<ReviewForFullBookInfo[]>(reviews);
          });
        }
        else {
          this._requestService.getReviewsByUserId(userId)
          .subscribe((reviews: ProfileReview[]) => {
            this._reviewsService.updateReviews<ProfileReview[]>(reviews);
          });
        }

        this.showSuccessWindow = true;
      },
        error => {
          this.errorMessages = error;
          this.showError = true;
        });
  }
}
