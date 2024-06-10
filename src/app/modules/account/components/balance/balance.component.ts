import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CustomersService } from 'src/app/modules/security/services/customer/customers.service';
import Swal from 'sweetalert2';
import { AccountInterface } from '../../interfaces/account.interface';
import { AccountService } from '../../services/account/account.service';

@Component({
  selector: 'account-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.scss'],
})
export class BalanceComponent implements OnInit {
  accounts: AccountInterface[];
  customerId = '';
  @Output() changeAccountId = new EventEmitter<string>();
  constructor(
    private readonly accountService: AccountService,
    private customerService: CustomersService
  ) {
    this.accounts = new Array<AccountInterface>();
  }
  /**
   * The function accionesModal() takes a string as an argument and displays a modal with the string as
   * the title
   * @param {string} accountId - string
   */
  accionesModal(accountId: string) {
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Hola cuenta:' + accountId,
      showConfirmButton: false,
      timer: 1500,
    });
  }
  /**
   * It selects the account with the given id and deselects all other accounts
   * @param {string} accountId - string - The account ID of the account that was selected.
   */
  seleccionar(accountId: string) {
    const account = this.accounts.find((data) => data.id === accountId);
    if (account) {
      account.selected = true;
      this.changeAccountId.emit(account.id);
    }
    this.accounts.map((data) => {
      if (data.id !== accountId) data.selected = false;
    });
  }
  /**
   * The function gets the customerId from local storage, then calls the accountService to get all
   * accounts for the customer, and then assigns the accounts to the accounts variable
   */
  ngOnInit(): void {
    this.customerId = localStorage.getItem('id') as string;
    this.accountService
      .getAll(this.customerId)
      .subscribe((data) => (this.accounts = data));
  }
}
