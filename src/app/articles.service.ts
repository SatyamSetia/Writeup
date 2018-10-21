import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthTokenService } from './auth-token.service';
import { UsersService } from './users.service'

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {

  BASE_URL = 'https://conduit.productionready.io/api';

  constructor(private http: HttpClient, private authTokenService: AuthTokenService, private userService: UsersService) {
  }

  getAllArticles(offset) {
    let headers;

    if(this.userService.ensureLoggedIn()){
      headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Token '+ this.authTokenService.getToken();
      });
    } else {
      headers = new HttpHeaders({
        'Content-Type': 'application/json'
      });
    }

    let httpOptions = {
      headers: headers
    }
    return this.http.get(`${this.BASE_URL}/articles?offset=${offset}`,httpOptions)
  }

  getFeedArticles() {
    let headers;

    headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Token '+ this.authTokenService.getToken();
    });

    let httpOptions = {
      headers: headers
    }
    return this.http.get(`${this.BASE_URL}/articles/feed`,httpOptions)
  }

  getAllUserArticles(username) {
    return this.http.get(`${this.BASE_URL}/articles?author=${username}`)
  }

  getAllFavoritedArticles(username) {
    return this.http.get(`${this.BASE_URL}/articles?favorited=${username}`)
  }

  getArticle(slug) {
    let headers;

    if(this.userService.ensureLoggedIn()){
      headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Token '+ this.authTokenService.getToken();
      });
    } else {
      headers = new HttpHeaders({
        'Content-Type': 'application/json'
      });
    }

    let httpOptions = {
      headers: headers
    }
    return this.http.get(`${this.BASE_URL}/articles/${slug}`,httpOptions)
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

  favoriteArticle(slug) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization':'Token '+ this.authTokenService.getToken();
    });
    let httpOptions = {
      headers: headers
    }
    return this.http.post(`${this.BASE_URL}/articles/${slug}/favorite`,{},httpOptions)
  }

  unfavoriteArticle(slug) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization':'Token '+ this.authTokenService.getToken();
    });
    let httpOptions = {
      headers: headers
    }
    return this.http.delete(`${this.BASE_URL}/articles/${slug}/favorite`,httpOptions)
  }

  deleteArticle(slug) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization':'Token '+ this.authTokenService.getToken();
    });
    let httpOptions = {
      headers: headers
    }
    return this.http.delete(`${this.BASE_URL}/articles/${slug}`,httpOptions)
  }

  editArticle() {

  }
}
