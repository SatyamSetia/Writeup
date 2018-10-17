import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ArticlesService } from '../articles.service';

@Component({
  selector: 'app-new-article',
  templateUrl: './new-article.component.html',
  styleUrls: ['./new-article.component.css']
})
export class NewArticleComponent implements OnInit {

  userInputs = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
    body: new FormControl(''),
    tags: new FormControl('')
  })

  constructor(private articlesService: ArticlesService) { }

  ngOnInit() {
  }

  onSubmit() {
    console.log(this.userInputs.value)
    this.articlesService.createArticle({
      article: {
        title: this.userInputs.value.title,
        description: this.userInputs.value.description,
        body: this.userInputs.value.body,
        tagList: this.userInputs.value.tags.split(",")
      }
    }).subscribe(data => console.log(data))
  }

}
