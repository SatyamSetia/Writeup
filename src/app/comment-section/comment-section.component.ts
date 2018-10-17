import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-comment-section',
  templateUrl: './comment-section.component.html',
  styleUrls: ['./comment-section.component.css']
})
export class CommentSectionComponent implements OnInit {

  @Input() slug:any;

  userInputs = new FormGroup({
    comment: new FormControl('')
  })

  constructor() { }

  ngOnInit() {
  }

  onSubmit() {
    console.log(this.userInputs.value)
  }

}
