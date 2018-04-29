import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  message: string;

  constructor(private http: HttpClient) {
    this.message = "";
  }

  ngOnInit(): void {
  }

  onClickRegister(data) {

    this.http.post('http://localhost:3000/register', {
      name: data.name,
      email: data.email,
      password: data.password,
      password_confirmation: data.password_confirmation
    })
      .subscribe(
        res => {
          console.log(res)
        },
        err => {
          if(err.status == 400) {
            this.message = "fail";
          } else if (err.status == 200) {
            this.message = "User Registered";
          }
        }
      )
  }

}
