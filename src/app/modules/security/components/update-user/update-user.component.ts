import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CustomersService } from '../../services/customer/customers.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss'],
})
export class UpdateUserComponent implements OnInit {
  frmSingUp: FormGroup;
  google = true;
  constructor(
    private readonly customerService: CustomersService,
    private router: Router,
    private frmBuilder: FormBuilder
  ) {
    this.frmSingUp = this.frmBuilder.group({
      document: ['', Validators.required],
      fullName: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(500),
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.maxLength(30)]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(
            new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/g)
          ),
        ],
      ],
    });
  }
  /**
   * It takes the form data, gets the customer id from local storage, and sends it to the customer
   * service to update the customer
   */
  updateCustomer(): void {
    const newCustomer = this.customerService
      .updateCustomer(
        this.frmSingUp.getRawValue(),
        localStorage.getItem('id') as string
      )
      .subscribe({
        next: (data) => {
          this.frmSingUp.get('document')?.setValue(data.document);
          this.frmSingUp.get('fullName')?.setValue(data.fullName);
          this.frmSingUp.get('email')?.setValue(data.email);
          this.frmSingUp.get('phone')?.setValue(data.phone);
        },
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
            title: 'Actualizado correctamente',
            showConfirmButton: false,
            timer: 1500,
          });
          setTimeout(() => {
            this.router.navigate(['account']);
          }, 1500);
        },
      });
  }
  /**
   * It's a function that runs when the component is initialized
   */
  ngOnInit(): void {
    const newCustomer = this.customerService
      .getCustomerById(localStorage.getItem('id') as string)
      .subscribe({
        next: (data) => {
          this.frmSingUp.get('document')?.setValue(data.document);
          this.frmSingUp.get('fullName')?.setValue(data.fullName);
          this.frmSingUp.get('email')?.setValue(data.email);
          this.frmSingUp.get('phone')?.setValue(data.phone);
        },
        error: (err) => {
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: err.error.message,
            showConfirmButton: false,
            timer: 3500,
          });
        },
      });
  }
}
