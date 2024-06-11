import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { TransferService } from '../../services/transfer/transfer.service';

/**
 * Componente para manejar la creación de transferencias de dinero.
 */
@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.scss'],
})
export class TransferComponent {
  /**
   * Observable para el ID del cliente de salida.
   */
  outComeId = this.transferService.getCustomerSubjectOut();

  /**
   * Formulario para la creación de transferencias.
   */
  frmTransfer: FormGroup;

  constructor(
    private readonly transferService: TransferService,
    private readonly router: Router
  ) {
    // Inicialización del formulario
    this.frmTransfer = new FormGroup({
      // Control para el ID del cliente de entrada
      inComeId: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
      ]),
      // Control para el ID del cliente de salida
      outComeId: new FormControl(this.outComeId),
      // Control para el monto de la transferencia
      amount: new FormControl('', [
        Validators.required,
        Validators.pattern(new RegExp(/\d+(\.\d{0,9})?/)),
      ]),
      // Control para la razón de la transferencia
      reason: new FormControl('', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(500),
      ]),
    });
  }

  /**
   * Crea una nueva transferencia.
   */
  createTransfer() {
    this.transferService
      .createTransfer(this.frmTransfer.getRawValue())
      .subscribe({
        next: (data) => {
          // Establece el ID de la transferencia creada
          this.transferService.setTransferId(data.id);
        },
        error: (err) => {
          // Muestra un mensaje de error en caso de fallo en la creación de la transferencia
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'Transferencia errónea',
            showConfirmButton: false,
            timer: 3500,
          });
        },
        complete: () => {
          // Muestra un mensaje de éxito y redirige a la página de vouchers al completarse la transferencia
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Transferencia correcta',
            showConfirmButton: false,
            timer: 1500,
          });
          setTimeout(() => {
            this.router.navigate(['movements/vaucher']);
          }, 1500);
        },
      });
  }
}
