import { Service, inject } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Authservice } from '../services/authservice';

@Service()
export class Authguard implements CanActivate {
  private authservice = inject(Authservice);
  private router = inject(Router);

  canActivate() {
    if (this.authservice.isloggedin()) {
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }
}
