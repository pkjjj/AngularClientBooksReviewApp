import { AfterContentInit, AfterViewChecked, AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, Input, OnInit, QueryList, Renderer2, ViewChild, ViewChildren, ViewEncapsulation } from '@angular/core';
import { Book } from '../interfaces/book';
import { Review } from '../interfaces/review';
import { User } from '../interfaces/user';
import { RequestService } from '../shared/services/request.service';
import { ReviewsService } from '../shared/services/reviews.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css'],
})
export class ReviewComponent implements AfterViewInit {

  @ViewChildren('description') descriptionElements: QueryList<ElementRef<HTMLParagraphElement>>;
  @ViewChildren('refElement') refElements: QueryList<ElementRef<HTMLParagraphElement>>;
  @Input() public book: Book;
  @Input() public reviews: Review[];
  public userText: string;
  public showSuccessWindow = false;
  public showError = false
  public errorMessages: string;
  public refName = "more";
  public status = false;

  constructor(private _renderer: Renderer2,
    private _reviewsService: ReviewsService) { }

  ngAfterViewInit(): void {
    this._reviewsService.getUpdatedReviews()
      .subscribe(reviews => {
        console.log(reviews);
        this.reviews = reviews;
      })
    setTimeout(() => {
      this.descriptionElements.forEach((el, index) => {
        this.reviews[index].isOverflow = this.isOverflow(el) ? true : false;
      });
    });
  }

  public showAllText(id: string, refEl: HTMLAnchorElement, parElement: HTMLParagraphElement) {
    refEl.innerText === "more"
      ? this._renderer.setStyle(parElement, "-webkit-line-clamp", 100)
      : this._renderer.setStyle(parElement, "-webkit-line-clamp", 2);
    this.changeAnchorName(id, refEl);
  }

  private changeAnchorName(id: string, refEl: HTMLAnchorElement) {
    refEl.innerText === "more"
      ? this._renderer.setProperty(refEl, "innerText","less")
      : this._renderer.setProperty(refEl, "innerText", "more");
  }

  private isOverflow(el: ElementRef<HTMLParagraphElement>) {
    return el.nativeElement.scrollHeight > el.nativeElement.clientHeight;
  }
}


