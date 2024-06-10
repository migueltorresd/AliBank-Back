import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { TransferService } from '../../services/transfer/transfer.service';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.scss'],
})
export class TransferComponent {
  outComeId = this.transferService.getCustomerSubjectOut();
  frmTransfer: FormGroup;

  /**
   * The constructor function is used to initialize the class
   * @param {TransferService} transferService - TransferService: This is the service that we created
   * earlier.
   * @param {Router} router - Router - This is the Angular Router service.
   */
  constructor(
    private readonly transferService: TransferService,
    private readonly router: Router
  ) {
    this.frmTransfer = new FormGroup({
      inComeId: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
      ]),
      outComeId: new FormControl(this.outComeId),
      amount: new FormControl('', [
        Validators.required,
        Validators.pattern(new RegExp(/\d+(\.\d{0,9})?/)),
      ]),
      reason: new FormControl('', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(500),
      ]),
    });
  }

  /**
   * It creates a transfer and then navigates to the vaucher page
   */
  createTransfer() {
    this.transferService
      .createTransfer(this.frmTransfer.getRawValue())
      .subscribe({
        next: (data) => {
          this.transferService.setTransferId(data.id);
        },
        error: (err) => {
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'Transferencia errónea',
            showConfirmButton: false,
            timer: 3500,
          });
        },
        complete: () => {
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
