import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthTokenService } from './auth-token.service'

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  BASE_URL = 'https://conduit.productionready.io/api';

  constructor(private http: HttpClient, private authTokenService: AuthTokenService) { }

  getAllComments(slug) {
    return this.http.get(`${this.BASE_URL}/articles/${slug}/comments`);
  }

  addNewComment(slug, comment) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization':'Token '+ this.authTokenService.getToken();
    })
    let httpOptions = {
      headers: headers
    }
    console.log(slug)
    return this.http.post(`${this.BASE_URL}/articles/${slug}/comments`,comment,httpOptions)
  }
}
