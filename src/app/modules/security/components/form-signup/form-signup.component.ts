import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CustomersService } from '../../services/customer/customers.service';
import { AuthService } from '../../services/auth/auth.service';

/**
 * Componente que representa el formulario de registro de una cuenta.
 * Permite a los usuarios registrarse utilizando su correo electrónico y contraseña, o a través de su cuenta de Google.
 */
@Component({
  selector: 'account-form-signup',
  templateUrl: './form-signup.component.html',
  styleUrls: ['./form-signup.component.scss'],
})
export class FormSignupComponent {
  // Formulario de registro
  frmSingUp: FormGroup;
  // Variable que indica si se ha iniciado sesión con Google
  google = true;
  // Sesión de Google
  googleSession = this.authService.getGoogleSubjectOut();

  constructor(
    private readonly customerService: CustomersService,
    private router: Router,
    private readonly authService: AuthService,
    private frmBuilder: FormBuilder
  ) {
    // Inicializa el formulario utilizando FormBuilder
    this.frmSingUp = this.frmBuilder.group({
      documentTypeId: ['', [Validators.required]],
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
   * Se activa cuando el usuario hace clic en el botón de Google.
   * Llama a GoogleAuth() del servicio de autenticación, almacena la respuesta en sessionStorage y completa el formulario con los datos recibidos.
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
      this.frmSingUp.get('fullName')?.setValue(customerGoogle.name);
      this.frmSingUp.get('email')?.setValue(customerGoogle.email);
      this.frmSingUp.get('email')?.disable();
      this.frmSingUp.get('fullName')?.disable();
      this.google = false;
    });
  }

  /**
   * Registra un nuevo cliente.
   */
  registerCustomer(): void {
    if (this.google) {
      this.authService.SignUp(
        this.frmSingUp.get('email')?.getRawValue(),
        this.frmSingUp.get('password')?.getRawValue()
      );
      this.authService.isEmail(this.frmSingUp.get('email')?.getRawValue());
    }

    const newCustomer = this.customerService
      .createCustomer(this.frmSingUp.getRawValue())
      .subscribe({
        next: (data) => {
          this.customerService.setCustomer(data.account.customer.id);
          localStorage.setItem('id', data.account.customer.id);
          localStorage.setItem('access_token', data.access_token);
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
            title: 'Inicio de sesión correcto',
            showConfirmButton: false,
            timer: 1500,
          });
          this.customerService.setCustomer(
            localStorage.getItem('id') as string
          );
          setTimeout(() => {
            this.router.navigate(['account']);
          }, 1500);
        },
      });
  }
}
