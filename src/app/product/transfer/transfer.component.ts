import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { TransferService } from '../../models/transfer.service';

@Component({
  selector: 'transfer-app',
  templateUrl: 'transfer.component.html',
  styleUrls: ['./transfer.component.css'],
})
export class TransferComponent implements OnInit {
  fechaPublicacion: string;
  rutActual: string = localStorage.getItem('rut');
  tipo: string = 'Transferencia';
  checkUser: boolean = true;
  transferSubscription = new Subscription();
  saldo: string;
  @Output() selectMenuIndex = new EventEmitter();
  backToMenu() {
    this.selectMenuIndex.emit();
  }

  constructor(private transferService: TransferService) {}
  transferToUser(form: NgForm) {
    if (form.valid) {
      const transferRequest = {
        rut: this.rutActual,
        monto: form.value.amount,
        fecha: new Date(),
        destino: form.value.rut,
        tipo: this.tipo,
      };
      this.transferService.makeTranfer(transferRequest);
      this.transferSubscription = this.transferService
        .makeTranferListener()
        .subscribe(() => {
          console.log('Transferencia existosa');
          this.selectMenuIndex.emit();
        });
    }
  }
  ngOnInit() {
    this.saldo = localStorage.getItem('balance');
  }
  ngOnDestroy() {
    this.transferSubscription.unsubscribe();
  }
}
