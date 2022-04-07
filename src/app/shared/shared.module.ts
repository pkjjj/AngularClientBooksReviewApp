import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DateWithoutTimePipe } from '../pipes/date-without-time.pipe';
import { RatingComponent } from '../rating/rating.component';
import { SearchComponent } from '../search/search.component';
import { BookReviewsComponent } from '../book-reviews/book-reviews.component';
import { ModalSuccessComponent } from '../modal-success/modal-success.component';
import { ReviewComponent } from '../review/review.component';
import { ScrollDirective } from '../directives/scroll.directive';
import { WrittingReviewComponent } from '../writting-review/writting-review.component';



@NgModule({
  declarations: [
    DateWithoutTimePipe,
    RatingComponent,
    SearchComponent,
    BookReviewsComponent,
    ModalSuccessComponent,
    ReviewComponent,
    ScrollDirective,
    WrittingReviewComponent,
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserModule,
    NgbModule,
    DateWithoutTimePipe,
    RatingComponent,
    SearchComponent,
    BookReviewsComponent,
    ModalSuccessComponent,
    ScrollDirective,
    WrittingReviewComponent
  ]
})
export class SharedModule { }
