import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SeguridadService } from '../models/seguridad.service';

@Injectable()
export class SeguridadInterceptor implements HttpInterceptor {

  constructor(private seguridadService: SeguridadService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    const tokenSeguridad = this.seguridadService.obtenerToken();
    const req = request.clone({
      headers: request.headers.set('Authorization', 'Bearer ' + tokenSeguridad),
    });
    return next.handle(req);
  }
}
