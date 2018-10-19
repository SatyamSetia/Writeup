import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
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

  constructor(private userService: UsersService, private articlesService: ArticlesService, private active: ActivatedRoute, private route: Router) {
    this.active.params.subscribe( params => {
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

  toggleFollow() {
    if(this.userService.ensureLoggedIn()) {
      if(this.user.following) {
        this.userService.unfollowUser(this.user.username).subscribe(data => {
          this.user = data.profile
        })
      } else {
        this.userService.followUser(this.user.username).subscribe(data => {
          this.user = data.profile
        })
      }

    } else {
      this.route.navigate(['/login'])
    }
  }

  handleTab(e) {
    if(e === 'MyArticlesClicked') {
      this.fetchAllUserArticles()
    } else if(e === 'FavoritedArticlesClicked') {
      this.fetchAllFavoritedArticles()
    }
  }

}
