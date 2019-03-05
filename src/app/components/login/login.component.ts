import { Component, OnInit } from '@angular/core';
import {PostifyService} from '../../Services/postify.service';
import {TokenService} from '../../Services/token.service';
import {Router} from '@angular/router';
import {AuthService} from '../../Services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public form = {
    email: null,
    password: null
  };

  public error = null;

  constructor(
    private postify: PostifyService,
    private token: TokenService,
    private router: Router,
    private auth: AuthService
  ) { }

  onSubmit() {
    return this.postify.login(this.form).subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error)
    );
  }

  handleError(error) {
    this.error = error.error.error;
  }

  handleResponse(data) {
    this.token.handle(data.token);
    this.auth.changeAuthStatus(true);
    this.router.navigateByUrl('/dashboard');
  }

  ngOnInit() {
    if (this.token.loggedIn()) {
      this.router.navigateByUrl('/dashboard');
    }
  }

}
