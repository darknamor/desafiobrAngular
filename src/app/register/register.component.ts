import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SeguridadService } from '../models/seguridad.service';

@Component({
  selector: 'register-app',
  templateUrl: 'register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  constructor(private seguridadService: SeguridadService) {}
  ngOnInit(): void {}
  registrarUsuario(form: NgForm) {
    this.seguridadService.regitrarUsuario({
      username: form.value.name,
      rut: form.value.rut,
      email: form.value.email,
      password: form.value.password,
    });
  }
}
