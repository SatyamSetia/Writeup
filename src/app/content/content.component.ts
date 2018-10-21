import { Component, OnInit } from '@angular/core';
import { ArticlesService } from '../articles.service';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {

  articles = [];
  isLoggedIn: boolean;
  offset = 0;

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
      .subscribe(data => {
        this.articles = [...this.articles, ...data.articles]
      })
  }

  fetchYourFeed() {
    this.articlesService.getFeedArticles()
      .subscribe(data => {
        this.articles = data.articles
      })
  }

  handleTab(e) {
    if(e == 'GlobalFeedClicked') {
      this.fetchGlobalFeed();
    } else if(e == 'YourFeedClicked') {
      this.fetchYourFeed();
    }
  }

  onScroll() {
    this.offset+=20;
    this.fetchGlobalFeed(this.offset);
  }

}
