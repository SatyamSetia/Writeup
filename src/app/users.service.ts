import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  BASE_URL = 'https://conduit.productionready.io/api';

  constructor(private http: HttpClient) { }

  getUser(username) {
    return this.http.get(`${this.BASE_URL}/profiles/${username}`)
  }
}
