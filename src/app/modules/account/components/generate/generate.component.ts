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
   * Registra una nueva cuenta para el usuario actual.
   * @param {string} accountTypeId - El ID del tipo de cuenta que se desea crear.
   */
  registerAccount(accountTypeId: string): void {
    // Llama a la función createAccount del servicio de cuenta para crear una nueva cuenta
    const newCustomer = this.accountService
      .createAccount(accountTypeId, localStorage.getItem('id') as string)
      .subscribe({
        // Maneja el error mostrando un mensaje de error
        error: (err) => {
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: err.error.message,
            showConfirmButton: false,
            timer: 3500,
          });
        },
        // Maneja la finalización exitosa mostrando un mensaje de éxito y recargando la página
        complete: () => {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Cuenta creada',
            showConfirmButton: false,
            timer: 1500,
          });
          window.location.reload();
        },
      });
  }
}
