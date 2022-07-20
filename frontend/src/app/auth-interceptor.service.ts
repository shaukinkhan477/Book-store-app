import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from './user.service';
@Injectable({
  providedIn: 'root',
})
export class AuthInterceptService implements HttpInterceptor {
  constructor(private userService: UserService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let token: any = localStorage.getItem('token');
    if (token) {
      const modifiedRequest = req.clone({
        headers: req.headers.append('Authorization', token),
      });
      return next.handle(modifiedRequest);
    }
    return next.handle(req);
  }
}
