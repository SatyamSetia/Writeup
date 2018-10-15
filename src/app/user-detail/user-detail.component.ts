import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import { UsersService } from '../users.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  user: any = {bio:'', following:'',image:'',username:''};
  username: string;

  constructor(private userService: UsersService, private route: ActivatedRoute) {
    this.route.params.subscribe( params => {
        this.username = params.username
    });
  }

  ngOnInit() {
    console.log(this.username.substring(1))
    this.userService.getUser(this.username.substring(1)).subscribe(data => {
      this.user = data.profile;
      console.log(this.user)
    });
  }

}
