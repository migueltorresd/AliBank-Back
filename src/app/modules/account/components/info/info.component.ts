import { Component } from '@angular/core';
import { AccountService } from '../../services/account/account.service';
import { CustomersService } from '../../../security/services/customer/customers.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AccountInterface } from '../../interfaces/account.interface';

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
   * La función `getAccountId()` se llama cuando el usuario selecciona una cuenta de la lista desplegable.
   * La función toma el `accountId` como argumento y lo establece en la variable `AccountId`. Luego,
   * la variable `AccountId` se almacena en `sessionStorage`.
   * @param {string} $event - Este es el parámetro que se pasa desde el componente hijo.
   */
  getAccountId($event: string) {
    this.AccountId = $event;
    sessionStorage.setItem('accountId', this.AccountId);
  }

  /**
   * La función `history()` se llama cuando el usuario hace clic en el botón "Ver historial de transacciones"
   * en el archivo HTML. Si el usuario ha seleccionado una cuenta, la función establece la cuenta como la
   * cuenta actual y navega a la página de movimientos. Si el usuario no ha seleccionado una cuenta, se muestra
   * un mensaje de advertencia.
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
