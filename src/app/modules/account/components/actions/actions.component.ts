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

  // Entradas para el componente
  @Input() id!: string;
  @Input() length!: number;

  /**
   * Establece el ID del cliente en el servicio de transferencia y navega a la página de transferencia.
   */
  transferencia() {
    // Establecer el ID del cliente en el servicio de transferencia
    this.transferService.setCustomerOut(this.id);
    // Navegar a la página de transferencia
    this.router.navigate(['movements/transfer']);
  }

  /**
   * Abre una ventana modal que solicita al usuario la cantidad de dinero a retirar, luego envía una solicitud
   * al backend para retirar esa cantidad de dinero de la cuenta.
   */
  retirarDinero() {
    // Abrir la ventana modal de Swal para solicitar la cantidad de dinero a retirar
    Swal.fire({
      title: 'Ingresa el dinero a retirar',
      input: 'text',
      inputLabel: 'Dinero',
      inputValue: '0',
      confirmButtonColor: '#2ecc71',
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        // Enviar una solicitud al servicio de cuenta para retirar el dinero
        this.accountService
          .removeBalance(
            sessionStorage.getItem('accountId') as string,
            result.value // Cantidad de dinero a retirar
          )
          .subscribe({
            next: (value) => {
              // Si la operación es exitosa, mostrar un mensaje de éxito y recargar la página
              if (value) {
                Swal.fire({
                  title: 'Dinero retirado',
                  confirmButtonColor: '#2ecc71',
                });
                setTimeout(() => {
                  window.location.reload();
                }, 1500);
              } else {
                // Si hay un error, mostrar un mensaje de saldo insuficiente
                Swal.fire({
                  title: 'Saldo insuficiente',
                  confirmButtonColor: '#dc3545',
                });
              }
            },
            error: (err) => {
              // Si hay un error en la solicitud, mostrar el mensaje de error devuelto por el backend
              Swal.fire(err.error.message);
            },
          });
      }
    });
  }
}
