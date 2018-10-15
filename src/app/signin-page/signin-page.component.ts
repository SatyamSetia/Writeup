import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import { UsersService } from '../users.service';
import { AuthTokenService } from '../auth-token.service';

@Component({
  selector: 'app-signin-page',
  templateUrl: './signin-page.component.html',
  styleUrls: ['./signin-page.component.css']
})
export class SigninPageComponent implements OnInit {

  constructor(private userService: UsersService, private authTokenService: AuthTokenService, private route: Router, private active: ActivatedRoute) { }

  ngOnInit() {
  }

  authenticateUser(inputs) {
    this.userService.authenticate({
      user : {
        email:inputs.email,
        password:inputs.password
      }
    }).subscribe(data => {
        this.authTokenService.saveToken(data.user.token)
      },
      err => {
        console.log(err)
      },
      () => {
        console.log('logged in')
        this.route.navigate([''])
      }
    )
  })

}
