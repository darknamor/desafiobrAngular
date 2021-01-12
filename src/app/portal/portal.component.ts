import { Component, OnInit, Output, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../services/users.service';
import { Subscription } from 'rxjs';
import { SeguridadService } from '../models/seguridad.service';

@Component({
  selector: 'app-portal',
  templateUrl: 'portal.component.html',
  styleUrls: ['./portal.component.css'],
})
export class PortalComponent implements OnInit, OnDestroy {
  public href: string = '';
  public registerUrl: string;
  estadoUsuario: boolean;
  usuarioSubscription: Subscription;
  menuUsuario: string;
  constructor(
    private seguridadServicio: SeguridadService,
    private router: Router
  ) {}
  agregarUsuario(f) {
    if (f.valid) {
      console.log('value', f);
    }
  }
  menuReset() {
    this.menuUsuario = '';
  }
  navegacionMenu(msg) {
    console.log('navegacion', msg);
    this.menuUsuario = msg;
  }
  closeSession() {
    console.log('cerrar sesion');
    this.seguridadServicio.logout();
    this.usuarioSubscription.unsubscribe();
  }
  ngOnInit() {
    this.usuarioSubscription = this.seguridadServicio.seguridadCambio.subscribe(
      (status) => {
        this.estadoUsuario = status;
      }
    );
    this.href = this.router.url;
    if (this.href === '/registro') {
      this.registerUrl = 'registro';
    } else if (this.href === '/login') {
      this.registerUrl = 'login';
    }
  }
  ngOnDestroy() {
    this.usuarioSubscription.unsubscribe();
  }
}
