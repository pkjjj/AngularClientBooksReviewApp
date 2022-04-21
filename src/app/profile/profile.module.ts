import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileBooksComponent } from './profile-books/profile-books.component';
import { ProfileReviewsComponent } from './profile-reviews/profile-reviews.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    ProfileBooksComponent,
    ProfileReviewsComponent
  ],
  imports: [
    ProfileRoutingModule,
    SharedModule
  ]
})
export class ProfileModule { }
