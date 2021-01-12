import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Transfer } from './transfer.model';
import { Movement } from './movement.model';

@Injectable({
  providedIn: 'root',
})
export class LoadBalanceService {
  baseUrl = environment.baseUrl;
  loadBalanceSubject = new Subject();
  balanceData: string;
  private balanceSubject = new Subject();
  constructor(private http: HttpClient) {}

  getProductById() {
    this.http
      .get<any>(
        this.baseUrl +
          'api/product/get-by-user/' +
          localStorage.getItem('userId')
      )
      .subscribe((data) => {
        this.balanceData = data.data[0].balance;
        localStorage.setItem('balance', data.data[0].balance);
      });
  }

  makeMovement(movement: Movement) {
    this.http
      .post(this.baseUrl + 'api/movements/movement', movement)
      .subscribe((response) => {
        this.loadBalanceSubject.next();
      });
  }
  makeMovementListener() {
    return this.loadBalanceSubject.asObservable();
  }
}
