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

  getArticle(slug) {
    return this.http.get(`${this.BASE_URL}/articles/${slug}`)
  }

  getAllTags() {
    return this.http.get(`${this.BASE_URL}/tags`)
  }
}
