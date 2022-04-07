import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookFullInformationRoutingModule } from './book-full-information-routing.module';
import { BookFullInformationComponent } from './book-full-information/book-full-information.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    BookFullInformationComponent
  ],
  imports: [
    CommonModule,
    BookFullInformationRoutingModule,
    SharedModule
  ]
})
export class BookFullInformationModule { }
