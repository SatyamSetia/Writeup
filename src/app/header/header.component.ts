import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { User } from '../models/user';
import { UserResponse } from '../models/user.response';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLoggedIn: boolean = false;
  currUser: User = {
    email: '',
    token: '',
    username:'',
    bio: '',
    image: ''
  };

  constructor(private userService: UsersService) { }

  ngOnInit() {
    this.userService.isLoggedInObservable.subscribe(data => {
      this.isLoggedIn = data;
    })

    if(this.userService.ensureLoggedIn()) {
      this.userService.getCurrentUser().subscribe((data: UserResponse) => {
        this.currUser = data.user
      })
    }
  }

  logoutClicked() {
    this.userService.logout();
  }

}
