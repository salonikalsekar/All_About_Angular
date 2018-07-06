import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-create-form',
  templateUrl: './create-form.component.html',
  styleUrls: ['./create-form.component.css']
})
export class CreateFormComponent implements OnInit {

  book = {};

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
  }

  saveBook() {
    console.log(this.book);
    console.log("save book click event ");
    this.http.post('http://localhost:3000/book', this.book)
      .subscribe(res => {
        console.log(res);
      }, err => {
        console.log(err);
      });
  }

}