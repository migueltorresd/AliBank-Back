import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AccountService } from '../../services/account/account.service';

@Component({
  selector: 'account-generate',
  templateUrl: './generate.component.html',
  styleUrls: ['./generate.component.scss'],
})
export class GenerateComponent {
  constructor(
    private readonly accountService: AccountService,
    private router: Router
  ) {}
  /**
   * The function takes an accountTypeId as a parameter, and then calls the createAccount function from
   * the accountService, which takes the accountTypeId and the userId as parameters, and then
   * subscribes to the observable returned by the createAccount function
   * @param {string} accountTypeId - string
   */
  registerAccount(accountTypeId: string): void {
    const newCustomer = this.accountService
      .createAccount(accountTypeId, localStorage.getItem('id') as string)
      .subscribe({
        error: (err) => {
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: err.error.message,
            showConfirmButton: false,
            timer: 3500,
          });
        },
        complete: () => {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'cuenta creada',
            showConfirmButton: false,
            timer: 1500,
          });
          window.location.reload();
        },
      });
  }
}
