import { Usuario } from './usuario.model';
import { LoginData } from './login-data.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

import { Seguridad } from '../seguridad/seguridad.model';
import { MovementsService } from './movements.service';

@Injectable({
  providedIn: 'root',
})
export class SeguridadService {
  private token: string;
  baseUrl = environment.baseUrl;
  seguridadCambio = new Subject<boolean>();
  private usuario: Usuario;

  cargarUsuario(): void {
    const tokenBrowser = localStorage.getItem('token');
    if (!tokenBrowser) {
      return;
    }
    this.token = tokenBrowser;
    this.seguridadCambio.next(true);
  }

  obtenerToken(): string {
    return this.token;
  }
  constructor(
    private router: Router,
    private http: HttpClient,
    private movementsService: MovementsService
  ) {}

  regitrarUsuario(usr: Usuario): void {
    this.http
      .post<Usuario>(this.baseUrl + 'api/user/create', usr)
      .subscribe((response) => {
        this.usuario = {
          username: response.username,
          rut: response.rut,
          email: response.email,
          password: response.password,
        };
        this.seguridadCambio.next(true);
        this.router.navigate(['/home']);
      });
  }
  login(loginData: LoginData): void {
    this.http
      .post<Seguridad>(this.baseUrl + 'api/user/login', loginData)
      .subscribe((response) => {
        this.token = response.token;
        this.usuario = {
          username: '',
          rut: response.rut,
          email: '',
          password: '',
        };
        localStorage.setItem('token', response.token);
        localStorage.setItem('rut', response.rut);
        localStorage.setItem('userId', response.userId);
        this.seguridadCambio.next(true);
      });
  }
  logout() {
    this.usuario = null;
    this.seguridadCambio.next(false);
    localStorage.removeItem('rut');
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('balance');
    this.router.navigate(['/home']);
  }
  getUser() {
    return { ...this.usuario };
  }
  getProduct() {}
  onSesion() {
    return this.token != null;
  }
}
