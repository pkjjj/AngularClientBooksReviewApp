import { Component, Input, OnInit } from '@angular/core';
import { Review } from '../interfaces/review';
import { AuthenticationService } from '../shared/services/authentication.service';

@Component({
  selector: 'app-book-reviews',
  templateUrl: './book-reviews.component.html',
  styleUrls: ['./book-reviews.component.css']
})
export class BookReviewsComponent {

  @Input() public reviews: Review[];
  @Input() public countVisibleLines = 2;
  public readonly backgroundColorForRating = "black";
  public show = false;

  constructor(private _authnServise: AuthenticationService) { }

  public checkOnAuthentication() {
    if (!this._authnServise.isUserAuthenticated()) {
      console.log("not auth")
      this._authnServise.logout();
    }
    else {
      this.show = true;
    }
  }

}
