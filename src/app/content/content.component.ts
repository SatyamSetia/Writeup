import { Component, OnInit } from '@angular/core';
import { ArticlesService } from '../articles.service';
import { UsersService } from '../users.service';
import { Article } from '../models/article';
import { ArticleResponse } from '../models/article.response';
import { ArticleList } from '../models/articleList';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {

  articles: Array<Article> = [];
  isLoggedIn: boolean;
  offset = 0;
  isGlobalFeed = true;

  constructor(private articlesService: ArticlesService, private usersService: UsersService) {
    this.usersService.isLoggedInObservable.subscribe(data => {
      this.isLoggedIn = data;
    })
  }

  ngOnInit() {
    this.fetchGlobalFeed(this.offset)
  }

  fetchGlobalFeed(skip) {
    this.articlesService.getAllArticles(skip)
      .subscribe((data: ArticleList) => {
        this.articles = [...this.articles, ...data.articles]
      })
  }

  fetchYourFeed() {
    this.articlesService.getFeedArticles()
      .subscribe((data: ArticleList) => {
        this.articles = data.articles
      })
  }

  handleTab(e) {
    if(e == 'GlobalFeedClicked') {
      this.isGlobalFeed = true;
      this.articles = [];
      this.fetchGlobalFeed(0);
    } else if(e == 'YourFeedClicked') {
      this.isGlobalFeed = false;
      this.fetchYourFeed();
    }
  }

  onScroll() {
    if(this.isGlobalFeed && this.offset<480) {
        this.offset+=20;
        this.fetchGlobalFeed(this.offset);
    }
  }

}
