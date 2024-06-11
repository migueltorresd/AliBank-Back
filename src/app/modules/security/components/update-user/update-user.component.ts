import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CustomersService } from '../../services/customer/customers.service';

/**
 * Componente que permite a los usuarios actualizar su información de perfil.
 * Los usuarios pueden modificar su nombre, correo electrónico, teléfono y contraseña.
 */
@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss'],
})
export class UpdateUserComponent implements OnInit {
  // Formulario para actualizar la información del usuario
  frmSingUp: FormGroup;
  // Variable que indica si se ha iniciado sesión con Google
  google = true;

  constructor(
    private readonly customerService: CustomersService,
    private router: Router,
    private frmBuilder: FormBuilder
  ) {
    // Inicializa el formulario utilizando FormBuilder
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
   * Actualiza la información del usuario con los datos del formulario.
   */
  updateCustomer(): void {
    const newCustomer = this.customerService
      .updateCustomer(
        this.frmSingUp.getRawValue(),
        localStorage.getItem('id') as string
      )
      .subscribe({
        next: (data) => {
          // Actualiza los campos del formulario con los datos actualizados
          this.frmSingUp.get('document')?.setValue(data.document);
          this.frmSingUp.get('fullName')?.setValue(data.fullName);
          this.frmSingUp.get('email')?.setValue(data.email);
          this.frmSingUp.get('phone')?.setValue(data.phone);
        },
        error: (err) => {
          // Muestra un mensaje de error en caso de error
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: err.error.message,
            showConfirmButton: false,
            timer: 3500,
          });
        },
        complete: () => {
          // Muestra un mensaje de éxito y redirige al usuario a su cuenta
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
   * Se ejecuta cuando se inicializa el componente.
   * Obtiene la información del usuario actual y la muestra en el formulario.
   */
  ngOnInit(): void {
    const newCustomer = this.customerService
      .getCustomerById(localStorage.getItem('id') as string)
      .subscribe({
        next: (data) => {
          // Rellena el formulario con la información del usuario actual
          this.frmSingUp.get('document')?.setValue(data.document);
          this.frmSingUp.get('fullName')?.setValue(data.fullName);
          this.frmSingUp.get('email')?.setValue(data.email);
          this.frmSingUp.get('phone')?.setValue(data.phone);
        },
        error: (err) => {
          // Muestra un mensaje de error en caso de error
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
