import {Component, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})


export class MembersComponent implements OnInit {
  members: any;
  profile: string;
  message: string;
  friends: string[];

  constructor(private http: HttpClient) {
    this.members = [];
    this.profile = JSON.parse(localStorage.getItem('user'));
    if (this.profile !== null) {
      this.friends = this.profile['result'].friends;
    }
  }

  ngOnInit() {
    this.http.get('http://localhost:3000/members')
      .subscribe(
        res => {
          this.members = res;
        }
      )
  }

  onClickAddFriend(friend_id) {
    this.http.post('http://localhost:3000/addFriend', {
      _id: this.profile['result']._id,
      friends: friend_id,
    })
      .subscribe(
        res => {
          console.log(res);
          if (res === 404) {
            this.message = "fail";
          } else {
            localStorage.setItem('user', JSON.stringify(res));
            this.message = "New friend";
            this.profile = JSON.parse(localStorage.getItem('user'));
            this.friends = this.profile['result'].friends;
          }
        },
        err => {
          console.log(err);
        }
      )
  }

  onClickDeleteFriend(friend_id) {
    this.http.post('http://localhost:3000/deleteFriend', {
      _id: this.profile['result']._id,
      friends: friend_id,
    })
      .subscribe(
        res => {
          console.log(res);
          if (res === 404) {
            this.message = "fail";
          } else {
            localStorage.setItem('user', JSON.stringify(res));
            this.message = "Unfriended";
            this.profile = JSON.parse(localStorage.getItem('user'));
            this.friends = this.profile['result'].friends;
          }
        },
        err => {
          console.log(err);
        }
      )
  }
}
