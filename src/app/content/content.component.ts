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
  }

  handleTab(e) {
    console.log(e)
  }

}
