import { Component, OnInit } from '@angular/core';
import {TokenService} from '../../Services/token.service';
import {Router} from '@angular/router';
import {PostifyService} from '../../Services/postify.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(
    private token: TokenService,
    private route: Router,
    private postify: PostifyService
  ) { }

  ngOnInit() {
    if (!this.token.loggedIn()) {
      this.route.navigateByUrl('/login');
    }
  }

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.showPosition);
    } else {
      console.log('Geolocation is not supported by this browser.');
    }
  }

  showPosition(position) {
    console.log(position.coords.latitude);
    return this.postify.userWeather(position.coords.latitude, position.coords.longitude).subscribe(
      data => console.log(data),
      error => console.log(error)
    );
  }
}
