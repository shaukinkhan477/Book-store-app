import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
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
  signupForm!: FormGroup;
  error!: any;
  ngOnInit(): void {
    this.signupForm = new FormGroup(
      {
        name: new FormControl(null, [
          Validators.required,
          Validators.minLength(5),
        ]),
        email: new FormControl(null, [Validators.required, Validators.email]),
        age: new FormControl(null, [Validators.required, Validators.min(10)]),
        password: new FormControl(null, [
          Validators.required,
          Validators.minLength(8),
        ]),
        cpassword: new FormControl(null, [
          Validators.required,
          Validators.minLength(8),
        ]),
      },
      this.confirmPassword
    );
  }

  confirmPassword(grp: any) {
    return grp.get('cpassword')?.value === grp.get('password')?.value
      ? null
      : { passwordMismatch: true };
  }
  onSubmit() {
    if (this.signupForm.valid && this.signupForm.touched) {
      this.http
        .post('http://localhost:3000/users', this.signupForm.value)
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
      this.signupForm.markAllAsTouched();
    }
  }
}
