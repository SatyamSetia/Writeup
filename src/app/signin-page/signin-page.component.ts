import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UsersService } from '../users.service';
import { AuthTokenService } from '../auth-token.service';
import { UserResponse } from '../models/user.response';

@Component({
  selector: 'app-signin-page',
  templateUrl: './signin-page.component.html',
  styleUrls: ['./signin-page.component.css']
})
export class SigninPageComponent implements OnInit {

  formLabel: string = "Sign in";
  errorMessage: Array<String> = [];

  constructor(private userService: UsersService, private authTokenService: AuthTokenService, private route: Router, private active: ActivatedRoute) { }

  ngOnInit() {
  }

  authenticateUser(inputs) {
    this.errorMessage = [];
    this.userService.authenticate({
      user: {
        email: inputs.email,
        password: inputs.password
      }
    }).subscribe((data : UserResponse) => {
      this.authTokenService.saveToken(data.user.token)
    },
      err => {
        let errors = err.error.errors;
        for(var key in errors){
          let msgs = errors[key];
          if(errors.hasOwnProperty(key)){
            for(let i=0;i<msgs.length;i++){
              this.errorMessage.push(`${key}  ${msgs[i]}`);
            }
          }
        }
      },
      () => {
        this.route.navigate([''])
      }
    )
  }

}
