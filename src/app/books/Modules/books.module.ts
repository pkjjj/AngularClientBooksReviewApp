import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BooksRoutingModule } from './books-routing.module';
import { SortingComponent } from '../sorting/sorting.component';
import { TilesComponent } from '../tiles/tiles.component';
import { BooksComponent } from '../books.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { BooksModalComponent } from '../tiles/books-modal/books-modal.component';
import { HomePageBookSliderComponent } from '../home-page-book-slider/home-page-book-slider.component';


@NgModule({
  declarations: [
    SortingComponent,
    TilesComponent,
    BooksComponent,
    BooksModalComponent,
    HomePageBookSliderComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    BooksRoutingModule,
    SharedModule
  ]
})
export class BooksModule { }
