import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import { UsersService } from '../users.service';
import { ArticlesService } from '../articles.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  user: any = {bio:'', following:'',image:'',username:''};
  username: string;
  articles = [];

  constructor(private userService: UsersService, private articlesService: ArticlesService, private route: ActivatedRoute) {
    this.route.params.subscribe( params => {
        this.username = params.username
    });
  }

  ngOnInit() {
    this.userService.getUser(this.username.substring(1)).subscribe(data => {
      this.user = data.profile;
    });
    this.fetchAllUserArticles()
  }

  fetchAllUserArticles() {
    this.articlesService.getAllUserArticles(this.username.substring(1)).subscribe(data => {
      this.articles = data.articles;
    })
  }

  fetchAllFavoritedArticles() {
    this.articlesService.getAllFavoritedArticles(this.username.substring(1)).subscribe(data => {
      this.articles = data.articles;
    })
  }

  handleTab(e) {
    if(e === 'MyArticlesClicked') {
      this.fetchAllUserArticles()
    } else if(e === 'FavoritedArticlesClicked') {
      this.fetchAllFavoritedArticles()
    }
  }

}
