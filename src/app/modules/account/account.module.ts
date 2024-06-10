import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountRoutingModule } from './account-routing.module';
import { BalanceComponent } from './components/balance/balance.component';
import { AccountComponent } from './pages/account/account.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { InfoComponent } from './components/info/info.component';
import { ActionsComponent } from './components/actions/actions.component';
import { GenerateComponent } from './components/generate/generate.component';
import { UserInfoComponent } from './components/user-info/user-info.component';

@NgModule({
  declarations: [
    AccountComponent,
    InfoComponent,
    BalanceComponent,
    ActionsComponent,
    GenerateComponent,
    UserInfoComponent,
  ],
  imports: [CommonModule, AccountRoutingModule, FormsModule, HttpClientModule],
})
export class AccountModule {}
