import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import { UsersService } from '../users.service';
import { AuthTokenService } from '../auth-token.service';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.css']
})
export class SignupPageComponent implements OnInit {

  constructor(private userService: UsersService, private authTokenService: AuthTokenService, private route: Router, private active: ActivatedRoute) { }

  ngOnInit() {
  }

  registerUser(inputs) {
    this.userService.register({
      user : {
        username: inputs.username,
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
        console.log('signed up')
        this.route.navigate([''])
      }
    )
  }

}
