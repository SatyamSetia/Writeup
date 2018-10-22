import { Component, OnInit, Input } from '@angular/core';
import { Comment } from '../models/comment';

@Component({
  selector: 'app-comment-list-item',
  templateUrl: './comment-list-item.component.html',
  styleUrls: ['./comment-list-item.component.css']
})
export class CommentListItemComponent implements OnInit {

  @Input() comment: Comment;

  date: any

  constructor() { }

  ngOnInit() {
    this.date = new Date(this.comment.createdAt).toDateString();
  }

}
