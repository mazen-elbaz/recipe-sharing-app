import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Authservice } from '../Services/authservice';
import { IUser } from '../models/iuser';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  user: IUser = {
    email: '',
    password: '',
  };
  message = '';

  constructor(private authservice: Authservice) {}

  login(form: NgForm) {
    if (form.valid) {
      this.authservice.login(this.user).subscribe({
        next: (data) => {
          this.authservice.savedata(data);
          this.message = 'Login Done';
        },
        error: (err) => {
          this.message = err.error?.error || 'Login Failed';
        },
      });
    }
  }
}
