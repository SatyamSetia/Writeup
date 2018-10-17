import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  BASE_URL = 'https://conduit.productionready.io/api';

  constructor(private http: HttpClient) { }

  getAllComments(slug) {
    return this.http.get(`${this.BASE_URL}/articles/${slug}/comments`);
  }
}
