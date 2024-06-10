import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { singInModel } from '../../models/sing-in.model';
import { CustomersService } from '../../services/customer/customers.service';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'login-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent {
  email: string;
  password: string;

  constructor(
    private readonly customerService: CustomersService,
    private router: Router,
    private readonly authService: AuthService
  ) {
    this.email = '';
    this.password = '';
  }
  /**
   * This function is responsible for logging in with Google, it is called when the user clicks on the
   * Google button, it calls the GoogleAuth() function of the authService, which returns a promise, if
   * the promise is resolved, it stores the user's email in sessionStorage, then it calls the
   * getCustomerByEmail() function of the customerService, which returns a promise, if the promise is
   * resolved, it stores the user's id in localStorage, then it calls the singIn() function of the
   * customerService, which returns a promise, if the promise is resolved, it stores the user's
   * access_token in localStorage, then it displays a message to the user, and finally it redirects the
   * user to the account page
   */
  auth(): void {
    this.authService.GoogleAuth().then((Response) => {
      sessionStorage.setItem(
        'googleUserEmail',
        JSON.stringify(Response.additionalUserInfo?.profile)
      );
      const customerGoogle = JSON.parse(
        sessionStorage.getItem('googleUserEmail') as string
      );
      this.customerService.getCustomerByEmail(customerGoogle.email).subscribe({
        next: (data) => {
          localStorage.setItem('id', data.id);
          sessionStorage.setItem('email', data.email);
          localStorage.setItem('password', data.password);
          const customer = new singInModel(data.email, data.password);
          const newCustomer = this.customerService.singIn(customer).subscribe({
            next: (data) => {
              localStorage.setItem('id', data.id);
              localStorage.setItem('access_token', data.access_token);
            },
            error: (err) => {
              Swal.fire({
                position: 'top-end',
                icon: 'warning',
                title: 'Debe completar el registro primero',
                showConfirmButton: false,
                timer: 3500,
              });
              setTimeout(() => {
                this.router.navigate(['security/signup']);
              }, 1500);
            },
            complete: () => {
              Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Inicio de sesión correcto',
                showConfirmButton: false,
                timer: 1500,
              });
              setTimeout(() => {
                this.router.navigate(['account']);
              }, 1500);
            },
          });
        },
        error: (err) => {
          Swal.fire({
            position: 'top-end',
            icon: 'warning',
            title: 'Debe completar el registro primero',
            showConfirmButton: false,
            timer: 3500,
          });
          setTimeout(() => {
            this.router.navigate(['security/signup']);
          }, 1500);
        },
        complete: () => {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Inicio de sesión correcto',
            showConfirmButton: false,
            timer: 1500,
          });
        },
      });
      const customer = new singInModel(
        customerGoogle.email as string,
        localStorage.getItem('password') as string
      );
    });
  }
  /**
   * It takes the email and password from the form, creates a new customer object, and sends it to the
   * customer service to be validated
   */
  singIn(): void {
    const customer = new singInModel(this.email, this.password);
    const newCustomer = this.customerService.singIn(customer).subscribe({
      next: (data) => {
        localStorage.setItem('id', data.id);
        localStorage.setItem('access_token', data.access_token);
      },
      error: (err) => {
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Datos incorrectos',
          showConfirmButton: false,
          timer: 3500,
        });
      },
      complete: () => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Inicio de sesión correcto',
          showConfirmButton: false,
          timer: 1500,
        });
        setTimeout(() => {
          this.router.navigate(['account']);
        }, 1500);
      },
    });
  }
}
