import { Component, OnInit, Input } from '@angular/core';
import { ArticlesService } from '../articles.service';
import { UsersService } from '../users.service';
import { Router } from '@angular/router';
import { Article } from '../models/article';
import { ArticleResponse } from '../models/article.response';

@Component({
  selector: 'app-article-list-item',
  templateUrl: './article-list-item.component.html',
  styleUrls: ['./article-list-item.component.css']
})
export class ArticleListItemComponent implements OnInit {

  @Input() article: Article;

  date: any;
  constructor(private articleService: ArticlesService, private userService: UsersService, private route: Router) { }

  ngOnInit() {
    this.date = new Date(this.article.updatedAt).toDateString();
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

}
