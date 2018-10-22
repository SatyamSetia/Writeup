import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { UsersService } from '../users.service';
import { CommentService } from '../comment.service';
import { User } from '../models/user';
import { UserResponse } from '../models/user.response'

@Component({
  selector: 'app-comment-section',
  templateUrl: './comment-section.component.html',
  styleUrls: ['./comment-section.component.css']
})
export class CommentSectionComponent implements OnInit {

  @Input() slug:any;

  currUser: User = {
    image: ''
  };

  userInputs = new FormGroup({
    comment: new FormControl('')
  })

  constructor(private userService: UsersService, private commentService: CommentService) { }

  ngOnInit() {
    this.userService.getCurrentUser().subscribe((data: UserResponse) => {
      this.currUser = data.user
    })
  }

  onSubmit() {
    console.log(this.slug)
    this.commentService.addNewComment(this.slug,{
      comment: {
        body: this.userInputs.value.comment
      }
    }).subscribe(data => {
      console.log(data)
    })
  }

}
