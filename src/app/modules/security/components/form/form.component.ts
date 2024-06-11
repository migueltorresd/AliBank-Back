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
   * Esta función se encarga de iniciar sesión con Google. Se llama cuando el usuario hace clic en el
   * botón de Google. Llama a la función `GoogleAuth()` de `authService`, que devuelve una promesa. Si
   * la promesa se resuelve, almacena el correo electrónico del usuario en `sessionStorage`, luego
   * llama a la función `getCustomerByEmail()` de `customerService`, que devuelve una promesa. Si la
   * promesa se resuelve, almacena el ID del usuario en `localStorage`, luego llama a la función
   * `singIn()` de `customerService`, que devuelve una promesa. Si la promesa se resuelve, almacena el
   * access_token del usuario en `localStorage`, luego muestra un mensaje al usuario, y finalmente
   * redirige al usuario a la página de la cuenta.
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
   * Toma el correo electrónico y la contraseña del formulario, crea un nuevo objeto de cliente, y lo
   * envía al servicio de clientes para ser validado.
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
