import { Injectable } from '@angular/core';
import { Movements } from './movements.models';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MovementsService {
  baseUrl = environment.baseUrl;

  private movementsLista: Movements[] = [];
  private movementsSubject = new Subject<Movements[]>();
  idUser: string;
  constructor(private http: HttpClient) {}

  getIdbyRut() {
    this.http
      .get<any>(this.baseUrl + 'api/user/get-id/' + localStorage.getItem('rut'))
      .subscribe((data) => {
        localStorage.setItem('idUser', data.data._id);
      });
  }
  getMovements() {
    this.http
      .get<Movements[]>(
        this.baseUrl + 'api/movements/get-transfers/' + localStorage.getItem('userId')
      )
      .subscribe((data) => {
        this.movementsLista = data;
        this.movementsSubject.next([...this.movementsLista]);
      });
  }
  getActualListener() {
    return this.movementsSubject.asObservable();
  }
}
