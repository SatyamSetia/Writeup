import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { UsersService } from '../users.service';
import { CommentService } from '../comment.service';
import { User } from '../models/user';
import { UserResponse } from '../models/user.response';
import { CommentResponse } from '../models/comment.response';
import { Comment } from '../models/comment';
import { CommentList } from '../models/commentList.response';

@Component({
  selector: 'app-comment-section',
  templateUrl: './comment-section.component.html',
  styleUrls: ['./comment-section.component.css']
})
export class CommentSectionComponent implements OnInit {

  @Input() slug:any;

  currUser: User;

  comments: Array<Comment>;

  userInputs = new FormGroup({
    comment: new FormControl('')
  })

  constructor(private userService: UsersService, private commentService: CommentService) {
    this.currUser = {
      image: '',
      email: '',
      token: '',
      username: '',
      bio: ''
    };
  }

  ngOnInit() {
    this.userService.getCurrentUser().subscribe((data: UserResponse) => {
      this.currUser = data.user
    })

    this.commentService.getAllComments(this.slug).subscribe((data: CommentList) => {
      this.comments = data.comments
    })
  }

  onSubmit() {
    this.commentService.addNewComment(this.slug,{
      comment: {
        body: this.userInputs.value.comment
      }
    }).subscribe((data: CommentResponse) => {
      this.comments = [data.comment, ...this.comments]
    })
  }

}
