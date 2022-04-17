import { Component, OnInit } from '@angular/core';
import { Book } from '../interfaces/book';
import { RequestService } from '../shared/services/request.service';
import * as cloneDeep from 'lodash/cloneDeep';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {

  public outputBooks: Book[];
  public arrayForSearch: string[] = [];
  public isLoaded: boolean;
  public readonly countLatestBooks = 5;
  public latestBooks: Book[];
  public sourceBooks: Book[];

  constructor(private _requestService: RequestService) { }

  ngOnInit(): void {
    this.loadBooks();
  }

  public loadBooks() {
    this._requestService.getData("books/getbooks")
    .subscribe((books: Book[]) => {
      this.sourceBooks = books;
      this.outputBooks = books;
      this.makeBookNamesArray();

      this.latestBooks = cloneDeep(this.outputBooks);
      this.computeLatestBooks(this.latestBooks);

      this.isLoaded = true;
    });
  }

  public makeBookNamesArray() {
    this.arrayForSearch = this.sourceBooks.map(b => b.name);
  }

  public changeBookArrayBySearch(resultNamesArray: string[]) {
    this.outputBooks = this.sourceBooks.filter(book => {
      return resultNamesArray.includes(book.name);
    });
  }

  public changeBookArrayByFilter(resultBooksArray: Object[]) {
    this.outputBooks = resultBooksArray as Book[];
  }

  public computeLatestBooks(books: Book[]) {
    books.sort((item, secondItem) => {
      return item.created > secondItem.created ? -1 : 1;
    });

    this.latestBooks = books;
    this.latestBooks.length = this.countLatestBooks;
  }
}

