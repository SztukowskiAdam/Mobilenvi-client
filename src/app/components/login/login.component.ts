import { Component, OnInit } from '@angular/core';
import {PostifyService} from '../../Services/postify.service';

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

  constructor(private postify: PostifyService) { }

  onSubmit() {
    return this.postify.login(this.form).subscribe(
      data => console.log(data),
      error => this.handleError(error)
    );
  }

  handleError(error) {
    this.error = error.error.error;
  }

  ngOnInit() {

  }

}
