import { Component, OnInit } from '@angular/core';
import { ArticlesService } from '../articles.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {

  articles = [];

  constructor(private articlesService: ArticlesService) { }

  ngOnInit() {
    this.articlesService.getAllArticles()
      .subscribe(data => {
        this.articles = data.articles
      })
    this.articlesService.getArticle("aa-bb-ccd-ryyn03")
      .subscribe(data => console.log(data))
  }

}
