import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { RequestService } from './shared/services/request.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { PasswordConfirmationValidatorService } from './shared/custom-validators/password-confirmation-validator.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ErrorHandlingService } from './shared/services/error-handling.service';
import { AuthenticationService } from './shared/services/authentication.service';
import { BooksModule } from './books/Modules/books.module';
import { BookFullInformationModule } from './book-full-information/book-full-information.module';
import { JwtModule } from '@auth0/angular-jwt';
import { RegistrationModule } from './registration/registration.module';
import { LoginModule } from './login/login.module';
import { ReviewComponent } from './review/review.component';
import { ModalSuccessComponent } from './modal-success/modal-success.component';
import { SearchComponent } from './search/search.component';
import { SharedModule } from './shared/shared.module';
import { HomePageBookSliderComponent } from './books/home-page-book-slider/home-page-book-slider.component';
import { FilterByGenresComponent } from './filter-by-genres/filter-by-genres.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ScrollDirective } from './directives/scroll.directive';
import { WrittingReviewComponent } from './writting-review/writting-review.component';

export function tokenGetter() {
  return localStorage.getItem("token");
}
@NgModule({
  declarations: [
    AppComponent,
    FilterByGenresComponent,
  ],
  imports: [
    BookFullInformationModule,
    BooksModule,
    RegistrationModule,
    LoginModule,
    ReactiveFormsModule,
    AppRoutingModule,
    SharedModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ['localhost:5001'],
        disallowedRoutes:[]
      }
    }),
    NgbModule
  ],
  providers: [RequestService, PasswordConfirmationValidatorService, { provide: HTTP_INTERCEPTORS, useClass: ErrorHandlingService, multi: true },
     AuthenticationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
