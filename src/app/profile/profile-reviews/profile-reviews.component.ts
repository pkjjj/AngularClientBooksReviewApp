import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Navigation, Router } from '@angular/router';
import { Book } from 'src/app/interfaces/book';
import { ProfileReview } from 'src/app/interfaces/profile-review';
import { Review } from 'src/app/interfaces/review';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { RequestService } from 'src/app/shared/services/request.service';
import { ReviewsService } from 'src/app/shared/services/reviews.service';

@Component({
  selector: 'app-profile-reviews',
  templateUrl: './profile-reviews.component.html',
  styleUrls: ['./profile-reviews.component.css']
})
export class ProfileReviewsComponent implements OnInit {

  public reviews: ProfileReview[];
  public navigation: Navigation;
  public userId: string;
  public review: ProfileReview;

  constructor(private _router: Router, private _requestService: RequestService,
    private _route: ActivatedRoute, private _reviewsService: ReviewsService,
    private _authService: AuthenticationService) {
    this.navigation = this._router.getCurrentNavigation();
  }

  ngOnInit(): void {
    this._reviewsService.getUpdatedReviews()
      .subscribe((reviews: ProfileReview[]) => {
        this.reviews = reviews;
      })
    this.getRouteParameters();
    this.getReviewsFromRoute();
  }

  public showWrittingReviewComponent(review: ProfileReview) {
    this.review = review;
  }

  public deleteReview(id: string) {
    this._requestService.deleteReview(id)
    .subscribe(() => {
      const userId = this._authService.getUserIdFromToken();

      this._requestService.getReviewsByUserId(userId)
      .subscribe((reviews: ProfileReview[]) => {
        this._reviewsService.updateReviews<ProfileReview[]>(reviews);
      });

    });;
  }

  public changeReviewsByDateFilter(reviews: Object[]) {
    this.reviews = reviews as ProfileReview[];
  }

  private getRouteParameters() {
    this._route.parent.params
    .subscribe(params => {
      this.userId = params['id'];
    });
  }

  private getReviewsFromRoute() {
    if (this.navigation?.extras && this.navigation.extras.state && this.navigation.extras.state['reviews']) {
      this.reviews = this.navigation.extras.state['reviews'] as ProfileReview[];
      console.log(this.reviews);
    }
    else {
      this.getReviews(this.userId);
    }
  }

  private getReviews(userId: string) {
    this._requestService.getReviewsByUserId(userId)
      .subscribe((reviews: ProfileReview[]) => {
        this.reviews = reviews;
        console.log(this.reviews);
      });
  }
}

