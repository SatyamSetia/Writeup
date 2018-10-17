import { Component, OnInit, Input } from '@angular/core';
import { CommentService } from '../comment.service';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.css']
})
export class CommentListComponent implements OnInit {

  @Input() slug: any;

  comments: any;

  constructor(private commentService: CommentService) { }

  ngOnInit() {
    this.commentService.getAllComments(this.slug).subscribe(data => {
      this.comments = data.comments
    })
  }

}