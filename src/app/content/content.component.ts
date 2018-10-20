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

  constructor(private articlesService: ArticlesService, private usersService: UsersService) {
    this.usersService.isLoggedInObservable.subscribe(data => {
      this.isLoggedIn = data;
    })
  }

  ngOnInit() {
    this.fetchGlobalFeed()
  }

  fetchGlobalFeed() {
    this.articlesService.getAllArticles()
      .subscribe(data => {
        this.articles = data.articles
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

}
