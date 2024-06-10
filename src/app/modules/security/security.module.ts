import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SecurityRoutingModule } from './security-routing.module';
import { FormComponent } from './components/form/form.component';
import { LoginComponent } from './pages/login/login.component';
import { FormSignupComponent } from './components/form-signup/form-signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GoogleButtonComponent } from './components/google-button/google-button.component';
import { UpdateUserComponent } from './components/update-user/update-user.component';

@NgModule({
  declarations: [
    FormComponent,
    LoginComponent,
    FormSignupComponent,
    FormSignupComponent,
    GoogleButtonComponent,
    UpdateUserComponent,
  ],
  imports: [
    CommonModule,
    SecurityRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class SecurityModule {}
