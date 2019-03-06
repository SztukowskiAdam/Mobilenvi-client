import { Component, OnInit } from '@angular/core';
import {PostifyService} from '../../Services/postify.service';
import {Router} from '@angular/router';
import {TokenService} from '../../Services/token.service';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public form = {
    email: null,
    name: null,
    password: null,
    password_confirmation: null,
  };

  public error = null;

  constructor(
    private postify: PostifyService,
    private router: Router,
    private token: TokenService,
    private spinner: NgxSpinnerService
              ) {
  }

  onSubmit() {
    this.spinner.show();
    return this.postify.register(this.form).subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error)
    );
  }

  handleError(error) {
    this.error = error.error.error;
    this.spinner.hide();
  }

  handleResponse(data) {
    this.token.handle(data.token);
    this.router.navigateByUrl('/dashboard');
  }

  ngOnInit(): void {
    if (this.token.loggedIn()) {
      this.router.navigateByUrl('/dashboard');
    }
  }
}
