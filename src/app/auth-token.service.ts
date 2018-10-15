import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthTokenService {

  constructor() { }

  saveToken(token) {
    window.localStorage.setItem('authToken',token);
  }

  getToken(token) {
    window.localStorage.getItem('authToken');
  }
}
