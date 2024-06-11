import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CustomersService } from 'src/app/modules/security/services/customer/customers.service';
import Swal from 'sweetalert2';
import { AccountService } from '../../services/account/account.service';
import { AccountInterface } from '../../interfaces/account.interface';

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
   * La función `accionesModal()` toma un string como argumento y muestra un modal con el string como título.
   * @param {string} accountId - El ID de la cuenta.
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
   * Selecciona la cuenta con el ID dado y deselecciona todas las demás cuentas.
   * @param {string} accountId - El ID de la cuenta seleccionada.
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
   * La función obtiene el customerId del almacenamiento local, luego llama al accountService para obtener
   * todas las cuentas del cliente, y luego asigna las cuentas a la variable `accounts`.
   */
  ngOnInit(): void {
    this.customerId = localStorage.getItem('id') as string;
    this.accountService
      .getAll(this.customerId)
      .subscribe((data) => (this.accounts = data));
  }
}
