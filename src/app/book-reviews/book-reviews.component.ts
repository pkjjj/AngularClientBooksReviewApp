import { Component, Input, OnInit } from '@angular/core';
import { Book } from '../interfaces/book';
import { Review } from '../interfaces/review';
import { ReviewForFullBookInfo } from '../interfaces/review-for-full-book-info';
import { AuthenticationService } from '../shared/services/authentication.service';
import { RequestService } from '../shared/services/request.service';

@Component({
  selector: 'app-book-reviews',
  templateUrl: './book-reviews.component.html',
  styleUrls: ['./book-reviews.component.css']
})
export class BookReviewsComponent implements OnInit {
  // remove book

  @Input() public book: Book;
  @Input() public countVisibleLines = 2;
  public reviews: ReviewForFullBookInfo[];
  public readonly backgroundColorForRating = "black";
  public show = false;

  constructor(private _authnServise: AuthenticationService, private _requestService: RequestService) {

  }

  ngOnInit(): void {
    this.getReviewsModel();
  }

  public getReviewsModel() {
    this._requestService.getReviewsByBookId(this.book.id)
      .subscribe((reviews: ReviewForFullBookInfo[]) => {
        this.reviews = reviews;
      });
  }

  public changeReviewsByDateFilter(reviews: Object[]) {
    this.reviews = reviews as ReviewForFullBookInfo[];
  }
}
