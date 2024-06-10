import { Component, OnInit } from '@angular/core';
import { DepositInterface } from '../../interfaces/Deposit.deposit';
import { TransferInterface } from '../../interfaces/transfer.interface';
import { HistoryModel } from '../../models/history.model';
import { HistoryService } from '../../services/history/history.service';
import { AccountService } from '../../../account/services/account/account.service';
import { TransferService } from '../../services/transfer/transfer.service';
import { Router } from '@angular/router';

type DateAll = {
  [key: string]: any; // 👈️ variable key
  name: string;
};
@Component({
  selector: 'history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
})
export class HistoryComponent implements OnInit {
  p: number = 1;
  historyDeposit: DepositInterface[];
  history: any[];
  historyTransfer: TransferInterface[];
  accountId = this.accountService.getAccountSubjectOut();
  constructor(
    private readonly historyService: HistoryService,
    private readonly accountService: AccountService,
    private readonly transferService: TransferService,
    private readonly router: Router
  ) {
    this.history = new Array<object>();
    this.historyDeposit = new Array<DepositInterface>();
    this.historyTransfer = new Array<TransferInterface>();
  }
  /**
   * The function verTransferencia() is called when the user clicks on the button "Ver" in the table of
   * transfers. The function receives the id of the transfer and sets it in the service
   * TransferService. Then, the function navigates to the component VaucherComponent
   * @param {string} id - string
   */
  verTransferencia(id: string) {
    this.transferService.setTransferId(id);
    this.router.navigate(['movements/vaucher']);
  }
  /**
   * A function that is executed when the component is initialized.
   */
  ngOnInit(): void {
    if (this.accountId != '')
      sessionStorage.setItem('AccountId', this.accountId);
    let historyConsult = new HistoryModel(
      sessionStorage.getItem('AccountId') as string,
      {
        length: '99999999999999999999999999999999999999999999999999',
        page: '0',
      },
      {
        startDate: '0',
        endDate: String(Date.now()),
        startAmount: '0',
        endAmount: '9999999999',
      }
    );
    this.historyService.getDepositAll(historyConsult).subscribe({
      next: (data) => {
        this.historyDeposit = data;
      },
    });
    this.historyService.getTransferAll(historyConsult).subscribe({
      next: (data) => {
        this.historyTransfer = data;
      },
    });
    this.history.concat(this.historyDeposit, this.historyTransfer);
  }
}
