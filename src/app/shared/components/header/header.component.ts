import { Component, Output } from '@angular/core';
import { CustomerInterface } from 'src/app/modules/security/interfaces/customer.interface';
import Swal from 'sweetalert2';
import { CustomersService } from '../../../modules/security/services/customer/customers.service';
@Component({
  selector: 'bank-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(private readonly customerService: CustomersService) {}
  @Output() user!: CustomerInterface;
  localstorage(): boolean {
    if (localStorage.getItem('id')) return true;
    return false;
  }

  /**
   * The function getUser() is a function that calls the getCustomerById() function from the
   * customerService service, which returns an observable, and then the subscribe() function is called
   * on the observable, which takes an object as a parameter, and the object has a next property, which
   * is a function that takes a value as a parameter, and then the value is logged to the console, and
   * then the user object is updated with the value
   */
  getUser() {
    this.customerService.getCustomerById('').subscribe({
      next: (value) => {
        this.user.email = value.email;
        this.user.fullName = value.fullName;
        this.user.document = value.document;
      },
    });
  }
  /**
   * It clears the session and local storage.
   */
  clearSesion() {
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Sesión cerrada correctamente',
      showConfirmButton: false,
      timer: 1500,
    });
    localStorage.clear();
    sessionStorage.clear();
  }
}
