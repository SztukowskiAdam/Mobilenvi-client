import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {TokenService} from './token.service';

@Injectable({
  providedIn: 'root'
})
export class PostifyService {

  constructor(private http: HttpClient,
              private token: TokenService) { }

  register(data) {
    return this.http.post(environment.APIEndpoint + 'register', data);
  }

  login(data) {
    return this.http.post(environment.APIEndpoint + 'login', data);
  }

  weather(data): Observable<any> {
    const httpHeaders = new HttpHeaders({
      'Authorization': 'Bearer ' + this.token.get()
    });

    return this.http.post(environment.APIEndpoint + 'user/weather', data, {headers: httpHeaders, observe: 'response'});
  }

  data(): Observable<any> {
    const httpHeaders = new HttpHeaders({
      'Authorization': 'Bearer ' + this.token.get()
    });

    return this.http.get(environment.APIEndpoint + 'data', {headers: httpHeaders, observe: 'response'});
  }
}
