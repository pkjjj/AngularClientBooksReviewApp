import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from 'src/app/interfaces/book';

@Component({
  selector: 'app-books-modal',
  templateUrl: './books-modal.component.html',
  styleUrls: ['./books-modal.component.css']
})
export class BooksModalComponent {

  @Input() public book: Book;

  constructor(private _router: Router) { }

  routeToBookPage() {
    this._router.navigate(['/book/' + this.book.id]);
  }
}
