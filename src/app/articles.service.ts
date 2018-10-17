import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthTokenService } from './auth-token.service.ts';

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {

  BASE_URL = 'https://conduit.productionready.io/api';

  constructor(private http: HttpClient, private authTokenService: AuthTokenService) {
  }

  getAllArticles() {
    return this.http.get(`${this.BASE_URL}/articles`)
  }

  getAllUserArticles(username) {
    return this.http.get(`${this.BASE_URL}/articles?author=${username}`)
  }

  getAllFavoritedArticles(username) {
    return this.http.get(`${this.BASE_URL}/articles?favorited=${username}`)
  }

  getArticle(slug) {
    return this.http.get(`${this.BASE_URL}/articles/${slug}`)
  }

  getAllTags() {
    return this.http.get(`${this.BASE_URL}/tags`)
  }

  createArticle(article) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization':'Token '+ this.authTokenService.getToken();
    });
    let httpOptions = {
      headers: headers
    }
    return this.http.post(`${this.BASE_URL}/articles`,article,httpOptions)
  }
}
