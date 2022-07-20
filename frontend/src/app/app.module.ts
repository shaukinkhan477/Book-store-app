import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardUserComponent } from './dashboard-user/dashboard-user.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { AuthInterceptService } from './auth-interceptor.service';
import { FooterComponent } from './footer/footer.component';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { SearchComponent } from './search/search.component';
import { FilterPipe } from './filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    DashboardUserComponent,
    SignupComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    BookDetailComponent,
    SearchComponent,
    FilterPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
