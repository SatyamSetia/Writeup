import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

import { AuthTokenService } from './auth-token.service';

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
    let headers;

    if(this.ensureLoggedIn()){
      headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Token '+ this.authTokenService.getToken()
      });
    } else {
      headers = new HttpHeaders({
        'Content-Type': 'application/json'
      });
    }
    let httpOptions = {
      headers: headers
    }
    return this.http.post(`${this.BASE_URL}/users/login`, user, httpOptions).pipe(map(data => {
      this.isLoggedIn.next(true);
      return data;
    }))
  }

  register(user) {
    let headers;

    if(this.ensureLoggedIn()){
      headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Token '+ this.authTokenService.getToken()
      });
    } else {
      headers = new HttpHeaders({
        'Content-Type': 'application/json'
      });
    }
    let httpOptions = {
      headers: headers
    }
    return this.http.post(`${this.BASE_URL}/users`, user, httpOptions)
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
      'Authorization':'Token '+ this.authTokenService.getToken()
    });
    let httpOptions = {
      headers: headers
    }
    return this.http.put(`${this.BASE_URL}/user`,user,httpOptions)
  }

  getCurrentUser() {
    let headers;

    if(this.ensureLoggedIn()){
      headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Token '+ this.authTokenService.getToken()
      });
    } else {
      headers = new HttpHeaders({
        'Content-Type': 'application/json'
      });
    }
    let httpOptions = {
      headers: headers
    }
    return this.http.get(`${this.BASE_URL}/user`,httpOptions);
  }

  followUser(username) {
    let headers;

    if(this.ensureLoggedIn()){
      headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Token '+ this.authTokenService.getToken()
      });
    } else {
      headers = new HttpHeaders({
        'Content-Type': 'application/json'
      });
    }
    let httpOptions = {
      headers: headers
    }

    return this.http.post(`${this.BASE_URL}/profiles/${username}/follow`,{},httpOptions)
  }

  unfollowUser(username) {
    let headers;

    if(this.ensureLoggedIn()){
      headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Token '+ this.authTokenService.getToken()
      });
    } else {
      headers = new HttpHeaders({
        'Content-Type': 'application/json'
      });
    }
    let httpOptions = {
      headers: headers
    }

    return this.http.delete(`${this.BASE_URL}/profiles/${username}/follow`,httpOptions)
  }
}
