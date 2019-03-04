import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  handle(token) {
    this.set(token);
  }

  set(token) {
    localStorage.setItem('token', token);
  }

  get() {
    return localStorage.getItem('token');
  }

  remove() {
    localStorage.removeItem('token');
  }

  isValid() {
    const token = this.get();

    if (token) {
      const payload = this.payload(token);
      console.log(payload);

      return payload.iss === (environment.APIEndpoint + 'login') ||  payload.iss === (environment.APIEndpoint + 'register');
    }
    return false;
  }

  payload(token) {
    return this.decode(token.split('.')[1]);
  }

  decode(payload) {
    return JSON.parse(atob(payload));
  }

  loggedIn() {
    return this.isValid();
  }

}
