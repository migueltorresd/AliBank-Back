import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { FormSignupComponent } from './components/form-signup/form-signup.component';
import { UpdateUserComponent } from './components/update-user/update-user.component';
import { AuthGuard } from '../main/guards/auth.guard';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'signup',
    component: FormSignupComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'update',
    component: UpdateUserComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SecurityRoutingModule {}
