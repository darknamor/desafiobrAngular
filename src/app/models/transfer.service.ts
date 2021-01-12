import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Transfer } from './transfer.model';

@Injectable({
  providedIn: 'root',
})
export class TransferService {
  baseUrl = environment.baseUrl;
  transferSubject = new Subject();
  balanceData: string;
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

  makeTranfer(transfer: Transfer) {
    this.http
      .post(this.baseUrl + 'api/movements/transfer', transfer)
      .subscribe((response) => {
        this.transferSubject.next();
      });
  }
  makeTranferListener() {
    return this.transferSubject.asObservable();
  }
}
