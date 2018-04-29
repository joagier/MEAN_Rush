import {Component, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})


export class MembersComponent implements OnInit {
  members: any;

  constructor(private http: HttpClient) {
    this.members = [];
  }

  ngOnInit() {
    this.http.get('http://localhost:3000/members')
      .subscribe(
        res => {
          this.members = res;
        }
      )
  }

}
