import { Component } from '@angular/core';
import { AccountService } from '../../services/account/account.service';
import { CustomersService } from '../../../security/services/customer/customers.service';
import { AccountInterface } from '../../interfaces/account.interface';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'account-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss'],
})
export class InfoComponent {
  customerId = '';
  AccountId!: string;
  accounts = new Array<AccountInterface>();
  constructor(
    private readonly accountService: AccountService,
    private customerService: CustomersService,
    private readonly router: Router
  ) {}
  /**
   * The function getAccountId() is called when the user selects an account from the dropdown list. The
   * function takes the accountId as an argument and sets it to the variable AccountId. The variable
   * AccountId is then stored in sessionStorage
   * @param {string}  - string - This is the parameter that is passed from the child component.
   */
  getAccountId($event: string) {
    this.AccountId = $event;
    sessionStorage.setItem('accountId', this.AccountId);
  }

  /**
   * The function history() is called when the user clicks on the button "Ver historial de
   * transacciones" in the HTML file. If the user has selected an account, the function sets the
   * account as the current account and navigates to the movements page. If the user has not selected
   * an account, a warning message is displayed
   */
  history() {
    if (this.AccountId) {
      this.accountService.setAccountOut(this.AccountId);
      this.router.navigate(['movements/history']);
    } else {
      Swal.fire({
        position: 'top-end',
        icon: 'warning',
        title: 'Seleccione una cuenta para ver el historial de transacciones',
        showConfirmButton: false,
        timer: 1500,
      });
    }
  }
}
