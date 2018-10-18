import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

import { AuthTokenService } from './auth-token.service.ts';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  BASE_URL = 'https://conduit.productionready.io/api';

  private isLoggedIn = new BehaviorSubject(this.ensureLoggedIn());
  isLoggedInObservable = this.isLoggedIn.asObservable();

  httpOptions = {
    'Content-Type':  'application/json',
  }

  constructor(private http: HttpClient, private authTokenService: AuthTokenService, private route: Router) { }

  getUser(username) {
    return this.http.get(`${this.BASE_URL}/profiles/${username}`)
  }

  authenticate(user) {
    return this.http.post(`${this.BASE_URL}/users/login`, user, this.httpOptions).pipe(map(data => {
      this.isLoggedIn.next(true);
      return data;
    }))
  }

  register(user) {
    return this.http.post(`${this.BASE_URL}/users`, user, this.httpOptions)
  }

  logout() {
    this.authTokenService.deleteToken();
    this.isLoggedIn.next(false);
    this.route.navigate(['/login']);
  }

  ensureLoggedIn() {
    if(this.authTokenService.getToken()) {
      return true;
    } else {
      return false;
    }
  }

  updateUser(user) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization':'Token '+ this.authTokenService.getToken();
    });
    let httpOptions = {
      headers: headers
    }
    return this.http.put(`${this.BASE_URL}/user`,user,httpOptions)
  }

  getCurrentUser() {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization':'Token '+ this.authTokenService.getToken();
    })
    let httpOptions = {
      headers: headers
    }
    return this.http.get(`${this.BASE_URL}/user`,httpOptions);
  }
}
