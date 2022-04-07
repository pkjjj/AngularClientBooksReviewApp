import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookFullInformationComponent } from './book-full-information/book-full-information.component';

const routes: Routes = [
  { path: 'book/:id', component: BookFullInformationComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookFullInformationRoutingModule { }
