import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from "@angular/router";

import { ArticlesService } from '../articles.service';
import { ArticleResponse } from '../models/article.response';

@Component({
  selector: 'app-new-article',
  templateUrl: './new-article.component.html',
  styleUrls: ['./new-article.component.css']
})
export class NewArticleComponent implements OnInit {

  slug: string;
  isEditMode: boolean;

  userInputs = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
    body: new FormControl(''),
    tags: new FormControl('')
  })

  constructor(private articlesService: ArticlesService, private active: ActivatedRoute, private route: Router) {
    this.active.params.subscribe( params => {
        this.slug = params.slug
        if(this.slug!=undefined) {
          this.isEditMode = true;
        } else {
          this.isEditMode = false;
        }
    });
  }

  ngOnInit() {
    if(this.isEditMode) {
      this.articlesService.getArticle(this.slug).subscribe((data: ArticleResponse) => {
        this.userInputs.setValue({
          title: data.article.title,
          description: data.article.description,
          body: data.article.body,
          tags: data.article.tagList
        })
      })
    }
  }

  onSubmit() {
    if(this.isEditMode) {
      this.articlesService.editArticle(this.slug, {
        article: {
          title: this.userInputs.value.title,
          description: this.userInputs.value.description,
          body: this.userInputs.value.body
        }
      }). subscribe((data : ArticleResponse) => {
        this.route.navigate([`/article/${data.article.slug}`])
      })
    } else {
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

}
