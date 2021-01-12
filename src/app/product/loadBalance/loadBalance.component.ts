import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { LoadBalanceService } from 'src/app/models/loadBalance.service';

@Component({
  selector: 'loadBalance-app',
  templateUrl: 'loadBalance.component.html',
  styleUrls: ['./loadBalance.component.css'],
})
export class LoadBalanceComponent implements OnInit {
  fechaPublicacion: string;
  rutActual: string = localStorage.getItem('rut');
  tipo: string = 'Deposito';
  checkUser: boolean = true;
  transferSubscription = new Subscription();
  saldo: string;
  @Output() selectMenuIndex = new EventEmitter();
  backToMenu() {
    this.selectMenuIndex.emit();
  }
  constructor(private transferService: LoadBalanceService) {}
  addBalance(form: NgForm) {
    if (form.valid) {
      const transferRequest = {
        rut: this.rutActual,
        monto: form.value.amount,
        fecha: new Date(),
        destino: this.rutActual,
        tipo: this.tipo,
      };
      this.transferService.makeMovement(transferRequest);
      this.transferSubscription = this.transferService
        .makeMovementListener()
        .subscribe(() => {
          console.log('Deposito exitoso');
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
