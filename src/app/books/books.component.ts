import { Component, OnInit } from '@angular/core';
import { Book } from '../interfaces/book';
import { RequestService } from '../shared/services/request.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {

  public sourceBooks: Book[];
  public outputBooks: Book[];
  public arrayForSearch: string[] = [];
  public isLoaded: boolean;
  public readonly countLatestBooks = 5;
  public latestBooks: Book[];

  constructor(private _requestService: RequestService) { }

  ngOnInit(): void {
    this.loadBooks();
  }

  public loadBooks() {
    this._requestService.getData("books/getbooks")
    .subscribe((res: Book[]) => {
      console.log(res);
      this.sourceBooks = res;
      this.outputBooks = res;
      this.makeBookNamesArray();

      this.latestBooks = this.copyBookArray(this.outputBooks);
      this.computeLatestBooks(this.latestBooks);
     
      this.isLoaded = true;
      console.log(this.outputBooks, this.isLoaded);
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

  public changeBookArrayByFilter(resultBooksArray: Book[]) {
    this.outputBooks = resultBooksArray;
  }

  public computeLatestBooks(books: Book[]) {
    books.sort((item, secondItem) => {
      return item.created > secondItem.created ? -1 : 1;
    });

    this.latestBooks = books;
    this.latestBooks.length = this.countLatestBooks;
  }

  private copyBookArray(books: Book[]) {
    let resultedBooks = [];
    for (var i = 0, len = books.length; i < len; i++) {
      resultedBooks[i] = books[i];
    }

    return resultedBooks;
  }
}
