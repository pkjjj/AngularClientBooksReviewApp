import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RequestService } from './shared/services/request.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { PasswordConfirmationValidatorService } from './shared/custom-validators/password-confirmation-validator.service';
import { ReactiveFormsModule } from '@angular/forms';
import { ErrorHandlingService } from './shared/services/error-handling.service';
import { AuthenticationService } from './shared/services/authentication.service';
import { BooksModule } from './books/Modules/books.module';
import { BookFullInformationModule } from './book-full-information/book-full-information.module';
import { JwtModule } from '@auth0/angular-jwt';
import { RegistrationModule } from './registration/registration.module';
import { LoginModule } from './login/login.module';
import { SharedModule } from './shared/shared.module';
import { FilterByGenresComponent } from './filter-by-genres/filter-by-genres.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReviewsService } from './shared/services/reviews.service';
import { ProfileComponent } from './profile/profile.component';
import { ProfileModule } from './profile/profile.module';

export function tokenGetter() {
  return localStorage.getItem("token");
}
@NgModule({
  declarations: [
    AppComponent,
    FilterByGenresComponent,
    ProfileComponent,
  ],
  imports: [
    BookFullInformationModule,
    BooksModule,
    RegistrationModule,
    LoginModule,
    ReactiveFormsModule,
    AppRoutingModule,
    ProfileModule,
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
     AuthenticationService, ReviewsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
