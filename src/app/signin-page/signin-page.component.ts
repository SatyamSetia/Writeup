import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-signin-page',
  templateUrl: './signin-page.component.html',
  styleUrls: ['./signin-page.component.css']
})
export class SigninPageComponent implements OnInit {

  constructor(private userService: UsersService) { }

  ngOnInit() {
  }

  authenticateUser(inputs) {
    this.userService.authenticate({
      user : {
        email:inputs.email,
        password:inputs.password
      }
    }).subscribe(data => console.log(data.user.token))
  }

}
