import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {PostifyService} from '../../Services/postify.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherMapService implements Resolve<any> {

  constructor(private postify: PostifyService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.postify.data();
  }
}
