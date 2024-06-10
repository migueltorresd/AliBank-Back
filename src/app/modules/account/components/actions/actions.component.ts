import { Component, Input } from '@angular/core';
import { TransferService } from '../../../movements/services/transfer/transfer.service';
import Swal from 'sweetalert2';
import { AccountService } from '../../services/account/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'account-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss'],
})
export class ActionsComponent {
  constructor(
    private readonly transferService: TransferService,
    private readonly router: Router,
    private readonly accountService: AccountService
  ) {}
  @Input() id!: string;
  @Input() length!: number;
  /**
   * It sets the customer id in the transfer service and navigates to the transfer page
   */
  transferencia() {
    this.transferService.setCustomerOut(this.id);
    this.router.navigate(['movements/transfer']);
  }
  /**
   * It opens a modal window that asks the user for the amount of money to withdraw, then it sends a
   * request to the backend to withdraw that amount of money from the account
   */
  retirarDinero() {
    Swal.fire({
      title: 'Ingresa el dinero a retirar',
      input: 'text',
      inputLabel: 'Dinero',
      inputValue: '0',
      confirmButtonColor: '#2ecc71',
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.accountService
          .removeBalance(
            sessionStorage.getItem('accountId') as string,
            result.value
          )
          .subscribe({
            next: (value) => {
              if (value) {
                Swal.fire({
                  title: 'Dinero retirado',
                  confirmButtonColor: '#2ecc71',
                });
                setTimeout(() => {
                  window.location.reload();
                }, 1500);
              } else {
                Swal.fire({
                  title: 'Saldo insuficiente',
                  confirmButtonColor: '#dc3545',
                });
              }
            },
            error: (err) => {
              Swal.fire(err.error.message);
            },
          });
      }
    });
  }
}
