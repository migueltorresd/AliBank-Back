import { Component, Input, OnInit } from '@angular/core';
import { CustomersService } from '../../../security/services/customer/customers.service';
import { CustomerInterface } from '../../../security/interfaces/customer.interface';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
})
export class UserInfoComponent implements OnInit {
  customer!: CustomerInterface;
  delete = false;
  AccountId!: string;

  constructor(
    private readonly customerService: CustomersService,
    private readonly router: Router
  ) {}

  /**
   * Verifica si el usuario tiene un saldo de 0 en todas sus cuentas. Si es así, le permite eliminar su cuenta;
   * de lo contrario, muestra un mensaje de advertencia.
   */
  eliminar() {
    this.customerService
      .getCustomerBoolean(localStorage.getItem('id') as string)
      .subscribe({
        next: (data) => {
          this.delete = data;
        },
        complete: () => {
          if (!this.delete) {
            Swal.fire({
              position: 'top-end',
              icon: 'warning',
              title: 'Debe tener sus cuentas en saldo 0',
              showConfirmButton: false,
              timer: 1500,
            });
          } else {
            Swal.fire({
              title: '¿Estás seguro de eliminar tu cuenta?',
              showDenyButton: true,
              showCancelButton: true,
              confirmButtonColor: '#2ecc71',
              confirmButtonText: 'Sí, estoy seguro',
              denyButtonText: `Cancelar`,
            }).then((result) => {
              if (result.isConfirmed) {
                this.customerService
                  .delete(localStorage.getItem('id') as string)
                  .subscribe({
                    next: (data) => {
                      console.log('hola pto', data);
                    },
                    error: (err) => {
                      Swal.fire({
                        position: 'top-end',
                        icon: 'error',
                        title: 'Error',
                        showConfirmButton: false,
                        timer: 3500,
                      });
                    },
                    complete: () => {
                      localStorage.clear();
                      sessionStorage.clear();
                    },
                  });

                Swal.fire({
                  title: 'Eliminado',
                  confirmButtonColor: '#2ecc71',
                });
                setTimeout(() => {
                  this.router.navigate(['security']);
                }, 1500);
              } else if (result.isDenied) {
                Swal.fire({ title: 'Cancelado', showConfirmButton: false });
              }
            });
          }
        },
      });
  }

  /**
   * La función obtiene los datos del cliente desde el servidor y los asigna a la propiedad `customer`.
   */
  ngOnInit(): void {
    this.customerService
      .getCustomerById(localStorage.getItem('id') as string)
      .subscribe({
        next: (data) => {
          this.customer = data;
        },
      });
  }
}
