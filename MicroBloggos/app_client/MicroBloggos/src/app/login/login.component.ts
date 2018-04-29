import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  message: string;

  constructor(private http: HttpClient, private router: Router) {
    this.message = "";
  }

  ngOnInit() {
  }

  onClickLogin(data) {

    this.http.post('http://localhost:3000/login', {
      email: data.email,
      password: data.password,
    })
      .subscribe(
        res => {
          if (res === 404) {
            this.message = "fail";
          } else {
            localStorage.setItem('user', JSON.stringify(res));
            this.router.navigate(['/home'])
          }
        },
        err => {
          console.log(err);
          if(err.status == 404) {
            this.message = "fail";
          } else if (err.status == 200) {
            this.router.navigate(['/home'])
          }
        }
      )
  }

}
