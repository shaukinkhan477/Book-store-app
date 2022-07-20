import { HttpClient } from '@angular/common/http';
import { Component, OnChanges, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  cat: string = '';
  skip: string = '0';
  limit: string = '20';
  bookData: any = [];
  searchText: string = '';
  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.http
      .get('http://localhost:3000/booksList', {
        params: { limit: this.limit, skip: this.skip, cat: this.cat },
      })
      .subscribe((data) => {
        this.bookData = data;
      });
  }
  previous() {
    this.skip = (parseInt(this.skip) - parseInt(this.limit)).toString();
    this.getData();
  }
  next() {
    this.skip = (parseInt(this.skip) + parseInt(this.limit)).toString();
    this.getData();
  }
  getBookDetail(id: string) {
    this.router.navigate(['/books', id]);
  }
}
