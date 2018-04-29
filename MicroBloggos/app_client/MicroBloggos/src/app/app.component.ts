import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'app';

  ngOnInit() {

  }

  constructor(private router: Router) {

  }

  logoutOnClick() {
    localStorage.removeItem('user');
    this.router.navigate([''])
  }
}
