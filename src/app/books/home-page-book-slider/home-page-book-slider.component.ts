import { AfterContentInit, AfterViewInit, Component, ElementRef, Input, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Book } from 'src/app/interfaces/book';

@Component({
  selector: 'app-home-page-book-slider',
  templateUrl: './home-page-book-slider.component.html',
  styleUrls: ['./home-page-book-slider.component.css']
})
export class HomePageBookSliderComponent implements AfterViewInit {

  @Input() public books: Book[];
  @ViewChildren('itemElement') public booksElements: QueryList<ElementRef>;
  private bookIndex = 0;

  constructor() {

  }

  ngAfterViewInit(): void {
    this.slideBooks();
    console.log(this.booksElements);
  }

  private slideBooks() {
    console.log(this.booksElements);
    this.booksElements.forEach((element, index) => {
      element.nativeElement.style.display = 'none';

    if (this.bookIndex == index) {
      element.nativeElement.style.display = 'block';
    }
    });

    this.bookIndex++;

    if (this.bookIndex == this.booksElements.length-1) {
      this.bookIndex = 0;
    }

    setTimeout(this.slideBooks.bind(this), 2000);
  }
}
