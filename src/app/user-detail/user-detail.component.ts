import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { UsersService } from '../users.service';
import { ArticlesService } from '../articles.service';
import { User } from '../models/user';
import { Article } from '../models/article';
import { UserProfile } from '../models/user.profile';
import { UserProfileResponse } from '../models/userProfile.response';
import { UserResponse } from '../models/user.response';
import { ArticleList } from '../models/articleList';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  user: UserProfile;
  username: string;
  articles: Array<Article> = [];
  isFavArticleActive = false;
  isLoading: boolean = true;
  currUser: User;
  userIsCurrUser: boolean = false;;

  constructor(private userService: UsersService, private articlesService: ArticlesService, private active: ActivatedRoute, private route: Router) {
    this.active.params.subscribe( params => {
        this.username = params.username
    });
  }

  ngOnInit() {
    this.userService.getUser(this.username.substring(1)).subscribe((data: UserProfileResponse) => {
      this.user = data.profile;
      this.isLoading = false;
    });
    this.fetchAllUserArticles();
    if(this.userService.ensureLoggedIn()) {
      this.userService.getCurrentUser().subscribe((data: UserResponse) => {
        this.currUser = data.user
        if(this.currUser.username === this.user.username) {
          this.userIsCurrUser = true;
        }
      })
    }
  }

  fetchAllUserArticles() {
    this.articlesService.getAllUserArticles(this.username.substring(1)).subscribe((data: ArticleList) => {
      this.articles = data.articles;
    })
  }

  fetchAllFavoritedArticles() {
    this.articlesService.getAllFavoritedArticles(this.username.substring(1)).subscribe((data: ArticleList) => {
      this.articles = data.articles;
    })
  }

  toggleFollow() {
    if(this.userService.ensureLoggedIn()) {
      if(this.user.following) {
        this.userService.unfollowUser(this.user.username).subscribe((data: UserProfileResponse) => {
          this.user = data.profile
        })
      } else {
        this.userService.followUser(this.user.username).subscribe((data: UserProfileResponse) => {
          this.user = data.profile
        })
      }

    } else {
      this.route.navigate(['/login'])
    }
  }

  handleTab(e) {
    if(e === 'MyArticlesClicked') {
      this.isFavArticleActive = false;
      this.fetchAllUserArticles()
    } else if(e === 'FavoritedArticlesClicked') {
      this.isFavArticleActive = true;
      this.fetchAllFavoritedArticles()
    }
  }

}
