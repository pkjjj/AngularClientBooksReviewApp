import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Navigation } from '@angular/router';
import { Book } from 'src/app/interfaces/book';
import { ProfileReview } from 'src/app/interfaces/profile-review';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { RequestService } from 'src/app/shared/services/request.service';
import { ReviewsService } from 'src/app/shared/services/reviews.service';

@Component({
  selector: 'app-profile-books',
  templateUrl: './profile-books.component.html',
  styleUrls: ['./profile-books.component.css']
})
export class ProfileBooksComponent implements OnInit {

  public navigation: Navigation;
  public userId: string;
  public books: Book[];
  public book: Book;

  constructor(private _router: Router, private _requestService: RequestService,
    private _route: ActivatedRoute, public _reviewsService: ReviewsService,
    private _authService: AuthenticationService) {
    this.navigation = this._router.getCurrentNavigation();
  }

  ngOnInit(): void {
    this.getRouteParameters();
    this.getBooksFromRoute();
  }

  public deleteBook(bookId: string) {

    if (this._authService.checkOnAuthentication()) {
      this._authService.logout();
      return;
    }

    const userId = this._authService.getUserIdFromToken();

    console.log(userId)
    this._requestService.deleteBookFromUser(bookId, userId)
      .subscribe(_ => {
        console.log("success delete");
      })
  }

  //service
  private getRouteParameters() {
    this._route.parent.params
    .subscribe(params => {
      this.userId = params['id'];
    });
  }

  private getBooksFromRoute() {
    if (this.navigation?.extras && this.navigation.extras.state && this.navigation.extras.state['books']) {
      this.books = this.navigation.extras.state['books'] as Book[];
      console.log(this.books);
    }
    else {
      this.getBooks(this.userId);
    }
  }

  private getBooks(userId: string) {
    this._requestService.getUserBooks(userId)
      .subscribe((books: Book[]) => {
        this.books = books;
        console.log(this.books);
      });
  }

}
