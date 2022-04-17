import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileBooksComponent } from './profile-books/profile-books.component';
import { ProfileReviewsComponent } from './profile-reviews/profile-reviews.component';
import { ProfileComponent } from './profile.component';

const routes: Routes = [
  { path: 'profile/:id', component: ProfileComponent, children: [
    { path: '', redirectTo: 'books', pathMatch: 'full' },
    { path: 'books', component: ProfileBooksComponent },
    { path: 'reviews', component: ProfileReviewsComponent },
  ] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
