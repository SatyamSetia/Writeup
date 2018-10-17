import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-comment-list-item',
  templateUrl: './comment-list-item.component.html',
  styleUrls: ['./comment-list-item.component.css']
})
export class CommentListItemComponent implements OnInit {

  @Input() comment: any;

  date: any

  constructor() { }

  ngOnInit() {
    this.date = new Date(this.comment.createdAt).toDateString();
  }

}
