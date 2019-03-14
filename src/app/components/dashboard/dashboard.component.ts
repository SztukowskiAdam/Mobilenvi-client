import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {TokenService} from '../../Services/token.service';
import {Router} from '@angular/router';
import {PostifyService} from '../../Services/postify.service';
import {HttpClient} from '@angular/common/http';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class DashboardComponent implements OnInit {
  public userData = {};
  public weather = {
    id: null,
    station_id: null,
    temperature: 20, /*default value*/
    pressure: null,
    created_at: null,
    updated_at: null
  };

  constructor(
    private token: TokenService,
    private route: Router,
    private postify: PostifyService,
    private http: HttpClient,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    if (!this.token.loggedIn()) {
      this.route.navigateByUrl('/login');
    }
    if (navigator.geolocation) {
      const self = this;
      navigator.geolocation.getCurrentPosition(function(position) {
        self.getWeather(position);
      });
    } else {
      console.log('Geolocation is not supported by this browser.');
    }
  }

  getWeather(position) {
    this.userData = {
      x: position.coords.latitude,
      y: position.coords.longitude
    };
    this.spinner.show();
    return this.postify.weather(this.userData).subscribe(
      data => {
        this.weather = data.body.data[0];
        this.spinner.hide();
        },
      error => {
        console.log(error);
        this.spinner.hide();
      }
    );
  }
}
