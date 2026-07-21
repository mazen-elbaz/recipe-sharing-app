import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Service, inject } from '@angular/core';
import { Authservice } from './authservice';

@Service()
export class Authinterceptor implements HttpInterceptor {
  private authservice = inject(Authservice);

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const token = this.authservice.gettoken();

    if (token) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }

    return next.handle(req);
  }
}
