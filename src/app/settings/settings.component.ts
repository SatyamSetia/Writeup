import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  userInputs = new FormGroup({
    url: new FormControl(''),
    username: new FormControl(''),
    bio: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl('')
  })

  constructor(private userService: UsersService) { }

  ngOnInit() {
  }

  onSubmit() {
    this.userService.updateUser({
      user: {
        email: this.userInputs.value.email,
        bio: this.userInputs.value.bio,
        image: this.userInputs.value.url,
        username: this.userInputs.value.username,
        password: this.userInputs.value.password
      }
    }).subscribe(data => {
      console.log(data)
    })
  }

  logoutClicked() {
    this.userService.logout();
  }

}
