import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CustomersService } from '../../services/customer/customers.service';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'account-form-signup',
  templateUrl: './form-signup.component.html',
  styleUrls: ['./form-signup.component.scss'],
})
export class FormSignupComponent {
  frmSingUp: FormGroup;
  google = true;
  googleSession = this.authService.getGoogleSubjectOut();
  constructor(
    private readonly customerService: CustomersService,
    private router: Router,
    private readonly authService: AuthService,
    private frmBuilder: FormBuilder
  ) {
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
   * The function auth() is called when the user clicks on the Google button, which calls the
   * GoogleAuth() function in the authService service, which returns a response that is stored in the
   * sessionStorage, and then the form is filled with the data obtained from the response
   */
  auth(): void {
    this.authService.GoogleAuth().then((Response) => {
      console.log(Response);
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
   * A function that is responsible for registering a new customer.
   */
  registerCustomer(): void {
    debugger;
    if (this.google) {
      this.authService.SignUp(
        this.frmSingUp.get('email')?.getRawValue(),
        this.frmSingUp.get('password')?.getRawValue()
      );
      this.authService.isEmail(this.frmSingUp.get('email')?.getRawValue());
    }
    this.frmSingUp.get('documentTypeId');
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
