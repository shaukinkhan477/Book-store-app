import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css'],
})
export class BookDetailComponent implements OnInit {
  constructor(private route: ActivatedRoute, private http: HttpClient) {}
  userJson: any = localStorage.getItem('user');
  user: any = JSON.parse(this.userJson);
  bookId: any;
  book: any;
  imgUrl: string = '';
  //comment related
  comment: { comment: string; name: string; _id: string; userId: string }[] =
    [];
  commentToSend: string = '';
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.bookId = params['id'];
      this.imgUrl = `http://localhost:3000/books/${this.bookId}/image`;
    });
    this.http
      .get('http://localhost:3000/books/' + this.bookId)
      .subscribe((data) => (this.book = data));
    this.getComment();
  }
  addFavourite(id: string) {
    this.http
      .post('http://localhost:3000/addToFavourite', { id })
      .subscribe((data) => {
        alert('Added to your Favourite...');
      });
  }
  getComment() {
    this.http
      .get('http://localhost:3000/comment/' + this.bookId)
      .subscribe((data: any) => {
        this.comment = data;
      });
  }
  addComment() {
    if (this.commentToSend != '') {
      this.http
        .post('http://localhost:3000/comment/' + this.bookId, {
          comment: this.commentToSend,
        })
        .subscribe(
          (data) => {
            alert('Comment Posted Successfully...');
            this.getComment();
          },
          (err) => {
            alert('Error in comment posting');
          }
        );
    }
  }
  deleteComment(id: string) {
    this.http.delete('http://localhost:3000/comment/' + id).subscribe(
      (data) => {
        alert('comment deletion success...');
        this.getComment();
      },
      (err) => {
        alert('Comment deletion failed...');
      }
    );
  }
}
