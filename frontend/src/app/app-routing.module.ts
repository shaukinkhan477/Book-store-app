import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './auth-guard.service';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { DashboardUserComponent } from './dashboard-user/dashboard-user.component';
import { LoginComponent } from './login/login.component';
import { SearchComponent } from './search/search.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'dashboard/user',
    component: DashboardUserComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: 'books/:id',
    component: BookDetailComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'search',
    component: SearchComponent,
    canActivate: [AuthGuardService],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
