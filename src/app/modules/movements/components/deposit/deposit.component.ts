import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { DepositService } from '../../services/deposit/deposit.service';

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.scss'],
})
export class DepositComponent {
  frmDeposit: FormGroup;

  constructor(
    private readonly depositService: DepositService,
    private readonly router: Router,
    private frmBuilder: FormBuilder
  ) {
    this.frmDeposit = this.frmBuilder.group({
      accountId: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
      ]),
      amount: new FormControl('', [
        Validators.required,
        Validators.pattern(new RegExp(/\d+(\.\d{0,9})?/)),
      ]),
    });
  }

  createDeposit() {
    this.depositService.createDeposit(this.frmDeposit.getRawValue()).subscribe({
      next: (data) => {},
      error: (err) => {
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Deposito errónea',
          showConfirmButton: false,
          timer: 3500,
        });
      },
      complete: () => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Deposito correcto',
          showConfirmButton: false,
          timer: 1500,
        });
        this.frmDeposit.reset();
      },
    });
  }
}
