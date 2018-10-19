import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { ArticlesService } from "../articles.service";
import { UsersService } from '../users.service';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.css']
})
export class ArticleDetailComponent implements OnInit {

  slug: string = null;
  article: any = {title:'',author:{image:''}};
  data:any = null;
  isLoggedIn: boolean;

  constructor(private active: ActivatedRoute, private articleService: ArticlesService, private userService: UsersService,private route: Router) {
    this.active.params.subscribe( params => {
        this.slug = params.slug
    });
  }

  ngOnInit() {
    this.articleService.getArticle(this.slug).subscribe(data => {
      this.article = data.article;
      this.date = new Date(this.article.updatedAt).toDateString();
    })
    this.userService.isLoggedInObservable.subscribe(data => {
      this.isLoggedIn = data;
    })
  }

  toggleFavorite() {
    if(this.userService.ensureLoggedIn()) {
      if(this.article.favorited) {
        this.articleService.unfavoriteArticle(this.article.slug).subscribe(data => {
          this.article = data.article
        })
      } else {
        this.articleService.favoriteArticle(this.article.slug).subscribe(data => {
          this.article = data.article
        })
      }
    } else {
      this.route.navigate(['/login'])
    }
  }

}
