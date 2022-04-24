import { DOCUMENT } from '@angular/common';
import { AfterViewInit, Component, ElementRef, inject, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Book } from 'src/app/interfaces/book';
import { RequestService } from 'src/app/shared/services/request.service';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';

@Component({
  selector: 'app-book-full-information',
  templateUrl: './book-full-information.component.html',
  styleUrls: ['./book-full-information.component.css']
})
export class BookFullInformationComponent implements OnInit {

  @Input() public book: Book;
  public bookName: string[];
  public bookId: string;
  public readonly backgroundColorForRating = "black";
  public isShow = false;
  public width: number;
  private readonly stepPercent = 1;
  private readonly defaultWidth = 18;
  private readonly widthIncreasingFactor = 0.1;

  constructor(private _requestService: RequestService, private _route: ActivatedRoute,
    private _renderer: Renderer2, private _authService: AuthenticationService) { }

  ngOnInit(): void {
    this.setNavBarStyle();
    this.getRouteParameters();
    this.getBook();
    this.width = this.defaultWidth;
  }

  public addBook() {
    console.log("update user with book");
    const userId = this._authService.getUserIdFromToken();
    this._requestService.addBookToUser(this.bookId, userId)
      .subscribe(_ => {console.log("ya ebat' ya eblan")});
  }

  // Method for smooth transition.
  // Compute Image width with step(every step increase width) and widthIncreasingFactor(how much increase width)
  public computeImageWidth(event: any) {
    let scroll = event.scrollingElement.scrollTop;
    let scrollPercentage = scroll / document.documentElement.scrollHeight * 100;
    let incrementFactor = Math.floor(scrollPercentage / this.stepPercent) * this.widthIncreasingFactor;
    this.width = this.defaultWidth + incrementFactor;

    this._renderer.setStyle(document.body, "--image-width", this.width + "rem", 1);
  }

  private setNavBarStyle() {
    this._renderer.setStyle(document.body, "--nav-bar-bg-color", "rgb(249, 249, 249)", 1);
    this._renderer.setStyle(document.body, "--font-color", "#000000", 1);
    this._renderer.setStyle(document.body, "--font-color-navbar-text", "#000000", 1);
  }

  private getRouteParameters() {
    this._route.params
    .subscribe(params => {
      this.bookId = params['id'];
    });
  }

  private getBook() {
    this._requestService.getData("books/getbook?id=" + this.bookId)
    .subscribe((book: Book) => {
      this.book = book;
      this.bookName = [...this.book.name];
      book.reviews.forEach(el => {
        el.isOverflow = false;
      });
      this.isShow = true;
    });
  }
}
