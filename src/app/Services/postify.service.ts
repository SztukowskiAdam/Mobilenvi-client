import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostifyService {

  constructor(private http: HttpClient) { }

  register(data) {
    return this.http.post(environment.APIEndpoint + 'register', data);
  }

  login(data) {
    return this.http.post(environment.APIEndpoint + 'login', data);
  }
}
