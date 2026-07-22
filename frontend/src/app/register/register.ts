import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Authservice } from '../services/authservice';
import { IUser } from '../models/iuser';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  user: IUser = {
    username: '',
    email: '',
    password: '',
  };
  message = '';

  constructor(private authservice: Authservice) {}

  register(form: NgForm) {
    if (form.valid) {
      this.authservice.register(this.user).subscribe({
        next: (data) => {
          this.authservice.savedata(data);
          this.message = 'Register Done';
          form.resetForm();
        },
        error: (err) => {
          this.message = err.error?.error || 'Register Failed';
        },
      });
    }
  }
}
