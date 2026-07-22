import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Authservice } from './services/authservice';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.css',
})
export class App {
  constructor(
    public authservice: Authservice,
    private router: Router,
  ) {}

  logout() {
    this.authservice.logout();
    this.router.navigate(['/login']);
  }
}
