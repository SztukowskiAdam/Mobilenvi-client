import { Component, OnInit } from '@angular/core';
import {TokenService} from '../../Services/token.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(
    private token: TokenService,
    private route: Router
  ) { }

  ngOnInit() {
    if (!this.token.loggedIn()) {
      this.route.navigateByUrl('/login');
    }
  }

}
