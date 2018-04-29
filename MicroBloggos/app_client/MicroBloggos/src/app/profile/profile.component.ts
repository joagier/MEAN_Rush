import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profile: string;
  email: string;
  name: string;
  message: string;
  check: boolean;

  constructor(private http: HttpClient) {
    this.profile = JSON.parse(localStorage.getItem('user'));
    if (this.profile === null) {
      this.message = "You don't seem to be logged in";
    } else {
      this.email = String(this.profile['result'].email);
    }
  }

  ngOnInit() {
    this.check = false;
    if (this.profile !== null) {
      this.http.get('http://localhost:3000/profile/' + this.email)
        .subscribe(
          res => {
            this.name = res['name'];
          }
        )
    }

  }

  editOnClick() {
    if (this.check == false) {
      this.check = true;
    } else {
      this.check = false;
    }
  }

  editProfile(data) {
    this.http.post('http://localhost:3000/editProfile', {
      _id: this.profile['result']._id,
      name: data.name,
      email: data.email,
      password: data.password,
      password_confirmation: data.password_confirmation
    })
      .subscribe(
        res => {
          if (res === 404) {
            this.message = "fail";
          } else {
            localStorage.setItem('user', JSON.stringify(res));
            this.message = "User updated";
            this.profile = JSON.parse(localStorage.getItem('user'));
            this.email = this.profile['result'].email;
            this.name = this.profile['result'].name;
          }
        },
        err => {
          console.log(err);
        }
      )
  }



}
