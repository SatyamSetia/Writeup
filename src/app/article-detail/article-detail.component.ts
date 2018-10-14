import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import { ArticlesService } from "../articles.service";

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.css']
})
export class ArticleDetailComponent implements OnInit {

  slug: string = null;

  constructor(private route: ActivatedRoute, private articleService: ArticlesService) {
    this.route.params.subscribe( params => {
        this.slug = params.slug
    });
  }

  ngOnInit() {
    this.articleService.getArticle(this.slug).subscribe(data => {
      console.log(data.article)
    })
  }

}
