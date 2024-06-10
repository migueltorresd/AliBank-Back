export class AccountModel {
  accountTypeId: string;
  customerId: string;
  balance: number;
  state: boolean;

  constructor(
    accountTypeId: string,
    customerId: string,
    balance: number,
    state: boolean
  ) {
    this.accountTypeId = accountTypeId;
    this.customerId = customerId;
    this.balance = balance;
    this.state = state;
  }
}
