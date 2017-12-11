import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/user/user.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    test = [1,2,3,4];
    currentUser;
  constructor(private user:UserService) { }

  ngOnInit() {
      this.currentUser = this.user.current();
  }

}
