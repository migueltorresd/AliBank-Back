import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovementsRoutingModule } from './movements-routing.module';
import { HistoryComponent } from './components/history/history.component';
import { MovementsComponent } from './pages/movements/movements.component';
import { TransferComponent } from './components/transfer/transfer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VaucherComponent } from './components/vaucher/vaucher.component';
import { DepositComponent } from './components/deposit/deposit.component';
import { SeparatePipe } from 'src/app/shared/pipes/separate/separate.pipe';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [
    MovementsComponent,
    HistoryComponent,
    TransferComponent,
    VaucherComponent,
    DepositComponent,
    SeparatePipe,
  ],
  imports: [
    CommonModule,
    MovementsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
  ],
})
export class MovementsModule {}
