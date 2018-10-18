import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLoggedIn: boolean = false;
  currUser: any = {
    username: '',
    image: ''
  };

  constructor(private userService: UsersService) { }

  ngOnInit() {
    this.userService.isLoggedInObservable.subscribe(data => {
      this.isLoggedIn = data;
      console.log(this.isLoggedIn)
    })

    this.userService.getCurrentUser().subscribe(data => {
      this.currUser = data.user
    })
  }

  logoutClicked() {
    this.userService.logout();
  }

}
