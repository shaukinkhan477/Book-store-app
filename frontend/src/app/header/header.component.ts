import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  displayStyle = 'none';
  openPopup() {
    this.displayStyle = 'block';
  }
  closePopup() {
    this.displayStyle = 'none';
  }
  passwordForm!: FormGroup;
  constructor(
    private http: HttpClient,
    private router: Router,
    private userService: UserService
  ) {}
  ngOnInit(): void {
    this.passwordForm = new FormGroup({
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(8),
      ]),
    });
  }
  logout() {
    this.http
      .post('http://localhost:3000/users/logout', null)
      .subscribe((data) => {
        this.userService.loggedIn = false;
        alert('Logout Sucessfully');
        this.router.navigate(['']);
        localStorage.clear();
      });
  }
  logoutAll() {
    this.http
      .post('http://localhost:3000/users/logoutAll', null)
      .subscribe((data) => {
        alert('Logout All Successfully...');
        this.router.navigate(['']);
        localStorage.clear();
      });
  }
  changePassword() {
    if (this.passwordForm.valid && this.passwordForm.touched) {
      this.http
        .patch('http://localhost:3000/users/me', this.passwordForm.value)
        .subscribe((data) => {
          this.userService.loggedIn = false;
          alert('Password Changed Successfully...');
          this.router.navigate(['']);
        });
    }
  }
  deleteUser() {
    const confirmation = confirm(
      'Are You Sure to delete Your Account Permanently...'
    );
    if (confirmation) {
      this.http.delete('http://localhost:3000/users/me').subscribe((data) => {
        alert('Account deletion sucessful but We will miss you...');
        this.router.navigate(['']);
      });
    }
  }
}
