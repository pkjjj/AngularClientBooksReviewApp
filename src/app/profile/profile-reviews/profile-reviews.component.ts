import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Navigation, Router } from '@angular/router';
import { Review } from 'src/app/interfaces/review';
import { RequestService } from 'src/app/shared/services/request.service';

@Component({
  selector: 'app-profile-reviews',
  templateUrl: './profile-reviews.component.html',
  styleUrls: ['./profile-reviews.component.css']
})
export class ProfileReviewsComponent implements OnInit {

  public reviews: Review[];
  public userId: string;
  public navigation: Navigation;

  constructor(private _router: Router, private _requesService: RequestService) {
    this.navigation = this._router.getCurrentNavigation();
  }

  ngOnInit(): void {
    this.getReviewsFromRoute();
  }

  private getReviewsFromRoute() {
    if (this.navigation.extras && this.navigation.extras.state && this.navigation.extras.state['reviews']) {
      this.reviews = this.navigation.extras.state['reviews'] as Review[];
      console.log(this.reviews);
    }
    else {
      this.getReviews();
    }
  }

  private getReviews() {
    this._requesService.getReviews()
      .subscribe((reviews: Review[]) => {
        this.reviews = reviews;
      });
  }
}
