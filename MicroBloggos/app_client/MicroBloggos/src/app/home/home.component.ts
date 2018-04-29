import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  profile: string;
  message: string;
  email: string;
  allMessages: any;
  check: string;

  constructor(private http: HttpClient) {
    this.check = "";
    this.allMessages = [];
    this.profile = JSON.parse(localStorage.getItem('user'));
    if (this.profile === null) {
      this.message = "You don't seem to be logged in";
    } else {
      this.email = String(this.profile['result'].email);
    }
  }

  ngOnInit() {
      if (this.profile !== null) {
      this.http.get('http://localhost:3000/userMessages/' + this.profile['result']._id)
        .subscribe(
          res => {
            this.allMessages = res;
          }
        )
    }
  }

  onClickNewMessage(data) {
    this.http.post('http://localhost:3000/newMessage', {
      content: data.content,
      author_id: this.profile['result']._id,
      author_name: this.profile['result'].name
    })
      .subscribe(
        res => {
          console.log(res);
          if (res === 404) {
            this.message = "Fail";
          } else {
            this.message = "Message sent";
            this.http.get('http://localhost:3000/userMessages/' + this.profile['result']._id)
              .subscribe(
                res => {
                  this.allMessages = res;
                }
              )
          }
        },
        err => {
          console.log(err);
        }
      )
  }

  onClickRemove(data) {
    this.http.post('http://localhost:3000/deleteMessage', {
      _id: data
    })
      .subscribe(
        res => {
          console.log(res);
          if (res) {
            this.message = "Message deleted";
            this.http.get('http://localhost:3000/userMessages/' + this.profile['result']._id)
              .subscribe(
                res => {
                  this.allMessages = res;
                }
              )
          }
        },
        err => {
          console.log(err);
        }
      )
  }

  toggle(id) {
    if (this.check == id) {
      this.check = "";
    } else {
      this.check = id;
    }
  }

  onClickUpdateMessage (message, id) {
    this.http.post('http://localhost:3000/updateMessage', {
      _id: id,
      content: message.content
    })
      .subscribe(
        res => {
          console.log(res);
          if (res) {
            this.message = "Message Updated";
            this.http.get('http://localhost:3000/userMessages/' + this.profile['result']._id)
              .subscribe(
                res => {
                  this.allMessages = res;
                }
              )
          }
        },
        err => {
          console.log(err);
        }
      )
  }

}
