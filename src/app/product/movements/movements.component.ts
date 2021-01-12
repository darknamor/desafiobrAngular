import {
  Component,
  OnInit,
  EventEmitter,
  Output,
  OnDestroy,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Movements } from 'src/app/models/movements.models';

import { MovementsService } from '../../models/movements.service';

@Component({
  selector: 'movements-app',
  templateUrl: 'movements.component.html',
  styleUrls: ['./movements.component.css'],
})
export class MovementsComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['fecha', 'monto', 'destino', 'tipo'];
  dataSource = new MatTableDataSource<Movements>();

  private movementSubscription: Subscription;
  idConsulta: string;

  @Output() selectMenuIndex = new EventEmitter();
  backToMenu() {
    this.selectMenuIndex.emit();
  }
  constructor(private movementsService: MovementsService) {}
  addBalance(form: NgForm) {
    console.log('monto', form.value.amount);
  }
  ngOnInit() {
    this.movementsService.getMovements();
    this.movementSubscription = this.movementsService
      .getActualListener()
      .subscribe((movements: Movements[]) => {
        this.dataSource.data = movements;
      });
  }
  ngOnDestroy() {
    this.movementSubscription.unsubscribe();
  }
}
