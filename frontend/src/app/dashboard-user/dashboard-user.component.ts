import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-dashboard-user',
  templateUrl: './dashboard-user.component.html',
  styleUrls: ['./dashboard-user.component.css'],
})
export class DashboardUserComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private userService: UserService,
    private router: Router
  ) {}
  //modal related stuff
  displayStyle = 'none';
  openPopup() {
    this.displayStyle = 'block';
  }
  closePopup() {
    this.displayStyle = 'none';
  }
  //avatar related
  profilepic = false;
  userJson: any = localStorage.getItem('user');
  user: any = JSON.parse(this.userJson);
  upload: boolean = true;
  avatar!: File;
  url: string = `http://localhost:3000/users/${this.user._id}/avatar`;
  //recommendation related
  recommended: any;
  //favourite related
  favourite: any = [];
  ngOnInit(): void {
    this.http
      .get(this.url, {
        responseType: 'arraybuffer',
      })
      .subscribe((data) => {
        if (data) {
          this.profilepic = true;
        }
      });
    this.http
      .get('http://localhost:3000/books/recommendation')
      .subscribe((data) => {
        if (data) {
          this.recommended = data;
        }
      });
    this.http.get('http://localhost:3000/user/favourite').subscribe((data) => {
      this.favourite = data;
    });
  }
  onChange(event: any) {
    this.avatar = event.target.files[0];
    this.upload = false;
  }
  fetchdata() {
    const formData = new FormData();
    formData.append('avatar', this.avatar);
    return this.http.post('http://localhost:3000/users/me/avatar', formData);
  }
  onUpload() {
    this.fetchdata().subscribe(
      (data) => {
        alert('Image uploading...');
      },
      (err) => {
        alert('An error Occured...');
      },
      () => {
        alert('Upload Successful...');
        this.profilepic = true;
        window.location.reload();
      }
    );
  }
  getBookDetail(id: string) {
    this.router.navigate(['/books', id]);
  }
  removeFavourite(id: string) {
    this.http
      .delete('http://localhost:3000/user/favourite', {
        params: { id },
      })
      .subscribe((data) => {
        this.favourite = data;
        alert('Successfully ! Removed From Favourites... ');
      });
  }
}
