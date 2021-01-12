import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TransferService } from '../models/transfer.service';

@Component({
  selector: 'product-app',
  templateUrl: 'product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent  implements OnInit{
  @Output() selectBalance = new EventEmitter();
  @Output() logout = new EventEmitter();

  constructor(private transferService: TransferService) {}
  selectOption(f) {
    this.selectBalance.emit(f);
  }
  ngOnInit() {
    this.transferService.getProductById();
  }
  cerrarSesion() {
    this.logout.emit();
  }
}
