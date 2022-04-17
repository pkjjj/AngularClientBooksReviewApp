import { AfterContentInit, AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Book } from 'src/app/interfaces/book';

@Component({
  selector: 'app-home-page-book-slider',
  templateUrl: './home-page-book-slider.component.html',
  styleUrls: ['./home-page-book-slider.component.css']
})
export class HomePageBookSliderComponent implements AfterViewInit, OnDestroy {

  @Input() public books: Book[];
  @ViewChildren('itemElement') public booksElements: QueryList<ElementRef>;
  private bookIndex = 0;
  private timer: ReturnType<typeof setTimeout>;

  constructor() {}

  ngAfterViewInit(): void {
    this.slideBooks();
  }

  ngOnDestroy(): void {
    clearTimeout(this.timer);
  }

  private slideBooks() {
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

    this.timer = setTimeout(this.slideBooks.bind(this), 2000);
  }
}
