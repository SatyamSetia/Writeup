import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  BASE_URL = 'https://conduit.productionready.io/api';

  const httpOptions = {
    'Content-Type':  'application/json',
  }

  constructor(private http: HttpClient) { }

  getUser(username) {
    return this.http.get(`${this.BASE_URL}/profiles/${username}`)
  }

  authenticate(user) {
    return this.http.post(`${this.BASE_URL}/users/login`, user, this.httpOptions)
  }
}
