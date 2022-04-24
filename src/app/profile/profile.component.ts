import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../interfaces/user';
import { RequestService } from '../shared/services/request.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public user: User;
  public userId: string;
  public isBooksActive: boolean;

  constructor(private _router: Router, private _route: ActivatedRoute, private _requestService: RequestService) { }

  ngOnInit(): void {
    console.log("sdasdad");
    this.getRouteParameters();
    if (this.userId !== undefined) {
      this.getUser(this.userId);
    }
  }

  public navigateToProfileReviews(route: string) {
    this.isBooksActive = false;
    this._router.navigate([route], { relativeTo: this._route, state: { reviews: this.user.reviews } });
  }

  public navigateToProfileBooks(route: string) {
    this.isBooksActive = true;
    this._router.navigate([route], { relativeTo: this._route, state: { books: this.user.books } });
  }

  private getRouteParameters() {
    this._route.params
    .subscribe(params => {
      this.userId = params['id'];
    });
  }

  private getUser(userId: string) {
    this._requestService.getUser(userId)
    .subscribe((user: User) => {
      console.log(user);
      this.user = user;
    },
    (error) => {
      throw error;
    })
  }
}
