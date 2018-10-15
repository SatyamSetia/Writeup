import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {

  BASE_URL = 'https://conduit.productionready.io/api';

  constructor(private http: HttpClient) {

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
}
