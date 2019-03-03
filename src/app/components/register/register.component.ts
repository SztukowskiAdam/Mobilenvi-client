import { Component, OnInit } from '@angular/core';
import {PostifyService} from '../../Services/postify.service';

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

  constructor(private postify: PostifyService) {
  }

  onSubmit() {
    return this.postify.register(this.form).subscribe(
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
