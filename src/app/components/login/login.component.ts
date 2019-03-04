import { Component, OnInit } from '@angular/core';
import {PostifyService} from '../../Services/postify.service';
import {TokenService} from '../../Services/token.service';

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
    private token: TokenService
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
  }

  ngOnInit() {

  }

}
