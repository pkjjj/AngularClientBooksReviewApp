import { Component, Input, OnInit } from '@angular/core';
import { Book } from '../interfaces/book';
import { Review } from '../interfaces/review';
import { User } from '../interfaces/user';
import { RequestService } from '../shared/services/request.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent {

  @Input() public book: Book;
  @Input() public reviews: Review[];
  public userText: string;
  public showSuccessWindow = false;
  public showError = false
  public errorMessages: string;

  constructor(private _requestService: RequestService) { }

  public sendReview() {
    const user: User = {
      token: localStorage.getItem("token"),
      id: '',
      name: '',
      avatar: ''
    }

    const review: Review = {
      applicationUser: user,
      book: this.book,
      description: this.userText,
      created: new Date(),
    }

    this._requestService.setReview(review)
    .subscribe(_ => {
      this.showSuccessWindow = true;
    },
    error => {
      this.errorMessages = error;
      this.showError = true;
    })
  }

  public showAllLines(id: string) {
    let p = document.getElementById(id);
    p.classList.toggle("all-lines");
  }
}
