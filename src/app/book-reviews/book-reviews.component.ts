import { Component, Input, OnInit } from '@angular/core';
import { Book } from '../interfaces/book';
import { Review } from '../interfaces/review';
import { AuthenticationService } from '../shared/services/authentication.service';

@Component({
  selector: 'app-book-reviews',
  templateUrl: './book-reviews.component.html',
  styleUrls: ['./book-reviews.component.css']
})
export class BookReviewsComponent implements OnInit {

  @Input() public book: Book;
  @Input() public countVisibleLines = 2;
  public reviews: Review[];
  public readonly backgroundColorForRating = "black";
  public show = false;

  constructor(private _authnServise: AuthenticationService) {

  }

  ngOnInit(): void {
    this.reviews = this.book.reviews;
  }

  public checkOnAuthentication() {
    if (!this._authnServise.isUserAuthenticated()) {
      console.log("not auth")
      this._authnServise.logout();
    }
    else {
      this.show = true;
    }
  }

  public changeReviewsByDateFilter(reviews: Object[]) {
    this.reviews = reviews as Review[];
  }
}
