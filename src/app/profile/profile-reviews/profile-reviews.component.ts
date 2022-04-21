import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Navigation, Router } from '@angular/router';
import { Book } from 'src/app/interfaces/book';
import { Review } from 'src/app/interfaces/review';
import { RequestService } from 'src/app/shared/services/request.service';

@Component({
  selector: 'app-profile-reviews',
  templateUrl: './profile-reviews.component.html',
  styleUrls: ['./profile-reviews.component.css']
})
export class ProfileReviewsComponent implements OnInit {

  public reviews: Review[];
  public navigation: Navigation;
  public userId: string;
  public book: Book;
  public review: Review;

  constructor(private _router: Router, private _requesService: RequestService, private _route: ActivatedRoute) {
    this.navigation = this._router.getCurrentNavigation();
  }

  ngOnInit(): void {
    this.getRouteParameters();
    this.getReviewsFromRoute();
  }

  public showWrittingReviewComponent(book: Book, review: Review) {
    this.book = book;
    this.review = review;
  }

  private getRouteParameters() {
    this._route.parent.params
    .subscribe(params => {
      this.userId = params['id'];
    });
  }

  private getReviewsFromRoute() {
    if (this.navigation.extras && this.navigation.extras.state && this.navigation.extras.state['reviews']) {
      this.reviews = this.navigation.extras.state['reviews'] as Review[];
      console.log(this.reviews);
    }
    else {
      this.getReviews(this.userId);
    }
  }

  private getReviews(userId: string) {
    this._requesService.getReviewsByUserId(userId)
      .subscribe((reviews: Review[]) => {
        this.reviews = reviews;
        console.log(this.reviews);
      });
  }
}
