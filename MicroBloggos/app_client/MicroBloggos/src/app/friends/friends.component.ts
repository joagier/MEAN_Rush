import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {
  profile: string;
  message: string;
  email: string;
  friendsMessages: any;

  constructor(private http: HttpClient) {
    this.friendsMessages = [];
    this.profile = JSON.parse(localStorage.getItem('user'));
    if (this.profile === null) {
      this.message = "You don't seem to be logged in";
    } else {
      this.email = String(this.profile['result'].email);
    }
  }

  ngOnInit() {
    if (this.profile !== null) {
      this.http.post('http://localhost:3000/friendsMessages/', {
        friends: this.profile['result'].friends
      })
        .subscribe(
          res => {
            this.friendsMessages = res;
          }
        )
    }
  }
}
