import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { ArticlesService } from "../articles.service";
import { UsersService } from '../users.service';
import { User } from '../models/user';
import { Article } from '../models/article';
import { UserResponse } from '../models/user.response';
import { ArticleResponse } from '../models/article.response';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.css']
})
export class ArticleDetailComponent implements OnInit {

  slug: string = null;
  article: Article;
  date:string;
  isLoggedIn: boolean;
  isCurrUserArticle: boolean;
  currUser: User = {
    username: '',
    email: '',
    token: '',
    bio: '',
    image: ''
  };
  isLoading: boolean = true;

  constructor(private active: ActivatedRoute, private articleService: ArticlesService, private userService: UsersService,private route: Router) {
    this.active.params.subscribe( params => {
        this.slug = params.slug
    });
  }

  ngOnInit() {
    this.userService.isLoggedInObservable.subscribe(data => {
      this.isLoggedIn = data;
      if(this.isLoggedIn) {
        this.userService.getCurrentUser().subscribe((data: UserResponse) => {
          this.currUser = data.user;
        }, (err) => {
          console.log(err)
        }, () => {
          this.fetchArticle()
        })
      } else {
        this.fetchArticle()
      }
    })
  }

  fetchArticle() {
    this.articleService.getArticle(this.slug).subscribe((data: ArticleResponse) => {
      this.article = data.article;
      this.date = new Date(this.article.updatedAt).toDateString();
    }, (err) => {
      console.log(err)
    }, () => {
      if(this.article.author.username === this.currUser.username) {
        this.isCurrUserArticle = true;
      } else {
        this.isCurrUserArticle = false
      }
      this.isLoading = false;
    })
  }

  toggleFollow() {
    if(this.userService.ensureLoggedIn()) {
      if(this.article.author.following) {
        this.userService.unfollowUser(this.article.author.username).subscribe(data => {
          this.fetchArticle()
        })
      } else {
        this.userService.followUser(this.article.author.username).subscribe(data => {
          this.fetchArticle()
        })
      }

    } else {
      this.route.navigate(['/login'])
    }
  }

  toggleFavorite() {
    if(this.userService.ensureLoggedIn()) {
      if(this.article.favorited) {
        this.articleService.unfavoriteArticle(this.article.slug).subscribe((data: ArticleResponse) => {
          this.article = data.article
        })
      } else {
        this.articleService.favoriteArticle(this.article.slug).subscribe((data: ArticleResponse) => {
          this.article = data.article
        })
      }
    } else {
      this.route.navigate(['/login'])
    }
  }

  editArticle() {
    this.route.navigate([`/editor/${this.article.slug}`])
  }

  deleteArticle() {
    this.articleService.deleteArticle(this.article.slug).subscribe(() => {
      this.route.navigate([''])
    })
  }

}
