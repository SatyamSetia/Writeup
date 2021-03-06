import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import { UsersService } from '../users.service';
import { AuthTokenService } from '../auth-token.service';
import { UserResponse } from '../models/user.response';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.css']
})
export class SignupPageComponent implements OnInit {

  formLabel: string = "Sign up";
  errorMessage: Array<String> = [];

  constructor(private userService: UsersService, private authTokenService: AuthTokenService, private route: Router, private active: ActivatedRoute) { }

  ngOnInit() {
  }

  registerUser(inputs) {
    this.errorMessage = [];
    this.userService.register({
      user : {
        username: inputs.username,
        email:inputs.email,
        password:inputs.password
      }
    }).subscribe((data: UserResponse) => {
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
