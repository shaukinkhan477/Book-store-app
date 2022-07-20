import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private router: Router,
    private http: HttpClient,
    private userService: UserService
  ) {}
  displayStyle = 'none';
  openPopup() {
    this.displayStyle = 'block';
  }
  closePopup() {
    this.displayStyle = 'none';
  }
  loginForm!: FormGroup;
  user: any;

  error!: any;
  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(8),
      ]),
    });
  }

  onSubmit() {
    if (this.loginForm.valid && this.loginForm.touched) {
      this.http
        .post('http://localhost:3000/users/login', this.loginForm.value)
        .subscribe(
          (data: any) => {
            if (data) {
              this.userService.loggedIn = true;
              localStorage.setItem('user', JSON.stringify(data['user']));
              localStorage.setItem('token', `Bearer ${data['token']}`);
              this.router.navigate(['/dashboard/user']);
            }
          },
          (error) => {
            this.openPopup();
          }
        );
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
